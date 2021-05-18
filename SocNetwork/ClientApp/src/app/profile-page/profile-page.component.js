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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePageComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var users_service_1 = require("../shared/services/users.service");
var ProfilePageComponent = /** @class */ (function () {
    function ProfilePageComponent(route, usersService) {
        this.route = route;
        this.usersService = usersService;
        this.editProfileFlag = false;
    }
    ProfilePageComponent.prototype.ngOnInit = function () {
        // this.uSub = this.route.params.pipe (
        //   switchMap((params: Params) => {
        //     return this.usersService.getUser(params['username'])
        //   })
        // ).subscribe((response: UsersResponse) => {
        //   this.post = post;
        //   this.form = new FormGroup({
        //     title: new FormControl(post.title, Validators.required),
        //     author: new FormControl(post.author, Validators.required)
        //   })
        // })
        var _this = this;
        this.route.params.pipe(operators_1.switchMap(function (params) {
            return _this.usersService.getByUsername(params['username']);
        })).subscribe(function (response) {
            _this.user = response;
            console.log(_this.user);
        });
    };
    ProfilePageComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-page',
            templateUrl: './profile-page.component.html',
            styleUrls: ['./profile-page.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            users_service_1.UsersService])
    ], ProfilePageComponent);
    return ProfilePageComponent;
}());
exports.ProfilePageComponent = ProfilePageComponent;
//# sourceMappingURL=profile-page.component.js.map