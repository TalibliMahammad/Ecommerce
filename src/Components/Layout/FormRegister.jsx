import React, { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleRegister } from '../../Redux/CreateSlice/AuthSlice';
import { ThreeDot } from 'react-loading-indicators';
import { MoonLoader, PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
const FormRegister = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ShowDot, setShowDot] = useState(false)


    const validationSchema = Yup.object({
        name: Yup.string()
            .trim()
            .min(5, 'Name must be at least 5 characters')
            .required('Name is required'),
        email: Yup.string()
            .trim()
            .email('Invalid email address')
            .required('Email is required'),

        password: Yup.string()
            .trim()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),

    })

    return (


        <>
         {ShowDot && (
                    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999]">
                        <PulseLoader color="rgba(30, 179, 77, 1)" />
                    </div>
                )}
        <Formik

            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setShowDot(true);
                dispatch(handleRegister(values));
                setTimeout(() => {
                    navigate("/login");
                    setSubmitting(false);
                }, 5000);

            }}
        >

            {({


                values,
                errors,
                touched,
                submitCount,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (

                <form className='flex flex-col justify-between  gap-8  h-full' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Name"
                        className={`border-b p-2 rounded outline-none transition-all duration-300 ${(submitCount > 0 || touched.name) && errors.name ? 'border-red-500 text-red-500' : 'border-gray-400'
                            } focus:border-blue-500`}
                    />
                 {(submitCount > 0 || touched.name) && errors.name && (
                        <div className="text-red-500 text-sm">{errors.name}</div>
                    )}
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                         placeholder="Email"
                        className={`border-b p-2 rounded outline-none transition-all duration-300 ${(submitCount > 0 || touched.email) && errors.email ? 'border-red-500 text-red-500' : 'border-gray-400'
                            } focus:border-blue-500`}
                    />
                    {(submitCount > 0 || touched.email) && errors.email && (
                        <div className="text-red-500 text-sm">{errors.email}</div>
                    )}


                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                         placeholder="Password"
                        className={`border-b p-2 rounded outline-none transition-all duration-300 ${(submitCount > 0 || touched.password) && errors.password ? 'border-red-500 text-red-500' : 'border-gray-400'
                            } focus:border-blue-500`}
                    />
                    {(submitCount > 0 || touched.password) && errors.password && (
                        <div className="text-red-500 text-sm">{errors.password}</div>
                    )}

                    <div className=' bg-red-400 mt-10 cursor-pointer relative h-15 rounded-2xl text-white flex justify-center '>



                        <button type="submit" disabled={isSubmitting} >
                            Submit
                        </button>
                     
                    </div>


                </form>
            )
            }

        </Formik >
        </>

    )
}










export default FormRegister;