export const mapOrder = (arr, order, key) => {
    console.log(arr);
    console.log(order);
    console.log(key);

    arr.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))
    return arr;
}