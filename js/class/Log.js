
export default function Log(action, time) {
    this.action = action;
    this.content = "";
    this.time = time;
    this.category_title
    this.prev_category_title
    this.work_box_title
    this.prev_work_box_title

    this.node;
}
Log.prototype.setPrevCT = function (prev_category_title) {
    this.prev_category_title = prev_category_title;
}
Log.prototype.setCT = function (category_title) {
    this.category_title = category_title;
}
Log.prototype.setWT = function (work_box_title) {
    this.work_box_title = work_box_title;
}
Log.prototype.setPrevWT = function (prev_work_box_title) {
    this.prev_work_box_title = prev_work_box_title;
}

Log.prototype.createContent = function () { //<b>넣기
    if (this.action == "add") {
        this.content =
            `<b>${this.category_title}</b>에 <b>${this.work_box_title}</b>(을)를 <b>등록</b>하였습니다.`
    }
    if (this.action == "add_CT") {
        this.content =
            `<b>${this.category_title}</b>(을)를 <b>추가</b>하였습니다.`
    }
    if (this.action == "update_WB") {
        this.content =
            `<b>${this.prev_work_box_title}</b>에서 <b>${this.work_box_title}</b>(으)로 <b>변경</b>하였습니다.`
    }
    if (this.action == "update_CT") {
        this.content =
            `<b>${this.prev_category_title}</b>에서 <b>${this.category_title}</b>(으)로 <b>변경</b>하였습니다.`
    }
    if (this.action == "remove") {
        this.content =
            `<b>${this.category_title}</b>에서 <b>${this.work_box_title}</b>(을)를 <b>삭제</b>하였습니다.`
    }
    if (this.action == "remove_CT") {
        this.content =
            `<b>${this.category_title}</b>(을)를 <b>삭제</b>하였습니다.`
    }
    if (this.action == "move") { }
}
Log.prototype.createNode = function () {

    this.node = document.createElement('li')
    this.node.classList.add("log");
    this.createContent();
    this.node.innerHTML =
        `<div class="profile">
        <img src="./assets/profile.png" alt="">
    </div>
    <ul class="log_col">
        <li class="log_user">@sam</li>
        <li class="log_content">${this.content}</li>
        <li class="log_time">1분 전</li>
    </ul>`;
}

Log.prototype.register = function () {
    this.createNode();
    const log_list = document.querySelector(".log_list");
    log_list.prepend(this.node)
}
