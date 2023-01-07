function todo_add_cancle(){
    console.log("ddd")
    const todo_list = document.getElementById('todo_list')
    todo_list.removeChild(todo_list.firstChild)
}
// document.getElementsByClassName('add_cancle_button').addEventListener('click', function(){
//     console.log("ddd")
//     });