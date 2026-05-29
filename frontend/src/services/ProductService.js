import axios from 'axios';
import {FETCH_ALL_PRODUCTS_URL} from '../config';
import { data, redirect } from 'react-router-dom';
import { act } from 'react';


export default async function getProducts(activeCategory) {

    try {
        //console.log("from product service : ", activeCategory);  
        const queryParams = new URLSearchParams();
        queryParams.append("category", activeCategory);  
        const response = await axios.get(FETCH_ALL_PRODUCTS_URL, { params : queryParams});
        //console.log(response);
        return response;
    }
    catch(err) {
        console.log(err);
        //alert('session expired.');
        //navigation.navigate('/');
    }
}
