// import axios from 'axios';
// import HttpConfig from './http-config';
// import { HttpService } from './Http.service';



// class UserAuthService {
//   static BASE_URL = HttpConfig.mainApiUrl();

//   // Helper function to handle API requests
//   static async request(method, endpoint, data = {}, params = {}) {
//     try {
//       const url = `${this.BASE_URL}${endpoint}`;
//       const response = await axios({
//         method,
//         url,
//         data,
//         params,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error in ${method.toUpperCase()} ${endpoint}:`, error);
//       throw error;
//     }
//   }

//   // User-related methods
//    static createUser(userData) {
//     return axios.post(`${this.BASE_URL}/auth/signup`, userData);
//   }


//   static logIn(credentials) {
//     return this.request('post', '/auth/login', credentials);
//   }

//   static resetPassword(data) {
//     return this.request('post', '/auth/reset-password', data);
//   }

//   static forgotPassword(data) {
//     return this.request('post', '/auth/forgot-password', data);
//   }

//   static accountVerify(verification) {
//     return this.request('post', '/auth/verify-otp', verification);
//   }

//   // User management methods
//   static getUsers(params = {}) {
//     return this.request('get', '/auth/alluser', {}, params);
//   }

//   static getUserById(userId) {
//     return this.request('get', `/auth/user/${userId}`);
//   }

//   static updateUser(userId, userData) {
//     return this.request('patch', `/auth/user/${userId}`, userData);
//   }

//   static deleteUser(userId) {
//     return this.request('delete', `/auth/accounts/${userId}`);
//   }

//   // Utility for localStorage
//   static getLoggedUser() {
//     return JSON.parse(localStorage.getItem('LOGGED_USER_KEY'));
//   }

//   static setLoggedUser(userDetails) {
//     localStorage.setItem('LOGGED_USER_KEY', JSON.stringify(userDetails));
//   }

//   static removeLoggedUser() {
//     localStorage.removeItem('LOGGED_USER_KEY');
//   }
// }

// export default UserAuthService;
