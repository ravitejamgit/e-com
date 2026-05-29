import { useEffect, useState } from "react";
import getProducts from "./ProductService";



export default function useProduct(activeCategory) {
   const [products, setProducts] = useState([]);
   const [user, setUser] = useState('');
   useEffect(() => {
        const fetched = async () => {
            //console.log("get products is being called...")
            const response = await getProducts(activeCategory);
            // console.log("from useproduct : ", response.data.products);
            // console.log("users data", response?.data?.user);
            setProducts(response?.data?.products || []);
            setUser(response.data.user);
        }
        fetched();
   }, [activeCategory]);

//   console.log(products);
//   console.log(user);
   return [products, user];
}