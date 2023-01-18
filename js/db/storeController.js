import Category from "../model/Category.js"
import Log from "../model/Log.js";
import WorkBox from "../model/WorkBox.js"
import { store } from "./store.js"
import { binarysearch_category, get_element_index } from "../utils.js";

//init이 서버에서 받아온 json 이라고 가정
//init을 전체 프로젝트에서 사용할 store 변수에 변경, 저장 후, 프로젝트에서는 store를 사용
export function initialize_store() {
    set_workbox_map();
    set_category_list();
    set_log_list();
}
export function initial_render() {
    //body
    store.category_list.forEach((category) => {
        const category_list = document.querySelector('.category_list');
        category_list.append(category.node)
        // category.register();
    })
    //log
    store.log_list.forEach((log) => {
        // const log_list = document.querySelector(".log_list");
        // log_list.prepend(log.node)
        log.register();
    })
}
export function remove_category(id) {
    const idx = binarysearch_category(id,store.category_list)
    //category가 갖고 있던 workbox 전부 삭제
    const category = store.category_list[idx]
    category.work_box_id_list.forEach((idx) => { store.workbox_map.delete(idx) })
    store.category_list.splice(idx,1)
}
export function remove_workbox(workbox_id,category_id) {


    const category= get_category(category_id)
    const work_box = get_workbox(workbox_id)
    
    const target_index = get_index_of_workbox(workbox_id,category_id)
    // if(target_index>0){ // 칼럼내 워크박스가 첫번째 이후에 위치한 경우라면, 그전 워크박스의 next_id 업데이트
    //     const prev_work_box = get_workbox(category.work_box_id_list[target_index-1])
    //     prev_work_box.next_id = work_box.next_id
    // }
    category.work_box_id_list.splice(target_index, 1);
    work_box.node.remove()
    store.workbox_map.delete(workbox_id) 
    category.update_count()
    
}
export function add_category(category_title) {
    const category = new Category(generate_category_id(), category_title,[]);
    category.register()
    store.category_list.push(category)
}
export function add_workbox(workbox,category_id) {
    const category = get_category(category_id)
    // workbox.next_id = category.work_box_id_list[0]??-1
    category.work_box_id_list.unshift(workbox.id)

    store.workbox_map.set(workbox.id,workbox)

    const log = new Log();
    log.add_workbox(category.title,workbox.title)
    add_log(log)
    
    category.update_count()
    clear_adding_workbox()
    console.log(store)
}
export function move_workbox(work_box_id, prev_category_id, category_id) {
        //store데이터의 선택된 workbox의 category_id 바꾸기
        const work_box = get_workbox(work_box_id)
        work_box.category_id = category_id
        work_box.node.dataset.category_id = category_id

        //이전 카테고리의 work_box_id_list 바꾸기 - 기존 워크박스id 삭제
        const prev_category = get_category(prev_category_id)
        const delete_index = prev_category.work_box_id_list.indexOf(work_box_id)
        prev_category.work_box_id_list.splice(delete_index,1);
        // console.log(prev_category.work_box_id_list);
        

        //새로운 category의 work_box_id_list 삽입
        const category = get_category(category_id)
        const insert_index = get_element_index(document.querySelector(".transparent"))
        category.work_box_id_list.splice(insert_index, 0, work_box_id);

        //category.upadte_count
        prev_category.update_count()
        category.update_count()

        //log찍기
        const log = new Log()
        log.move_workbox(work_box.title,prev_category.title,category.title);
        add_log(log);


        // console.log(store)
}
export function update_workbox(category_title,prev_workbox_title,workbox_title) {
    const log = new Log()
    log.update_workbox(category_title,prev_workbox_title,workbox_title);
    add_log(log);
}
export function get_category(id) {
    const idx = binarysearch_category(id,store.category_list)
    return store.category_list[idx]
}
export function get_workbox(id) {
    if (id == -1) return -1
    return store.workbox_map.get(id)
}

export function add_log(log) {
    log.register();//렌더링
    store.log_list.push(log);
}
export function update_logs_time() {
    console.log(store.category_list)
    console.log(store.workbox_map)
    console.log(store.adding_workbox)
    console.log(store.log_list)
    store.log_list.forEach((log) => { log.update_time() })
}


function generate_category_id() {
    return store.category_list[store.category_list.length - 1].id + 1
}

export function generate_workbox_id() {
    return Math.max(...store.workbox_map.keys())+1
}

