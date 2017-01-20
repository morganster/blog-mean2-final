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
//import operators.
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var PostService = (function () {
    function PostService(http) {
        this.http = http;
        this.postUrl = 'http://localhost:8080/api/posts';
        this.statusMessage = "";
    }
    PostService.prototype.getPost = function () {
        return this.http.get(this.postUrl)
            .map(function (res) { return res.json(); });
    };
    PostService.prototype.postPost = function (title, body) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http
            .post(this.postUrl, JSON.stringify({ 'title': title, 'body': body }), options)
            .map(function (res) {
            console.log(res.json());
            var message = res.json() && res.json().message;
            if (message) {
                return true;
            }
            else {
                return false;
            }
        })
            .catch(this.handleError);
    };
    PostService.prototype.handleError = function (error) {
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
    return PostService;
}());
PostService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PostService);
exports.PostService = PostService;

//# sourceMappingURL=post.service.js.map
