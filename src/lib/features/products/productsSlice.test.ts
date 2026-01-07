import productsReducer, { selectFilterOptions } from './productsSlice';
import { IProduct } from '@/types/IProduct';

describe('ProductsSlice Tests', () => {
  const mockProduct1 = { 
    id: 101, 
    title: 'Monitor A', 
    type: 'Monitors', 
    specification: 'Specification 1', 
    price: 200 
  } as unknown as IProduct;

  const mockProduct2 = { 
    id: 102, 
    title: 'Monitor B', 
    type: 'Monitors',
    specification: 'Specification 2', 
    price: 300 
  } as unknown as IProduct;

  const mockProduct3 = { 
    id: 103, 
    title: 'Laptop X', 
    type: 'Laptops', 
    specification: 'Specification 1',
    price: 1000 
  } as unknown as IProduct;

  const initialState = {
    productsList: [],
    loading: false,
    error: null,
  };

  describe('Reducer Logic', () => {

    test('should return initial state', () => {
      const result = productsReducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });

    test('should set loading true on fetchProducts.pending', () => {
      const action = { type: 'products/fetchProducts/pending' };
      const result = productsReducer(initialState, action);
      
      expect(result.loading).toBe(true);
      expect(result.error).toBe(null);
    });

    test('should update productsList on fetchProducts.fulfilled', () => {
      const payload = [mockProduct1, mockProduct2];
      const action = { type: 'products/fetchProducts/fulfilled', payload };
      
      const loadingState = { ...initialState, loading: true };
      const result = productsReducer(loadingState, action);

      expect(result.loading).toBe(false);
      expect(result.productsList).toHaveLength(2);
      expect(result.productsList[0].title).toBe('Monitor A');
    });

    test('should set error on fetchProducts.rejected', () => {
      const action = { 
        type: 'products/fetchProducts/rejected', 
        error: { message: 'Server Error 500' } 
      };
      const result = productsReducer({ ...initialState, loading: true }, action);

      expect(result.loading).toBe(false);
      expect(result.error).toBe('Server Error 500');
    });

    test('should remove product on deleteProduct.fulfilled', () => {
      const stateWithProducts = {
        ...initialState,
        productsList: [mockProduct1, mockProduct2, mockProduct3]
      };

      const action = { 
        type: 'products/deleteProduct/fulfilled', 
        payload: 102 
      };

      const result = productsReducer(stateWithProducts, action);

      expect(result.productsList).toHaveLength(2);
      expect(result.productsList.find(p => p.id === 102)).toBeUndefined();
    });

    test('should set error on deleteProduct.rejected', () => {
      const action = { 
        type: 'products/deleteProduct/rejected', 
        error: { message: 'Delete failed' } 
      };
      const result = productsReducer(initialState, action);

      expect(result.error).toBe('Delete failed');
      expect(result.loading).toBe(false);
    });
  });

  describe('Selectors', () => {
    
    test('selectFilterOptions should extract unique types and specifications and sort them', () => {
      const mockRootState = {
        products: {
          ...initialState,
          productsList: [mockProduct1, mockProduct2, mockProduct3]
        }
      };

      // @ts-expect-error: Mocking RootState partially
      const result = selectFilterOptions(mockRootState);
      expect(result.types).toHaveLength(2);
      expect(result.types).toEqual(['Laptops', 'Monitors']); 

      expect(result.specifications).toHaveLength(2);
      expect(result.specifications).toEqual(['Specification 1', 'Specification 2']);
    });

    test('selectFilterOptions should return empty arrays if product list is empty', () => {
      const emptyState = {
        products: { ...initialState, productsList: [] }
      };

      // @ts-expect-error: Mocking RootState
      const result = selectFilterOptions(emptyState);

      expect(result.types).toEqual([]);
      expect(result.specifications).toEqual([]);
    });
  });

});