export function get_index_of_workbox(workbox_id,category_id){
    const category= get_category(category_id)
    let target_index=-1
    for(let i = 0; i < category.work_box_id_list.length; i++){
        if(category.work_box_id_list[i] == workbox_id)  {
            target_index = i
        }
    }
    return target_index;
}
export function get_adding_workbox(){
    return store.adding_workbox;
}
export function set_adding_workbox(workbox){
    store.adding_workbox=workbox;
}
export function clear_adding_workbox(){
    store.adding_workbox=null;
}
export function get_floating_workbox_node(){
    return store.floating_workbox_node;
}
export function set_floating_workbox_node(node){
    store.floating_workbox_node=node;
}
export function clear_floating_workbox(){
    store.floating_workbox_node.remove();
}
function set_workbox_map() {
    //new WorkBox()해서 store.workbox_map에 삽입 -> 모든 workbox 클래스를 포함
    for (const workbox_data of init.WorkBoxes) {
        const workbox =
            new WorkBox(workbox_data.id, workbox_data.category_id)
        // workbox.setNextId(workbox_data.next_id);
        workbox.setValues(workbox_data.title, workbox_data.content)
        workbox.createNode();
        store.workbox_map.set(workbox.id, workbox)
    }
}

function set_category_list() {
    //new Category()해서 store.category_list에 삽입
    for (const category_data of init.Categories) {
        // const category = new Category(category_data.id, category_data.title, [category_data.first_workbox_id]);
        const category = new Category(category_data.id, category_data.title, category_data.workbox_id_list);
        // const work_box_id_list = sort_Workbox_list(category.work_box_id_list[0])
        // category.work_box_id_list = work_box_id_list;
        category.createNode();
        store.category_list.push(category)
    }
}

// function sort_Workbox_list(idx) {
//     //(store.workbox_map)참조해서 category.work_box_id_list에 id만 삽입하기
//     let wb_linked_list = [];
//     let workbox = get_workbox(idx)

//     while (true) {
//         if (workbox === -1) return wb_linked_list
//         wb_linked_list.push(workbox.id)
//         if (workbox.next_id == -1) return wb_linked_list
//         workbox = get_workbox(workbox.next_id)
//     }
// }
function set_log_list() {
    for (const log_data of init.Logs) {
        const log = new Log(new Date(log_data.Time), log_data.Content)
        // log.createNode();
        store.log_list.push(log);
    }

}


let init = {
    "Categories": [
        {
            "title": "해야할 일",
            "id": 0,
            // "first_workbox_id": 0,
            "workbox_id_list":[0,1]
        },
        {
            "title": "하고있는 일",
            "id": 1,
            // "first_workbox_id": 2,
            "workbox_id_list":[2]
        },
        {
            "title": "완료한 일",
            "id": 2,
            // "first_workbox_id": -1,
            "workbox_id_list":[]
        }
    ],
    "WorkBoxes": [
        {
            "id": 0,
            "category_id": 0,
            // "next_id": 1,
            "title": "블로그에 포스팅할 것",
            "content": "GitHub 공부내용<br>모던 자바스크립트 공부내용",
            "author": "web"
        },
        {
            "id": 1,
            "category_id": 0,
            // "next_id": -1,
            "title": "GitHub 공부하기",
            "content": "add, commit, push",
            "author": "web"
        },
        {
            "id": 2,
            "category_id": 1,
            // "next_id": -1,
            "title": "HTML/CSS 공부하기",
            "content": "1장 예제 내용 실습",
            "author": "web"
        },
    ],
    "Logs": [//나중에 받을 때, 시간 오름차순
        {
            "Content": "<b>해야할 일(을)를 <b>추가</b>하였습니다.",
            "Time": "Sat Jan 14 2023 21:01:25 GMT+0900 (한국 표준시)",
        },
        {
            "Content": "<b>하고 있는 일(을)를 <b>추가</b>하였습니다.",
            "Time": "Sat Jan 14 2023 21:01:25 GMT+0900 (한국 표준시)",
        },
        {
            "Content": "<b>완료한 일(을)를 <b>추가</b>하였습니다.",
            "Time": "Sat Jan 14 2023 21:01:25 GMT+0900 (한국 표준시)",
        },
        {
            "Content": "<b>해야할 일</b>에 <b>블로그에 포스팅할 것</b>(을)를 <b>등록</b>하였습니다.",
            "Time": "Sat Jan 14 2023 21:01:25 GMT+0900 (한국 표준시)",
        },
        {
            "Content": "<b>해야할 일</b>에 <b>GitHub 공부하기</b>(을)를 <b>등록</b>하였습니다.",
            "Time": "Sat Jan 14 2023 21:01:25 GMT+0900 (한국 표준시)",
        },
        {
            "Content": "<b>하고 있는 일</b>에 <b>HTML/CSS 공부하기</b>(을)를 <b>등록</b>하였습니다.",
            "Time": "Sat Jan 14 2023 21:01:25 GMT+0900 (한국 표준시)",
        },
    ]
};