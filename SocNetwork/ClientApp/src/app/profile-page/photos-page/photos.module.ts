import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PhotosPageComponent } from "./photos-page.component";
import { PhotosRoutingModule } from "./photos-routing";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    declarations: [
        PhotosPageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgScrollbarModule,
        PhotosRoutingModule
    ],
    exports: [],
    providers: []
})
export class PhotosModule {}