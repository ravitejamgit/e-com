import axios from "axios";
import {    FETCH_ALL_USERS,
            UPDATE_USER_STATUS,
            DELETE_USER,
            ORDERS_ALL,
            ORDERS_BY_USER,
            PRODUCTS_ALL,
            PRODUCTS_CATEGORIES,
            PRODUCTS_ADD,
            PRODUCTS_DELETE,
            BUSSINESS_OVERALL,
            BUSSINESS_YEARLY,
            BUSSINESS_MONTHLY,
            BUSSINESS_DAILY 
    } from "../config";



// Products
export async function getAllCategories() {
    try {
        const response = await axios.get(PRODUCTS_CATEGORIES);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function getAllProducts() {
    try {
        const response = await axios.get(PRODUCTS_ALL);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export default async function addProduct(product) {
    try {
        const response = await axios.post(PRODUCTS_ADD, product);
        console.log(response.data);
        return response.status;
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}

export async function deleteProduct(productId) {
    try {
        const response = await axios.delete(PRODUCTS_DELETE, {
            params: {
                id: productId
            }
        });
        console.log(response.data);
    } catch (err) {
        console.log(err);
        throw err;
    }
}


// users
export async function fetchUsers() {
    try {
        const response = await axios.get(FETCH_ALL_USERS);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function updateStatus(status) {
    try {
        const response = await axios.put(UPDATE_USER_STATUS, status);
        return response.status;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteUser(id) {
    try {
        console.log(id);
        const response = await axios.delete(`${DELETE_USER}/${id}`);
        console.log(response);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
    

// Orders
export async function fetchAllOrders() {
    try {
        const response = await axios.get(ORDERS_ALL);
        //console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

   