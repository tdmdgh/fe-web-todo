
export function category_template(category, init_work_boxes) {

    let htmlstr = category_header(category);


    init_work_boxes.forEach(element => {
        htmlstr += `<div class = "work_box">`
        htmlstr += element.innerHTML
        htmlstr += `</div>`
    });
    htmlstr += `</ul>`
    return htmlstr;
}
export function category_header(category) {
    return `<div class="category_header">
    <div class="category_title">
        <span>${category.title}</span>
        <div class="category_count">${category.work_box_list.length}</div>
    </div>
    <input maxlength=50 type="text" class="category_title_input " value="${category.title}" placeholder="제목을 입력하세요">
        
    <div class="category_header_icons">
        <img class="category_addicons" src="./assets/category_add_icon.svg" alt="">
        <img class="category_closeicons" src="./assets/close_icon.svg" alt="">
    </div>
</div>`
}