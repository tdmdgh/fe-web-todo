import Category from "./Category.js";
import Log from "./Log.js";
export default function Modal(type, deleting_node, category, wb_title) {
    this.type = type;
    this.content = "";
    this.deleting_node = deleting_node;
    this.category = category;
    this.wb_title = wb_title;
    this.node;
}
Modal.prototype.createNode = function () {
    this.node = document.createElement('div');
    this.node.classList.add("modal_body")
    if (this.type == "del") {
        this.node.innerHTML =
            `<div class="work_box_title ">선택한 카드를 삭제할까요?</div>
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
    this.cancel_btn_event();
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
Modal.prototype.cancel_btn_event = function () {
    document.querySelector(".modal").addEventListener('click', (e) => {
        if (e.target.classList.contains("modal")) this.disappear();
    })
    this.node.querySelector(".modal_cancel_btn").addEventListener('click', () => {
        this.disappear();
    })
}
Modal.prototype.delete_btn_event = function () {
    this.node.querySelector(".modal_delete_btn").addEventListener('click', () => {
        this.category.work_box_list = this.category.work_box_list.filter(
            (element) => element !== this.deleting_node
        )

        this.deleting_node.remove();
        this.disappear();
        this.category.count_update();

        const log = new Log("remove", new Date())
        log.setCT(this.category.title);
        log.setWT(this.wb_title);
        log.register();
    })
}
Modal.prototype.register_btn_event = function () {
    this.node.querySelector(".modal_register_btn").addEventListener('click', () => {
        const title = document.querySelector(".modal_input").value
        if (title.length == 0) return
        const body_main = document.querySelector('.body_main');
        const new_category = new Category(title)
        body_main.append(new_category.createNode())
        this.disappear();


        const log = new Log("add_CT", new Date())
        log.setCT(title);
        log.register();
    })
}
