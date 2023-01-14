
import WorkBox from "./class/WorkBox.js";
import Category from "./class/Category.js";
import Modal from "./class/Modal.js";
import { store } from "./Store.js";
import Log from "./class/Log.js";
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
        store.category_list.forEach((e)=>{console.log(e)})
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
    let init={
        "Categories":[
            {
                "Title":"해야할 일",
                "WorkBoxes":[{
                    "Title":"블로그에 포스팅할 것",
                    "Content":"GitHub 공부내용<br>모던 자바스크립트 공부내용",
                    "Author":"web"
                },
                {
                    "Title":"GitHub 공부하기",
                    "Content":"add, commit, push",
                    "Author":"web"
                }]
            },
            {
                "Title":"하고있는 일",
                "WorkBoxes":[{
                    "Title":"Javascript 공부하기",
                    "Content":"addEventListener",
                    "Author":"web"
                }]
            },
            {
                "Title":"완료한 일",
                "WorkBoxes":[]
            }
        ],
        "Logs":[
            {
                "Content":"<b>해야할 일(을)를 <b>추가</b>하였습니다.",
                "Time":"Sat Jan 14 2023 21:01:25 GMT+0900 (한국 표준시)",
            },
            {
                "Content":"<b>하고 있는 일(을)를 <b>추가</b>하였습니다.",
                "Time":"Sat Jan 14 2023 21:01:25 GMT+0900 (한국 표준시)",
            },
            {
                "Content":"<b>완료한 일(을)를 <b>추가</b>하였습니다.",
                "Time":"Sat Jan 14 2023 21:01:25 GMT+0900 (한국 표준시)",
            },
            {
                "Content":"<b>해야할 일</b>에 <b>블로그에 포스팅할 것</b>(을)를 <b>등록</b>하였습니다.",
                "Time":"Sat Jan 14 2023 21:01:25 GMT+0900 (한국 표준시)",
            },
            {
                "Content":"<b>해야할 일</b>에 <b>GitHub 공부하기</b>(을)를 <b>등록</b>하였습니다.",
                "Time":"Sat Jan 14 2023 21:01:25 GMT+0900 (한국 표준시)",
            },
            {
                "Content":"<b>하고 있는 일</b>에 <b>HTML/CSS 공부하기</b>(을)를 <b>등록</b>하였습니다.",
                "Time":"Sat Jan 14 2023 21:01:25 GMT+0900 (한국 표준시)",
            },
        ]
    };
    
    init.Categories.forEach((category_data) => {

        const category_list = document.querySelector('.category_list');
        const category = new Category(category_data.Title)
        category_data.WorkBoxes.forEach((work_box_data)=>{
            const work_box = new WorkBox(category)
            work_box.title = work_box_data.Title
            work_box.content = work_box_data.Content
            work_box.author = work_box_data.Author
            category.work_box_list.push(work_box.createNode())
        })

        category_list.append(category.createNode())
        store.category_list.push(category)
    })
    init.Logs.forEach((log_data)=>{
        const log = new Log();
        log.content = log_data.Content
        log.setTime(new Date(log_data.Time))
        log.register();
        store.log_list.push(log);
    })
}