import { NgModule } from "@angular/core";
import { PostFormComponent } from "../shared/components/post-form/post-form.component";
import { PostComponent } from "../shared/components/post/post.component";
import { CommonModule } from "@angular/common";
import { NewsPageComponent } from "./news-page.component";
import { NewsRoutingModule } from "./news-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        NewsPageComponent
    ],
    imports: [
        NewsRoutingModule,
        CommonModule,
        SharedModule
    ],
    exports: [],
    providers: []
})
export class NewsModule {}