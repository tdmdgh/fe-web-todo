import { init } from "./storeController.js"

// getData(init).then(()=>console.log(init.category_list));


async function get_JSONData() {
    try {
        await fetch_WorkBoxes();
        // debugger
        await fetch_Categories();
        // debugger
        await fetch_Logs();
        // debugger

        // return init
    }
    catch (error) {
        console.log(error);
    }
}
async function fetch_Categories() {
    await fetch("http://localhost:3000/Categories").then(response => response.json())
        .then(json => {
            // for(const category_json of json){
            //     init.Categories.push(category_json)
            // }
            init.Categories = [...json]
            // return [...json]
        })
}
async function fetch_WorkBoxes() {
    await fetch("http://localhost:3000/WorkBoxes").then(response => response.json()).then(json => {
        // for(const workbox_json of json){
        //     init.WorkBoxes.push(workbox_json)
        // }
        init.WorkBoxes = [...json]
    })
}
async function fetch_Logs() {
    await fetch("http://localhost:3000/Logs").then(response => response.json()).then(json => {
        // for(const log_json of json){
        //     init.Logs.push(log_json)
        // }
        init.Logs = [...json]
    })
}

function post_workbox_server(workbox) {
    fetch("http://localhost:3000/WorkBoxes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: workbox.id,
            category_id: workbox.category_id,
            title: workbox.title,
            content: workbox.content,
            author: workbox.author
        }),
    })
}
function delete_workbox_server(workbox_id) {
    fetch("http://localhost:3000/WorkBoxes/"+workbox_id, {
        method: "DELETE",
    })
}
function patch_category_server({category_id,work_box_id_list}) {
    fetch("http://localhost:3000/Categories/"+category_id, {
        method: 'PATCH',
        body: JSON.stringify({
            workbox_id_list: work_box_id_list,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
}
function post_Log({log_content,log_time}){
    fetch("http://localhost:3000/Logs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Content: log_content,
            Time: log_time,
        }),
    }).then((resp)=>resp.json()).catch((err)=>console.error(err))
    // debugger
}
export {
    get_JSONData, post_workbox_server,patch_category_server,post_Log,delete_workbox_server
}