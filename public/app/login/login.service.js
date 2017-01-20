"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
        this.loggedIn = false;
        this.loginUrl = 'http://localhost:8080/api/login';
        this.loggedIn = !!localStorage.getItem('auth_token');
    }
    LoginService.prototype.login = function (username, password) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.loginUrl, JSON.stringify({ 'username': username, 'password': password }), { headers: headers })
            .map(function (res) {
            var token = res.json() && res.json().token;
            if (token) {
                localStorage.setItem('auth_token', res.json().token);
                _this.loggedIn = true;
                return true;
            }
            else {
                _this.loggedIn = false;
                return false;
            }
        })
            .catch(this.handleError);
    };
    LoginService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        return true;
    };
    LoginService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    LoginService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        // console.log(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LoginService);
exports.LoginService = LoginService;

//# sourceMappingURL=login.service.js.map
