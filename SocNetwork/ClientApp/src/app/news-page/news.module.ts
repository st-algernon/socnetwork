import { NgModule } from "@angular/core";
import { PostFormComponent } from "../shared/components/post-form/post-form.component";
import { PostComponent } from "../shared/components/post/post.component";
import { CommonModule } from "@angular/common";
import { NewsPageComponent } from "./news-page.component";
import { NewsRoutingModule } from "./news-routing.module";

@NgModule({
    declarations: [
        NewsPageComponent,
        PostFormComponent,
        PostComponent,
    ],
    imports: [
        NewsRoutingModule,
        CommonModule,
    ],
    exports: [],
    providers: []
})
export class NewsModule {}