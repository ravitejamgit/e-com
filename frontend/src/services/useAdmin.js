import addProduct from "./AdminService";

export default function addproducts({ product }) {
    
    try {
        const response = addProduct({ product: product });
    }
    catch(err) {
        console.log(err);
    }
    
}