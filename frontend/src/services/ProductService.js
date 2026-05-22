import axios from 'axios';
import {FETCH_ALL_PRODUCTS_URL} from '../config';
import { data } from 'react-router-dom';


export default async function getProducts() {
    try {
        const response = await axios.get(FETCH_ALL_PRODUCTS_URL);
        console.log(response.data);
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
}
