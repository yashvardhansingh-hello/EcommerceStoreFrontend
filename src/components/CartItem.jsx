import { formatPrice, generateAmountOptions } from "../utils";
import { removeItem, editItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useRemoveCartItemMutation, useUpdateUserCartMutation } from "../features/api";
import { useAsyncMutation } from "../hooks/hook";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const { _id, title, price, image, company, colors } = cartItem.product;
  const amount = cartItem.quantity;

  // remove item from the cart
const [removeCartItemMutation, isLoadingGroupMutation] = useAsyncMutation(useRemoveCartItemMutation);

  const removeItemFromTheCart = async () => {

     await removeCartItemMutation("removing item ...", { id: _id });
  };


  // update user cart item amount
  const [updateUserCartMutation, isLoadingUserCartMutation] = useAsyncMutation(useUpdateUserCartMutation);

  const handleAmount = async (e) => {
    const quantity = Number(e.target.value);
    await updateUserCartMutation("updating cart ...", { productId: _id, quantity });
  };


  return (
    <article
      key={_id}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <img
        src={image.url}
        alt={title}
        className="h-34 w-52 rounded-lg sm:h-32 sm:w-52 object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium">{title}</h3>
        {/* COMPANY */}
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {company.name}
        </h4>
        {/* COLOR */}
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color :
          <span
            className="badge badge-sm"
            style={{ backgroundColor: colors[0] }}
          ></span>
        </p>
      </div>
      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-bordered select-xs"
            value={amount}
            onChange={handleAmount}
          >
            {generateAmountOptions(Number(amount) + 5)}
          </select>
        </div>
        {/* REMOVE */}
        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={removeItemFromTheCart}
        >
          remove
        </button>
      </div>

      {/* PRICE */}
      <p className="sm:ml-auto text-primary font-bold">{formatPrice(price)}</p>
    </article>
  );
};
export default CartItem;
