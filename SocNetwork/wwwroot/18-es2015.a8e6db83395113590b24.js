(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"7gse":function(e,n,t){"use strict";t.r(n),t.d(n,"UsersModule",function(){return y});var r=t("ofXK"),s=t("tyNb"),o=t("PCNd"),i=t("dxD2"),c=t("fXoL"),a=t("668k");function u(e,n){if(1&e&&c.Lb(0,"img",12),2&e){const e=c.Yb().$implicit;c.dc("src",e.avatarPath,c.mc)}}function b(e,n){1&e&&c.Lb(0,"img",13)}function d(e,n){if(1&e&&(c.Pb(0,"div",2),c.Pb(1,"div",3),c.Pb(2,"div",4),c.Pb(3,"div",5),c.oc(4,u,1,1,"img",6),c.oc(5,b,1,0,"ng-template",null,7,c.pc),c.Ob(),c.Pb(7,"div",8),c.Pb(8,"div",9),c.qc(9),c.Ob(),c.Pb(10,"div",10),c.qc(11),c.Ob(),c.Ob(),c.Pb(12,"button",11),c.qc(13,"\u0421\u0442\u0435\u0436\u0438\u0442\u0438"),c.Ob(),c.Ob(),c.Ob(),c.Ob()),2&e){const e=n.$implicit,t=c.kc(6);c.dc("routerLink","/"+e.username),c.zb(4),c.dc("ngIf",e.avatarPath)("ngIfElse",t),c.zb(5),c.rc(e.name),c.zb(2),c.sc("@",e.username,"")}}function l(e,n){1&e&&c.Lb(0,"app-loader")}let g=(()=>{class e{constructor(e,n){this.usersService=e,this.router=n,this.subs=[]}ngOnInit(){const e=this.router.parseUrl(this.router.url);this.username=e.root.children.primary.segments[0].path,this.username&&this.subs.push(this.usersService.getFollowers(this.username,{number:1,size:15}).subscribe(e=>{this.followers=e}))}ngOnDestroy(){this.subs.forEach(e=>{e.unsubscribe()})}}return e.\u0275fac=function(n){return new(n||e)(c.Kb(i.a),c.Kb(s.b))},e.\u0275cmp=c.Eb({type:e,selectors:[["app-followers-page"]],decls:2,vars:2,consts:[["class","user-item",3,"routerLink",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"user-item",3,"routerLink"],[1,"user-wrapper"],[1,"flex","fd-r","jc-sb","ai-c"],[1,"avatar-box","square-40"],["alt","avatar","class","square-40",3,"src",4,"ngIf","ngIfElse"],["default_avatar",""],[1,"flex","fd-c","fg-1"],[1,"source-name"],[1,"nick-name"],[1,"btn","btn-sm","btn-outlined"],["alt","avatar",1,"square-40",3,"src"],["src","../../../../assets/images/default-avatar.jpg","alt","default-avatar",1,"square-40"]],template:function(e,n){1&e&&(c.oc(0,d,14,5,"div",0),c.oc(1,l,1,0,"app-loader",1)),2&e&&(c.dc("ngForOf",n.followers),c.zb(1),c.dc("ngIf",!n.followers))},directives:[r.j,r.k,s.c,a.a],styles:[".user-item[_ngcontent-%COMP%]{padding:0 14px;border-radius:15px;cursor:pointer}.user-item[_ngcontent-%COMP%]   .user-wrapper[_ngcontent-%COMP%]{padding:8px 0;border-bottom:1px solid #ddd}.user-item[_ngcontent-%COMP%]:hover{background-color:#e5f2fc}.user-item[_ngcontent-%COMP%]   .nick-name[_ngcontent-%COMP%], .user-item[_ngcontent-%COMP%]   .source-name[_ngcontent-%COMP%]{padding-left:12px}.user-item[_ngcontent-%COMP%]   .bio[_ngcontent-%COMP%]{font-size:14px;max-height:40px;overflow:hidden;color:#333;padding:5px 5px 0 52px}"]}),e})();function f(e,n){if(1&e&&c.Lb(0,"img",12),2&e){const e=c.Yb().$implicit;c.dc("src",e.avatarPath,c.mc)}}function p(e,n){1&e&&c.Lb(0,"img",13)}function m(e,n){if(1&e){const e=c.Qb();c.Pb(0,"div",2),c.Pb(1,"div",3),c.Pb(2,"div",4),c.Pb(3,"div",5),c.oc(4,f,1,1,"img",6),c.oc(5,p,1,0,"ng-template",null,7,c.pc),c.Ob(),c.Pb(7,"div",8),c.Pb(8,"div",9),c.qc(9),c.Ob(),c.Pb(10,"div",10),c.qc(11),c.Ob(),c.Ob(),c.Pb(12,"button",11),c.Wb("mouseover",function(n){return c.lc(e),c.Yb().changeTitleToUnfollow(n)})("mouseout",function(n){return c.lc(e),c.Yb().changeTitleToUnfollow(n)}),c.qc(13,"\u0412\u0456\u0434\u0441\u0442\u0435\u0436\u0443\u0454\u0442\u044c\u0441\u044f"),c.Ob(),c.Ob(),c.Ob(),c.Ob()}if(2&e){const e=n.$implicit,t=c.kc(6);c.dc("routerLink","/"+e.username),c.zb(4),c.dc("ngIf",e.avatarPath)("ngIfElse",t),c.zb(5),c.rc(e.name),c.zb(2),c.sc("@",e.username,"")}}function h(e,n){1&e&&c.Lb(0,"app-loader")}let O=(()=>{class e{constructor(e,n){this.router=e,this.usersService=n,this.subs=[]}ngOnInit(){const e=this.router.parseUrl(this.router.url);this.username=e.root.children.primary.segments[0].path,this.subs.push(this.usersService.getFollowing(this.username,{number:1,size:15}).subscribe(e=>{this.following=e}))}ngOnDestroy(){this.subs.forEach(e=>{e.unsubscribe()})}changeTitleToUnfollow(e){e.target.innerText="mouseover"==e.type?"\u041d\u0435 \u0441\u0442\u0435\u0436\u0438\u0442\u0438":"\u0412\u0456\u0434\u0441\u0442\u0435\u0436\u0443\u0454\u0442\u044c\u0441\u044f"}}return e.\u0275fac=function(n){return new(n||e)(c.Kb(s.b),c.Kb(i.a))},e.\u0275cmp=c.Eb({type:e,selectors:[["app-following-page"]],decls:2,vars:2,consts:[["class","user-item",3,"routerLink",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"user-item",3,"routerLink"],[1,"user-wrapper"],[1,"flex","fd-r","jc-sb","ai-c"],[1,"avatar-box","square-40"],["alt","avatar","class","square-40",3,"src",4,"ngIf","ngIfElse"],["default_avatar",""],[1,"flex","fd-c","fg-1"],[1,"source-name"],[1,"nick-name"],[1,"btn","btn-sm","btn-filled",3,"mouseover","mouseout"],["alt","avatar",1,"square-40",3,"src"],["src","../../../../assets/images/default-avatar.jpg","alt","default-avatar",1,"square-40"]],template:function(e,n){1&e&&(c.oc(0,m,14,5,"div",0),c.oc(1,h,1,0,"app-loader",1)),2&e&&(c.dc("ngForOf",n.following),c.zb(1),c.dc("ngIf",!n.following))},directives:[r.j,r.k,s.c,a.a],styles:[".user-item[_ngcontent-%COMP%]{padding:0 14px;border-radius:15px;cursor:pointer}.user-item[_ngcontent-%COMP%]   .user-wrapper[_ngcontent-%COMP%]{padding:8px 0;border-bottom:1px solid #ddd}.user-item[_ngcontent-%COMP%]:hover{background-color:#e5f2fc}.user-item[_ngcontent-%COMP%]   .nick-name[_ngcontent-%COMP%], .user-item[_ngcontent-%COMP%]   .source-name[_ngcontent-%COMP%]{padding-left:12px}"]}),e})();var P=t("eIep"),x=t("G1Gu"),v=t("F6UI"),w=t("c3AP");function C(e,n){if(1&e&&(c.Pb(0,"div",12),c.qc(1),c.Ob()),2&e){const e=c.Yb();c.zb(1),c.rc(e.user.name)}}function _(e,n){if(1&e&&(c.Pb(0,"div",13),c.qc(1),c.Ob()),2&e){const e=c.Yb();c.zb(1),c.sc("@",e.user.username,"")}}const M=function(e){return["/",e,"followers"]},k=function(e){return["/",e,"following"]},z=[{path:"",component:(()=>{class e{constructor(e,n){this.route=e,this.usersService=n,this.subs=[]}ngOnInit(){this.subs.push(this.route.params.pipe(Object(P.a)(e=>(console.log(e.username),this.usersService.getShortProfile(e.username)))).subscribe(e=>{console.log(e),this.user=e}))}ngOnDestroy(){this.subs.forEach(e=>{e.unsubscribe()})}}return e.\u0275fac=function(n){return new(n||e)(c.Kb(s.a),c.Kb(i.a))},e.\u0275cmp=c.Eb({type:e,selectors:[["app-users-layout"]],decls:19,vars:8,consts:[[1,"flex","jc-c"],[1,"users","flex","fd-c"],[1,"users-header","flex","fd-c","ai-s","jc-sb"],[1,"flex","fd-c","ai-c"],["class","source-name",4,"ngIf"],["class","nick-name",4,"ngIf"],["data-container","user-switches",1,"user-switches","flex","fd-r"],["routerLinkActive","active",3,"routerLink"],[1,"users-body","fg-1"],["trackClass","scrollbar-track"],[1,"flex","jc-fe"],[1,"right-col"],[1,"source-name"],[1,"nick-name"]],template:function(e,n){1&e&&(c.Pb(0,"div",0),c.Pb(1,"main",1),c.Pb(2,"section",2),c.Pb(3,"div",3),c.oc(4,C,2,1,"div",4),c.oc(5,_,2,1,"div",5),c.Ob(),c.Pb(6,"div",6),c.Pb(7,"button",7),c.qc(8,"\u0412\u0456\u0434\u0441\u0442\u0435\u0436\u0443\u044e\u0442\u044c"),c.Ob(),c.Pb(9,"button",7),c.qc(10,"\u0412\u0456\u0434\u0441\u0442\u0435\u0436\u0443\u0454"),c.Ob(),c.Ob(),c.Ob(),c.Pb(11,"section",8),c.Pb(12,"ng-scrollbar",9),c.Lb(13,"router-outlet"),c.Ob(),c.Ob(),c.Ob(),c.Ob(),c.Pb(14,"div",10),c.Pb(15,"div",11),c.Pb(16,"ng-scrollbar"),c.Lb(17,"app-trends"),c.Lb(18,"app-follow-offers"),c.Ob(),c.Ob(),c.Ob()),2&e&&(c.zb(4),c.dc("ngIf",n.user),c.zb(1),c.dc("ngIf",n.user),c.zb(2),c.dc("routerLink",c.fc(4,M,n.user.username)),c.zb(2),c.dc("routerLink",c.fc(6,k,n.user.username)))},directives:[r.k,s.d,s.c,x.a,s.g,v.a,w.a],styles:["[_nghost-%COMP%]{display:block;width:100%;height:100vh;position:relative}ng-scrollbar[_ngcontent-%COMP%]{--scrollbar-thumb-color:transparent}.users[_ngcontent-%COMP%]{position:fixed;top:69px;bottom:0;width:612px;box-sizing:border-box;border-radius:15px;padding:0 8px 8px;margin-right:60px;background-color:#fff;z-index:1}.users-header[_ngcontent-%COMP%]{border-radius:15px 15px 0 0;padding-top:8px;background:#fff;min-height:87px}.users-header[_ngcontent-%COMP%]   .user-switches[_ngcontent-%COMP%]{margin:4px 16px}.users-header[_ngcontent-%COMP%]   .user-switches[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{box-sizing:border-box;width:50%;padding:10px;outline:none;font-size:15px;cursor:pointer;color:#aaa}.users-header[_ngcontent-%COMP%]   .user-switches[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{color:#1da1f2}.users-header[_ngcontent-%COMP%]   .user-switches[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{color:#1da1f2;border-bottom:2px solid #1da1f2}.users-body[_ngcontent-%COMP%]{border-radius:15px;box-sizing:border-box;background-color:#f7f9fa}.right-col[_ngcontent-%COMP%]{position:fixed;top:69px;bottom:0;width:320px;border-radius:15px 15px 0 0;overflow:hidden;z-index:9;box-sizing:border-box}@media screen and (min-width:1024px) and (max-width:1224px){.users[_ngcontent-%COMP%]{width:50%;margin-right:6%}.right-col[_ngcontent-%COMP%]{width:27%}}@media screen and (min-width:768px) and (max-width:1024px){.users[_ngcontent-%COMP%]{width:56%;margin-right:25%}.right-col[_ngcontent-%COMP%]{width:33%}}@media screen and (min-width:320px) and (max-width:768px){.users[_ngcontent-%COMP%]{width:87%;margin-right:0;margin-left:75px}.right-col[_ngcontent-%COMP%]{display:none}}"]}),e})(),children:[{path:"following",component:O},{path:"followers",component:g}]}];let I=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=c.Ib({type:e}),e.\u0275inj=c.Hb({imports:[[s.f.forChild(z)],s.f]}),e})(),y=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=c.Ib({type:e}),e.\u0275inj=c.Hb({imports:[[r.b,o.a,s.f,x.b,I]]}),e})()}}]);