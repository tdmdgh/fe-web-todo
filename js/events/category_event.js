import { get_category } from "../db/storeController.js";

export default function category_events() {
    document.addEventListener('click', (e) => {
        //Category events: edit-done category title
        const category_title_input = e.target.closest(".category_title_input")
        if (!category_title_input) {
            if (document.querySelector(".category_title_editing")) {
                const category_column = document.querySelector(".category_title_editing")
                const category = get_category(category_column.id)
                category.title_update(category_column.querySelector(".category_title_input").value)
            }
        }


        const category_column = e.target.closest(".category_column")
        if (!category_column) return
        const category = get_category(category_column.id)

        //Category events: edit category title
        const category_title = e.target.closest(".category_title")
        if (category_title) category.title_edit()

        //Category events: add workbox button
        const category_addicon = e.target.closest(".category_addicons")
        if (category_addicon) category.add_btn_event()

        //Category events: remove category
        const category_closeicon = e.target.closest(".category_closeicons")
        if (category_closeicon) category.close_btn_event()
    })
}