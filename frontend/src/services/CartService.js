import axios from "axios";
import { ADD_ITEM_TO_CART_URL, GET_CARTITEMS_COUNT_URL, GET_ALL_CARTITEMS_URL, UPDATE_CARTITEM_QUANTITY_URL, DELETE_CARTITEM_URL, CREATE_ORDER_ID, VERIFY_SIGNATURE } from "../config";
import { useNavigation } from "react-router-dom";


export async function getCount() {
    try {
        const response = await axios.get(GET_CARTITEMS_COUNT_URL);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}


export async function addProductToCart(itemId) {
    try {
        const response = await axios.post(ADD_ITEM_TO_CART_URL, {
            "productId":itemId
        });
        //console.log(response);
        return response.status;
    }   
    catch(err) {
        console.log(err);
    }
}


export async function getAllCartItems() {
    try {
        const response = await axios.get(GET_ALL_CARTITEMS_URL);
        // console.log("Get all items response : ", response.data.items);
        //console.log("Response from api: ", response?.data);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}


export async function updateItemQuantity(itemId, quantity) {
    try {
        const response = await axios.put(UPDATE_CARTITEM_QUANTITY_URL, {
            "productId":itemId,
            "quantity": quantity
        });
        return response.status;
    }
    catch(err) {
        console.log(err);
    }
}


export async function deleteItem(itemId) {
    try {
        const response = await axios.delete(DELETE_CARTITEM_URL, {
            data:{
                "productId":itemId
            }
        });
        return response.status;
    }
    catch(err) {
        console.log(err);
    }
}


export async function payment(totalCheckOutCost) {
    return new Promise(async (resolve, reject) => {
        try {
            // loading script
            // const isScriptLoaded = await loadRazorpayScript();

            // if(!isScriptLoaded) {
            //     alert("Razorpay SDK failed to load.");
            //     return;
            // }

            // Create order id
            const orderIdApiResponse = await axios.post(CREATE_ORDER_ID, {
                "total_amount":totalCheckOutCost
            });
            const amount = orderIdApiResponse.data.amount;
            const orderId = orderIdApiResponse.data.order_id;
            const razorpayKeyId = orderIdApiResponse.data.key_id;

            //console.log(amount, typeof amount, razorpayKeyId, typeof razorpayKeyId, orderId, typeof orderId);
            
            // razorpay options
            const options = {
                key: razorpayKeyId,
                amount: amount,
                currency: "INR",
                name: "CoreNest",
                description: "Test Transaction",
                order_id: orderId,
                handler: async function (response) {
                    try {
                        // payment success, verify backend
                        console.log(response);
                        const verifyResponse = await axios.post(VERIFY_SIGNATURE, {
                            "razorpay_order_id" : response.razorpay_order_id,
                            "razorpay_payment_id" : response.razorpay_payment_id,
                            "razorpay_signature" : response.razorpay_signature

                        });
                        if(verifyResponse.status == 200) {
                            resolve({ success : true, data : verifyResponse.data });
                        }
                        else {
                            resolve({ success: false, reason: "Verification failed."});
                        }
                    }
                    catch(err) {
                        console.log(err);
                        reject(err);
                    }
                },
                prefill: {
                    name: "testing",
                    email: "test@gmail.com",
                    contact: "9876543210"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();


        }
        catch(err) {
            console.log("Error during checkout..", err);
            reject(err);
        }
    })
}