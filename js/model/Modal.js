
import { add_category, add_log, get_category, get_workbox, remove_workbox } from "../db/storeController.js";
import Log from "./Log.js";

export default function Modal(type, workbox_id,category_id) {
    this.type = type;
    this.content = "";
    this.workbox_id = workbox_id;
    this.category_id = category_id;
    this.node;
}


Modal.prototype.createNode = function () {
    this.node = document.createElement('div');
    this.node.classList.add("modal_body")
    this.render()
}
Modal.prototype.render = function () {
    if (this.type == "del") {
        this.node.innerHTML =
            `<div class="workbox_title ">선택한 카드를 삭제할까요?</div>
            <div class="modal_btns">
                <button class="modal_cancel_btn">취소</button>
                <button class="modal_delete_btn">삭제</button>
            </div>`
        this.delete_btn_event();
    }
    if (this.type == "add") {
        this.node.innerHTML =
            `<input maxlength=50 class="modal_input" type="text" value="" placeholder="제목을 입력하세요">
            <div class="modal_btns">
                <button class="modal_cancel_btn">취소</button>
                <button class="modal_register_btn">등록</button>
            </div>`
        this.register_btn_event();
    }
    this.cancel_event();
}
Modal.prototype.show = function () {
    this.createNode();
    document.querySelector(".modal").appendChild(this.node);
    this.node.parentElement.classList.add("show")
}
Modal.prototype.disappear = function () {
    document.querySelector(".modal").classList.remove("show")
    this.node.remove();
}

Modal.prototype.cancel_event = function () {
    document.querySelector(".modal").addEventListener('click', (e) => {
        if (e.target.classList.contains("modal")) this.disappear();
        if (e.target.closest(".modal_cancel_btn")) this.disappear();
    })
}
Modal.prototype.register_btn_event = function () {
    this.node.querySelector(".modal_register_btn").addEventListener('click', () => {
        const title = document.querySelector(".modal_input").value
        if (title.length == 0) return
        add_category(title)//렌더링 + store데이터에 저장 
        const log = new Log();//로그렌더링 + store데이터에 저장
        log.add_category(title);
        add_log(log)
        this.disappear();
    })
}

Modal.prototype.delete_btn_event = function () {
    this.node.querySelector(".modal_delete_btn").addEventListener('click', (e) => {
        

        this.disappear();

        const category= get_category(this.category_id)
        const workbox = get_workbox(this.workbox_id)
        const log = new Log()
        log.remove_workbox(category.title,workbox.title);
        add_log(log)
        
        remove_workbox(this.workbox_id, this.category_id)//삭제렌더링 + store데이터 수정 + 카테고리update_count
    })
}