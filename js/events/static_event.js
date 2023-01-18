import { update_logs_time } from "../db/storeController.js";
import Modal from "../model/Modal.js";
export default function static_events() {
    document.addEventListener('click', (e) => {
        // Sidebar event: active
        const menuicon = e.target.closest("#menuicon")
        if (menuicon) sidebar_active_event()

        // Sidebar event: close
        const sidebar_close = e.target.closest("#sidebar_close")
        if (sidebar_close) sidebar_close_event(sidebar_close)

        //FAB event
        const floating_btn = e.target.closest(".floating_btn")
        if (floating_btn) fab_event()
    })
}
function sidebar_active_event() {
    document.getElementById('sidebar').classList.add('active');
    // update_logs_time();
    // const ele0 = document.getElementById('0');
    // const ele2 = document.getElementById('2');

    // ele0.insertAdjacentElement("afterend",ele2);

}
function sidebar_close_event(e) {
    e.closest("#sidebar").classList.remove('active');
}

function fab_event() {
    const modal = new Modal("add",)
    modal.show()
}
