export const mapOrder = (arr, order, key) => {
  console.log(arr);

  if (!arr || !order || !key) return;
  arr.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
  return arr;
};
