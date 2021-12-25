import React, { useContext, useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Form, Container, Row, Col, Toast } from 'react-bootstrap';
import { userContext } from '../../App';
import { initializeApp } from "firebase/app"
import fireBaseConfig from "../config"
import { setUserItem } from "../Authentication/storageConfig"
import { Link, useNavigate, useLocation } from "react-router-dom"

//initialize fireBase app
let app = initializeApp(fireBaseConfig)
const auth = getAuth(app);

const Login = () => {
    const [user, setUser] = useContext(userContext)
    const [error, setError] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    function locationRedirect() {
        if (location.state?.from) {
            return navigate(location.state.from)
        }
        navigate("/")
    }

    // onchange state 
    const [loginInfo, setLoginInfo] = useState({ email: "", password: "" })
    const { email, password } = loginInfo

    const handleChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value })
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userInfo = userCredential.user;
                setUser({ email: userInfo.email, displayName: userInfo.displayName })
                locationRedirect()
            })
            .catch((error) => {
                setError(error.message)
            });

    }


    const handleGoogleAuth = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                const userInfo = result.user;
                setUser({ email: userInfo.email, displayName: userInfo.displayName })
                locationRedirect()
            }).catch(error => {
                setError(error.message || error.email)
            })
    }

    const handleFacebookAuth = () => {
        const provider = new FacebookAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const userInfo = result.user;
                setUser({ email: userInfo.email, displayName: userInfo.displayName })
                locationRedirect()

            })
            .catch((error) => {
                setError(error.message || error.email)

            })
    }

    useEffect(() => {
        if (user.email) {
            setUserItem(user.email)
        }
    }, [user])


    return (

        < Container style={{ marginTop: "5rem", width: "80vh" }}>
            {location.state?.message ? <Toast>
                <Toast.Body>{location.state.message}</Toast.Body>
            </Toast> : null}
            {error ? <p style={{ color: "red" }}> {error} </p> : null}
            <Row style={{ justifyContent: 'center', alignItems: "center", }}>
                <Col md={8} sm={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={email} onChange={handleChange} type="email" name="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} onChange={handleChange} type="password" name="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <p>Have any account register <Link to="/register">Register</Link></p>

                    <hr />
                    <Button onClick={handleGoogleAuth} className='m-2' variant="primary">
                        Login With Google
                    </Button>
                    <Button onClick={handleFacebookAuth} className='m-2' variant="primary" >
                        Login With Facebook
                    </Button>
                </Col>
            </Row>
        </Container >
    );
};

export default Login;
