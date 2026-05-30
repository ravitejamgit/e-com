import axios from "axios";
import { ADD_ITEM_TO_CART_URL, GET_CARTITEMS_COUNT_URL, GET_ALL_CARTITEMS_URL, UPDATE_CARTITEM_QUANTITY_URL, DELETE_CARTITEM_URL } from "../config";

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


export async function getAllCartItems() {
    try {
        const response = await axios.get(GET_ALL_CARTITEMS_URL);
        // console.log("Get all items response : ", response.data.items);
        //console.log("Response from api: ", response?.data);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}


export async function updateItemQuantity(itemId, quantity) {
    try {
        const response = await axios.put(UPDATE_CARTITEM_QUANTITY_URL, {
            "productId":itemId,
            "quantity": quantity
        });
        return response.status;
    }
    catch(err) {
        console.log(err);
    }
}


export async function deleteItem(itemId) {
    try {
        const response = await axios.delete(DELETE_CARTITEM_URL, {
            data:{
                "productId":itemId
            }
        });
        return response.status;
    }
    catch(err) {
        console.log(err);
    }
}