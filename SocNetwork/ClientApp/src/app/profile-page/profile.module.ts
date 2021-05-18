import { NgModule } from "@angular/core";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfilePageComponent } from "./profile-page.component";
import { PostFormComponent } from "../shared/components/post-form/post-form.component";
import { PostComponent } from "../shared/components/post/post.component";
import { CommonModule } from "@angular/common";
import { EditProfilePopupComponent } from './edit-profile-popup/edit-profile-popup.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersService } from "../shared/services/users.service";
import { CustomSelectComponent } from "../shared/components/custom-select/custom-select.component";
import { FollowingFollowersPageComponent } from './following-followers-page/following-followers-page.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        ProfilePageComponent,
        EditProfilePopupComponent,
        CustomSelectComponent,
        FollowingFollowersPageComponent,
    ],
    imports: [
        ProfileRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [],
    providers: []
})
export class ProfileModule {}