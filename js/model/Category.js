import { add_log, get_workbox, remove_category, generate_workbox_id, set_adding_workbox} from "../db/storeController.js";
import Log from "./Log.js";
import WorkBox from "./WorkBox.js";
export default function Category(id,title,workbox_list=[]) {
    this.title = title;
    this.id = id;
    this.workbox_id_list = workbox_list;
    this.node;
}
Category.prototype.setTitle = function(title) {
    this.title = title;
}
Category.prototype.register = function() {
    this.createNode();
    const category_list = document.querySelector('.category_list');
    category_list.append(this.node)
}

Category.prototype.createNode = function() {
    this.node = document.createElement('li');
    this.node.classList.add("category_column");
    this.node.id = this.id;
    this.render_header();
    const workbox_list_node = this.create_workbox_list_node();
    this.node.append(workbox_list_node);
    return this.node;

}
Category.prototype.create_workbox_list_node = function () {
    const workbox_list_node = document.createElement('ul');
    workbox_list_node.classList.add("workbox_list");
    for(let workbox_id of this.workbox_id_list){
        if(workbox_id==-1 || workbox_id ==undefined)break;
        workbox_list_node.append(get_workbox(workbox_id).node);
    }
    return workbox_list_node;
}

Category.prototype.title_edit = function () {
    this.node.classList.add("category_title_editing")
}
Category.prototype.title_update = function (value) {
    if (!this.node.classList.contains("category_title_editing")) return
    const flag = (value == this.title);
    const prev_title = this.title;
    this.title = value;
    this.node.querySelector("span").innerHTML = this.title
    this.node.classList.remove("category_title_editing")
    if(flag) return
    const log = new Log();
    log.update_category(prev_title,this.title);
    add_log(log)
}
Category.prototype.update_count = function () {
    this.node.querySelector(".category_count").innerHTML = this.workbox_id_list.length
}
Category.prototype.add_btn_event = function () {
    const is_adding = document.querySelector(".adding")
    const is_editing = document.querySelector(".editing")
    if (is_editing) return
    if (is_adding) {
        if(is_adding.closest(".category_column").dataset.id == this.id) return
        const adding_workbox = this.node.querySelector(".adding")
        if(adding_workbox) adding_workbox.remove();
        // this.workbox_list.shift()
        return
    }
    const workbox = new WorkBox(generate_workbox_id(),this.id,);
    workbox.createNode();
    workbox.node.classList.add("adding")
    // workbox.node.dataset.id=generate_workbox_id()

    set_adding_workbox(workbox)
    // debugger
    this.node.querySelector(".workbox_list").prepend(workbox.node);
    // this.workbox_list.unshift(workbox)
}

Category.prototype.close_btn_event = function () {
    this.node.remove()

    // const log = new Log()
    // log.remove_category(this.title);
    // add_log(log)

    remove_category(this.id,this.title);
    
}
Category.prototype.render_header = function () {
    this.node.innerHTML =
    `<div class="category_header">
        <div class="category_title">
            <span>${this.title}</span>
            <div class="category_count">${this.workbox_id_list.length}</div>
        </div>
        <input maxlength=50 type="text" class="category_title_input " value="${this.title}" placeholder="제목을 입력하세요">
            
        <div class="category_header_icons">
            <img class="category_addicons" src="./assets/category_add_icon.svg" alt="">
            <img class="category_closeicons" src="./assets/close_icon.svg" alt="">
        </div>
    </div>`
}

