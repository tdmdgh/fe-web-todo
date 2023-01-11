
// import create_work_box from "./create_work_box.js";
import WorkBox from "./WorkBox.js";

export default function add_work_box_event() {
    const category_addicons = document.querySelectorAll(".category_addicons");

    category_addicons.forEach(function (element) {
        element.addEventListener('click', () => {
            const category_column = element.closest(".category_column")
            let is_adding = category_column.querySelector(".adding")
            let is_editing = category_column.querySelector(".editing")
            if(is_editing) return
            if (is_adding) {
                const adding_work_box = category_column.querySelector(".work_box")
                adding_work_box.remove();
                // category_column.classList.remove("adding")            
            }
            else {
                const work_box = new WorkBox();//create_work_box("adding");
                work_box.createNode();
                work_box.input_check();
                // category_column.querySelector(".work_box_list").prepend(work_box)
                category_column.querySelector(".work_box_list").prepend(work_box.node)
            }
        });
    });

}