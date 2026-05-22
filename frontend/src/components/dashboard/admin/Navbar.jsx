import React from 'react'
import { useState } from 'react';
import InputField from '../../InputField';
import addproducts from '../../../services/useAdmin';



export default function Navbar({ user }) {

    const [fields, setFields] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        url: ''
    });

    const handleChange = (key) => (e) => {
        setFields((prev) => ({
            ...prev,
            [key]: e.target.value
        }))
        //console.log(fields);
    };

    const handleSubmit = () => {
        
        //console.log(fields);
        addproducts({product : fields});
    }

    const [addProductCard, setAddProductCard] = useState(false);


    

    return (
        <div>
            {/* Nav bar with name and logout button */}
            <div>
                <span><h1>{ user }</h1></span>
                <button>Logout</button>
            </div>
            {/* Body section */}
            <div>
                {/* Leftside vertical navbar */}
                <div>
                    <button onClick={() => setAddProductCard(true) }>Add Product</button>
                </div>
                {/* Display section */}
                <div>
                    <div>
                        { addProductCard && (
                            
                            <>
                            <InputField
                                label="Name"
                                id="name"
                                type="text"
                                value={fields.name}
                                onChange={handleChange("name")}
                                error={null}
                                placeholder=""
                            />
                            <InputField
                                label="Description"
                                id="description"
                                type="text"
                                value={fields.description}
                                onChange={handleChange("description")}
                                error={null}
                                placeholder=""
                            />
                            <InputField
                                label="Price"
                                id="price"
                                type=""
                                value={fields.price}
                                onChange={handleChange("price")}
                                error={null}
                                placeholder=""
                            />
                            <InputField
                                label="Stock"
                                id="stock"
                                type="Integer"
                                value={fields.stock}
                                onChange={handleChange("stock")}
                                error={null}
                                placeholder=""
                            />
                            <label>Category</label>
                            <select id='category' value={fields.category} onChange={ handleChange('category')}>
                                <option value=""></option>
                                <option value="rams">Rams</option>
                                <option value="harddisk">HDD</option>
                            </select>
                            <InputField
                                label="Image Url"
                                id="url"
                                type="text"
                                value={fields.url}
                                onChange={handleChange("url")}
                                error={null}
                                placeholder=""
                            />
                            <button onClick={() => handleSubmit() }>Submit</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
