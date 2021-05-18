import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PostFormComponent } from "./components/post-form/post-form.component";
import { PostComponent } from "./components/post/post.component";

@NgModule({
  declarations: [
    PostComponent,
    PostFormComponent
  ],
  imports: [CommonModule],
  exports: [
    PostComponent,
    PostFormComponent
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
