import { newline2br, br2newline, indexOfSibling } from "../utils.js";
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

    this.is_drag_start = false;
    this.drag_start_x;
    this.position_x;
    this.drag_start_y;
    this.position_y;
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
                <img class="box_delete_icon" src="./assets/box_delete_icon.svg" alt="">
                <img class="box_edit_icon" src="./assets/edit_icon.svg" alt="">
            </div>
        </div>
        <div class="work_box_buttons ">
            <button class="add_cancel_button">취소</button>
            <button class="add_register_button">등록</button>
        </div>
            `;
    this.delete_hover();
    this.input_check();

    // this.dragNdrop();
    return this.node;
}

WorkBox.prototype.drag_start = function (e) {
    // const margins = window.getComputedStyle(this.node).getPropertyValue('margin')
    // const margin = margins.split("px")[0]
    console.log()
    const clientRect = this.node.getBoundingClientRect();
    this.drag_start_x = e.pageX
    this.position_x = window.pageXOffset + clientRect.left
    this.drag_start_y = e.pageY
    this.position_y = window.pageYOffset + clientRect.top //- margin
    const vacant_node = this.node.cloneNode(true)
    vacant_node.classList.add("vacant")
    this.node.classList.add("drag")
    this.node.after(vacant_node)

    // this.node.style.zIndex = 1;
    // this.is_drag_start = true;
    // this.node.classList.add("drag_done")
    // console.log("_________________")
    // console.log(clientRect)
    // console.log("워크박스안에서 x위치" + (e.clientX - clientRect.x))
    // console.log("마우스의 x위치: " + e.clientX)
    // console.log("워크박스의 x좌표: " + clientRect.x)
    // console.log("워크박스의 가로 넓이: " + clientRect.width)

    // let elementTop2 = window.pageYOffset + clientRect.top;
    // console.log(this.node.style.marginTop)
    // console.log("워크박스안에서 y위치" + (e.clientY - clientRect.y))
    // console.log("마우스의 y위치: " + e.clientY)
    // console.log("워크박스의 y좌표: " + clientRect.y)
    // console.log("워크박스의 세로 넓이: " + clientRect.height)
    // console.log("워크박스의 top: " + clientRect.top)
    // console.log("워크박스의 절대 좌표: " + elementTop2)
    // console.log(  e.offsetX)
}
WorkBox.prototype.drag_move = function (e) {
    if (!this.node.classList.contains("drag")) return
    const clientRect = this.node.getBoundingClientRect();
    // console.log("_________________")
    // console.log(e.clientX)
    // this.node.style.position = "absolute"
    this.node.style.left = `${this.position_x + e.pageX - this.drag_start_x}px`
    this.node.style.top = `${this.position_y + e.pageY - this.drag_start_y}px`
}
WorkBox.prototype.drag_mouseleave = function (e) {
    // if(!this.node.classList.contains("drag")) return
    if (!this.node.classList.contains("drag")) return
    this.node.classList.remove("drag")
    document.querySelector(".vacant").remove();

    // const clientRect = this.node.getBoundingClientRect();
    // console.log("_________________")
    // console.log(e.clientX)
    // this.node.style.position = "absolute"
    this.node.style.left = `${this.position_x}px`
    this.node.style.top = `${this.position_y}px`
}
WorkBox.prototype.drag_end = function (e) {
    // this.is_drag_start = false
    // this.node.style.pointerEvents = "none"
    // this.node.classList.add("drag_done")
    this.node.style.left = ""//`${this.position_x}px`
    this.node.style.top = ""//`${this.position_y}px`
    this.node.classList.remove("drag")
    document.querySelector(".vacant").remove();

    // this.node.style.zIndex = 'auto'
    const new_category_index = get_drop_category_index(e);
    // console.log(new_category_index)
    if(new_category_index==-1) return
    // console.log(new_category)/
    const new_category = store.category_list[new_category_index]
    // console.log(new_category.node.lastChild.childNodes)
    // return
    // console.log(new_category)
    const insert_before_workbox_index = get_drop_before_workbox_index(new_category, e)
    console.log(insert_before_workbox_index)
    if(new_category==this.category && insert_before_workbox_index== indexOfSibling(this.node)) {
        console.log("같은 위치+")
        console.log(insert_before_workbox_index)
        return
    }
    // console.log(insert_before_workbox_index)
    const no = new_category.node.querySelectorAll(".work_box")

    // console.log(no[insert_before_workbox_index])

    new_category.node.querySelector(".work_box_list").insertBefore(this.node, no[insert_before_workbox_index])
    for (let i = 0; i < this.category.work_box_list.length; i++) { //기존 데이터 삭제
            if (this.category.work_box_list[i] === this) {
                this.category.work_box_list.splice(i, 1);
                i--;
            }
        }
    this.category.count_update();



    this.category = new_category
    console.log(this.category)
    new_category.work_box_list.splice(insert_before_workbox_index, 0, this) //데이터에 저장: 새로운 카테고리에 삽입
    store.category_list.splice(new_category_index,1,new_category)
    // console.log(new_category)
    // console.log(store.category_list)
    
    new_category.count_update()
    
    // const clientRect= this.node.getBoundingClientRect();
    // this.node.style.left = ""//`${window.pageYOffset + clientRect.left}px`
    // this.node.style.top = ""//`${window.pageYOffset + clientRect.top - 8}px`

    return
    // console.log(insert_before_workbox_index)
    new_category.node.lastChild.insertBefore(this.node,insert_before_workbox_index)
    return
    if (insert_before_workbox_index) {
        new_category.node.insertBefore(this.node, insert_before_workbox_index.node)
        new_category.work_box_list.splice(insert_before_workbox_index, 0, this)
    }
    else {
        new_category.node.insertBefore(this.node, null)
        new_category.work_box_list.push(this)
    }
    // const  insert_before_workbox = new_category.work_box_list[insert_workbox_index].node;
    // insert_before_workbox.parentNode.insertBefore(this.node,insert_before_workbox)
    // const insert_before_workbox= new_category.querySelector(".work_box_list").nth
    // const index_node =new_category.work_box_list[insert_before_workbox_index]?new_category.work_box_list[insert_before_workbox_index].node:null;
    // const index_node =new_category.work_box_list[insert_before_workbox_index].node
    // console.log(index_node)
    // new_category.node.insertBefore(this.node, index_node)

    // new_category.work_box_list.splice(insert_before_workbox_index, 0, this) //데이터에 저장: 새로운 카테고리에 삽입
    for (let i = 0; i < this.category.work_box_list.length; i++) { //기존 데이터 삭제
        if (this.category.work_box_list[i] === this) {
            this.category.work_box_list.splice(i, 1);
            i--;
        }
    }
    this.category.count_update();
    new_category.count_update()
    // store.category_list.forEach((category)=>{
    //     const clientRect_category = category.node.getBoundingClientRect();
    //     // console.log((clientRect_category.x+clientRect_category.width)/2)
    //     if(clientRect_category.x < e.pageX && e.pageX<clientRect_category.x +clientRect_category.width){

    //     console.log(clientRect_category)
    //     }
    // })
    // if(!this.is_drag_start) return
    // const clientRect = this.node.getBoundingClientRect();
    console.log("_________________")
    // console.log(e.clientX)
    // this.node.style
}
function get_drop_category_index(e) {
    let return_category
    store.category_list.forEach((category) => {
        const clientRect_category = category.node.getBoundingClientRect();
        if (clientRect_category.x < e.pageX && e.pageX < clientRect_category.x + clientRect_category.width) {
            return_category = category
        }
    })
    let index = -1;
    for(let i = 0 ; i< store.category_list.length; i++){
        const clientRect_category = store.category_list[i].node.getBoundingClientRect();
        if (clientRect_category.x < e.pageX && e.pageX < clientRect_category.x + clientRect_category.width) {
            index = i;
        }
    }
    // store.category_list.forEach((category) => {
    //     const clientRect_category = category.node.getBoundingClientRect();
    //     if (clientRect_category.x < e.pageX && e.pageX < clientRect_category.x + clientRect_category.width) {
    //         return_category = category
    //     }
    // })

    return index//store.category_list[index]
}
function get_drop_before_workbox_index(category, e) {
    // const work_box_nodes = category.node.querySelectorAll(".work_box")
    // console.log(work_box_nodes)
    // // console.log(work_box_node_list.childNodes[0])
    // let workbox_node;

    // // console.log(category.node.lastChild.childNodes.length)
    // // let index = category.node.lastChild.childNodes.length;
    // for (let i =0; i< work_box_nodes; i++) {
    //     console.log(i)
    //     const clientRect_workbox = work_box_nodes[i].getBoundingClientRect();
    //     console.log(clientRect_workbox)
    //     if (e.pageY < (clientRect_workbox.y + clientRect_workbox.height / 2)) {
    //         workbox_node = work_box_nodes[i]
    //         break
    //     }
    // }
    // console.log(workbox_node)
    // return workbox_node


    let index = category.work_box_list.length;
    for (let i in category.work_box_list) {
        const clientRect_workbox = category.work_box_list[i].node.getBoundingClientRect();
        // console.log(clientRect_workbox)
        // console.log(e.pageY)
        // console.log((clientRect_workbox.y + clientRect_workbox.height/2))
        if (e.pageY < (clientRect_workbox.y + clientRect_workbox.height / 2)) {
            index = i
            break
        }
    }
    // return category.work_box_list[index]
    return index
    if (category.work_box_list[index])
        return category.work_box_list[i].node
    return null
    // console.log(index)
    // console.log(index)
    // category.work_box_list.forEach((workbox)=>{
    //     const clientRect_workbox = workbox.node.getBoundingClientRect();
    //     if(clientRect_category.x < e.pageX && e.pageX<clientRect_category.x +clientRect_category.width){
    //         // console.log(clientRect_category)
    //         // console.log(category)
    //         return_category = category
    //     }
    // })
}

// function indexOfSibling(node) {
//     let previous_node = node.previousSibling
//     let index = 0;
//     while (previous_node) {
//         previous_node = previous_node.previousSibling;
//         index++;
//     }
//     return index;
// }
// function indexOfSibling(node){
//     const listArr = [...node.parentElement.children];
//     return listArr.indexOf(node);
// }







WorkBox.prototype.register_btn_event = function () {
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
    this.category.count_update();


    const log = new Log()
    log.setAction("add_WB");
    log.setTime(new Date());
    log.setCT(this.category.title);
    log.setWT(this.title);
    log.register();
    store.log_list.push(log);
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
WorkBox.prototype.register_cancel_btn_event = function () {

    this.category.work_box_list.shift()
    this.node.remove();
}
WorkBox.prototype.edit_cancel_btn_event = function () {
    this.node.classList.remove("editing")
    this.node.classList.remove("adding")
    this.input_value = this.title;
    this.textarea_value = this.content;
    this.node.querySelector(".work_box_title_input").value = this.input_value;
    this.node.querySelector(".work_box_main_input").value = this.textarea_value;
}

WorkBox.prototype.edit_btn_event = function () {
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
}
WorkBox.prototype.delete_hover = function () {
    const delete_btn = this.node.querySelector(".box_delete_icon");

    delete_btn.addEventListener('mouseover', () => {
        this.node.classList.add("delete");
    })
    delete_btn.addEventListener('mouseleave', () => {
        this.node.classList.remove("delete");
    })
}
WorkBox.prototype.delete_btn_event = function () {
    if (this.node.parentNode.querySelector(".adding")) return
    const modal = new Modal("del", this.node, this.category, this.title)
    modal.show();
}

