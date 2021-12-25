import "./registration.css"
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { userContext } from '../../App';
import firebaseConfig from '../config';
import { FormLabel } from "react-bootstrap";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
//initialize fireBase app
let app = initializeApp(firebaseConfig)
const auth = getAuth(app);

const Registration = () => {

    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = ({ name, email, password }) => {
        //create user using firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userInfo = userCredential.user; //get the user information
                updateProfile(auth.currentUser, {
                    //add display name
                    displayName: name //set display name by name which in provided from the registration form

                }).then(() => {
                    userInfo.email && <Navigate replace state={{ message: "Registration successful, You can login now" }} to="/login" /> //then redirect to login page with a message
                })
            })
            .catch((error) => {
                setError(error.message) //set error message
            });

    }


    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error ? <p style={{ color: "red" }}>Server error: {error}</p> : null}
                <FormLabel className="form-label" htmlFor="name">Name</FormLabel>
                <input placeholder="enter name" className="form-control" {...register("name", { required: true })} />
                {errors.name && <span>This field is required</span>}

                <FormLabel className="form-label" htmlFor="name">Email</FormLabel>

                <input placeholder="enter email" className="form-control"  {...register("email", { required: true })} />
                {errors.email && <span>This field is required</span>}

                <FormLabel className="form-label" htmlFor="name">Password</FormLabel>

                <input placeholder="enter password" className="form-control"  {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}
                <input className="btn btn-primary mt-3" type="submit" />

                <p>Have any account register <Link to="/login">Register</Link></p>
            </form>
        </Container>
    );
};


const Container = styled.div`
width: 50vw;
margin: auto;
margin-top: 3rem;

`
export default Registration;