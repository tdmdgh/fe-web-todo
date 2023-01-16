import { store } from "./Store.js";
import Modal from "./class/Modal.js";
import { indexOfSibling } from "./utils.js";

export default function addEvents() {
    document.addEventListener('click', (e) => {
        // Sidebar event: active
        const menuicon = e.target.closest("#menuicon")
        if (menuicon) sidebar_active_event()

        // Sidebar event: close
        const sidebar_close = e.target.closest("#sidebar_close")
        if (sidebar_close) sidebar_close_event(sidebar_close)

        //FAB event
        const floating_btn = e.target.closest(".floating_btn")
        if (floating_btn) fab_event()

        //TODO:Modal event

        //Category events
        const category_column = e.target.closest(".category_column")
        if (category_column) {
            const category = store.category_list[indexOfSibling(category_column)]

            //Category events: edit category title
            const category_title = e.target.closest(".category_title")
            if (category_title) category.title_edit()

            //Category events: add workbox button
            const category_addicon = e.target.closest(".category_addicons")
            if (category_addicon) category.add_btn_event()

            //Category events: delete category button
            const category_closeicon = e.target.closest(".category_closeicons")
            if (category_closeicon) category.close_btn_event()


            //Workbox events
            const work_box = e.target.closest(".work_box")
            if (work_box) {
                const work_box_obj = category.work_box_list[indexOfSibling(work_box)]

                //Workbox events: register button
                const worK_box_register_btn = e.target.closest(".add_register_button")
                if (worK_box_register_btn) work_box_obj.register_btn_event()

                //Workbox events: cancel button
                const work_box_cancel_btn = e.target.closest(".add_cancel_button")
                if (work_box_cancel_btn) {
                    if (work_box.classList.contains("editing"))
                        work_box_obj.edit_cancel_btn_event()
                    else {
                        work_box_obj.register_cancel_btn_event();
                        // work_box.remove()
                    }
                }

                //Workbox events: edit button 
                const worK_box_edit_icon = e.target.closest(".box_edit_icon")
                if (worK_box_edit_icon) work_box_obj.edit_btn_event()

                //Workbox events: delete button
                const worK_box_delete_icon = e.target.closest(".box_delete_icon")
                if (worK_box_delete_icon) work_box_obj.delete_btn_event()


            }
        }
    })
    document.addEventListener('keydown', (e) => {
        const category_title_input = e.target.closest(".category_title_input")
        if (category_title_input) {
            if (e.key == 'Enter') {
                const category_column = e.target.closest(".category_column")
                const category = store.category_list[indexOfSibling(category_column)]
                category.title_update(category_title_input.value)
            }
        }
    });


    document.addEventListener('mousedown', (e) => {
        const category_title_input = e.target.closest(".category_title_input")
        if(!category_title_input){
            if(document.querySelector(".category_title_editing")){
                const category_column = document.querySelector(".category_title_editing")
                const category = store.category_list[indexOfSibling(category_column)]
                category.title_update(category_column.querySelector(".category_title_input").value)
            }
        }

        if (document.querySelector(".adding")) return
        if (e.target.classList.contains("box_delete_icon")) return
        if (e.target.classList.contains("box_edit_icon")) return
        if (document.querySelector(".vacant")) return
        
        const work_box = e.target.closest(".work_box")
        if (work_box) {
            work_box.style.left =""
            work_box.style.top=""

            const category_column = e.target.closest(".category_column")
            const category = store.category_list[indexOfSibling(category_column)]
            const work_box_obj = category.work_box_list[indexOfSibling(work_box)]
            work_box_obj.drag_start(e);
        }
    });
    document.addEventListener('mousemove', (e) => {
        if (document.querySelector(".adding")) return
        if (e.target.classList.contains("box_delete_icon")) return
        if (e.target.classList.contains("box_edit_icon")) return
        const work_box = e.target.closest(".drag")
        if (work_box) {
            const category_column = e.target.closest(".category_column")
            const category = store.category_list[indexOfSibling(category_column)]
            const work_box_obj = category.work_box_list[indexOfSibling(work_box)]
            work_box_obj.drag_move(e);
        }
    });
    document.addEventListener('mouseleave', (e) => {
        const work_box = document.querySelector(".drag")
        if (work_box) {
            const category_column = work_box.closest(".category_column")
            const category = store.category_list[indexOfSibling(category_column)]
            const work_box_obj = category.work_box_list[indexOfSibling(work_box)]
            work_box_obj.drag_mouseleave(e);
        }
    });

    document.addEventListener('mouseup', (e) => {
        const work_box = e.target.closest(".drag")
        if (work_box) {
            const category_column = e.target.closest(".category_column")
            const category = store.category_list[indexOfSibling(category_column)]
            const work_box_obj = category.work_box_list[indexOfSibling(work_box)]
            work_box_obj.drag_end(e);
        }       

    });
}
function sidebar_active_event() {
    document.getElementById('sidebar').classList.add('active');
    store.log_list.forEach((log) => { log.update_time() })
}
function sidebar_close_event(e) {
    e.closest("#sidebar").classList.remove('active');
    store.category_list.forEach((e) => { console.log(e) })
}

function fab_event() {
    const modal = new Modal("add",)
    modal.show()
}
