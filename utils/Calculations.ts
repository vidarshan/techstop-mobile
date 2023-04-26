export const getTotal = cart => {
  let tempTotal = 0;
  cart.map(c => {
    tempTotal = parseInt(c.price) + tempTotal;
  });
  return tempTotal;
};
