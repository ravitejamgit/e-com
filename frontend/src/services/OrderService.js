import { FETCH_ALL_ORDERS } from "../config";
import axios from "axios";


export default async function fetchAllOrders() {
    try {
        const response = await axios.get(FETCH_ALL_ORDERS);
        if(response.status === 200) {
            return response.data;
        }
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}