!function(){function t(e,n){return(t=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(e,n)}function e(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var i,r=o(t);if(e){var a=o(this).constructor;i=Reflect.construct(r,arguments,a)}else i=r.apply(this,arguments);return n(this,i)}}function n(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function o(t){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function i(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||r(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function l(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{Sqts:function(t,e,n){"use strict";n.d(e,"a",function(){return u});var o=n("fXoL"),i=n("ofXK");function r(t,e){if(1&t&&(o.Pb(0,"div",3),o.Lb(1,"img",4),o.Ob()),2&t){var n=e.$implicit;o.zb(1),o.dc("src",n.path,o.mc)}}var a=function(t,e,n,o){return{vertical:t,horizontal:e,sm:n,lg:o}};function s(t,e){if(1&t&&(o.Pb(0,"div",1),o.oc(1,r,2,1,"div",2),o.Ob()),2&t){var n=o.Yb();o.dc("ngClass",o.ic(2,a,2==n.photos.length,2!=n.photos.length,"small"==n.size,"large"==n.size)),o.zb(1),o.dc("ngForOf",n.photos)}}var u=function(){var t=function(){function t(){c(this,t),this.photos=[],this.size="small"}return l(t,[{key:"ngOnInit",value:function(){}}]),t}();return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Eb({type:t,selectors:[["app-photos-container"]],inputs:{photos:"photos",size:"size"},decls:1,vars:1,consts:[["class","photos-container flex fw-w",3,"ngClass",4,"ngIf"],[1,"photos-container","flex","fw-w",3,"ngClass"],["class","photo-item fg-1",4,"ngFor","ngForOf"],[1,"photo-item","fg-1"],["alt","photo",3,"src"]],template:function(t,e){1&t&&o.oc(0,s,2,7,"div",0),2&t&&o.dc("ngIf",e.photos)},directives:[i.k,i.i,i.j],styles:[".photos-container[_ngcontent-%COMP%]{border-radius:15px;background-color:#f7f9fa;overflow:hidden}.photos-container.sm[_ngcontent-%COMP%]{height:168px}.photos-container.lg[_ngcontent-%COMP%]{height:228px}.photos-container[_ngcontent-%COMP%]   .photo-item[_ngcontent-%COMP%]{position:relative}.photos-container.horizontal[_ngcontent-%COMP%]{flex-direction:column}.photos-container.horizontal[_ngcontent-%COMP%]   .photo-item[_ngcontent-%COMP%]{height:50%}.photos-container.vertical[_ngcontent-%COMP%]{flex-direction:row}.photos-container.vertical[_ngcontent-%COMP%]   .photo-item[_ngcontent-%COMP%]{width:50%}.photos-container[_ngcontent-%COMP%]   .photo-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;max-width:100%;min-width:100%;max-height:100%;min-height:100%;-o-object-fit:cover;object-fit:cover;padding:.5px;box-sizing:border-box}"]}),t}()},atOm:function(t,e,n){"use strict";n.r(e),n.d(e,"ChatModule",function(){return F});var o=n("ofXK"),a=n("3Pt+"),s=n("Pxdc"),u=n("PCNd"),f=n("tyNb"),d=n("eIep"),h=n("cTBj"),g=n("dxD2"),p=n("yvDh"),b=n("fXoL"),m=n("G1Gu"),v=n("dlKe"),O=n("Sqts");function y(t,e){if(1&t&&b.Lb(0,"app-photos-container",9),2&t){var n=b.Yb();b.dc("photos",n.message.mediaDTOs)}}var w,x=function(t){return{"fd-rr":t}},P=function(t){return{invisible:t}},C=function(t,e,n){return{me:t,other:e,"fg-1":n}},_=((w=function(){function t(){c(this,t),this.mine=!1,this.invisibleAuthor=!1}return l(t,[{key:"ngOnInit",value:function(){}}]),t}()).\u0275fac=function(t){return new(t||w)},w.\u0275cmp=b.Eb({type:w,selectors:[["app-message"]],inputs:{mine:"mine",message:"message",invisibleAuthor:"invisibleAuthor"},decls:12,vars:21,consts:[[1,"message-item","flex","ai-fe",3,"ngClass"],[1,"message-author",3,"ngClass"],[1,"avatar-box","square-32"],["alt","",1,"square-32",3,"src"],[1,"message-body",3,"ngClass"],[3,"photos",4,"ngIf"],[1,"message-text"],[1,"flex","jc-fe"],[1,"message-date"],[3,"photos"]],template:function(t,e){1&t&&(b.Pb(0,"div",0),b.Pb(1,"div",1),b.Pb(2,"div",2),b.Lb(3,"img",3),b.Ob(),b.Ob(),b.Pb(4,"div",4),b.oc(5,y,1,1,"app-photos-container",5),b.Pb(6,"div",6),b.qc(7),b.Ob(),b.Pb(8,"div",7),b.Pb(9,"div",8),b.qc(10),b.Zb(11,"date"),b.Ob(),b.Ob(),b.Ob(),b.Ob()),2&t&&(b.dc("ngClass",b.fc(13,x,e.mine)),b.zb(1),b.dc("ngClass",b.fc(15,P,e.invisibleAuthor)),b.Ab("data-author-id",e.message.authorDTO.id),b.zb(2),b.dc("src",e.message.authorDTO.avatarPath,b.mc),b.zb(1),b.dc("ngClass",b.hc(17,C,e.mine,!e.mine,e.message.mediaDTOs.length>0)),b.zb(1),b.dc("ngIf",e.message.mediaDTOs.length>0),b.zb(2),b.rc(e.message.text),b.zb(3),b.rc(b.ac(11,8,e.message.creationDate,"shortTime","","uk")))},directives:[o.i,o.k,O.a],pipes:[o.d],styles:[".message-item[_ngcontent-%COMP%]{margin:0 10px;padding-top:2px;z-index:2}.message-item[_ngcontent-%COMP%]:focus{outline:none}.message-author[_ngcontent-%COMP%]   .avatar-box[_ngcontent-%COMP%]{background:#eee}.message-item[_ngcontent-%COMP%]   .message-body[_ngcontent-%COMP%]{max-width:70%;border-radius:15px;color:#fff;padding:2px;position:relative}.message-item[_ngcontent-%COMP%]   .other.message-body[_ngcontent-%COMP%]{background-color:#999;margin-left:5px}.message-item[_ngcontent-%COMP%]   .me.message-body[_ngcontent-%COMP%]{background-color:#36a7ee;margin-right:5px}.message-body[_ngcontent-%COMP%]   .message-text[_ngcontent-%COMP%]{padding:5px 10px 0}.message-date[_ngcontent-%COMP%]{padding:0 10px;font-size:12px;color:#d9ecf8}"]}),w),k=n("668k"),S=["ngScrollbar"];function M(t,e){if(1&t&&(b.Pb(0,"div",29),b.Pb(1,"div",30),b.qc(2),b.Ob(),b.Pb(3,"div",31),b.qc(4,"14 \u0447\u0435\u0440\u0432\u043d\u044f 2021 \u043e 09:23"),b.Ob(),b.Ob()),2&t){var n=b.Yb();b.zb(2),b.rc(n.chat.title)}}function T(t,e){if(1&t&&(b.Nb(0),b.Lb(1,"app-message",32),b.Mb()),2&t){var n=e.$implicit,o=b.Yb();b.zb(1),b.dc("message",n)("mine",n.authorDTO.id===o.me.id)("invisibleAuthor",o.checkAuthorVisibility(n))}}function D(t,e){1&t&&b.Lb(0,"app-loader")}function z(t,e){if(1&t){var n=b.Qb();b.Pb(0,"div",33),b.Pb(1,"div",34),b.Wb("click",function(){return b.lc(n),b.Yb().unPreviewImages()}),b.Ob(),b.Lb(2,"app-photos-container",35),b.Ob()}if(2&t){var o=b.Yb();b.zb(2),b.dc("photos",o.previewImagesData)}}var j,I,K,H=function(t,e){return{"jc-fe":t,"jc-c":e}},W=[{path:"",component:(j=function(){function t(e,n,o,i,r,a){c(this,t),this.messengerHub=e,this.chatsService=n,this.mediaService=o,this.usersService=i,this.route=r,this.resolver=a,this.subs=[],this.messagePage=1,this.previewImagesData=[],this.messageForm={text:"",images:[]}}return l(t,[{key:"ngOnInit",value:function(){var t=this;this.subs.push(this.usersService.me$.subscribe(function(e){return t.me=e}),this.route.params.pipe(Object(d.a)(function(e){return t.chatsService.getChatById(e.id)})).subscribe(function(e){t.chat=e,console.log(e.messageDTOs),t.chat.messageDTOs=t.chat.messageDTOs.reverse(),t.scrollToBottom()}),this.messengerHub.message$.subscribe(function(e){e.chatId===t.chat.id&&(t.chat.messageDTOs.push(e),t.scrollToBottom())}))}},{key:"ngOnDestroy",value:function(){this.subs.forEach(function(t){return t.unsubscribe()})}},{key:"ngAfterViewInit",value:function(){this.scrollToBottom()}},{key:"onSubmit",value:function(t){var e=this;if(this.messageForm.text||0!=this.messageForm.images.length){var n={authorId:this.me.id,chatId:this.chat.id,text:this.messageForm.text,mediaDTOs:[]};if(0!=this.messageForm.images.length){var o=new FormData;i(this.messageForm.images).forEach(function(t,e){o.set("file"+e,t,t.name)}),this.mediaService.uploadMedia(o).subscribe(function(t){n.mediaDTOs=t,e.messengerHub.sendMessage(n),e.previewImagesData=[]})}else this.messageForm.text&&this.messengerHub.sendMessage(n);this.messageForm={text:"",images:[]}}}},{key:"onEnterSubmit",value:function(t,e){"Enter"!=e.key||e.shiftKey||(e.preventDefault(),this.onSubmit(t))}},{key:"previewImages",value:function(t){var e=this;this.messageForm.images=t,this.previewImagesData=[];var n,o=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=r(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,s=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){s=!0,a=t},f:function(){try{c||null==n.return||n.return()}finally{if(s)throw a}}}}(t);try{var i=function(){var t=n.value;if(t.type.match("image*")){var o=new FileReader;o.onload=function(n){e.previewImagesData.push({id:t.name,mimeType:t.type,path:n.target.result.toString(),size:t.size,creationDate:new Date(t.lastModified)})},o.readAsDataURL(t)}};for(o.s();!(n=o.n()).done;)i()}catch(a){o.e(a)}finally{o.f()}}},{key:"unPreviewImages",value:function(){this.messageForm.images=[],this.previewImagesData=[]}},{key:"resizeTextarea",value:function(t){var e=t.target;e.style.height="auto",e.style.height=5*e.scrollHeight/7+"px"}},{key:"onScrollUp",value:function(){var t=this;console.log("scrolled up"),this.subs.push(this.chatsService.getChatMessages(this.chat.id,++this.messagePage).subscribe(function(e){var n;console.log(e),(n=t.chat.messageDTOs).unshift.apply(n,i(e))}))}},{key:"checkAuthorVisibility",value:function(t){var e=this.chat.messageDTOs.indexOf(t),n=this.chat.messageDTOs[e+1];return(null==n?void 0:n.authorDTO.id)===t.authorDTO.id}},{key:"scrollToBottom",value:function(){this.ngScrollbar.scrollTo({left:0,top:this.ngScrollbar.viewport.contentWrapperElement.scrollHeight})}}]),t}(),j.\u0275fac=function(t){return new(t||j)(b.Kb(h.a),b.Kb(s.a),b.Kb(p.a),b.Kb(g.a),b.Kb(f.a),b.Kb(b.j))},j.\u0275cmp=b.Eb({type:j,selectors:[["app-chat-page"]],viewQuery:function(t,e){var n;1&t&&b.uc(S,3),2&t&&b.jc(n=b.Xb())&&(e.ngScrollbar=n.first)},decls:31,vars:11,consts:[[1,"flex","jc-c"],[1,"chat","flex","fd-c"],[1,"chat-header","flex","fd-r","jc-sb"],["routerLink","/messenger",1,"back-btn","square-40","round","r-22"],["class","flex fd-c ai-c",4,"ngIf"],["action","","method","get",1,"search-message-form","flex","fd-c","jc-c"],["type","search","name","search_field","placeholder","Search for people and groups","autocomplete","off"],[1,"chat-body","fg-1"],["visibility","hover","appearance","standard","trackClass","scrollbar-track"],["ngScrollbar",""],["infiniteScroll","","infiniteScrollUpDistance","2","scrollViewport","",3,"scrollWindow","scrolledUp"],[1,"messages-container","flex","fd-c",3,"ngClass"],[4,"ngFor","ngForOf"],[4,"ngIf"],[1,"chat-footer"],["class","preview-container fg-1",4,"ngIf"],["novalidate","",1,"flex","fd-r","ai-fe",3,"ngSubmit"],["form","ngForm"],[1,"attach","flex","fd-r","jc-c"],[1,"add-picture-btn","round","r-20","square-28",3,"click"],["type","file","name","messageImages","ngModel","","multiple","",1,"hidden",3,"change"],["input_image",""],[1,"add-music-btn","round","r-20","square-28"],[1,"add-video-btn","round","r-22","square-28"],[1,"textarea-attach-wrap","flex","fd-r","ai-fe"],["rows","1","name","messageText","placeholder","\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u0438 \u043f\u043e\u0432\u0456\u0434\u043e\u043c\u043b\u0435\u043d\u043d\u044f...",3,"ngModel","ngModelChange","keydown","input"],[1,"attach","flex","fd-r","jc-sb"],[1,"add-emoji-btn","round","r-22","square-28"],["type","submit",1,"submit-btn","square-32","fs-0",3,"disabled"],[1,"flex","fd-c","ai-c"],[1,"source-name"],[1,"last-visited"],[3,"message","mine","invisibleAuthor"],[1,"preview-container","fg-1"],[1,"close-btn","round","r-16","square-20",3,"click"],[3,"photos"]],template:function(t,e){if(1&t){var n=b.Qb();b.Pb(0,"div",0),b.Pb(1,"main",1),b.Pb(2,"section",2),b.Pb(3,"div"),b.Lb(4,"button",3),b.Ob(),b.oc(5,M,5,1,"div",4),b.Pb(6,"form",5),b.Lb(7,"input",6),b.Ob(),b.Ob(),b.Pb(8,"section",7),b.Pb(9,"ng-scrollbar",8,9),b.Pb(11,"div",10),b.Wb("scrolledUp",function(){return e.onScrollUp()}),b.Pb(12,"div",11),b.oc(13,T,2,3,"ng-container",12),b.oc(14,D,1,0,"app-loader",13),b.Ob(),b.Ob(),b.Ob(),b.Ob(),b.Pb(15,"section",14),b.Pb(16,"div",0),b.oc(17,z,3,1,"div",15),b.Ob(),b.Pb(18,"form",16,17),b.Wb("ngSubmit",function(){b.lc(n);var t=b.kc(19);return e.onSubmit(t)}),b.Pb(20,"ul",18),b.Pb(21,"li",19),b.Wb("click",function(){return b.lc(n),b.kc(23).click()}),b.Pb(22,"input",20,21),b.Wb("change",function(){b.lc(n);var t=b.kc(23);return e.previewImages(t.files)}),b.Ob(),b.Ob(),b.Lb(24,"li",22),b.Lb(25,"li",23),b.Ob(),b.Pb(26,"div",24),b.Pb(27,"textarea",25),b.Wb("ngModelChange",function(t){return e.messageForm.text=t})("keydown",function(t){b.lc(n);var o=b.kc(19);return e.onEnterSubmit(o,t)})("input",function(t){return e.resizeTextarea(t)}),b.Ob(),b.Pb(28,"ul",26),b.Lb(29,"li",27),b.Ob(),b.Ob(),b.Lb(30,"button",28),b.Ob(),b.Ob(),b.Ob(),b.Ob()}2&t&&(b.zb(5),b.dc("ngIf",e.chat),b.zb(6),b.dc("scrollWindow",!1),b.zb(1),b.dc("ngClass",b.gc(8,H,e.chat,!e.chat)),b.zb(1),b.dc("ngForOf",null==e.chat?null:e.chat.messageDTOs),b.zb(1),b.dc("ngIf",!e.chat),b.zb(3),b.dc("ngIf",e.previewImagesData.length>0),b.zb(10),b.dc("ngModel",e.messageForm.text),b.zb(3),b.dc("disabled",!e.messageForm.text&&0==e.messageForm.images.length))},directives:[f.c,o.k,a.p,a.i,a.j,m.a,v.a,m.c,o.i,o.j,a.a,a.h,a.k,_,k.a,O.a],styles:["[_nghost-%COMP%]{width:100%;display:flex;justify-content:center}ng-scrollbar[_ngcontent-%COMP%]{--scrollbar-track-color:rgba(0,0,0,0.05);--scrollbar-thumb-color:rgba(0,0,0,0.2);--scrollbar-thumb-hover-color:rgba(0,0,0,0.3);--scrollbar-size:6px}.chat[_ngcontent-%COMP%]{position:fixed;top:69px;bottom:0;width:612px;box-sizing:border-box;border-radius:15px;z-index:10;padding:0 8px;margin-right:60px}.chat[_ngcontent-%COMP%], .chat-header[_ngcontent-%COMP%]{background-color:#fff}.chat-header[_ngcontent-%COMP%]{border-radius:15px 15px 0 0;padding:6px 0 2px;min-height:40px}.chat-header[_ngcontent-%COMP%]   .back-btn[_ngcontent-%COMP%]{background-image:url(back-btn.9c1816b723717b00114b.png)}.chat-header[_ngcontent-%COMP%]   .back-btn[_ngcontent-%COMP%]:hover{background-image:url(back-btn-hover.c08c2af82fa97695733f.png)}.chat-header[_ngcontent-%COMP%]   .source-name[_ngcontent-%COMP%]{font-weight:700;color:#333}.chat-header[_ngcontent-%COMP%]   .last-visited[_ngcontent-%COMP%]{font-size:13px;color:#555}.chat-header[_ngcontent-%COMP%]   .search-message-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background-image:url(search.252760ca6c9f4f2926fe.png);background-position:5px;background-repeat:no-repeat;background-size:22px;background-color:transparent;border-radius:20px;padding:5px 8px 5px 32px;border:none;outline:none;width:32px;font-size:15px;transition:width .4s ease-out;cursor:pointer}.chat-header[_ngcontent-%COMP%]   .search-message-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .chat-header[_ngcontent-%COMP%]   .search-message-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover{background-image:url(search-hover.fb01d8b0e4fb8523c044.png)}.chat-header[_ngcontent-%COMP%]   .search-message-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{width:300px}.chat-body[_ngcontent-%COMP%]{border-radius:15px;box-sizing:border-box;background-color:#f7f9fa}.chat-body[_ngcontent-%COMP%]   .messages-container[_ngcontent-%COMP%]{min-height:100%;display:flex;padding-bottom:8px}.chat-footer[_ngcontent-%COMP%]{background-color:#fff;border-radius:0 0 15px 15px;padding:10px 0;z-index:3}.chat-footer[_ngcontent-%COMP%]   .preview-container[_ngcontent-%COMP%]{position:relative;margin:0 42px 5px}.chat-footer[_ngcontent-%COMP%]   .preview-container[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]{position:absolute;right:5px;top:5px;background-image:url(plus-hover.c5a44e580f069dae6603.png);background-color:#fff;transform:rotate(45deg);border:1px solid #eee;outline:none;z-index:10}.chat-footer[_ngcontent-%COMP%]   .textarea-attach-wrap[_ngcontent-%COMP%]{width:100%;border-radius:15px;border:1px solid #eee;margin:0 10px}.chat-footer[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{padding:4px 10px;font-size:17px;height:20px;line-height:20px}.chat-footer[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%]{background:url(send.5f6c618067a4dc880a72.png) no-repeat;background-size:contain;cursor:pointer}.chat-footer[_ngcontent-%COMP%]   .submit-btn[_ngcontent-%COMP%]:disabled{background:url(send-disable.3c62a814f1c85dc4bfd5.png) no-repeat;background-size:contain}.attach[_ngcontent-%COMP%]{list-style:none}.attach[_ngcontent-%COMP%]   .add-picture-btn[_ngcontent-%COMP%]{background-image:url(picture.8bab62ef09da605e0ddf.png)}.attach[_ngcontent-%COMP%]   .add-music-btn[_ngcontent-%COMP%]{background-image:url(add-music.9a4176a08125a911c279.png)}.attach[_ngcontent-%COMP%]   .add-video-btn[_ngcontent-%COMP%]{background-image:url(add-video.07c28269d0df8adddcda.png)}.attach[_ngcontent-%COMP%]   .add-emoji-btn[_ngcontent-%COMP%]{background-image:url(emoji.a281a630f75958ce1961.png)}@media screen and (min-width:1024px) and (max-width:1224px){.chat[_ngcontent-%COMP%]{width:49.5%;margin-right:6%}}@media screen and (min-width:768px) and (max-width:1024px){.chat[_ngcontent-%COMP%]{width:56%;margin-right:25%}}@media screen and (min-width:320px) and (max-width:768px){.chat[_ngcontent-%COMP%]{width:86%;margin-left:73px;margin-right:0;bottom:0}}"]}),j)}],E=((K=function t(){c(this,t)}).\u0275fac=function(t){return new(t||K)},K.\u0275mod=b.Ib({type:K}),K.\u0275inj=b.Hb({imports:[[f.f.forChild(W)],f.f]}),K),F=((I=function t(){c(this,t)}).\u0275fac=function(t){return new(t||I)},I.\u0275mod=b.Ib({type:I}),I.\u0275inj=b.Hb({providers:[s.a],imports:[[E,a.f,o.b,m.b,u.a,v.b]]}),I)},dlKe:function(n,o,i){"use strict";i.d(o,"a",function(){return W}),i.d(o,"b",function(){return E});var r=i("fXoL"),a=i("LRne"),s=i("xgIS"),u=i("5+tZ"),f=i("lJxs"),d=i("vkgz"),h=i("pLZG"),g=i("7o/Q"),p=i("D0XW");i("zx2A");var b={leading:!0,trailing:!1},m=function(){function t(e,n,o,i){c(this,t),this.duration=e,this.scheduler=n,this.leading=o,this.trailing=i}return l(t,[{key:"call",value:function(t,e){return e.subscribe(new v(t,this.duration,this.scheduler,this.leading,this.trailing))}}]),t}(),v=function(n){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&t(e,n)}(i,n);var o=e(i);function i(t,e,n,r,a){var s;return c(this,i),(s=o.call(this,t)).duration=e,s.scheduler=n,s.leading=r,s.trailing=a,s._hasTrailingValue=!1,s._trailingValue=null,s}return l(i,[{key:"_next",value:function(t){this.throttled?this.trailing&&(this._trailingValue=t,this._hasTrailingValue=!0):(this.add(this.throttled=this.scheduler.schedule(O,this.duration,{subscriber:this})),this.leading?this.destination.next(t):this.trailing&&(this._trailingValue=t,this._hasTrailingValue=!0))}},{key:"_complete",value:function(){this._hasTrailingValue?(this.destination.next(this._trailingValue),this.destination.complete()):this.destination.complete()}},{key:"clearThrottle",value:function(){var t=this.throttled;t&&(this.trailing&&this._hasTrailingValue&&(this.destination.next(this._trailingValue),this._trailingValue=null,this._hasTrailingValue=!1),t.unsubscribe(),this.remove(t),this.throttled=null)}}]),i}(g.a);function O(t){t.subscriber.clearThrottle()}function y(t,e,n,o){var i=window&&!!window.document&&window.document.documentElement,r=i&&e?window:n;if(t&&!(r=t&&i&&"string"==typeof t?function(t,e,n){return(n?window.document:e).querySelector(t)}(t,n.nativeElement,o):t))throw new Error("ngx-infinite-scroll {resolveContainerElement()}: selector for");return r}function w(t){return t&&!t.firstChange}var x={clientHeight:"clientHeight",offsetHeight:"offsetHeight",scrollHeight:"scrollHeight",pageYOffset:"pageYOffset",offsetTop:"offsetTop",scrollTop:"scrollTop",top:"top"},P={clientHeight:"clientWidth",offsetHeight:"offsetWidth",scrollHeight:"scrollWidth",pageYOffset:"pageXOffset",offsetTop:"offsetLeft",scrollTop:"scrollLeft",top:"left"},C=function(){function t(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];c(this,t),this.vertical=e,this.propsMap=e?x:P}return l(t,[{key:"clientHeightKey",value:function(){return this.propsMap.clientHeight}},{key:"offsetHeightKey",value:function(){return this.propsMap.offsetHeight}},{key:"scrollHeightKey",value:function(){return this.propsMap.scrollHeight}},{key:"pageYOffsetKey",value:function(){return this.propsMap.pageYOffset}},{key:"offsetTopKey",value:function(){return this.propsMap.offsetTop}},{key:"scrollTopKey",value:function(){return this.propsMap.scrollTop}},{key:"topKey",value:function(){return this.propsMap.top}}]),t}();function _(t){return["Window","global"].some(function(e){return Object.prototype.toString.call(t).includes(e)})}function k(t,e){return t?e.document.documentElement:null}function S(t,e){var n,o,i,r,a=(o=(n=e).container,i=n.isWindow,r=M(n.axis),T(o,i,r.offsetHeightKey,r.clientHeightKey));return e.isWindow?function(t,e,n){var o=n.axis,i=n.container,r=n.isWindow,a=M(o),c=a.offsetHeightKey,s=a.clientHeightKey,l=t+D(k(r,i),o,r),u=T(e.nativeElement,r,c,s);return{height:t,scrolled:l,totalToScroll:function(t,e,n){var o=e.topKey();if(t.getBoundingClientRect)return t.getBoundingClientRect()[o]+D(t,e,n)}(e.nativeElement,o,r)+u,isWindow:r}}(a,t,e):function(t,e,n){var o=n.axis,i=n.container;return{height:t,scrolled:i[o.scrollTopKey()],totalToScroll:i[o.scrollHeightKey()],isWindow:!1}}(a,0,e)}function M(t){return{offsetHeightKey:t.offsetHeightKey(),clientHeightKey:t.clientHeightKey()}}function T(t,e,n,o){if(isNaN(t[n])){var i=k(e,t);return i?i[o]:0}return t[n]}function D(t,e,n){var o=e.pageYOffsetKey(),i=e.scrollTopKey(),r=e.offsetTopKey();return isNaN(window.pageYOffset)?k(n,t)[i]:t.ownerDocument?t.ownerDocument.defaultView[o]:t[r]}function z(t,e,n){var o,i;if(t.totalToScroll<=0)return!1;var r=t.isWindow?t.scrolled:t.height+t.scrolled;return n?(o=(t.totalToScroll-r)/t.totalToScroll,i=e.down/10):(o=t.scrolled/(t.scrolled+(t.totalToScroll-r)),i=e.up/10),o<=i}var j=function(){function t(e){var n=e.totalToScroll;c(this,t),this.lastScrollPosition=0,this.lastTotalToScroll=0,this.totalToScroll=0,this.triggered={down:0,up:0},this.totalToScroll=n}return l(t,[{key:"updateScrollPosition",value:function(t){return this.lastScrollPosition=t}},{key:"updateTotalToScroll",value:function(t){this.lastTotalToScroll!==t&&(this.lastTotalToScroll=this.totalToScroll,this.totalToScroll=t)}},{key:"updateScroll",value:function(t,e){this.updateScrollPosition(t),this.updateTotalToScroll(e)}},{key:"updateTriggeredFlag",value:function(t,e){e?this.triggered.down=t:this.triggered.up=t}},{key:"isTriggeredScroll",value:function(t,e){return e?this.triggered.down===t:this.triggered.up===t}}]),t}();function I(t){return{type:t.scrollDown?"[NGX_ISE] DOWN":"[NGX_ISE] UP",payload:{currentScrollPosition:t.stats.scrolled}}}var K,H,W=((H=function(){function t(e,n){c(this,t),this.element=e,this.zone=n,this.scrolled=new r.n,this.scrolledUp=new r.n,this.infiniteScrollDistance=2,this.infiniteScrollUpDistance=1.5,this.infiniteScrollThrottle=150,this.infiniteScrollDisabled=!1,this.infiniteScrollContainer=null,this.scrollWindow=!0,this.immediateCheck=!1,this.horizontal=!1,this.alwaysCallback=!1,this.fromRoot=!1}return l(t,[{key:"ngAfterViewInit",value:function(){this.infiniteScrollDisabled||this.setup()}},{key:"ngOnChanges",value:function(t){var e=t.infiniteScrollContainer,n=t.infiniteScrollDisabled,o=t.infiniteScrollDistance,i=w(e),r=w(n),a=w(o),c=!r&&!this.infiniteScrollDisabled||r&&!n.currentValue||a;(i||r||a)&&(this.destroyScroller(),c&&this.setup())}},{key:"setup",value:function(){var t=this;"undefined"!=typeof window&&this.zone.runOutsideAngular(function(){var e,n,o,i,r,c,l,g,v,O,w,x;t.disposeScroller=(e={fromRoot:t.fromRoot,alwaysCallback:t.alwaysCallback,disable:t.infiniteScrollDisabled,downDistance:t.infiniteScrollDistance,element:t.element,horizontal:t.horizontal,scrollContainer:t.infiniteScrollContainer,scrollWindow:t.scrollWindow,throttle:t.infiniteScrollThrottle,upDistance:t.infiniteScrollUpDistance},c=e.scrollContainer,l=e.scrollWindow,g=e.element,v=e.fromRoot,O=function(t,e){var n=t.isWindow||e&&!e.nativeElement?e:e.nativeElement;return Object.assign(Object.assign({},t),{container:n})}({axis:(n={axis:new C(!e.horizontal),windowElement:y(c,l,g,v)}).axis,isWindow:_(o=n.windowElement)},o),w=new j({totalToScroll:S(g,O)}),x={up:e.upDistance,down:e.downDistance},(i={container:O.container,throttle:e.throttle},r=Object(s.a)(i.container,"scroll"),i.throttle&&(r=r.pipe(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:p.a,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:b;return function(o){return o.lift(new m(t,e,n.leading,n.trailing))}}(i.throttle))),r).pipe(Object(u.a)(function(){return Object(a.a)(S(g,O))}),Object(f.a)(function(t){return function(t,e,n){var o=function(t,e,n){var o=function(t,e){return t<e.scrolled}(t,e);return{fire:z(e,n,o),scrollDown:o}}(t,e,n);return{scrollDown:o.scrollDown,fire:o.fire,stats:e}}(w.lastScrollPosition,t,x)}),Object(d.a)(function(t){var e=t.stats;return w.updateScroll(e.scrolled,e.totalToScroll)}),Object(h.a)(function(t){var n=t.fire,o=t.scrollDown,i=t.stats.totalToScroll;return function(t,e,n){return!(!t||!e)||!(n||!e)}(e.alwaysCallback,n,w.isTriggeredScroll(i,o))}),Object(d.a)(function(t){var e=t.scrollDown,n=t.stats.totalToScroll;w.updateTriggeredFlag(n,e)}),Object(f.a)(I))).subscribe(function(e){return t.zone.run(function(){return t.handleOnScroll(e)})})})}},{key:"handleOnScroll",value:function(t){var e=t.type,n=t.payload;switch(e){case"[NGX_ISE] DOWN":return this.scrolled.emit(n);case"[NGX_ISE] UP":return this.scrolledUp.emit(n);default:return}}},{key:"ngOnDestroy",value:function(){this.destroyScroller()}},{key:"destroyScroller",value:function(){this.disposeScroller&&this.disposeScroller.unsubscribe()}}]),t}()).\u0275fac=function(t){return new(t||H)(r.Kb(r.l),r.Kb(r.A))},H.\u0275dir=r.Fb({type:H,selectors:[["","infiniteScroll",""],["","infinite-scroll",""],["","data-infinite-scroll",""]],inputs:{infiniteScrollDistance:"infiniteScrollDistance",infiniteScrollUpDistance:"infiniteScrollUpDistance",infiniteScrollThrottle:"infiniteScrollThrottle",infiniteScrollDisabled:"infiniteScrollDisabled",infiniteScrollContainer:"infiniteScrollContainer",scrollWindow:"scrollWindow",immediateCheck:"immediateCheck",horizontal:"horizontal",alwaysCallback:"alwaysCallback",fromRoot:"fromRoot"},outputs:{scrolled:"scrolled",scrolledUp:"scrolledUp"},features:[r.xb]}),H),E=((K=function t(){c(this,t)}).\u0275fac=function(t){return new(t||K)},K.\u0275mod=r.Ib({type:K}),K.\u0275inj=r.Hb({providers:[],imports:[[]]}),K)},yvDh:function(t,e,n){"use strict";n.d(e,"a",function(){return u});var o=n("tk/3"),i=n("vkgz"),r=n("lJxs"),a=n("AytR"),s=n("fXoL"),u=function(){var t=function(){function t(e){c(this,t),this.http=e}return l(t,[{key:"uploadProfileMedia",value:function(t,e){var n=new o.d({"Media-For":e.toString()});return this.http.post("".concat(a.a.apiUrl,"/media/profile"),t,{headers:n}).pipe(Object(i.a)(console.log))}},{key:"uploadMedia",value:function(t){return this.http.post("".concat(a.a.apiUrl,"/media"),t).pipe(Object(r.a)(function(t){return t.media}))}},{key:"getUserMedia",value:function(t){return this.http.get("".concat(a.a.apiUrl,"/media/").concat(t)).pipe(Object(r.a)(function(t){return t.media}))}}]),t}();return t.\u0275fac=function(e){return new(e||t)(s.Tb(o.b))},t.\u0275prov=s.Gb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()}}])}();