import { HttpService } from "./Http.service.js"; 
import { SERVER_BASE_URL } from "./constants.js"; 
// import { Observable, Subject, lastValueFrom, of } from 'rxjs';
import { StorageService } from './storage.service.js';
// import { usertype } from './usertype.js';
export class UserService extends HttpService {

  static LOGGED_USER_KEY = 'user';
  static loggedUser = null;
  
  constructor() {
    super();
    this.apiUrl = SERVER_BASE_URL + "/auth";
    this.baseurl = SERVER_BASE_URL + "/messages";
  // const sendMessageRoute = 'http://localhost:5000/api/messages/addmsg'; // Define your message sending route

    // this.apiUrl = SERVER_BASE_URL + "/auth";
    // this.baseurl = SERVER_BASE_URL + "/transactions";
    // this.apiUrl = HttpConfig.mainApiUrl() + '/transactions'; 

  }
  

  // create(data) {
  //   return this.post(this.apiUrl + "/register", data);
  // }
  createUser(userData) {
//  return axios.post(`${this.apiUrl}/auth/signup`, userData);
 return this.post(this.apiUrl + "/register", userData);

  }

  login(data){
    console.log('Login Data:', data); 
    return this.post(this.apiUrl + "/login", data).then(response =>
       {
        console.log('Login Response:', response); 
        // Log the response received
        const userAllDetails = response;

        console.log('user Response:', userAllDetails); // Log the response received

          UserService.setLoggedUser(userAllDetails);
        return userAllDetails;
        

      })
      .catch(error => {
        if (error.response) {
          console.error('Login error (Server Response):', error.response.data);
        } else if (error.request) {
          console.error('Login error (No Response):', error.request);
        } else {
          console.error('Login error (Request Error):', error.message);
        }
        throw error;
      });
  }

  getUsers(conditions) {
     return this.get(this.apiUrl + "/allusers", conditions);  
  }

  static isLogged() {
    const loggedUser = StorageService.getItem(UserService.LOGGED_USER_KEY);
    this.loggedUser = loggedUser;
    const isLogged = loggedUser && true;
    if (!isLogged) {
      this.removeLoggedUser();
    }
    return isLogged;
  }

  static getLoggedUser() {
    return StorageService.getItem(UserService.LOGGED_USER_KEY);
  }

  static setLoggedUser(userAllDetails) {
    console.log(userAllDetails);

    const tokenWithDetail = {
      data: {
        id:       userAllDetails.data.user._id,
        username: userAllDetails.data.user.username,
        email:    userAllDetails.data.user.email,
        password: userAllDetails.data.user.password,
  
      },
      tokenInfo: userAllDetails.token
    };

    tokenWithDetail[`token`] = userAllDetails.data.token;
    // if (userAllDetails.permissions) {
    //   tokenWithDetail[`permissions`] = JSON.parse(JSON.stringify(userAllDetails.permissions));
    //   console.log(tokenWithDetail[`permissions`], "<<<<<-----");

    // }
    StorageService.setItem(UserService.LOGGED_USER_KEY, tokenWithDetail);
    this.logStatus.next(true);
  }

  static removeLoggedUser() {
    StorageService.removeItem(UserService.LOGGED_USER_KEY);
    this.logStatus.next(false);
    return true;
  }

  // static checkPermission(actionIdentifier: string | string[]): boolean {
  //   const user = this.getLoggedUser();
  //   if (!user || !user.permissions || !user.permissions?.length) {
  //     return false;
  //   }

  //   if (typeof actionIdentifier === 'string') {
  //     actionIdentifier = [actionIdentifier];
  //   }

  //   return actionIdentifier.some(permission => user.permissions.includes(permission));
  // }


  getData(conditions = {}) {
    return this.get(this.apiUrl + this.objToQuery(conditions));
  }

  getUser(id) {
    return this.get(`${this.apiUrl}/allusers/${id}`);
  }

  getoneuser(id) {
    return this.get(`${this.apiUrl}/getoneuser/${id}`);
  }

  update(id, data) {
    return this.put(`${this.apiUrl}/${id}`, data);
  }

  updateProfile(data) {
    return this.patch(this.apiUrl, data);
  }

  changePasswords(data) {
    return this.post(this.apiUrl + "/change-password", data);
  }

  verifyOtp(verification) {
    return this.post(this.apiUrl + "/verify-otp", verification);
  }

  forgotPassword(data){
    return this.post(this.apiUrl + "/forgot-password", data);
  }

  forgotPasswordVerify(data){
    return this.post(this.apiUrl + "/forgot-password-verify", data);
  }

  changePassword(data){
    return this.post(this.apiUrl + "/reset-password", data);
  }


  deleteUser(userId) {
    const url = `${this.apiUrl}/${userId}`;
    return this.delete(url);
  }

  // createTransaction(data) {
  //   return lastValueFrom(
  //     this.http.post(`${this.baseurl}`, data).pipe(
  //       catchError((error) => {
  //         console.error('Error in createTransaction:', error);
  //         return of(null);
  //       })
  //     )
  //   );
  // }

  sendmsg(data){
    return this.post(this.baseurl  + "/addmsg",data);
  }

}

// Create a singleton instance of the AuthService
export const userService = new UserService();
