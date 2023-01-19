
import { get_adding_workbox, get_category, get_workbox, move_workbox } from "../db/storeController.js";

export default function workbox_events() {
    document.addEventListener('click', (e) => {
        //Workbox events
        const work_box = e.target.closest(".work_box")
        if (work_box) {
            const work_box_obj = get_workbox(Number(work_box.dataset.id))

            //Workbox events: register button
            const worK_box_register_btn = e.target.closest(".add_register_button")
            if (worK_box_register_btn) {
                if (work_box.classList.contains("editing")) {
                    work_box_obj.register_btn_event()
                }
                else {
                    get_adding_workbox().register_btn_event()
                }
            }

            //Workbox events: cancel button
            const work_box_cancel_btn = e.target.closest(".add_cancel_button")
            if (work_box_cancel_btn) {
                if (work_box.classList.contains("editing"))
                    work_box_obj.edit_cancel_btn_event()
                else {
                    get_adding_workbox().register_cancel_btn_event();
                }
            }

            //Workbox events: edit button 
            const worK_box_edit_icon = e.target.closest(".box_edit_icon")
            if (worK_box_edit_icon) work_box_obj.edit_btn_event()

            //Workbox events: delete button
            const worK_box_delete_icon = e.target.closest(".box_delete_icon")
            if (worK_box_delete_icon) work_box_obj.delete_btn_event()


        }
    })
    document.addEventListener('keydown', (e) => {
        //Workbox events
        const work_box = e.target.closest(".work_box")
        if (work_box) {
            let work_box_obj;
            if (work_box.classList.contains("editing")) {
                work_box_obj = get_workbox(Number(work_box.dataset.id))
            }
            else work_box_obj = get_adding_workbox()
            work_box_obj.set_input()
            work_box_obj.resize_content_area()
            work_box_obj.input_check()
        }
    })
    document.addEventListener('keyup', (e) => {
        //Workbox events
        const work_box = e.target.closest(".work_box")
        if (work_box) {
            let work_box_obj;
            if (work_box.classList.contains("editing")) {
                work_box_obj = get_workbox(Number(work_box.dataset.id))
            }
            else work_box_obj = get_adding_workbox()
            work_box_obj.set_input()
            work_box_obj.resize_content_area()
            work_box_obj.input_check()
        }
    })

    document.addEventListener('mouseover', (e) => {
        delete_hover(e)
    })

    document.addEventListener('mousedown', (e) => {
        if (document.querySelector(".adding")) return
        if (e.target.classList.contains("box_delete_icon")) return
        if (e.target.classList.contains("box_edit_icon")) return


        const work_box = e.target.closest(".work_box")
        if (work_box) {
            const work_box_obj = get_workbox(Number(work_box.dataset.id))
            work_box_obj.drag_start(e);
        }
    })
    document.addEventListener('mousemove', (e) => {
        //floating 상자 이동
        const floating_workbox_node = document.querySelector(".floating");
        if (!floating_workbox_node) return
        if (floating_workbox_node.classList.contains("drag_end")) return
        let x = Number(floating_workbox_node.dataset.position_x) + e.pageX - Number(floating_workbox_node.dataset.drag_start_x)
        let y = Number(floating_workbox_node.dataset.position_y) + e.pageY - Number(floating_workbox_node.dataset.drag_start_y)
        floating_workbox_node.style.left = x + "px"
        floating_workbox_node.style.top = y + "px"



        const transparent_workbox = document.querySelector(".transparent")
        //도착지의 workbox 보여주기
        const below_under_mouse =document.elementFromPoint(e.pageX,e.pageY)
        if(!below_under_mouse) return
        const below_workbox_under_mouse= below_under_mouse.closest(".work_box")
        if(!below_workbox_under_mouse) {
            //null이지만, x축기준으로 컬럼 구하고, y축기준으로 그 컬럼의 afterbegin, beforeend 정해서 그 칼럼id로 이동시키기
            const category_id = get_category_id_by_mouse(e.pageX)
            if(category_id !== -1){
                // const category = document.querySelector(`#${category_id}`)
                const category = get_category(category_id)
                const clientRect_category = category.node.getBoundingClientRect();
                if(e.pageY<clientRect_category.bottom){
                    if(!below_under_mouse.closest(".category_column"))
                        category.node.querySelector(".work_box_list").insertAdjacentElement("afterbegin",transparent_workbox);
                }
                else{
                    category.node.querySelector(".work_box_list").insertAdjacentElement("beforeend",transparent_workbox);
                }
            }
        }
        else{
            //반나눴을 때, 위면 위에 붙이고, 아니면 아래
            const clientRect_workbox = below_workbox_under_mouse.getBoundingClientRect();
            if (e.clientY < (clientRect_workbox.y + clientRect_workbox.height / 2)) {
                below_workbox_under_mouse.insertAdjacentElement("beforebegin",transparent_workbox);
            }
            else below_workbox_under_mouse.insertAdjacentElement("afterend",transparent_workbox);
        }
    })
    document.addEventListener('mouseup', (e) => {
        const floating_workbox_node = document.querySelector(".floating");
        if (!floating_workbox_node) return

        floating_workbox_node.classList.add("drag_end")

        const workbox_id = floating_workbox_node.dataset.id;
        const prev_category_id = floating_workbox_node.dataset.category_id

        const destination_workbox = document.querySelector(".transparent");
        const category_id = destination_workbox.closest(".category_column").id

        if(prev_category_id!=category_id)move_workbox(Number(workbox_id),Number(prev_category_id),Number(category_id))
        //store데이터의 선택된 workbox의 category_id 바꾸기
        //새로운 category의 work_box_id_list 바꾸기
        //이전 카테고리의 work_box_id_list 바꾸기
        //category.upadte_count
        //log찍기
        
        const clientRect = destination_workbox.getBoundingClientRect();
        const x = window.pageXOffset + clientRect.left;
        const y = window.pageYOffset + clientRect.top
        floating_workbox_node.style.left = x + "px"
        floating_workbox_node.style.top = y + "px"
        destination_workbox.classList = ["work_box"]//remove("transparent")
        setTimeout(() => {
            floating_workbox_node.remove()
        }, 100);
    })
}

function get_category_id_by_mouse(clientX) {
    let category_id = -1;
    const category_list = document.querySelector(".category_list").childNodes
    for (let i = 0; i < category_list.length; i++) {
        const clientRect_category = category_list[i].getBoundingClientRect();
        if (clientRect_category.x < clientX && clientX < clientRect_category.x + clientRect_category.width) {
            category_id = category_list[i].id;
            // console.log(clientRect_category)
        }
    }
    
    return category_id
}


function delete_hover(e) {
    const delete_btn = e.target.closest(".box_delete_icon")
    const work_box = e.target.closest(".work_box")
    if (delete_btn) {
        if (!document.querySelector(".adding")) {
            work_box.classList.add("delete")
        }
    }
    else {
        if (work_box) work_box.classList.remove("delete")
    }
}