import axios from 'axios';
import {FETCH_ALL_PRODUCTS_URL} from '../config';
import { data, redirect } from 'react-router-dom';


export default async function getProducts() {
    try {
        
        const response = await axios.get(FETCH_ALL_PRODUCTS_URL);
        //console.log(response);
        return response;
    }
    catch(err) {
        console.log(err);
        alert('session expired.');
        navigation.navigate('/');
    }
}
