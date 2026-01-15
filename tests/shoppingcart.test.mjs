import { describe, test, it, expect } from "vitest";

import {createCart, addProduct, getProductQuantity, getProductUnitPrice,getTotalItems, setTaxRate, getTaxAmount, getTotalWithTax} from "../src/shoppingcart.js";
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

describe("Shopping Cart Step 2", () => {
    describe("Add multiple quantities of the same product to the shopping cart", () => {
        test("should update the quantity of an existing product in the cart", () => {
            let cart = createCart();
            const doveSoap = createProduct("Dove Soap", 39.99);
            cart = addProduct(cart, doveSoap, 5);
            cart = addProduct(cart, doveSoap, 3); // Adding more of the same product

            expect(getProductQuantity(cart, "Dove Soap")).toBe(8); // Total quantity should be 8
            expect(getProductUnitPrice(cart, "Dove Soap")).toBe(39.99);
            expect(getTotalItems(cart)).toBe(319.92); // 8 * 39.99
        });
    });
});

describe("Shopping Cart Step 3", () => {
    describe("Calculate tax rate with multiple items in the shopping cart", () => {
        test("should calculate total with tax for multiple products", () => {
            let cart = createCart();
            const doveSoap = createProduct("Dove Soap", 39.99);
            const axeDeo = createProduct("Axe Deo", 99.99);
            cart = setTaxRate(cart, 12.5); // Set tax rate to 12.5%
            cart = addProduct(cart, doveSoap, 2);
            cart = addProduct(cart, axeDeo, 2);

           expect(getProductQuantity(cart, "Dove Soap")).toBe(2);
           expect(getProductUnitPrice(cart, "Dove Soap")).toBe(39.99);
           expect(getProductQuantity(cart, "Axe Deo")).toBe(2);
           expect(getProductUnitPrice(cart, "Axe Deo")).toBe(99.99);
           expect(getTaxAmount(cart)).toBe(35.00); // ((2*39.99)+(2*99.99)) * 0.125 = 35.00
           expect(getTotalWithTax(cart)).toBe(314.96); // (2*39.99)+(2*99.99)+35.0 = 314.96
        });
    });
});