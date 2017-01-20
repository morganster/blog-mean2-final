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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var login_service_1 = require("./login.service");
var LoginComponent = (function () {
    function LoginComponent(fb, loginService, router) {
        this.fb = fb;
        this.loginService = loginService;
        this.router = router;
        this.loginForm = this.fb.group({
            username: ["", forms_1.Validators.required],
            password: ["", forms_1.Validators.required]
        });
    }
    LoginComponent.prototype.login = function (event) {
        var _this = this;
        // console.log(event);
        // console.log(this.loginForm.value.username);
        // este componente se debe trasladar al app ya que desde ahi se debe manejar todo lo del login y logout  
        this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.router.navigate(['/']);
            }
            else {
                _this.errorMessage = "bad credentials";
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './public/app/login/login.html',
        providers: [login_service_1.LoginService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, login_service_1.LoginService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;

//# sourceMappingURL=login.component.js.map
