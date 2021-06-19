import { AfterViewChecked, Component, ComponentFactoryResolver, ElementRef, HostListener, ModuleWithComponentFactories, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { MediaFor, MessageState, MessageStatus } from 'src/app/shared/enums';
import { Chat, Media, Message, MessageRequest, ShortProfile } from 'src/app/shared/interfaces';
import { MessengerHub } from 'src/app/shared/hubs/messenger.hub';
import { ChatsService } from 'src/app/shared/services/chats.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { formatDate } from '@angular/common';
import { NgScrollbar } from 'ngx-scrollbar';
import { Subscription } from 'rxjs';
import { MediaService } from 'src/app/shared/services/media.service';
import { MessageComponent } from 'src/app/shared/components/message/message.component';
import { ContainerDirective } from 'src/app/shared/directives/container.directive';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  me: ShortProfile;
  chat: Chat;
  subs: Subscription[] = [];
  
  messageForm: {
    text: string,
    images: File[]
  };
  messagePage: number = 1;

  previewImagesData: Media[] = [];
  
  @ViewChild(ContainerDirective, { static: true }) messagesContainer: ContainerDirective;
  @ViewChild('ngScrollbar', { static: true }) ngScrollbar: NgScrollbar;

  constructor(
    private messengerHub: MessengerHub,
    private chatsService: ChatsService,
    private mediaService: MediaService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver
    ) {
      this.messageForm = {
        text: '',
        images: []
      };
    }

  ngOnInit() {

    this.subs.push(

      this.usersService.me$.subscribe((shortProfile: ShortProfile) => this.me = shortProfile),
      
      this.route.params.pipe(
        switchMap((params: Params) => {
          return this.chatsService.getChatById(params['id']);
        })
      ).subscribe((chat: Chat) => { 
  
        this.chat = chat;
        this.chat.messageDTOs.reverse();
  
        this.clearMessagesContainer();

        this.chat.messageDTOs.forEach(m => {
          this.renderMessage(m);
        })
  
        this.moveMessagesDown();
        this.scrollToBottom();
      }),

      this.messengerHub.message$.subscribe((messageDTO: Message) => {
        if (messageDTO.chatId === this.chat.id) {
          this.chat.messageDTOs.push(messageDTO)
          this.renderMessage(messageDTO);
          this.moveMessagesDown();
          this.scrollToBottom();
        }
      })

    );
  }

  ngOnDestroy() {
    this.subs.forEach(
      s => s.unsubscribe()
    );
  }

  onSubmit(form: NgForm) {

    if (!this.messageForm.text && this.messageForm.images.length == 0) {
      return;
    }
    
    const messageRequest: MessageRequest = {
      authorId: this.me.id,
      chatId: this.chat.id,
      text: this.messageForm.text,
      mediaDTOs: []
    };

    if (this.messageForm.images.length != 0) {
      const formData = new FormData();

      [...this.messageForm.images].forEach((file, i) => {
        formData.set('file' + i, file, file.name);
      });


      this.mediaService.uploadMedia(formData).subscribe(
        (mediaDTOs: Media[]) => {
          messageRequest.mediaDTOs = mediaDTOs;

          this.messengerHub.sendMessage(messageRequest);
          this.previewImagesData = [];
        }
      )
    } else if (this.messageForm.text) {
      this.messengerHub.sendMessage(messageRequest);
    }

    this.messageForm = {
      text: '',
      images: []
    };
  }

  onEnterSubmit(form: NgForm, event: KeyboardEvent): void {
    if (event.key == 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSubmit(form);
    }
  }

  previewImages(files: File[]) {
    this.messageForm.images = files;
    this.previewImagesData = [];

    for(let file of files) {

      if (file.type.match('image*')) {

        const reader = new FileReader();
          
        reader.onload = (e: ProgressEvent) => { 
          this.previewImagesData.push({
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

  unPreviewImages() {
    this.messageForm.images = [];
    this.previewImagesData = [];
  }

  resizeTextarea(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight * 5 / 7 + 'px';
  }

  onScrollUp() {
    this.subs.push(

      this.chatsService
        .getChatMessages(this.chat.id, ++this.messagePage)
        .subscribe(
          (messages: Message[]) => {
            console.log(messages);
            this.chat.messageDTOs.unshift(...messages);
          }
        )

    );
  }

  private renderMessage(message: Message) {
    this.hideSameAuthors(message);

    const viewContainerRef = this.messagesContainer.viewContainerRef;
    const componentFactory = this.resolver.resolveComponentFactory(MessageComponent);
    const componentRef = viewContainerRef.createComponent<MessageComponent>(componentFactory);
    
    componentRef.instance.message = message;
    componentRef.instance.mine = message.authorDTO.id === this.me.id;
  }

  private hideSameAuthors(message: Message) {
    const index = this.chat.messageDTOs.indexOf(message);
    const previous = this.chat.messageDTOs[index - 1];
    const contentWrapper = this.ngScrollbar.viewport.contentWrapperElement as HTMLElement;
    const lastMessage = contentWrapper?.lastElementChild;
    const lastAuthor = lastMessage?.querySelector('.message-author');

    if (previous?.authorDTO.id === message.authorDTO.id) {
      (lastAuthor as HTMLElement).style.visibility = 'hidden';
    }
  }

  private scrollToBottom() {
    this.ngScrollbar.scrollTo({ 
      left: 0, 
      top: (this.ngScrollbar.viewport.contentWrapperElement as HTMLElement).scrollHeight
    });
  }

  private clearMessagesContainer() {
    this.messagesContainer.viewContainerRef.clear();
  }

  private moveMessagesDown() {
    const contentWrapper = (this.ngScrollbar as NgScrollbar).viewport.contentWrapperElement;
  
    if (contentWrapper) {
      contentWrapper.style.display = 'flex';
      contentWrapper.style.flexDirection = 'column';
      contentWrapper.style.justifyContent = 'flex-end';
      contentWrapper.style.paddingBottom = '8px';
      contentWrapper.style.minHeight = '100%';
    }
  }
}
