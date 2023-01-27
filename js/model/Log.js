import { time_diff } from "../utils.js";
export default function Log(time=new Date().getTime(), content="") {
    this.time = time;
    this.content = content;

    this.node;
}
Log.prototype.register = function () {
    this.createNode();
    const log_list = document.querySelector(".log_list");
    log_list.prepend(this.node)
}
Log.prototype.createNode = function () {

    this.node = document.createElement('li');
    this.node.classList.add("log");
    this.render();
}
Log.prototype.update_time = function (){
    this.node.querySelector(".log_time").innerHTML = time_diff(this.time);
    // debugger
}
Log.prototype.render = function () {
    this.node.innerHTML =
        `<div class="profile">
        <img src="./assets/profile.png" alt="">
    </div>
    <ul class="log_col">
        <li class="log_user">@sam</li>
        <li class="log_content">${this.content}</li>
        <li class="log_time">방금 전</li>
    </ul>`;
}




Log.prototype.add_workbox = function (category_title,workbox_title) {
    this.content =
        `<b>${category_title}</b>에 <b>${workbox_title}</b>(을)를 <b>등록</b>하였습니다.`
}
Log.prototype.add_category = function (category_title) {
    this.content =
        `<b>${category_title}</b>(을)를 <b>추가</b>하였습니다.`
}
Log.prototype.update_workbox = function (category_title,prev_workbox_title,workbox_title) {
    this.content =
        `<b>${category_title}</b>의 <b>${prev_workbox_title}</b>(이)가 <b>${workbox_title}</b>(으)로 <b>변경</b>하였습니다.`
}
Log.prototype.update_category = function (prev_category_title,category_title) {
    this.content =
        `<b>${prev_category_title}</b>(이)가 <b>${category_title}</b>(으)로 <b>변경</b>하였습니다.`
}
Log.prototype.remove_workbox = function (category_title,workbox_title) {
    this.content =
        `<b>${category_title}</b>에서 <b>${workbox_title}</b>(을)를 <b>삭제</b>하였습니다.`
}
Log.prototype.remove_category = function (category_title) {
    this.content =
        `<b>${category_title}</b>(을)를 <b>삭제</b>하였습니다.`
}
// Log.prototype.move_in_column = function (category_title,workbox_title) {
//     this.content =
//         `<b>${category_title}</b>에서 <b>${workbox_title}</b>의 순서를 <b>변경</b>하였습니다.`
// }
Log.prototype.move_workbox = function (workbox_title,prev_category_title,category_title) {
    this.content =
        `<b>${workbox_title}</b>(을)를 <b>${prev_category_title}</b>에서 <b>${category_title}</b>(으)로 <b>이동</b>하였습니다.`
}