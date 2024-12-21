import { useSelector, useDispatch } from 'react-redux';
import { fetchData, increaseStock, decreaseStock } from './productSlice';

export const useProduct = () => {
  const products = useSelector((state) => state.products.products);
  
  const dispatch = useDispatch();

  const fetchProducts = () => {
    dispatch(fetchData());
  };

  const incrementStock = (productId) => {
    dispatch(increaseStock(productId));
  };

  const decrementStock = (productId) => {
    dispatch(decreaseStock(productId));
  };

  return {
    products,
    fetchProducts,
    incrementStock,
    decrementStock,
  };
};
