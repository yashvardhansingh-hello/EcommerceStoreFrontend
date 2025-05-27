import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useGetUserOrdersQuery, useRateProductOrderMutation } from '../features/api';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useState } from 'react';
import Rating from './Rating';
day.extend(advancedFormat);

const OrdersList = () => {


    const {data, isLoading, isError, error, refetch} = useGetUserOrdersQuery();

    useErrors([{isError, error}]);


   const [rateProductOrder] =  useAsyncMutation(useRateProductOrderMutation);

    const ratingHandler = async (body) => {
        await rateProductOrder("rating product ...", body);
        
    refetch();
    }

 

  return (
    <div className='mt-8'>
      <h4 className='mb-4 capitalize'>
 Total Orders : {data?.userOrders?.length}
      </h4>
      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Cost</th>
              {/* <th className='hidden sm:block'>Date</th> */}
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && data?.userOrders?.map((order) => {
              const id = order._id;
              const {_id, name, address, orderTotal, quantity, productId, productRating, createdAt, phone } =

                order;
                console.log(productRating)
              const date = day(createdAt).format('hh:mm a - MMM Do, YYYY');
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{productId?.title}</td>
                  <td>{quantity}</td>
                  <td>${orderTotal}</td>
                  {/* <td className="hidden sm:block">{date}</td> */}

                  {productRating == 0 && (
                    <td className="rating rating-sm">
                      <input
                        type="radio"
                        name="rating-10"
                        className="rating-hidden"
                        aria-label="clear"
                      />
                      <input
                        type="radio"
                        name="rating-10"
                        className="mask mask-star-2"
                        onClick={() =>
                          ratingHandler({
                            rating: 1,
                            productId: productId?._id,
                            orderId: _id,
                          })
                        }
                        aria-label="1 star"
                      />
                      <input
                        type="radio"
                        name="rating-10"
                        className="mask mask-star-2"
                        onClick={() =>
                          ratingHandler({
                            rating: 2,
                            productId: productId?._id,
                            orderId: _id,
                          })
                        }
                        aria-label="2 star"
                      />
                      <input
                        type="radio"
                        onClick={() =>
                          ratingHandler({
                            rating: 3,
                            productId: productId?._id,
                            orderId: _id,
                          })
                        }
                        name="rating-10"
                        className="mask mask-star-2"
                        aria-label="3 star"
                      />
                      <input
                        type="radio"
                        name="rating-10"
                        onClick={() =>
                          ratingHandler({
                            rating: 4,
                            productId: productId?._id,
                            orderId: _id,
                          })
                        }
                        className="mask mask-star-2"
                        aria-label="4 star"
                      />
                      <input
                        type="radio"
                        name="rating-10"
                        onClick={() =>
                          ratingHandler({
                            rating: 5,
                            productId: productId?._id,
                            orderId: _id,
                          })
                        }
                        className="mask mask-star-2"
                        aria-label="5 star"
                      />
                    </td>
                  )}

                  {productRating > 0 && (
                   <Rating value={productRating} />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersList;
