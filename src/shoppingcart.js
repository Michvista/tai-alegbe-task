function createCart() {
    return {
        items: [],
        taxRate: 0
    };
}

function addProduct(cart, product, quantity) {
    //check if product already exists in cart
    const existingItem = cart.items.find(item => item.product.name === product.name);
    if (existingItem) {
        //if product already exists, update quantity
        existingItem.quantity += quantity;
    } else {
        //else, add new product to cart
        cart.items.push({ product: product, quantity: quantity });
    }
    //return updated cart
    return cart;
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
    const total = cart.items.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
    }, 0);
    //round up to 2 decimal places
    return Math.round(total * 100) / 100;
}

module.exports = {
    createCart,
    addProduct,
    getProductQuantity,
    getProductUnitPrice,
    getTotalItems
};