import {initialize_store, initial_render} from "./db/storeController.js"
import add_events from "./events/add_events.js";
import { get_JSONData } from "./db/Fetches.js";


// ( async () => {
//     await get_JSONData();
//     initialize_store();
//     initial_render();
//     add_events()
// })();
get_JSONData().then(()=>{
    initialize_store(); 
    initial_render();
    add_events();
})