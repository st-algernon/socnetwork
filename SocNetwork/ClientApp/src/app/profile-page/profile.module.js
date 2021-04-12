"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
var core_1 = require("@angular/core");
var profile_routing_module_1 = require("./profile-routing.module");
var profile_page_component_1 = require("./profile-page.component");
var post_form_component_1 = require("../shared/components/post-form/post-form.component");
var post_component_1 = require("../shared/components/post/post.component");
var common_1 = require("@angular/common");
var edit_profile_popup_component_1 = require("./edit-profile-popup/edit-profile-popup.component");
var forms_1 = require("@angular/forms");
var users_service_1 = require("../shared/services/users.service");
var custom_select_component_1 = require("../shared/components/custom-select/custom-select.component");
var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        core_1.NgModule({
            declarations: [
                profile_page_component_1.ProfilePageComponent,
                post_form_component_1.PostFormComponent,
                post_component_1.PostComponent,
                edit_profile_popup_component_1.EditProfilePopupComponent,
                custom_select_component_1.CustomSelectComponent,
            ],
            imports: [
                profile_routing_module_1.ProfileRoutingModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            exports: [],
            providers: [
                users_service_1.UsersService
            ]
        })
    ], ProfileModule);
    return ProfileModule;
}());
exports.ProfileModule = ProfileModule;
//# sourceMappingURL=profile.module.js.map