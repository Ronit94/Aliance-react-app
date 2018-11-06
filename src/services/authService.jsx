import decode from "jwt-decode";
export default class AuthService {
  constructor() {
    switch (window.location.hostname) {
      case "localhost":
        this.AdminDomain = "http://localhost:4008/api/admin";
        break;
      case "[::1]":
        this.AdminDomain = "http://localhost:4008/api/admin";
        break;
      default:
        this.AdminDomain = "http://localhost:4008/api/admin";
    }
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.fetchCollegeData = this.fetchCollegeData.bind(this)
    this.Adminlogout = this.Adminlogout.bind(this)
  }
  login(userData) {
    return this.fetch(`${this.AdminDomain}/login`, {
      method: "POST",
      body: JSON.stringify(userData)
    }).then(res => {
      if (res.responseData) {
        this.setToken(res.responseData.authToken); // Setting the token in localStorage
      }
      return Promise.resolve(res);
    });
  }

  fetchCollegeData(data) {
    return this.fetch(`${this.AdminDomain}/fetch-college-state`, {
      method: "POST",
      body: JSON.stringify(data)
    }).then(res => {
      return Promise.resolve(res);
    });
  }




  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("authToken", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("authToken");
  }

  Adminlogout() {
    localStorage.removeItem("authToken");
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  fetch(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    // if (this.loggedIn()) {
    //   headers["Authorization"] = "Bearer " + this.getToken();
    // }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 500) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
