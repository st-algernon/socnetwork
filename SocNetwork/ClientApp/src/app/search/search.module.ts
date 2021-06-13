import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgScrollbarModule } from "ngx-scrollbar";
import { SharedModule } from "../shared/shared.module";
import { SearchRoutingModule } from "./search-routing.module";
import { PostsPageComponent } from './posts-page/posts-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { SearchLayoutComponent } from "./shared/search-layout/search-layout.component";

@NgModule({
    declarations: [
        PostsPageComponent,
        UsersPageComponent,
        SearchLayoutComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        SearchRoutingModule,
        NgScrollbarModule
    ],
    exports: [],
    providers: []
})
export class SearchModule {}