import { useSelector } from 'react-redux';
import CartItem from './CartItem';

const CartItemsList = ({data}) => {
  // const cartItems = useSelector((state) => state.cartState.cartItems);
  const cartData = data?.cartItems || [];
  
  return (
    <>
      {cartData?.map((item) => {
        return <CartItem key={item?.product?._id} cartItem={item} />;
      })}
    </>
  );
};
export default CartItemsList;
