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
var login_guard_1 = require("./login/login.guard");
var login_service_1 = require("./login/login.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var AppComponent = (function () {
    function AppComponent(loginService, loginGuard, router, fb) {
        this.loginService = loginService;
        this.loginGuard = loginGuard;
        this.router = router;
        this.fb = fb;
        this.loginForm = this.fb.group({
            username: ["", forms_1.Validators.required],
            password: ["", forms_1.Validators.required]
        });
        this.showLoginForm = false;
    }
    // public logEvent :EventEmitter = new EventEmitter();
    AppComponent.prototype.logout = function (event) {
        if (this.loginService.logout()) {
            this.router.navigate(['/']);
        }
    };
    AppComponent.prototype.login = function (event) {
        var _this = this;
        // console.log(event);
        // console.log(this.loginForm.value.username);
        this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.showLoginForm = false;
                _this.router.navigate(['/']);
            }
            else {
                _this.errorMessage = "bad credentials";
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent.prototype.showLogin = function () {
        this.showLoginForm = true;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './public/app/app.component.html',
        providers: [login_service_1.LoginService, login_guard_1.LoginGuard]
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService, login_guard_1.LoginGuard, router_1.Router, forms_1.FormBuilder])
], AppComponent);
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
