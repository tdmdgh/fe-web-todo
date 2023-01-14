
import { category_header, category_template } from "../templates.js";
import WorkBox from "./WorkBox.js";
import Log from "./Log.js";
import { store } from "../Store.js";
export default function Category(title = "") {
    this.title = title;
    this.work_box_list = [];
    this.node;
}
Category.prototype.createNode = function () {
    this.node = document.createElement('li');
    this.node.classList.add("category_column")
    this.node.innerHTML = category_header({ title: this.title, work_box_list: this.work_box_list });
    const work_box_list_node = document.createElement('ul');
    work_box_list_node.classList.add("work_box_list")
    this.work_box_list.forEach((e) => {
        work_box_list_node.append(e)
    })
    this.node.append(work_box_list_node)
    this.add_btn_event();
    this.close_btn_event();
    this.edit_title_event();
    this.edit_done_title_event();
    return this.node;
}
Category.prototype.count_update = function () {
    this.node.querySelector(".category_count").innerHTML = this.work_box_list.length
}

Category.prototype.title_update = function () {
    if (!this.node.classList.contains("category_name_editing")) return
    this.title = this.node.querySelector(".category_title_input").value;
    this.node.querySelector("span").innerHTML = this.title
}

Category.prototype.edit_title_event = function () {
    const category_header = this.node.querySelector(".category_name");
    category_header.addEventListener('click', () => {
        this.node.classList.add("category_name_editing")
        console.log("dlsjfl")
    });
}
Category.prototype.edit_done_title_event = function () {
    const category_title_input = this.node.querySelector(".category_title_input")
    category_title_input.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
            const prev_title = this.title;
            this.title_update()
            this.node.classList.remove("category_name_editing")

            const log = new Log()
            log.setAction("update_CT");
            log.setTime(new Date());
            log.setPrevCT(prev_title);
            log.setCT(this.title);
            log.register();
            
            store.log_list.push(log);
        }
    });
    // let focusEle = document.activeElement;
    // if (category_title_input == focusEle) {
    //     console.log(true);
    //     this.title_update()
    //     this.node.classList.remove("category_name_editing")
    //   }
}


Category.prototype.add_btn_event = function () {
    const category_addicon = this.node.querySelector(".category_addicons");
    category_addicon.addEventListener('click', () => {
        let is_adding = this.node.querySelector(".adding")
        let is_editing = this.node.querySelector(".editing")
        if (is_editing) return
        if (is_adding) {
            const adding_work_box = this.node.querySelector(".work_box")
            adding_work_box.remove();
            return
        }
        const work_box = new WorkBox(this);
        work_box.createNode();
        work_box.node.classList.add("adding")
        this.node.querySelector(".work_box_list").prepend(work_box.node);
    });
}


Category.prototype.close_btn_event = function () {
    const category_addicon = this.node.querySelector(".category_closeicons");
    category_addicon.addEventListener('click', () => {
        this.node.remove()

        const log = new Log()
        log.setAction("remove_CT");
        log.setTime(new Date());
        log.setCT(this.title);
        log.register();
        store.log_list.push(log);
        store.category_list = store.category_list.filter(
            (element) => element !== this
        )
    });
}