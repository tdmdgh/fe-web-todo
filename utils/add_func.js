
document.getElementById('todo_addicon').addEventListener('click', function () {
  
  const todo_list = document.getElementById('todo_list')
  if(todo_list.firstChild.classList[1]=='adding') return  
  let htmlstr = '';
  htmlstr += `
  <div class="work_box_row">
    <div class="work_box_contents">
        <input type="text" class="work_box_title_input adding" placeholder="제목을 입력하세요">
        <textarea rows="1" class="work_box_main_input adding" placeholder="내용을 입력하세요" onkeydown="resize(this)"
            onkeyup="resize(this)"></textarea>
        <div class="work_box_title adding"></div>
        <div class="work_box_main adding"></div>
        <div class="work_box_author adding"></div>
    </div>
    <div class="work_box_icon adding">
        <img src="./icons/box_close_icon.svg" alt="">
    </div>
  </div>
  <div class="add_function_buttons adding">
    <button class="add_cancle_button" onclick="todo_add_cancle()">취소</button>
    <button class="add_register_button">등록</button>
  </div>`
  const li = document.createElement("li");
  li.classList.add('work_box')
  li.classList.add('adding')
  li.innerHTML = htmlstr;
  todo_list.prepend(li)
});




const addicons = document.querySelectorAll(".addicons");
console.log(addicons)
addicons.forEach(function(event){
  console.log(event)
  event.addEventListener('click', pri());
})
function pri(){
  console.log('ghkrdls')
}
