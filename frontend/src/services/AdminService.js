import axios from "axios";



export default async function addProduct({ product }) {
    try {
        //console.log("product from adminservice : ", product);
        const response = await axios.post('http://localhost:8080/api/admin/addproduct', product);
        console.log('Status : ', response.status);
        console.log('Message : ', response.data.message);
    }
    catch(err) {
        console.log(err);
    }
}