import { AfterViewChecked, Component, ElementRef, HostListener, ModuleWithComponentFactories, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { MediaFor, MessageState, MessageStatus } from 'src/app/shared/enums';
import { Chat, Message, MessageRequest, ShortProfile } from 'src/app/shared/interfaces';
import { MessengerHub } from 'src/app/shared/hubs/messenger.hub';
import { ChatsService } from 'src/app/shared/services/chats.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { formatDate } from '@angular/common';
import { NgScrollbar } from 'ngx-scrollbar';
import { Subscription } from 'rxjs';
import { MediaService } from 'src/app/shared/services/media.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  me: ShortProfile;
  form: FormGroup;
  chat: Chat;
  subs: Subscription[] = [];

  @ViewChild('messagesList', { static: true }) messagesList: ElementRef;

  constructor(
    private messengerHub: MessengerHub,
    private messengerService: ChatsService,
    private mediaService: MediaService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private renderer: Renderer2
    ) { }

  ngOnInit() {
    this.messengerHub.startConnection();
    this.messengerHub.addReceivedMessageListener();

    this.subs.push(

      this.usersService.me$.subscribe((shortProfile: ShortProfile) => this.me = shortProfile),
      
      this.route.params.pipe(
        switchMap((params: Params) => {
          return this.messengerService.getChatById(params['id']);
        })
      ).subscribe((chat: Chat) => { 
  
        this.chat = chat;
        this.chat.messageDTOs.reverse();
  
        this.clearMessagesList();
  
        for (let m of this.chat.messageDTOs) {
          this.renderMessageTemplate(m);
        }
  
        this.toBottomList();
        this.scrollToBottom();
      }),

      this.messengerHub.message$.subscribe((messageDTO: Message) => {
        if (messageDTO.chatId === this.chat.id) {
          this.renderMessageTemplate(messageDTO);
          this.scrollToBottom();
        }
      })

    );
  
    this.form = new FormGroup({
      messageText: new FormControl(null)
    })
  }

  ngOnDestroy() {
    this.subs.forEach(
      s => s.unsubscribe()
    );
  }

  submit() {

    if (!this.form.get('messageText')) {
      return
    }
  
    // this.mediaService.uploadMedia().subscribe(
    //   (mediaIds: string[]) => {

    //     const messageRequest: MessageRequest = {
    //       authorId: this.me.id,
    //       chatId: this.chat.id,
    //       text: this.form.value.messageText,
    //       messageMediaDTO: []
    //     };
        
    //     this.messengerHub.sendMessage(message);
    //   }
    //)

    this.form.reset();
  }

  private hideSameAuthors(messageDTO: Message) {
    const lastMessage = (this.messagesList as NgScrollbar).viewport.contentWrapperElement.lastElementChild;
    const lastAuthor = lastMessage?.querySelector('.message-author');
    const lastAuthorId = lastAuthor?.querySelector('.author-id')?.innerHTML;

    if (lastAuthorId === messageDTO.authorDTO.id) {
      (lastAuthor as HTMLElement).style.visibility = 'hidden';
    }
  }

  private renderMessageTemplate(messageDTO: Message) {
    
    this.hideSameAuthors(messageDTO);

    const messageItem = this.renderer.createElement('div');
    const messageItemClasses = messageDTO.authorDTO.id === this.me.id ? ['fd-rr'] : ['fd-r'];
    (messageItem as HTMLElement).classList.add('message-item', 'flex', 'ai-fe', ...messageItemClasses);

    const messageAuthor = this.renderer.createElement('div');
    (messageAuthor as HTMLElement).classList.add('message-author');
    const authorId = this.renderer.createElement('div');
    (authorId as HTMLElement).classList.add('author-id', 'hidden');
    const authorIdText = this.renderer.createText(messageDTO.authorDTO.id);
    const avatarBox = this.renderer.createElement('div');
    (avatarBox as HTMLElement).classList.add('avatar-box', 'square-32');
    const avatarBoxImg = this.renderer.createElement('img');
    (avatarBoxImg as HTMLImageElement).classList.add('square-32');
    (avatarBoxImg as HTMLImageElement).src = messageDTO.authorDTO.avatarPath;

    const messageBody = this.renderer.createElement('div');
    const messageBodyClasses = messageDTO.authorDTO.id === this.me.id ? ['me'] : ['other'];
    (messageBody as HTMLElement).classList.add('message-body', ...messageBodyClasses);
    const messageText = this.renderer.createText(messageDTO.text);
    const messageFooter = this.renderer.createElement('div');
    (messageFooter as HTMLElement).classList.add('message-footer', 'flex', 'jc-fe');
    const messageDate = this.renderer.createElement('div');
    (messageDate as HTMLElement).classList.add('message-date');
    const shortTimeText = formatDate(new Date(messageDTO.creationDate), 'shortTime', 'uk');
    const messageDateText = this.renderer.createText(shortTimeText);
    const scrollContent = (this.messagesList as NgScrollbar).viewport.contentWrapperElement;

    this.renderer.appendChild(avatarBox, avatarBoxImg);
    this.renderer.appendChild(messageAuthor, avatarBox);
    this.renderer.appendChild(authorId, authorIdText);
    this.renderer.appendChild(messageAuthor, authorId);
    this.renderer.appendChild(messageItem, messageAuthor);

    this.renderer.appendChild(messageDate, messageDateText);
    this.renderer.appendChild(messageFooter, messageDate);
    this.renderer.appendChild(messageBody, messageText);
    this.renderer.appendChild(messageBody, messageFooter);
    this.renderer.appendChild(messageItem, messageBody);
    this.renderer.appendChild(scrollContent, messageItem);
  }

  private scrollToBottom() {
    console.dir((this.messagesList as NgScrollbar).viewport.contentWrapperElement);

    (this.messagesList as NgScrollbar).scrollTo({ 
      left: 0, 
      top: (this.messagesList as NgScrollbar).viewport.contentWrapperElement.offsetHeight
    });
  }

  private clearMessagesList() {
    (this.messagesList as NgScrollbar).viewport.contentWrapperElement.innerHTML = "";
  }

  private toBottomList() {
    const contentWrapper = (this.messagesList as NgScrollbar).viewport.contentWrapperElement;
    
    contentWrapper.style.minHeight = '100%';
    contentWrapper.style.display = 'flex';
    contentWrapper.style.flexDirection = 'column';
    contentWrapper.style.justifyContent = 'flex-end';
    (contentWrapper.lastElementChild as HTMLElement).style.marginBottom = '8px';

  }
}
