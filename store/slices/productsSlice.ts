import { createSlice } from '@reduxjs/toolkit';
import { initialProducts } from '../products';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: initialProducts,
  },
  reducers: {},
});

export const selectProducts = (state: { products: { items: typeof initialProducts } }) => state.products.items;
export const selectProductById = (productId: string) => (state: { products: { items: typeof initialProducts } }) =>
  state.products.items.find((product) => product.id === productId);

export default productsSlice.reducer;
