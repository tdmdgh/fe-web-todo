import {initialize_store, initial_render} from "./db/storeController.js"
import add_events from "./events/add_events.js";


import { generate_workbox_id } from "./db/storeController.js";


initialize_store();
initial_render();
add_events()

// console.log(generate_workbox_id())