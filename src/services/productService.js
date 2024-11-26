// productService.js
import { SERVER_BASE_URL } from "./constants.js"; 

class ProductService {
    constructor() {
    //   this.apiUrl = 'http://localhost:3000/products';
      this.apiUrl = SERVER_BASE_URL + "/products";
      this.cartItems = [];
      this.addedProductIds = [];
    }
  
    // Helper method to convert object to query string
    static objToQuery(params = {}) {
      return (
        '?' +
        Object.entries(params)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&')
      );
    }
  
    async getProducts(conditions = {}) {
      const query = ProductService.objToQuery(conditions);
      const response = await fetch(this.apiUrl + query);
      return response.json();
    }
  
    async getWomen() {
      const url = `${this.apiUrl}/women/clothing`;
      const response = await fetch(url);
      return response.json();
    }
  
    async getProductsByCategory(categoryId) {
      const url = `${this.apiUrl}?CategoryId=${categoryId}`;
      const response = await fetch(url);
      return response.json();
    }
  
    async getProductDetails(productId) {
      const url = `${this.apiUrl}/${productId}`;
      const response = await fetch(url);
      return response.json();
    }
  
    async getFeaturedProducts() {
      const url = `${this.apiUrl}/featured`;
      const response = await fetch(url);
      return response.json();
    }
  
    async getProductById(productId) {
      const url = `${this.apiUrl}/${productId}`;
      const response = await fetch(url);
      return response.json();
    }
  
    getAddedProductIds() {
      return this.addedProductIds;
    }
  
    updateAddedProductIds(ids) {
      this.addedProductIds = ids;
    }
  
    async getRelatedProducts(productIds) {
      const requests = productIds.map((productId) => this.getProductById(productId));
      return Promise.all(requests);
    }
  
    async getShopItems() {
      const url = `${this.apiUrl}/women`;
      const response = await fetch(url);
      return response.json();
    }
  
    async getItemsByCategory(parentSlug, slug) {
      const url = `${this.apiUrl}/women`;
      const response = await fetch(url);
      return response.json();
    }
  
    addToCart(productData) {
      let cartData = JSON.parse(localStorage.getItem('cart') || '[]');
      cartData.push(productData);
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  
    getCart() {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    }
  
    getCartItems() {
      return this.cartItems;
    }
  
    clearCart() {
      this.cartItems = [];
      console.log('Cart cleared');
    }
  
    deleteFromCart(index) {
      let cartData = JSON.parse(localStorage.getItem('cart') || '[]');
      if (index >= 0 && index < cartData.length) {
        cartData.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartData));
      } else {
        console.error('Invalid index or cart is empty');
      }
    }
  }
  
  export default new ProductService();
  