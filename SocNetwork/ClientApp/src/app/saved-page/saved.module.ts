import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SavedRoutingModule } from "./saved-routing.module";
import { SavedPageComponent } from "./saved-page.component";

@NgModule({
    declarations: [
        SavedPageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgScrollbarModule,
        SavedRoutingModule
    ],
    exports: [],
    providers: []
})
export class SavedModule {}