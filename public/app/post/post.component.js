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
var post_service_1 = require("./post.service");
var PostComponent = (function () {
    function PostComponent(fb, postService, router) {
        this.fb = fb;
        this.postService = postService;
        this.router = router;
        this.postForm = this.fb.group({
            title: ["", forms_1.Validators.required],
            body: ["", forms_1.Validators.required]
        });
        this.errorMessage = "";
    }
    PostComponent.prototype.createPost = function (event) {
        var _this = this;
        this.postService.postPost(this.postForm.value.title, this.postForm.value.body).subscribe(function (result) {
            console.log(result);
            if (result) {
                _this.router.navigate(['/']);
            }
            else {
                _this.errorMessage = "bad credentials";
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    return PostComponent;
}());
PostComponent = __decorate([
    core_1.Component({
        selector: 'post',
        templateUrl: './public/app/post/post.component.html',
        providers: [post_service_1.PostService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, post_service_1.PostService, router_1.Router])
], PostComponent);
exports.PostComponent = PostComponent;

//# sourceMappingURL=post.component.js.map
