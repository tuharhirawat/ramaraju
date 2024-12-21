
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchData = createAsyncThunk('products/fetchData', async () => {
  const response = await axios.get("http://localhost:3000/products");
  return response.data;
});

const initialState = {
  products: [], 
  
};


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      increaseStock: (state, action) => {
        const { id, value } = action.payload;
        const product = state.products.find((p) => p.id === id);
        if (product) {
          product.quantity += value; 
        }
      },
      decreaseStock: (state, action) => {
        const { id, value } = action.payload;
        const product = state.products.find((p) => p.id === id);
        if (product && product.quantity >= value) {
          product.quantity -= value; 
        }
      },
    },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.map((product) => ({
          ...product,
          quantity: product.quantity , 
        }));
      })
      
  },
});


export const { increaseStock, decreaseStock } = productSlice.actions;
export default productSlice.reducer;
