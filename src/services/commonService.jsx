import axios from 'axios'
export default class HttpCommonService {
    constructor() {
        switch (window.location.hostname) {
            case "localhost":
                this.domain = "http://localhost:4008/api/admin";
                break;
            case "[::1]":
                this.domain = "http://localhost:4008/api/admin";
                break;
            default:
                this.domain = "http://localhost:4008/api/admin";
        }
        //this.fetch = this.fetch.bind(this); // React binding stuff
        this.fetchCollegeData = this.fetchCollegeData.bind(this);
    }

    fetchCollegeData() {
        axios.post(`${this.domain}/fetch-college-state`, {})
            .then(this._checkStatus)
            .then(response => {
                return response
            })
    }


    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status <= 500) {
            // Success status lies between 200 to 300
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }

}