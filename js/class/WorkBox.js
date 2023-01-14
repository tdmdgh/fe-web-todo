import { newline2br, br2newline } from "../utils.js";
import Modal from "./Modal.js";
import Log from "./Log.js";
import { store } from "../Store.js";
export default function WorkBox(category) {
    this.title = "";
    this.content = "";
    this.input_value = ""
    this.textarea_value = ""
    this.author = "web"
    this.isRegistable = false;
    this.category = category;
    this.node;
}
WorkBox.prototype.createNode = function () {
    this.node = document.createElement('li')
    this.node.classList.add("work_box")
    // this.node.classList.add("adding")
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
                <img class="box_close_icon" src="./assets/box_close_icon.svg" alt="">
                <img class="box_edit_icon" src="./assets/edit_icon.svg" alt="">
            </div>
        </div>
        <div class="work_box_buttons ">
            <button class="add_cancel_button">취소</button>
            <button class="add_register_button">등록</button>
        </div>
            `;
    this.cancel_btn_event();
    this.register_add();
    this.edit_event();
    this.delete_hover();
    this.delete_btn_event();
    this.input_check();

    // this.dragNdrop();
    return this.node;
}

WorkBox.prototype.dragNdrop = function () {
    // this.node.addEventListener('click', () =>{
    //     console.log("clcik")
    // })
    let first_mouse_x=0;
    this.node.addEventListener('mousedown', (e) =>{
        //TODO: adding 일때는 반응  x
        const clientRect = this.node.getBoundingClientRect();
        // console.log("_________________")
        console.log(clientRect.bottom)
        // console.log(clientRect.height)
        // console.log(clientRect.left)
        // console.log(clientRect.right)
        // console.log(clientRect.top)
        // console.log(clientRect.width)
        // console.log(clientRect.x)
        // console.log(clientRect.y)


        console.log(indexOfSibling(this.node))

        // console.log("down")
        // first_mouse_x = e.offsetX;
        // console.log(first_mouse_x)
        // this.node.classList.add("moving")
        // this.node.style()="position: absolute;right: 0px;bottom: 0px;)"
    })
    this.node.addEventListener('mousemove', (e) =>{

        const clientRect = this.node.getBoundingClientRect();
        // console.log(clientRect)
        // console.log(clientRect.bottom)
        // console.log(clientRect.height)
        // console.log(clientRect.left)
        // console.log(clientRect.right)
        // console.log(clientRect.top)
        // console.log(clientRect.width)
        // console.log(clientRect.x)
        // console.log(clientRect.y)


        // console.log(first_mouse_x - e.pageX)
        // console.log(first_mouse_x - e.offsetX)
        
        // console.log(e.pageX)
        // console.log(e.clientX)
        // console.log(e.screenX)
        // console.log(e.movementX)
        // console.log("press")
    })
    this.node.addEventListener('mouseup', (e) =>{
        console.log(e.target)
    })
}

function indexOfSibling(node){
    let previous_node = node.previousSibling
    let index = 0;
    while(previous_node){
        previous_node = previous_node.previousSibling;
        index++;
    }
    return index;
}







WorkBox.prototype.register_add = function () {
    const add_register_btn = this.node.querySelector(".add_register_button");
    add_register_btn.addEventListener('click', () => {
        // console.log(this.category.work_box_list)
        if (!this.isRegistable) return;
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

            const log = new Log()
            log.setAction("update_WB");
            log.setTime(new Date());
            log.setCT(this.category.title)
            log.setPrevWT(prev_title);
            log.setWT(this.title);
            log.register();
            store.log_list.push(log);
            return
        }
        this.category.work_box_list.unshift(this.node)
        this.category.count_update();


        const log = new Log()
        log.setAction("add_WB");
        log.setTime(new Date());
        log.setCT(this.category.title);
        log.setWT(this.title);
        log.register();
        store.log_list.push(log);
    })
}
WorkBox.prototype.resize_textarea = function (obj) {

    obj.style.height = '0px';
    obj.style.height = (obj.scrollHeight) + 'px';
}
WorkBox.prototype.input_check = function () {
    this.node.addEventListener('keydown', () => {
        this.input_value = this.node.querySelector(".work_box_title_input").value;
        const txtarea = this.node.querySelector(".work_box_main_input");
        this.textarea_value = txtarea.value;
        this.resize_textarea(txtarea);
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
    );
    this.node.addEventListener('keyup', () => {
        this.input_value = this.node.querySelector(".work_box_title_input").value;
        const txtarea = this.node.querySelector(".work_box_main_input");
        this.textarea_value = txtarea.value;
        this.resize_textarea(txtarea);
        if (this.input_value.length > 0 && this.textarea_value.length > 0)
            this.isRegistable = true;
        else {
            this.isRegistable = false;
        }
        if (this.isRegistable)
            this.node.querySelector(".add_register_button").classList.add("ready")
        else {
            this.node.querySelector(".add_register_button").classList.remove("ready")
        }
    }
    )
}
WorkBox.prototype.cancel_btn_event = function () {
    const add_cancel_btn = this.node.querySelector(".add_cancel_button");
    add_cancel_btn.addEventListener('click', () => {
        const is_editing = this.node.classList.contains("editing")
        if (is_editing) {
            this.node.classList.remove("editing")
            this.node.classList.remove("adding")
            this.input_value = this.title;
            this.textarea_value = this.content;
            this.node.querySelector(".work_box_title_input").value = this.input_value;
            this.node.querySelector(".work_box_main_input").value = this.textarea_value;
            return
        }
        this.node.remove();
    })
}
WorkBox.prototype.edit_event = function () {
    const box_edit_icon = this.node.querySelector(".box_edit_icon");
    box_edit_icon.addEventListener('click', () => {
        if (this.node.parentNode.querySelector(".adding")) return
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
    })
}
WorkBox.prototype.delete_hover = function () {
    const delete_btn = this.node.querySelector(".box_close_icon");

    delete_btn.addEventListener('mouseover', () => {
        this.node.classList.add("delete");
    })
    delete_btn.addEventListener('mouseleave', () => {
        this.node.classList.remove("delete");
    })
}
WorkBox.prototype.delete_btn_event = function () {
    const delete_btn = this.node.querySelector(".box_close_icon");
    delete_btn.addEventListener('click', () => {

        const modal = new Modal("del", this.node, this.category, this.title)
        modal.show();
    })
}
WorkBox.prototype.remove = function () {
    console.log();
}
WorkBox.prototype.create_log = function () {
    console.log();
}

//   const ho = new WorkBox("crong", "12:12");
//   ho.showHealth();

