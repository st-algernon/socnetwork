import { NgModule } from "@angular/core";
import { PostMakerComponent } from "../shared/components/post-maker/post-maker.component";
import { PostComponent } from "../shared/components/post/post.component";
import { CommonModule } from "@angular/common";
import { NewsPageComponent } from "./news-page.component";
import { NewsRoutingModule } from "./news-routing.module";
import { SharedModule } from "../shared/shared.module";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    declarations: [
        NewsPageComponent
    ],
    imports: [
        NewsRoutingModule,
        CommonModule,
        SharedModule,
        NgScrollbarModule,
        InfiniteScrollModule
    ],
    exports: [],
    providers: []
})
export class NewsModule {}