!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var o=0;o<t.length;o++){var e=t[o];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}function o(n,o,e){return o&&t(n.prototype,o),e&&t(n,e),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"668k":function(t,e,i){"use strict";i.d(e,"a",function(){return a});var r=i("fXoL"),a=function(){var t=function(){function t(){n(this,t)}return o(t,[{key:"ngOnInit",value:function(){}}]),t}();return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=r.Eb({type:t,selectors:[["app-loader"]],decls:9,vars:0,consts:[["id","floatingCirclesG"],["id","frotateG_01",1,"f_circleG"],["id","frotateG_02",1,"f_circleG"],["id","frotateG_03",1,"f_circleG"],["id","frotateG_04",1,"f_circleG"],["id","frotateG_05",1,"f_circleG"],["id","frotateG_06",1,"f_circleG"],["id","frotateG_07",1,"f_circleG"],["id","frotateG_08",1,"f_circleG"]],template:function(n,t){1&n&&(r.Pb(0,"div",0),r.Lb(1,"div",1),r.Lb(2,"div",2),r.Lb(3,"div",3),r.Lb(4,"div",4),r.Lb(5,"div",5),r.Lb(6,"div",6),r.Lb(7,"div",7),r.Lb(8,"div",8),r.Ob())},styles:["[_nghost-%COMP%]{width:100%;height:100%;display:flex;flex-direction:column;justify-content:center}#floatingCirclesG[_ngcontent-%COMP%]{position:relative;width:51px;height:51px;margin:0 auto;transform:scale(.6);-ms-transform:scale(.6)}.f_circleG[_ngcontent-%COMP%]{position:absolute;background-color:#d9d9d9;height:9px;width:9px;border-radius:5px;-ms-border-radius:5px;-webkit-animation-name:f_fadeG;animation-name:f_fadeG;-ms-animation-name:f_fadeG;-webkit-animation-duration:1.2s;animation-duration:1.2s;-ms-animation-duration:1.2s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-ms-animation-iteration-count:infinite;-webkit-animation-direction:normal;animation-direction:normal;-ms-animation-direction:normal}#frotateG_01[_ngcontent-%COMP%]{left:0;top:21px;-webkit-animation-delay:.45s;animation-delay:.45s;-ms-animation-delay:.45s}#frotateG_02[_ngcontent-%COMP%]{left:6px;top:6px;-webkit-animation-delay:.6s;animation-delay:.6s;-ms-animation-delay:.6s}#frotateG_03[_ngcontent-%COMP%]{left:21px;top:0;-webkit-animation-delay:.75s;animation-delay:.75s;-ms-animation-delay:.75s}#frotateG_04[_ngcontent-%COMP%]{right:6px;top:6px;-webkit-animation-delay:.9s;animation-delay:.9s;-ms-animation-delay:.9s}#frotateG_05[_ngcontent-%COMP%]{right:0;top:21px;-webkit-animation-delay:1.05s;animation-delay:1.05s;-ms-animation-delay:1.05s}#frotateG_06[_ngcontent-%COMP%]{right:6px;bottom:6px;-webkit-animation-delay:1.2s;animation-delay:1.2s;-ms-animation-delay:1.2s}#frotateG_07[_ngcontent-%COMP%]{left:21px;bottom:0;-webkit-animation-delay:1.35s;animation-delay:1.35s;-ms-animation-delay:1.35s}#frotateG_08[_ngcontent-%COMP%]{left:6px;bottom:6px;-webkit-animation-delay:1.5s;animation-delay:1.5s;-ms-animation-delay:1.5s}@-webkit-keyframes f_fadeG{0%{background-color:#1da1f2}to{background-color:hsla(0,0%,74.1%,.32)}}@keyframes f_fadeG{0%{background-color:#1da1f2}to{background-color:hsla(0,0%,74.1%,.32)}}"]}),t}()},F6UI:function(t,e,i){"use strict";i.d(e,"a",function(){return p});var r=i("J2l8"),a=i("fXoL"),c=i("ofXK"),s=i("G1Gu"),f=i("tyNb"),d=i("668k"),l=function(n){return["/search","hashtag",n]};function b(n,t){if(1&n&&(a.Pb(0,"li"),a.Pb(1,"a",8),a.Pb(2,"div",9),a.qc(3),a.Ob(),a.Pb(4,"div",10),a.Pb(5,"span",11),a.qc(6),a.Ob(),a.qc(7," posts"),a.Ob(),a.Ob(),a.Ob()),2&n){var o=t.$implicit;a.zb(1),a.dc("routerLink",a.fc(3,l,o.content)),a.zb(2),a.sc("#",o.content,""),a.zb(3),a.rc(o.amount)}}function u(n,t){if(1&n&&(a.Pb(0,"ng-scrollbar",6),a.oc(1,b,8,5,"li",7),a.Ob()),2&n){var o=a.Yb();a.zb(1),a.dc("ngForOf",o.tags)}}function g(n,t){1&n&&a.Lb(0,"app-loader")}var p=function(){var t=function(){function t(o){n(this,t),this.tagsService=o,this.subs=[]}return o(t,[{key:"ngOnInit",value:function(){var n=this;this.subs.push(this.tagsService.getTrends().subscribe(function(t){console.log(t),n.tags=t}))}},{key:"ngOnDestroy",value:function(){this.subs.forEach(function(n){n.unsubscribe()})}}]),t}();return t.\u0275fac=function(n){return new(n||t)(a.Kb(r.a))},t.\u0275cmp=a.Eb({type:t,selectors:[["app-trends"]],decls:9,vars:2,consts:[[1,"trends"],[1,"trends-header"],[1,"trends-body"],["visibility","hover","appearance","standard",4,"ngIf","ngIfElse"],["loading",""],[1,"trends-footer"],["visibility","hover","appearance","standard"],[4,"ngFor","ngForOf"],[1,"trend-item",3,"routerLink"],[1,"trend-item-body"],[1,"trend-item-footer"],[1,"count-posts"]],template:function(n,t){if(1&n&&(a.Pb(0,"div",0),a.Pb(1,"div",1),a.Pb(2,"h2"),a.qc(3,"\u0422\u0440\u0435\u043d\u0434\u0438"),a.Ob(),a.Ob(),a.Pb(4,"ul",2),a.oc(5,u,2,1,"ng-scrollbar",3),a.oc(6,g,1,0,"ng-template",null,4,a.pc),a.Ob(),a.Lb(8,"div",5),a.Ob()),2&n){var o=a.kc(7);a.zb(5),a.dc("ngIf",t.tags)("ngIfElse",o)}},directives:[c.k,s.a,c.j,f.e,d.a],styles:["ng-scrollbar[_ngcontent-%COMP%]{--scrollbar-track-color:rgba(0,0,0,0.05);--scrollbar-thumb-color:rgba(0,0,0,0.2);--scrollbar-thumb-hover-color:rgba(0,0,0,0.3)}.trends[_ngcontent-%COMP%]{margin-bottom:15px;border-radius:15px;padding:0 6px 8px;background-color:#fff}.trends-footer[_ngcontent-%COMP%] > a[_ngcontent-%COMP%], .trends-header[_ngcontent-%COMP%]{padding:8px 16px}.trends-header[_ngcontent-%COMP%]{color:#222}.trends-body[_ngcontent-%COMP%]{padding:4px 0 4px 4px;height:168px;background-color:#f7f9fa}.trends-body[_ngcontent-%COMP%], .trends-body[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{border-radius:15px}.trends-body[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{background-color:#e5f2fc}.trends-body[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-of-type   .trend-item[_ngcontent-%COMP%]{border-bottom:none}.trends[_ngcontent-%COMP%]   .trend-item[_ngcontent-%COMP%]{display:block;border-bottom:1px solid #e6eef5;padding:8px 0;margin:0 5%}.trend-item-body[_ngcontent-%COMP%]{color:#222;font-weight:700}.trend-item-footer[_ngcontent-%COMP%]{font-size:13px;color:#919191}.trends-footer[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]{display:block;cursor:pointer}"]}),t}()},Xui1:function(n,t,o){"use strict";o.d(t,"d",function(){return e}),o.d(t,"a",function(){return i}),o.d(t,"b",function(){return r}),o.d(t,"c",function(){return a});var e=function(n){return n[n.UnFollowed=0]="UnFollowed",n[n.Followed=1]="Followed",n[n.Blocked=2]="Blocked",n}({}),i=function(n){return n[n.Avatar=0]="Avatar",n[n.Cover=1]="Cover",n}({}),r=function(n){return n[n.Followed=0]="Followed",n[n.Liked=1]="Liked",n[n.Reposted=2]="Reposted",n[n.Commented=3]="Commented",n}({}),a=function(n){return n[n.None=0]="None",n[n.Post=1]="Post",n[n.Comment=2]="Comment",n}({})},c3AP:function(t,e,i){"use strict";i.d(e,"a",function(){return O});var r=i("dxD2"),a=i("fXoL"),c=i("ofXK"),s=i("G1Gu"),f=i("tyNb"),d=i("668k");function l(n,t){if(1&n&&a.Lb(0,"img",18),2&n){var o=a.Yb().$implicit;a.dc("src",o.avatarPath,a.mc)}}function b(n,t){1&n&&a.Lb(0,"img",19)}var u=function(n){return["/",n]};function g(n,t){if(1&n&&(a.Pb(0,"li"),a.Pb(1,"a",8),a.Pb(2,"div",9),a.oc(3,l,1,1,"img",10),a.oc(4,b,1,0,"ng-template",null,11,a.pc),a.Ob(),a.Pb(6,"div",12),a.Pb(7,"div",13),a.Pb(8,"div",14),a.Pb(9,"div",15),a.qc(10),a.Ob(),a.Pb(11,"div",16),a.qc(12),a.Ob(),a.Ob(),a.Pb(13,"button",17),a.qc(14,"\u0421\u0442\u0435\u0436\u0438\u0442\u0438"),a.Ob(),a.Ob(),a.Ob(),a.Ob(),a.Ob()),2&n){var o=t.$implicit,e=a.kc(5);a.zb(1),a.dc("routerLink",a.fc(5,u,o.username)),a.zb(2),a.dc("ngIf",o.avatarPath)("ngIfElse",e),a.zb(7),a.rc(o.name),a.zb(2),a.sc("@",o.username,"")}}function p(n,t){if(1&n&&(a.Pb(0,"ng-scrollbar",6),a.oc(1,g,15,7,"li",7),a.Ob()),2&n){var o=a.Yb();a.zb(1),a.dc("ngForOf",o.users)}}function m(n,t){1&n&&a.Lb(0,"app-loader")}var O=function(){var t=function(){function t(o){n(this,t),this.usersService=o,this.subs=[]}return o(t,[{key:"ngOnInit",value:function(){var n=this;this.subs.push(this.usersService.getFollowOffers().subscribe(function(t){n.users=t}))}},{key:"ngOnDestroy",value:function(){this.subs.forEach(function(n){n.unsubscribe()})}}]),t}();return t.\u0275fac=function(n){return new(n||t)(a.Kb(r.a))},t.\u0275cmp=a.Eb({type:t,selectors:[["app-follow-offers"]],decls:9,vars:2,consts:[[1,"follow-offers"],[1,"follow-offers-header"],[1,"follow-offers-body"],["visibility","hover","appearance","standard",4,"ngIf","ngIfElse"],["loading",""],[1,"follow-offers-footer"],["visibility","hover","appearance","standard"],[4,"ngFor","ngForOf"],[1,"follow-offer-item","flex",3,"routerLink"],[1,"avatar-box","square-40"],["alt","avatar","class","square-40",3,"src",4,"ngIf","ngIfElse"],["default_avatar",""],[1,"flex","fg-1","fd-c"],[1,"flex","fd-r","jc-sb","ai-c"],[1,"flex","fd-c","fg-1"],[1,"source-name"],[1,"nick-name"],[1,"btn","btn-sm","btn-outlined"],["alt","avatar",1,"square-40",3,"src"],["src","../../../../assets/images/default-avatar.jpg","alt","default-avatar",1,"square-40"]],template:function(n,t){if(1&n&&(a.Pb(0,"div",0),a.Pb(1,"div",1),a.Pb(2,"h2"),a.qc(3,"\u041f\u0440\u043e\u043f\u043e\u0437\u0438\u0446\u0456\u0457"),a.Ob(),a.Ob(),a.Pb(4,"ul",2),a.oc(5,p,2,1,"ng-scrollbar",3),a.oc(6,m,1,0,"ng-template",null,4,a.pc),a.Ob(),a.Lb(8,"div",5),a.Ob()),2&n){var o=a.kc(7);a.zb(5),a.dc("ngIf",t.users)("ngIfElse",o)}},directives:[c.k,s.a,c.j,f.e,d.a],styles:["ng-scrollbar[_ngcontent-%COMP%]{--scrollbar-track-color:rgba(0,0,0,0.05);--scrollbar-thumb-color:rgba(0,0,0,0.2);--scrollbar-thumb-hover-color:rgba(0,0,0,0.3)}.follow-offers[_ngcontent-%COMP%]{margin-bottom:15px;border-radius:15px;padding:0 6px 8px;background-color:#fff}.follow-offers-footer[_ngcontent-%COMP%] > a[_ngcontent-%COMP%], .follow-offers-header[_ngcontent-%COMP%]{padding:8px 16px}.follow-offers-header[_ngcontent-%COMP%]{color:#222}.follow-offers-body[_ngcontent-%COMP%]{padding:4px 0 4px 4px;height:168px;border-radius:15px;background-color:#f7f9fa}.follow-offers-body[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{border-radius:15px}.follow-offers-body[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{background-color:#e5f2fc}.follow-offers-body[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-of-type   .follow-offer-item[_ngcontent-%COMP%]{border-bottom:none}.follow-offers-body[_ngcontent-%COMP%]   .follow-offer-item[_ngcontent-%COMP%]{border-bottom:1px solid #e6eef5;padding:8px 0;margin:0 5%}.follow-offer-item[_ngcontent-%COMP%]   .nick-name[_ngcontent-%COMP%], .follow-offer-item[_ngcontent-%COMP%]   .source-name[_ngcontent-%COMP%]{padding-left:12px;max-width:180px;overflow:hidden}.follow-offer-item[_ngcontent-%COMP%]   .bio[_ngcontent-%COMP%]{font-size:14px;max-height:40px;overflow:hidden;color:#333;padding:5px 5px 0 12px}.follow-offers-footer[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]{display:block;cursor:pointer}"]}),t}()},nUyU:function(t,e,i){"use strict";i.r(e),i.d(e,"NotificationsModule",function(){return I});var r,a=i("ofXK"),c=i("PCNd"),s=i("G1Gu"),f=i("tyNb"),d=i("Xui1"),l=i("p+X3"),b=i("lJxs"),u=i("AytR"),g=i("fXoL"),p=i("tk/3"),m=((r=function(){function t(o){n(this,t),this.http=o}return o(t,[{key:"getCurrentUserNotifs",value:function(){return this.http.get("".concat(u.a.apiUrl,"/notifications")).pipe(Object(b.a)(function(n){return n.notificDTOs}))}}]),t}()).\u0275fac=function(n){return new(n||r)(g.Tb(p.b))},r.\u0275prov=g.Gb({token:r,factory:r.\u0275fac}),r),O=i("dxD2"),h=i("F6UI"),P=i("c3AP"),v=i("668k");function x(n,t){if(1&n&&g.Lb(0,"img",19),2&n){var o=g.Yb().$implicit;g.dc("src",o.senderDTO.avatarPath,g.mc)}}function _(n,t){1&n&&g.Lb(0,"img",20)}function y(n,t){if(1&n&&(g.Nb(0),g.Pb(1,"a",9),g.Pb(2,"a",10),g.oc(3,x,1,1,"img",11),g.oc(4,_,1,0,"ng-template",null,12,g.pc),g.Ob(),g.Pb(6,"div",13),g.Pb(7,"a",14),g.Pb(8,"div",15),g.qc(9),g.Ob(),g.Pb(10,"div",16),g.qc(11),g.Ob(),g.Ob(),g.Pb(12,"div",17),g.qc(13),g.Ob(),g.Pb(14,"div",18),g.qc(15),g.Zb(16,"date"),g.Ob(),g.Ob(),g.Ob(),g.Mb()),2&n){var o=t.$implicit,e=g.kc(5),i=g.Yb();g.zb(1),g.dc("routerLink",i.getLinkToSubject(o)),g.zb(1),g.dc("routerLink","/"+o.senderDTO.username),g.zb(1),g.dc("ngIf",o.senderDTO.avatarPath)("ngIfElse",e),g.zb(4),g.dc("routerLink","/"+o.senderDTO.username),g.zb(2),g.sc("",o.senderDTO.name," "),g.zb(2),g.sc("\u2022 @",o.senderDTO.username,""),g.zb(2),g.rc(i.translateNotific(o)),g.zb(2),g.rc(g.ac(16,9,o.creationDate,"medium","","uk"))}}function C(n,t){1&n&&g.Lb(0,"app-loader")}function k(n,t){1&n&&(g.Pb(0,"div",21),g.Pb(1,"p",22),g.qc(2,"\u0412\u0438 \u043f\u043e\u043a\u0438 \u0449\u043e \u043d\u0435 \u043c\u0430\u0454\u0442\u0435 \u0436\u043e\u0434\u043d\u0438\u0445 \u043e\u043f\u043e\u0432\u0456\u0449\u0435\u043d\u044c"),g.Ob(),g.Ob())}var M,w,G,L=[{path:"",component:(M=function(){function t(o,e){n(this,t),this.notificationsService=o,this.usersService=e,this.notifs=[],this.loaded=!1,this.subs=[]}return o(t,[{key:"ngOnInit",value:function(){var n=this;this.subs.push(this.usersService.me$.subscribe(function(t){return n.me=t}),this.notificationsService.getCurrentUserNotifs().subscribe(function(t){console.log(t),n.loaded=!0,n.notifs=t}))}},{key:"ngOnDestroy",value:function(){this.subs.forEach(function(n){n.unsubscribe()})}},{key:"getLinkToSubject",value:function(n){return n.subjectType==d.c.Post||n.subjectType==d.c.Comment?"/"+this.me.username+"/post/"+n.subjectId:n.subjectType==d.c.None?"/"+n.senderDTO.username:void 0}},{key:"translateNotific",value:function(n){return l.c.find(function(t){return t.key==n.notificType&&t.subject==n.subjectType}).value}}]),t}(),M.\u0275fac=function(n){return new(n||M)(g.Kb(m),g.Kb(O.a))},M.\u0275cmp=g.Eb({type:M,selectors:[["app-notifications-page"]],decls:14,vars:3,consts:[[1,"flex","jc-c"],[1,"notifs","flex","fd-c"],[1,"notifs-header"],[1,"notifs-body","fg-1"],[4,"ngFor","ngForOf"],[4,"ngIf"],["class","notifs-lining flex jc-c ai-c",4,"ngIf"],[1,"flex","jc-fe"],[1,"right-col"],[1,"notif-item","flex",3,"routerLink"],[1,"avatar-box","square-40",3,"routerLink"],["alt","avatar","class","square-40",3,"src",4,"ngIf","ngIfElse"],["default_avatar",""],[1,"flex","fd-c","fg-1"],[1,"flex",3,"routerLink"],[1,"source-name"],[1,"nick-name"],[1,"notif-text"],[1,"notif-date"],["alt","avatar",1,"square-40",3,"src"],["src","../../assets/images/default-avatar.jpg","alt","default-avatar",1,"square-40"],[1,"notifs-lining","flex","jc-c","ai-c"],[1,"lining-label"]],template:function(n,t){1&n&&(g.Pb(0,"div",0),g.Pb(1,"main",1),g.Pb(2,"div",2),g.Pb(3,"h2"),g.qc(4,"\u041e\u043f\u043e\u0432\u0456\u0449\u0435\u043d\u043d\u044f"),g.Ob(),g.Ob(),g.Pb(5,"div",3),g.oc(6,y,17,14,"ng-container",4),g.oc(7,C,1,0,"app-loader",5),g.oc(8,k,3,0,"div",6),g.Ob(),g.Ob(),g.Ob(),g.Pb(9,"div",7),g.Pb(10,"div",8),g.Pb(11,"ng-scrollbar"),g.Lb(12,"app-trends"),g.Lb(13,"app-follow-offers"),g.Ob(),g.Ob(),g.Ob()),2&n&&(g.zb(6),g.dc("ngForOf",t.notifs),g.zb(1),g.dc("ngIf",!t.loaded),g.zb(1),g.dc("ngIf",0==t.notifs.length&&t.loaded))},directives:[a.j,a.k,s.a,h.a,P.a,f.e,v.a],pipes:[a.d],styles:["[_nghost-%COMP%]{display:block;width:100%;min-height:100vh;position:relative}main[_ngcontent-%COMP%]{position:absolute;width:612px;min-height:90.2%;margin:69px 60px 0 0;padding:0 8px;box-sizing:border-box;border-radius:15px;background-color:#fff}.notifs-header[_ngcontent-%COMP%]{padding:8px 16px}.notifs-body[_ngcontent-%COMP%]{margin-bottom:10px;background-color:#f7f9fa;border-radius:15px;position:relative}.notifs-body[_ngcontent-%COMP%]   .notif-item[_ngcontent-%COMP%]{padding:6px 12px;border-radius:15px}.notifs-body[_ngcontent-%COMP%]   .notif-item[_ngcontent-%COMP%]:hover{background-color:#e5f2fc}.notif-item[_ngcontent-%COMP%]   .avatar-box[_ngcontent-%COMP%]{margin-right:8px}.notif-item[_ngcontent-%COMP%]   .source-name[_ngcontent-%COMP%]{margin-right:4px}.notif-item[_ngcontent-%COMP%]   .notif-date[_ngcontent-%COMP%]{font-size:13px;color:#7a8b9b}.notifs-lining[_ngcontent-%COMP%]{position:absolute;top:0;bottom:0;left:0;right:0;border-radius:15px;padding:0 10px;background-color:#fff;z-index:0}.notifs-lining[_ngcontent-%COMP%]   .lining-label[_ngcontent-%COMP%]{padding:8px 12px;background-color:#f0f4f7;color:#1da1f2;border-radius:20px}.right-col[_ngcontent-%COMP%]{position:fixed;top:69px;bottom:0;width:320px;border-radius:15px 15px 0 0;overflow:hidden;z-index:9;box-sizing:border-box}.right-col[_ngcontent-%COMP%]   ng-scrollbar[_ngcontent-%COMP%]{--scrollbar-thumb-color:transparent}@media screen and (min-width:1024px) and (max-width:1224px){main[_ngcontent-%COMP%]{width:50%;margin-right:6%}.right-col[_ngcontent-%COMP%]{width:27%}}@media screen and (min-width:768px) and (max-width:1024px){main[_ngcontent-%COMP%]{width:56%;margin-right:25%}.right-col[_ngcontent-%COMP%]{width:33%}}@media screen and (min-width:320px) and (max-width:768px){main[_ngcontent-%COMP%]{width:87%;margin-right:0;margin-left:73px}.right-col[_ngcontent-%COMP%]{display:none}}"]}),M)}],z=((G=function t(){n(this,t)}).\u0275fac=function(n){return new(n||G)},G.\u0275mod=g.Ib({type:G}),G.\u0275inj=g.Hb({imports:[[f.f.forChild(L)],f.f]}),G),I=((w=function t(){n(this,t)}).\u0275fac=function(n){return new(n||w)},w.\u0275mod=g.Ib({type:w}),w.\u0275inj=g.Hb({providers:[m],imports:[[a.b,c.a,s.b,z]]}),w)}}])}();