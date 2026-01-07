import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductsPage from "./page";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, {
  fetchProducts,
  deleteProduct,
} from "@/lib/features/products/productsSlice";
import { IProduct } from "@/types/IProduct";
import { ReactNode } from "react";

interface SingleProductProps {
  product: IProduct;
  onDelete: (id: number) => void;
}

interface FilterProps {
  onTypeChange: (type: string) => void;
}

interface DeleteModalProps {
  isOpen: boolean;
  onDelete: () => void;
  onClose: () => void;
  title: string;
}

interface MotionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface PageLoaderProps {
  children: ReactNode;
  isLoading: boolean;
}

jest.mock("@/lib/features/products/productsSlice", () => {
  const originalModule = jest.requireActual(
    "@/lib/features/products/productsSlice"
  );
  return {
    __esModule: true,
    ...originalModule,
    fetchProducts: jest.fn(() => ({ type: "TEST/IGNORE_ME" })),
    deleteProduct: jest.fn(),
  };
});

jest.mock("@/components/PageLoader/PageLoader", () => {
  return function MockPageLoader({ children, isLoading }: PageLoaderProps) {
    if (isLoading) return <div>Loading from Loader...</div>;
    return <div data-testid="page-loader">{children}</div>;
  };
});

jest.mock("@/components/SingleProduct/SingleProduct", () => {
  return function MockSingleProduct({ product, onDelete }: SingleProductProps) {
    return (
      <div data-testid="single-product">
        <span>{product.title}</span>
        <button onClick={() => onDelete(product.id)} aria-label="Delete Item">
          Delete Mock
        </button>
      </div>
    );
  };
});

jest.mock("@/components/ProductsFilter/ProductsFilter", () => {
  return function MockFilter({ onTypeChange }: FilterProps) {
    return (
      <div>
        <button onClick={() => onTypeChange("Monitors")}>
          Filter Monitors
        </button>
      </div>
    );
  };
});

jest.mock("@/components/DeleteModal/DeleteModal", () => {
  return function MockDeleteModal({
    isOpen,
    onDelete,
    onClose,
    title,
  }: DeleteModalProps) {
    if (!isOpen) return null;
    return (
      <div role="dialog">
        <p>Deleting: {title}</p>
        <button onClick={onDelete}>Confirm Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  };
});

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, onClick, ...props }: MotionProps) => (
      <div className={className} onClick={onClick} {...props}>
        {children}
      </div>
    ),
  },
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));


const mockProduct1: IProduct = {
  id: 1,
  title: "Gaming Monitor",
  type: "Monitors",
  specification: "Gaming",
  serialNumber: "123",
  isNew: 1,
  photo: "url",
  price: 100,
  date: "2023-01-01",
  guarantee: { start: "2022", end: "2025" },
} as unknown as IProduct;

const mockProduct2: IProduct = {
  id: 2,
  title: "Office Mouse",
  type: "Peripherals",
  specification: "Office",
  serialNumber: "456",
  isNew: 1,
  photo: "url",
  price: 50,
  date: "2023-01-01",
  guarantee: { start: "2022", end: "2025" },
} as unknown as IProduct;

const createTestStore = (initialProducts: IProduct[] = []) => {
  return configureStore({
    reducer: {
      products: productsReducer,
    },
    preloadedState: {
      products: {
        productsList: initialProducts,
        loading: false,
        error: null,
      },
    },
  });
};

describe("ProductsPage Integration Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch products on mount and display them", () => {
    const store = createTestStore([mockProduct1, mockProduct2]);

    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>
    );

    expect(fetchProducts).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Gaming Monitor")).toBeInTheDocument();
    expect(screen.getByText("Office Mouse")).toBeInTheDocument();
  });

  test("should filter products when filter is changed", async () => {
    const store = createTestStore([mockProduct1, mockProduct2]);

    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>
    );

    expect(screen.getAllByTestId("single-product")).toHaveLength(2);

    fireEvent.click(screen.getByText("Filter Monitors"));

    await waitFor(() => {
      expect(screen.getAllByTestId("single-product")).toHaveLength(1);
    });

    expect(screen.getByText("Gaming Monitor")).toBeInTheDocument();
    expect(screen.queryByText("Office Mouse")).not.toBeInTheDocument();
  });

  test("should handle delete flow correctly (Open Modal -> Confirm -> Dispatch)", async () => {
    const store = createTestStore([mockProduct1]);

    const mockUnwrap = jest.fn();
    (deleteProduct as unknown as jest.Mock).mockReturnValue({
      type: "delete/mock",
      unwrap: mockUnwrap,
    });

    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Delete Item"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Deleting: Gaming Monitor")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Confirm Delete"));

    expect(deleteProduct).toHaveBeenCalledWith(1);
    expect(mockUnwrap).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  test("should close modal without deleting when Cancel is clicked", () => {
    const store = createTestStore([mockProduct1]);

    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText("Delete Item"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(deleteProduct).not.toHaveBeenCalled();
  });

  test("should show loading state", () => {
    const store = configureStore({
      reducer: { products: productsReducer },
      preloadedState: {
        products: {
          productsList: [],
          loading: true,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>
    );

    expect(screen.getByText(/Loading products.../i)).toBeInTheDocument();
  });
});
