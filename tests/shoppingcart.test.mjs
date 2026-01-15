import { describe, test, it, expect } from "vitest";

import {createCart, addProduct, getProductQuantity, getProductUnitPrice,getTotalItems} from "../src/shoppingcart.js";
import createProduct from "../src/product.js";

describe("Shopping Cart Step 1", () => {
    describe("Add Products to the shopping cart", () => {
        it("should add a product to an empty cart", () => {
            let cart = createCart();
            const doveSoap = createProduct("Dove Soap", 39.99);
            cart = addProduct(cart, doveSoap, 5);

            expect(getProductQuantity(cart, "Dove Soap")).toBe(5);
            expect(getProductUnitPrice(cart, "Dove Soap")).toBe(39.99);
            expect(getTotalItems(cart)).toBe(199.95);
        });
    });
});