import axios from "axios";
import { ADD_ITEM_TO_CART_URL, GET_CARTITEMS_COUNT_URL } from "../config";

export async function getCount() {
    try {
        const response = await axios.get(GET_CARTITEMS_COUNT_URL);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}


export async function addProductToCart(itemId) {
    try {
        const response = await axios.post(ADD_ITEM_TO_CART_URL, {
            "productId":itemId
        });
        //console.log(response);
        return response.status;
    }   
    catch(err) {
        console.log(err);
    }
}

