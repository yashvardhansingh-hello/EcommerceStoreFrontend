import axios from 'axios';

const productionUrl = ' https://strapi-store-server.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((Number(price)).toFixed(2));
  return dollarsAmount;
};

export const generateAmountOptions = (number) => {

  const arr = [];

for(let i = 1; i <= number; i++) {
  const amount = i;
  arr.push(
    <option key={amount} value={amount}>
      {amount}
    </option>
  );
}

return arr;

  // return Array.from({ length: number }, (_, index) => {
  //   const amount = index + 1;
  //   return (
  //     <option key={amount} value={amount}>
  //       {amount}
  //     </option>
  //   );
  // });
};
