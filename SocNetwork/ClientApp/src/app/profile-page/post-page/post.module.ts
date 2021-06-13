import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgScrollbarModule } from "ngx-scrollbar";
import { SharedModule } from "../../shared/shared.module";
import { PostPageComponent } from "./post-page.component";
import { PostRoutingModule } from "./post-routing.module";

@NgModule({
    declarations: [
        PostPageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PostRoutingModule,
        NgScrollbarModule
    ],
    exports: [],
    providers: []
})
export class PostModule {}