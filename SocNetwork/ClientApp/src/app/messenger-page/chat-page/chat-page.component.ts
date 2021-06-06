import { AfterViewChecked, Component, ElementRef, HostListener, ModuleWithComponentFactories, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { MediaFor, MessageState, MessageStatus } from 'src/app/shared/enums';
import { Chat, Message, Profile } from 'src/app/shared/interfaces';
import { MessengerHub } from 'src/app/shared/hubs/messenger.hub';
import { MessengerService } from 'src/app/shared/services/messenger.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { formatDate } from '@angular/common';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  me: Profile;
  form: FormGroup;
  chat: Chat;

  @ViewChild('messagesList', { static: true }) messagesList: ElementRef;

  constructor(
    private messengerHub: MessengerHub,
    private messengerService: MessengerService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private renderer: Renderer2
    ) { }

  ngOnInit() {
    this.usersService.me$.subscribe((response: Profile) => this.me = response);

    this.messengerHub.startConnection();
    this.messengerHub.addReceivedMessageListener();
    
    this.form = new FormGroup({
      messageText: new FormControl(null)
    })

    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.messengerService.getChatWith(params['id']);
      })
    ).subscribe((response: Chat) => { 

      this.chat = response;
      this.chat.messagesDTO.reverse();

      this.clearMessagesList();
      this.chat = this.messengerService.includeWithUser(this.chat, this.me);

      for (let m of this.chat.messagesDTO) {
        this.renderMessageTemplate(m);
      }

      this.toBottomList();
      this.scrollToBottom();
    });

    this.messengerHub.message$.subscribe((messageDTO: Message) => {

      if (messageDTO.conversationId === this.chat.id) {
        messageDTO = this.messengerService.includeAuthor(this.chat, messageDTO);
        this.renderMessageTemplate(messageDTO);
        this.scrollToBottom();
      }
    });
    const now = new Date().toJSON();

    console.log('now', now);
    console.log('new Date(now)', new Date(now));
  }

  ngOnDestroy() {
    console.log('destroy');
  }

  submit() {

    if (!this.form.get('messageText')) {
      return
    }

    const message: Message = {
      authorId: this.me.id,
      conversationId: this.chat.id,
      text: this.form.value.messageText,
      creationDate: new Date().toJSON(),
      messageMediaDTO: [],
      messageStatus: MessageStatus.IsInitial,
      messageState: MessageState.IsSent
    };

    this.messengerHub.sendMessage(message);
    this.form.reset();
  }

  private hideSameAuthors(messageDTO: Message) {
    const lastMessage = (this.messagesList as NgScrollbar).viewport.contentWrapperElement.lastElementChild;
    const lastAuthor = lastMessage?.querySelector('.message-author');
    const lastAuthorId = lastAuthor?.querySelector('.author-id')?.innerHTML;

    if (lastAuthorId === messageDTO.authorId) {
      (lastAuthor as HTMLElement).style.visibility = 'hidden';
    }
  }

  private renderMessageTemplate(messageDTO: Message) {
    
    this.hideSameAuthors(messageDTO);

    const messageItem = this.renderer.createElement('div');
    const messageItemClasses = messageDTO.authorId === this.me.id ? ['fd-rr'] : ['fd-r'];
    (messageItem as HTMLElement).classList.add('message-item', 'flex', 'ai-fe', ...messageItemClasses);

    const messageAuthor = this.renderer.createElement('div');
    (messageAuthor as HTMLElement).classList.add('message-author');
    const authorId = this.renderer.createElement('div');
    (authorId as HTMLElement).classList.add('author-id', 'hidden');
    const authorIdText = this.renderer.createText(messageDTO.authorId);
    const avatarBox = this.renderer.createElement('div');
    (avatarBox as HTMLElement).classList.add('avatar-box', 'square-32');
    const avatarBoxImg = this.renderer.createElement('img');
    (avatarBoxImg as HTMLImageElement).classList.add('square-32');
    (avatarBoxImg as HTMLImageElement).src = messageDTO.author?.currentAvatarPath;

    const messageBody = this.renderer.createElement('div');
    const messageBodyClasses = messageDTO.authorId === this.me.id ? ['me'] : ['other'];
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
