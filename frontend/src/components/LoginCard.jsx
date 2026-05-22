import React, { useState } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitBtn';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../config';

const validate = ({ email, password }) => {
    const errors = {};

    if(!email.trim()) {
        errors.email = "Email is required.";
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Enter a valid email address.";
    }

    if(!password) {
        errors.password = "Password is required.";
    }

    return errors;
}


export default function LoginCard() {
    const navigate = useNavigate();
    const [fields, setFields] = useState({
        email:"",
        password:""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    const handleChange = (key) => (e) => {
        setFields((prev) => ({
            ...prev,
            [key]:e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(fields);
        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        
        // Api call
        try {
            await axios.post(LOGIN_URL, {
                email: fields.email,
                password: fields.password
            }, {
                withCredentials: true
            }).then(response => {
                //console.log(response?.data);
                if(response.data.role === "ADMIN")
                    navigate('/admin');
                else 
                    navigate('/dashboard');
            }).catch(err => {
                //console.log(err.response);
                setErrors({ api: err.response?.data?.error || "Error from server." })
            })
        }catch(err) {
            setErrors({api : err.error || "Error from server123"})
        }
        finally {
            setLoading(false);
        }
    }
 
    return (
        <div className='card'>
            <div className='card__header'>
                <h2 className='card__title'>Login</h2>
            </div>
            <form onSubmit={handleSubmit} className='card__form' noValidate>

                {
                    errors.api && (
                        <p className="card__api-error">{errors.api}</p>
                    )
                }

                <InputField
                    label= 'Email'
                    id='email'
                    type = 'text'
                    value = {fields.email}
                    onChange={ handleChange('email') }
                    error = { errors.email }
                    placeholder='email here'
                />


                <InputField
                    label="Password"
                    id="password"
                    type="password"
                    value={ fields.password }
                    onChange={ handleChange('password') }
                    error={ errors.password }
                    placeholder="......"
                    showToggle
                />
                
                <SubmitButton loading={loading} label='Login' />

            </form>
            <div className='card__prompt'>
                <p>don't have an account? <a href='/register' className='card__prompt-link'>Register here.</a></p>
            </div>
        </div>
    )
}