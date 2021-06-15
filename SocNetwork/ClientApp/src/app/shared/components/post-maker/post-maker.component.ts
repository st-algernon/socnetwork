import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Media, Post, PostRequest, ShortProfile } from '../../interfaces';
import { MediaService } from '../../services/media.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-maker',
  templateUrl: './post-maker.component.html',
  styleUrls: ['./post-maker.component.css']
})
export class PostMakerComponent implements OnInit, OnDestroy {

  @Input() me: ShortProfile;
  @Output() newPostEvent = new EventEmitter<Post>();

  postForm: {
    text: string,
    images: File[] | null
  };
  isValid: boolean = false;
  text: string = '';
  previewFiles: Media[] = [];
  subs: Subscription[] = [];
  // isEmojiPickerVisible: boolean = false;

  constructor(
    private postsService: PostsService,
    private mediaService: MediaService,
    private router: Router
  ) { 
    this.postForm = {
      text: '',
      images: null
    };
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.forEach(s => {
      console.log('unsubs');
      s.unsubscribe();
    })
  }

  resizeTextarea(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  // addEmoji(event) {
  //   console.log(event.emoji);
  //   this.text = `${this.text}${event.emoji.native}`;
  //   this.isEmojiPickerVisible = false;
  // }

  submit() {
    const postRequest: PostRequest = {
      text: this.postForm.text,
      mediaDTOs: []
    };

    if (this.postForm.images) {
      const formData = new FormData();

      [...this.postForm.images].forEach((file, i) => {
        formData.set('file' + i, file, file.name);
      });


      this.mediaService.uploadMedia(formData).subscribe(
        (mediaDTOs: Media[]) => {
          postRequest.mediaDTOs = mediaDTOs;
          
          this.subs.push(
            this.postsService.savePost(postRequest).subscribe((post: Post) => {
              this.newPostEvent.emit(post);
            })
          );

          this.postForm = {
            text: '',
            images: null
          };
          this.previewFiles = [];
        }
      )
    } 
    else if (this.postForm.text) {
      this.subs.push(
        this.postsService.savePost(postRequest).subscribe((post: Post) => {
          this.newPostEvent.emit(post);
        })
      );
      
      this.postForm = {
        text: '',
        images: null
      };
    }
  }

  previewImages(files: File[]) {
    this.previewFiles = [];

    for(let file of files) {

      if (file.type.match('image*')) {

        const reader = new FileReader();
          
        reader.onload = (e: ProgressEvent) => { 
          this.previewFiles.push({
            id: file.name,
            mimeType: file.type,
            path: (e.target as FileReader).result.toString(),
            size: file.size,
            creationDate: new Date(file.lastModified)
          });
        };
      
        reader.readAsDataURL(file);
      }
    }
  }
}
