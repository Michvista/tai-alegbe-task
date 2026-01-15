function createCart() {
    return {
        items: [],
        taxRate: 0
    };
}

function addProduct(cart, product, quantity) {
  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.name === product.name
  );

  if (existingItemIndex > -1) {
    //  If product exists, create a new items array with the updated quantity
    const newItems = cart.items.map((item, index) => {
      if (index === existingItemIndex) {
        return { ...item, quantity: item.quantity + quantity };
      }
      return item;
    });

    //  Return a NEW cart object with the NEW items array
    return { ...cart, items: newItems };
  }

  //  If product is new, return a NEW cart with the new item added to the list
  return {
    ...cart,
    items: [...cart.items, { product, quantity }],
  };
}

//additional functions 

function getProductQuantity(cart, productName) {
    const item = cart.items.find(item => item.product.name === productName);
    return item ? item.quantity : 0;
}

function getProductUnitPrice(cart, productName) {
    const item = cart.items.find(item => item.product.name === productName);
    return item ? item.product.price : 0;
}

function getTotalItems(cart) {
  // Add everything using integer math (cents)
  const totalInCents = cart.items.reduce((sum, item) => {
    const priceInCents = Math.round(item.product.price * 100);
    return sum + priceInCents * item.quantity;
  }, 0);

  // Convert back to dollars
  return totalInCents / 100;
}

function setTaxRate(cart, rate) {
    return { ...cart, taxRate: rate };
}

function getTaxAmount(cart) {
  const subTotal = getTotalItems(cart);
  // Convert to cents (integer), calculate tax, round once, then back to dollars
  const subTotalInCents = Math.round(subTotal * 100);
  const taxInCents = Math.round(subTotalInCents * (cart.taxRate / 100));

  return taxInCents / 100;
}

function getTotalWithTax(cart) {
  const subTotalInCents = Math.round(getTotalItems(cart) * 100);
  const taxInCents = Math.round(getTaxAmount(cart) * 100);

  return (subTotalInCents + taxInCents) / 100;
}

module.exports = {
    createCart,
    addProduct,
    getProductQuantity,
    getProductUnitPrice,
    getTotalItems,
    setTaxRate,
    getTaxAmount,
    getTotalWithTax
};