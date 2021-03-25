import { NgModule } from "@angular/core";
import { UserWallComponent } from './user-wall/user-wall.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfilePageComponent } from "./profile-page.component";
import { PostFormComponent } from "../shared/components/post-form/post-form.component";
import { PostComponent } from "../shared/components/post/post.component";
import { CommonModule } from "@angular/common";
import { EditProfilePopupComponent } from './user-info/edit-profile-popup/edit-profile-popup.component';

@NgModule({
    declarations: [
        ProfilePageComponent,
        UserWallComponent,
        UserInfoComponent,
        PostFormComponent,
        PostComponent,
        EditProfilePopupComponent
    ],
    imports: [
        ProfileRoutingModule,
        CommonModule
    ],
    exports: [],
    providers: []
})
export class ProfileModule {}