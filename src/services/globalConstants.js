export default class GlobalConstants {
    APIUrl = ''
    constructor(props) {
        switch (window.location.hostname) {
            case 'localhost':
                this.APIUrl = 'http://localhost:4008/'
                break;
            case "[::1]":
                this.APIUrl = 'http://localhost:4008/'
                break;
            default:
                this.APIUrl = 'http://localhost:4008/'
        }
    }


}