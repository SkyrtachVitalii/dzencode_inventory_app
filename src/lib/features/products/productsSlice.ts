import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "@/types/IProduct";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";


interface ProductsState {
    productsList: IProduct[];
    loading: boolean,
    error: string | null;
}

const initialState: ProductsState = {
    productsList: [],
    loading: false,
    error: null,
}

export const fetchProducts = createAsyncThunk<IProduct[]>(
    "products/fetchProducts", async () => {
        const response = await axios.get<IProduct[]>("/api/products");
        return response.data;
    }
)

export const deleteProduct = createAsyncThunk<number, number>(
  "products/deleteProduct", async (id: number) => {
    await axios.delete(`/api/products/${id}`);
    return id;
  }  
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.productsList = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch products";
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.productsList = state.productsList.filter(product => product.id !== action.payload);
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Не вдалося видалити продукт";
            console.error("Failed to delete product");
        })
    },
});

export default productsSlice.reducer;




const selectProductsList = (state: RootState) => state.products.productsList;

export const selectFilterOptions = createSelector(
  [selectProductsList],
  (products) => {
    const types = Array.from(new Set(products.map((p) => p.type))).sort();
    
    const specifications = Array.from(new Set(products.map((p) => p.specification))).sort();

    return {
      types,
      specifications
    };
  }
);