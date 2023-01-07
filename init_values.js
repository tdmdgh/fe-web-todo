window.onload = function () {
    const todo_list = document.getElementById('todo_list')
  console.log(todo_list.childNodes)
    init_list('todo','GiHub 공부하기','add, commit, push')
    init_list('todo','블로그에 포스팅할 것','*GitHub 공부내용 <br> *모던 자바스크립트 1장 공부내용')
    init_list('doing','HTML/CSS 공부하기','input 태그 실습')
    const todo_list2 = document.getElementById('todo_list')
  console.log(todo_list2.childNodes)
}

function init_list(status, title, main,) {
    let list_id = ''
    if (status == 'todo') {
        list_id = 'todo_list'
    }
    if (status == 'doing') {
        list_id = 'doing_list'
    }
    const status_list = document.getElementById(list_id)
    let htmlstr = '';
    htmlstr += `
    <div class="work_box_row">
        <div class="work_box_contents">
            <input type="text" class="work_box_title_input" placeholder="제목을 입력하세요">
            <textarea rows="1" class="work_box_main_input" placeholder="내용을 입력하세요" onkeydown="resize(this)"
                onkeyup="resize(this)"></textarea>
            <div class="work_box_title">${title}</div>
            <div class="work_box_main">${main}</div>
            <div class="work_box_author">author by web</div>
        </div>
        <div class="work_box_icon">
            <img src="./icons/box_close_icon.svg" alt="">
        </div>
    </div>
    <div class="add_function_buttons">
        <button class="add_cancle_button" onclick="todo_add_cancle()">취소</button>
        <button class="add_register_button">등록</button>

    </div>`
  const li = document.createElement("li");
    li.classList.add('work_box')
    li.innerHTML = htmlstr;
    status_list.prepend(li)
}
