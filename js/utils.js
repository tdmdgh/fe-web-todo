
import WorkBox from "./class/WorkBox.js";
import Category from "./class/Category.js";
import Modal from "./class/Modal.js";
import { store } from "./Store.js";
export function newline2br(str) {
    return str.replaceAll('\n', '<br>');
}
export function br2newline(str) {
    return str.replaceAll('<br>', '\n');
}
export function time_diff(date) {
    const now = new Date();
    const time_diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    if (time_diff < 1) return '방금 전';
    if (time_diff < 60) {
        return `${time_diff}분 전`;
    }

    const time_diff_hour = Math.floor(time_diff / 60);
    if (time_diff_hour < 24) {
        return `${time_diff_hour}시간 전`;
    }

    const time_diff_day = Math.floor(time_diff_hour / 24);
    if (time_diff_day < 365) {
        return `${time_diff_day}일 전`;
    }

    return `${Math.floor(time_diff_day / 365)}년 전`;
}
export function sidebar_event() {
    document.getElementById('menuicon').addEventListener('click', function () {
        document.getElementById('sidebar').classList.add('active');
        store.log_list.forEach((e)=>{e.update_time()})
    });
    document.getElementById('sidebar_close').addEventListener('click', function () {
        document.getElementById('sidebar').classList.remove('active');
    });
}

export function fab_event() {
    const floating_btn = document.querySelector('.floating_btn');
    floating_btn.addEventListener('click', () => {
        const modal = new Modal("add",)
        modal.show()
    })
}
export function initialize_values() {
    const category_list = document.querySelector('.category_list');
    const todo = new Category("해야할 일")
    const todo_1 = new WorkBox(todo)
    todo_1.title = "GitHub 공부하기"
    todo_1.content = "add, commit, push"
    todo.work_box_list.push(todo_1.createNode());

    const todo_2 = new WorkBox(todo)
    todo_2.title = "블로그에 포스팅할 것"
    todo_2.content = "*GitHub 공부 내용\n*모던 자바스크립트 1장 공부내용"
    todo.work_box_list.push(todo_2.createNode());

    const doing = new Category("하고 있는 일")
    const doing_1 = new WorkBox(doing)
    doing_1.title = "HTML/CSS 공부하기"
    doing_1.content = "input 태그 실습"
    doing.work_box_list.push(doing_1.createNode());

    const done = new Category("완료한 일")
    category_list.append(todo.createNode())
    category_list.append(doing.createNode())
    category_list.append(done.createNode())
}