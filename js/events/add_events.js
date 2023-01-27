import category_events from "./category_event.js"
import static_events from "./static_event.js"
import workbox_events from "./workbox_event.js";
export default function add_events(){
    static_events()
    category_events();
    workbox_events();
}
