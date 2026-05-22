import { useEffect, useState } from "react";
import getProducts from "./ProductService";



export default function useProduct() {
   const [products, setProducts] = useState([]);

   useEffect(() => {
        const fetched = async () => {
            console.log("get products is being called...")
            const data = await getProducts();
            console.log("from useproduct : ", data.data);
            setProducts(data);
        }
        fetched();
   }, []);

   console.log(products);
   return products;
}