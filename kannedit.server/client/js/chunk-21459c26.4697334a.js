(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21459c26"],{2165:function(t,e,c){},"2aed":function(t,e,c){t.exports=c.p+"img/kanban-can2.eb88f0a5.png"},"77d4":function(t,e,c){"use strict";c("2165")},"78a7":function(t,e,c){"use strict";c.r(e);var n=c("7a23"),o=c("2aed"),a=c.n(o);const s=Object(n["F"])("data-v-e35ddbf0");Object(n["s"])("data-v-e35ddbf0");const i={class:"container-fluid flex-grow-1 pt-5 home"},d=Object(n["g"])("div",{class:"row d-flex justify-content-center mt-5"},[Object(n["g"])("div",{class:"col-4 title-card p-4 shadow"},[Object(n["g"])("img",{class:"img img-fluid",src:a.a,alt:"CodeWorks Logo"}),Object(n["g"])("hr"),Object(n["g"])("h1",{class:"page-title"}," Kannedit ")])],-1),l={class:"row d-flex justify-content-center flex-grow-1 text-center"},b={key:0,class:"col-12 mt-5"},r={key:1,class:"d-flex justify-content-center flex-grow-1 text-center mt-5"},g={class:"col-lg-1"},u=Object(n["g"])("div",{class:"landing-button"}," Boards ",-1),j={class:"col-lg-1"};Object(n["q"])();const O=s((t,e,c,o,a,O)=>{const p=Object(n["w"])("router-link");return Object(n["p"])(),Object(n["d"])("div",i,[d,Object(n["g"])("div",l,[o.user.isAuthenticated?(Object(n["p"])(),Object(n["d"])("div",r,[Object(n["g"])("div",g,[Object(n["g"])(p,{to:{name:"Boards",params:{id:o.account.id}}},{default:s(()=>[u]),_:1},8,["to"])]),Object(n["g"])("div",j,[Object(n["g"])("div",{class:"landing-button",onClick:e[2]||(e[2]=(...t)=>o.logout&&o.logout(...t))}," Logout ")])])):(Object(n["p"])(),Object(n["d"])("div",b,[Object(n["g"])("button",{class:"landing-button",onClick:e[1]||(e[1]=(...t)=>o.login&&o.login(...t))}," Login ")]))])])});var p=c("b012"),f=c("83fc"),w={name:"Home",setup(){const t=Object(n["t"])({dropOpen:!1});return{state:t,user:Object(n["b"])(()=>f["AppState"].user),account:Object(n["b"])(()=>f["AppState"].account),async login(){await p["a"].loginWithPopup()},async logout(){p["a"].logout({returnTo:window.location.origin})}}}};c("77d4");w.render=O,w.__scopeId="data-v-e35ddbf0";e["default"]=w}}]);