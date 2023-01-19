import Modal from "./Modal.js";
import { resize_textarea, br2newline, newline2br} from "../utils.js";
import { add_workbox, clear_adding_workbox, get_category, set_floating_workbox_node, update_workbox } from "../db/storeController.js";
// import { FloatingWorkBox } from "./FloatingWorkBox.js";
export default function WorkBox(id=0, category_id,) {
    this.id = id;
    // this.next_id = next_id;
    this.title= "";
    this.content = "";
    this.input_value = ""
    this.textarea_value = ""
    this.author = "web"
    this.isRegistable = false;

    this.category_id = category_id;
    this.node;
}

WorkBox.prototype.createNode = function () {
    this.node = document.createElement('li')
    this.node.classList.add("work_box")
    this.node.dataset.id=this.id
    this.node.dataset.category_id=this.category_id
    this.render();
    return this.node;
}
// WorkBox.prototype.setNextId = function (next_id){
//     this.next_id = next_id;
// }
WorkBox.prototype.setValues = function (title, content) {
    this.title = title;
    this.content = content;
}

WorkBox.prototype.register_btn_event = function () {
    if (!this.isRegistable) return;
    
    const category = get_category(this.category_id)

    const prev_title = this.title;
    this.title = this.input_value;
    this.content = newline2br(this.textarea_value);//<br>바꿔주기


    const work_box_title = this.node.querySelector(".work_box_title");
    const work_box_main = this.node.querySelector(".work_box_main");
    work_box_title.innerHTML = this.title;
    work_box_main.innerHTML = this.content;

    this.node.classList.remove("adding");

    if (this.node.classList.contains("editing")) {
        this.node.classList.remove("editing");
        update_workbox(category.title,prev_title,this.id,this.title,this.content) //log 생성 
        debugger
        return
    }
    category.update_count();

    add_workbox(this, this.category_id)//log생성 + store데이터에 workbox추가 + workbox의 next_id 체인
}

WorkBox.prototype.delete_btn_event = function () {
    if (this.node.parentNode.querySelector(".adding")) return
    const modal = new Modal("del",this.id,this.category_id)//new Modal("del", this.node, this.category, this.title)
    modal.show();
}

WorkBox.prototype.set_input = function(e){
    this.input_value = this.node.querySelector(".work_box_title_input").value;
    this.textarea_value = this.node.querySelector(".work_box_main_input").value;
}
WorkBox.prototype.resize_content_area = function(e){
    resize_textarea(this.node.querySelector(".work_box_main_input"));
}
WorkBox.prototype.input_check = function(e){
    if (this.input_value.length > 0 && this.textarea_value.length > 0)
        this.isRegistable = true;
    else {
        this.isRegistable = false;
    }
    if (this.isRegistable) {
        this.node.querySelector(".add_register_button").classList.add("ready")
    }
    else {
        this.node.querySelector(".add_register_button").classList.remove("ready")
    }
}
WorkBox.prototype.register_cancel_btn_event = function () {
    // this.category.work_box_list.shift()
    clear_adding_workbox()
    this.node.remove();
}
WorkBox.prototype.edit_btn_event = function () {
    if (document.querySelector(".adding")) return
    if (!this.node.classList.contains("adding")) {
        this.node.classList.add("adding", "editing")
        const regi_btn = this.node.querySelector(".add_register_button");
        regi_btn.innerHTML = "수정";
        regi_btn.classList.add("ready");
        this.input_value = this.title;
        this.textarea_value = br2newline(this.content);
        this.node.querySelector(".work_box_title_input").value = this.input_value;
        this.node.querySelector(".work_box_main_input").value = this.textarea_value;
    }
}
WorkBox.prototype.edit_cancel_btn_event = function () {
    this.node.classList.remove("editing")
    this.node.classList.remove("adding")
    this.input_value = this.title;
    this.textarea_value = this.content;
    this.node.querySelector(".work_box_title_input").value = this.input_value;
    this.node.querySelector(".work_box_main_input").value = this.textarea_value;
}
WorkBox.prototype.say = function () {
    console.log("hoh")
}

WorkBox.prototype.drag_start = function (e) {
    // const margins = window.getComputedStyle(this.node).getPropertyValue('margin')
    // const margin = margins.split("px")[0]
    // console.log()
    const clientRect = this.node.getBoundingClientRect();
    // this.drag_start_x = e.pageX
    // this.position_x = window.pageXOffset + clientRect.left
    // this.drag_start_y = e.pageY
    // this.position_y = window.pageYOffset + clientRect.top //- margin
    const floating_node = this.node.cloneNode(true)
    this.node.classList.add("transparent")
    floating_node.classList.add("floating")
    floating_node.dataset.drag_start_x = e.pageX
    floating_node.dataset.drag_start_y = e.pageY
    floating_node.dataset.position_x = window.pageXOffset + clientRect.left
    floating_node.dataset.position_y = window.pageYOffset + clientRect.top
//    const f_work_box = new FloatingWorkBox(floating_node)
//    const f_work_box = new FloatingWorkBox()
//    f_work_box.setnode(floating_node)
//    f_work_box.shownode()
    this.node.before(floating_node)
    // this.node.style.visibility ="hiddend"
    // set_floating_workbox(floating_node)
    // const destination_workbox = this.node.cloneNode(true)
    // destination_workbox.classList.add("destination", "hidden")
    // this.node.before(destination_workbox)
}









WorkBox.prototype.render = function () {
    this.node.innerHTML =
        `<div class="work_box_row ">
            <div class="work_box_contents ">
                <input type="text" class="work_box_title_input " value="" placeholder="제목을 입력하세요">
                <textarea rows="1" class="work_box_main_input " value="" placeholder="내용을 입력하세요"></textarea>
                <div class="work_box_title ">${this.title}</div>
                <div class="work_box_main ">${this.content}</div>
                <div class="work_box_author ">author by ${this.author}</div>
            </div>
            <div class="work_box_icon">
                <img class="box_delete_icon" src="./assets/box_delete_icon.svg" alt="">
                <img class="box_edit_icon" src="./assets/edit_icon.svg" alt="">
            </div>
        </div>
        <div class="work_box_buttons ">
            <button class="add_cancel_button">취소</button>
            <button class="add_register_button">등록</button>
        </div>
            `;
}