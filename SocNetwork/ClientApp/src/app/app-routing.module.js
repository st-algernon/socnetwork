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
var auth_page_component_1 = require("./auth-page/auth-page.component");
var registration_page_component_1 = require("./auth-page/registration-page/registration-page.component");
var messenger_page_component_1 = require("./messenger-page/messenger-page.component");
var news_page_component_1 = require("./news-page/news-page.component");
var profile_page_component_1 = require("./profile-page/profile-page.component");
var auth_layout_component_1 = require("./shared/components/auth-layout/auth-layout.component");
var not_found_page_component_1 = require("./shared/components/not-found-page/not-found-page.component");
var user_layout_component_1 = require("./shared/components/user-layout/user-layout.component");
var routes = [
    {
        path: '', component: user_layout_component_1.UserLayoutComponent, children: [
            { path: '', redirectTo: '/auth', pathMatch: 'full' },
            { path: 'news', component: news_page_component_1.NewsPageComponent },
            { path: 'u/:id', component: profile_page_component_1.ProfilePageComponent },
            { path: 'messenger', component: messenger_page_component_1.MessengerPageComponent }
        ]
    },
    {
        path: 'auth', component: auth_layout_component_1.AuthLayoutComponent, children: [
            { path: '', component: auth_page_component_1.AuthPageComponent },
            { path: "sign-up", component: registration_page_component_1.RegistrationPageComponent }
        ]
    },
    { path: '**', component: not_found_page_component_1.NotFoundPageComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, {
                    preloadingStrategy: router_1.PreloadAllModules
                })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map