import { NgModule } from "@angular/core";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfilePageComponent } from "./profile-page.component";
import { PostMakerComponent } from "../shared/components/post-maker/post-maker.component";
import { PostComponent } from "../shared/components/post/post.component";
import { CommonModule } from "@angular/common";
import { EditProfilePopupComponent } from './edit-profile-popup/edit-profile-popup.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersService } from "../shared/services/users.service";
import { CustomSelectComponent } from "../shared/components/custom-select/custom-select.component";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from "../shared/shared.module";
import { ChatsService } from "../shared/services/chats.service";
import { RelationshipsService } from "../shared/services/relationships.service";

@NgModule({
    declarations: [
        ProfilePageComponent,
        EditProfilePopupComponent,
        CustomSelectComponent
    ],
    imports: [
        ProfileRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgScrollbarModule,
        SharedModule
    ],
    exports: [],
    providers: [
        ChatsService,
        RelationshipsService
    ]
})
export class ProfileModule {}