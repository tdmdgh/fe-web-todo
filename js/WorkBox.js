import newline2br from "./newline2br.js";
export default function WorkBox(title = "", content = "", time) {
    this.title = title;
    this.content = content;
    this.input_value = ""
    this.textarea_value = ""
    this.author = "web"
    this.time = time;
    this.isRegistable = false;
    this.node;
}
WorkBox.prototype.createNode = function () {
    this.node = document.createElement('li')
    this.node.classList.add("work_box")
    this.node.classList.add("adding")
    this.node.innerHTML =
        `<div class="work_box_row ">
            <div class="work_box_contents ">
                <input type="text" class="work_box_title_input " value="${this.input_value}" placeholder="제목을 입력하세요">
                <textarea rows="1" class="work_box_main_input " value="${this.textarea_value}" placeholder="내용을 입력하세요"
                    onkeydown="resize(this); " onkeyup="resize(this); "></textarea>
                <div class="work_box_title ">${this.title}</div>
                <div class="work_box_main ">${this.content}</div>
                <div class="work_box_author ">author by ${this.author}</div>
            </div>
            <div class="work_box_icon">
                <img src="./icons/box_close_icon.svg" alt="">
            </div>
        </div>
        <div class="work_box_buttons ">
            <button class="add_cancel_button">취소</button>
            <button class="add_register_button">등록</button>
        </div>
            `;
    this.cancel_btn_event();
    this.register_add();
    // this.input_check();
    this.edit();
    this.delete_hover();
    this.delete_btn_event();
}
WorkBox.prototype.register_add = function () {
    const add_register_btn = this.node.querySelector(".add_register_button");
    add_register_btn.addEventListener('click', () => {
        // this.input_value = this.node.querySelector(".work_box_title_input").value;
        // this.textarea_value = this.node.querySelector(".work_box_main_input").value;
        if(!this.isRegistable) return;
        this.title = this.input_value;
        this.content = newline2br( this.textarea_value);//<br>바꿔주기


        const work_box_title = this.node.querySelector(".work_box_title");
        const work_box_main = this.node.querySelector(".work_box_main");

        work_box_title.innerHTML = this.title;
        work_box_main.innerHTML = this.content;

        this.node.classList.remove("adding");
        this.node.classList.remove("editing");
    })
}
WorkBox.prototype.input_check = function () {
    this.node.addEventListener('keydown', () => {
        this.input_value = this.node.querySelector(".work_box_title_input").value;
        this.textarea_value = this.node.querySelector(".work_box_main_input").value;
        console.log(this.input_value);
        console.log(this.textarea_value);
        if (this.input_value.length > 0 && this.textarea_value.length > 0)
            this.isRegistable = true;
        else {
            this.isRegistable = false;
        }
        if(this.isRegistable) {
            this.node.querySelector(".add_register_button").classList.add("ready")
            
        }
        else{
            this.node.querySelector(".add_register_button").classList.remove("ready")
        }
    }
    );
    this.node.addEventListener('keyup', () => {
        this.input_value = this.node.querySelector(".work_box_title_input").value;
        this.textarea_value = this.node.querySelector(".work_box_main_input").value;

        if (this.input_value.length > 0 && this.textarea_value.length > 0)
            this.isRegistable = true;
        else {
            this.isRegistable = false;
        }
        // const add_register_btn = this.node.querySelector(".add_register_button");
        if(this.isRegistable) 
        // this.node.getElementsByClassName('add_register_button')[0].classList.add("ready")
        this.node.querySelector(".add_register_button").classList.add("ready")
        else{
            this.node.querySelector(".add_register_button").classList.remove("ready")
        }
        //console.log(this.node.getElementsByClassName('add_register_button')[0].classList)
    }
    )

    // const textarea = this.node.querySelector(".work_box_main_input");
    // if(this.input_value.length > 0 && this.textarea_value.length>0)
    //     this.isRegistable = true;
    // else{
    //     this.isRegistable = false;
    // }
}
WorkBox.prototype.cancel_btn_event = function () {
    const add_cancel_btn = this.node.querySelector(".add_cancel_button");
    add_cancel_btn.addEventListener('click', () => {
        const is_editing = this.node.classList.contains("editing")            
        if(is_editing){
            console.log("이스에디ㅣ팅?")
            this.node.classList.remove("editing")
            this.node.classList.remove("adding")
            this.input_value = this.title;
            this.textarea_value = this.content;
            this.node.querySelector(".work_box_title_input").value = this.input_value;
            this.node.querySelector(".work_box_main_input").value = this.textarea_value;
            return
        }
        this.node.remove();
    })
}
WorkBox.prototype.edit = function () {
    this.node.addEventListener('dblclick', () => {
        if (!this.node.classList.contains("adding")){
            this.node.classList.add("adding", "editing")
            const regi_btn = this.node.querySelector(".add_register_button");
            regi_btn.innerHTML="수정";
            regi_btn.classList.add("ready");
            // this.node.querySelector(".add_register_button").innerHTML = "수정"
            
            // this.node.querySelector(".work_box_buttons").innerHTML = 
            // `<button class="add_cancel_button">취소</button>
            //  <button class="add_register_button ready">수정</button>`
        }
    })
}
WorkBox.prototype.delete_hover = function () {
    const delete_btn = this.node.querySelector(".work_box_icon");
    
    delete_btn.addEventListener('mouseover', () => {
        console.log('mouseover')
        this.node.classList.add("delete");
    })
    delete_btn.addEventListener('mouseleave', ()=>{
        console.log('mouseleave')

        this.node.classList.remove("delete");
    })
}
WorkBox.prototype.delete_btn_event = function () {
    const delete_btn = this.node.querySelector(".work_box_icon");
    
const modal = document.querySelector('.modal');
    delete_btn.addEventListener('click', () => {
        console.log("ghkdlskjf")
        modal.style.display = 'block';
    })
}
WorkBox.prototype.remove = function () {
    console.log();
}
WorkBox.prototype.create_log = function () {
    console.log();
}

//   const ho = new WorkBox("crong", "12:12");
//   ho.showHealth();

