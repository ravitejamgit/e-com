import {FETCH_PROFILE_URL, PROFILE_UPDATE_USERNAME_URL, PROFILE_UPDATE_EMAIL_URL, PROFILE_UPDATE_PASSWORD_URL} from '../config.js';
import axios from 'axios';


export async function fetchProfile() {
    try{
        const response = await axios.get(FETCH_PROFILE_URL);
        if(response.status === 200) {
            return response.data;
        }
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}

export async function update(field, data) {
    const body = {};
    body[field] = data;
    try {
        const response = await axios.put(field === "password" ? PROFILE_UPDATE_PASSWORD_URL : field === "name" ? PROFILE_UPDATE_USERNAME_URL : PROFILE_UPDATE_EMAIL_URL, body);
        if(response.status === 200) {
            return response.status;
        }
    }
    catch(err) {
        console.lor(err);
        throw(err);
    }
}