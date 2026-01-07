import ordersReducer, { selectOrdersForChart } from "./ordersSlice";
import { IOrder } from "@/types/IOrder";
import { IProduct } from "@/types/IProduct";

describe("OrdersSlice Complete Tests", () => {
  const mockProduct1 = {
    id: 101,
    title: "Monitor",
    type: "Monitors",
    price: 200,
    guarantee: {},
    priceArr: [],
  } as unknown as IProduct;

  const mockProduct2 = {
    id: 102,
    title: "Mouse",
    type: "Peripherals",
    price: 50,
    guarantee: {},
    priceArr: [],
  } as unknown as IProduct;

  const mockOrder = {
    id: 1,
    title: "Test Order 1",
    date: "2023-01-01",
    description: "Desc",
    products: [mockProduct1, mockProduct2],
    totalPrice: 250,
  } as unknown as IOrder;

  const initialState = {
    ordersList: [],
    loading: false,
    error: null,
  };


  describe("Reducer Logic", () => {
    test("should return the initial state", () => {
      const result = ordersReducer(undefined, { type: "" });
      expect(result).toEqual(initialState);
    });

    test("should handle fetchOrders.pending (Loading state)", () => {
      const action = { type: "orders/fetchOrders/pending" };
      const result = ordersReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBe(null);
    });

    test("should handle fetchOrders.fulfilled (Success)", () => {
      const payload = [mockOrder];
      const action = { type: "orders/fetchOrders/fulfilled", payload };

      const loadingState = { ...initialState, loading: true };

      const result = ordersReducer(loadingState, action);

      expect(result.loading).toBe(false);
      expect(result.ordersList).toHaveLength(1);
      expect(result.ordersList[0].title).toBe("Test Order 1");
    });

    test("should handle fetchOrders.rejected (Error)", () => {
      const action = {
        type: "orders/fetchOrders/rejected",
        error: { message: "Network Error" },
      };

      const loadingState = { ...initialState, loading: true };
      const result = ordersReducer(loadingState, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe("Network Error");
    });

    test("should handle deleteOrder.fulfilled", () => {
      const stateWithOrder = { ...initialState, ordersList: [mockOrder] };

      const action = {
        type: "orders/deleteOrder/fulfilled",
        payload: 1,
      };

      const result = ordersReducer(stateWithOrder, action);

      expect(result.ordersList).toHaveLength(0);
    });

    test("should handle deleteProductFromOrder.fulfilled", () => {
      const stateWithOrder = { ...initialState, ordersList: [mockOrder] };

      const action = {
        type: "orders/deleteProductFromOrder/fulfilled",
        payload: { orderId: 1, productId: 101 },
      };

      const result = ordersReducer(stateWithOrder, action);

      expect(result.ordersList).toHaveLength(1);

      const updatedOrder = result.ordersList[0];
      expect(updatedOrder.products).toHaveLength(1);

      expect(updatedOrder.products[0].id).toBe(102);
    });
  });


  describe("Selectors", () => {
    test("selectOrdersForChart should format data correctly", () => {
      const mockRootState = {
        orders: {
          ...initialState,
          ordersList: [
            {
              ...mockOrder,
              title: "Order A",
              products: [mockProduct1, mockProduct2],
            },
            { ...mockOrder, id: 2, title: "Order B", products: [] },
          ],
        },
      };

      const result = selectOrdersForChart(mockRootState);

      expect(result).toHaveLength(2);

      expect(result[0]).toEqual({
        name: "Order A",
        productsCount: 2,
      });

      expect(result[1]).toEqual({
        name: "Order B",
        productsCount: 0,
      });
    });
  });
});
