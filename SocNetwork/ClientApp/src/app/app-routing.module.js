"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var not_found_page_component_1 = require("./shared/components/not-found-page/not-found-page.component");
var user_layout_component_1 = require("./shared/components/user-layout/user-layout.component");
var auth_guard_1 = require("./shared/services/auth.guard");
var routes = [
    { path: 'auth', loadChildren: function () { return Promise.resolve().then(function () { return require('./auth/auth.module'); }).then(function (m) { return m.AuthModule; }); } },
    { path: '', component: user_layout_component_1.UserLayoutComponent, children: [
            { path: ':username', loadChildren: function () { return Promise.resolve().then(function () { return require('./profile-page/profile.module'); }).then(function (m) { return m.ProfileModule; }); }, canActivate: [auth_guard_1.AuthGuard] }
        ] },
    { path: '**', component: not_found_page_component_1.NotFoundPageComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map