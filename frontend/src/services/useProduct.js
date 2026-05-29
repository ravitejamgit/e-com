import { useEffect, useState } from "react";
import getProducts from "./ProductService";
import { useNavigate } from "react-router-dom";



export default function useProduct(activeCategory) {
   const [products, setProducts] = useState([]);
   const [user, setUser] = useState('');
   const navigate = useNavigate();

   useEffect(() => {
        const fetched = async () => {
            try {
               //console.log("get products is being called...")
               const response = await getProducts(activeCategory, navigate);
               // console.log("from useproduct : ", response.data.products);
               // console.log("users data", response?.data?.user);
               setProducts(response?.data?.products || []);
               setUser(response.data.user);
            }
            catch(err) {
               console.log(err);
            }
        }
        fetched();
   }, [activeCategory]);

//   console.log(products);
//   console.log(user);
   return [products, user];
}