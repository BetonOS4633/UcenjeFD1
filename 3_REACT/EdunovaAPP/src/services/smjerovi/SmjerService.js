import { smjerovi } from "./smjerPodaci";

// 1/4 Read od CRUD-a - Create, Read, Update, Delete
async function get() {
    return{data:smjerovi}
}


export default {
    get
}
