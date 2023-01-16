
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
        work_box_list_node.append(e.node)
    })
    this.node.append(work_box_list_node)
    return this.node;
}
Category.prototype.count_update = function () {
    this.node.querySelector(".category_count").innerHTML = this.work_box_list.length
}

Category.prototype.title_edit = function () {
    this.node.classList.add("category_title_editing")
}
Category.prototype.title_update = function (value) {
    if (!this.node.classList.contains("category_title_editing")) return
    const prev_title = this.title;
    this.title = value;
    this.node.querySelector("span").innerHTML = this.title
    this.node.classList.remove("category_title_editing")

    const log = new Log()
    log.setAction("update_CT");
    log.setTime(new Date());
    log.setPrevCT(prev_title);
    log.setCT(this.title);
    log.register();

    store.log_list.push(log);
}

Category.prototype.add_btn_event = function () {
    let is_adding = this.node.querySelector(".adding")
    let is_editing = this.node.querySelector(".editing")
    if (is_editing) return
    if (is_adding) {
        const adding_work_box = this.node.querySelector(".work_box")
        adding_work_box.remove();
        this.work_box_list.shift()
        return
    }
    const work_box = new WorkBox(this);
    work_box.createNode();
    work_box.node.classList.add("adding")
    this.node.querySelector(".work_box_list").prepend(work_box.node);

    this.work_box_list.unshift(work_box)
}


Category.prototype.close_btn_event = function () {
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
    console.log(store.category_list)
}