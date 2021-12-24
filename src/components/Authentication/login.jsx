import React, { useContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, updateProfile, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { userContext } from '../../App';
import { initializeApp } from "firebase/app"
import fireBaseConfig from "../config"
import { setUserItem } from "../Authentication/storageConfig"


// import { useNavigate,useLocation} from "react-router-dom"
//initialize fireBase app
let app = initializeApp(fireBaseConfig)
const auth = getAuth(app);

const Login = () => {
    // removeUserItem()
    const [user, setUser] = useContext(userContext)
    const [error, setError] = useState('')
    const [loginInfo, setLoginInfo] = useState({ email: "", password: "", username: "" })

    const handleChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value })
    }

    const { email, password, username } = loginInfo



    const handleSubmit = (event) => {
        event.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userInfo = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: username
                }).then(() => {
                    setUser({ email: userInfo.email, displayName: userInfo.displayName })
                    setUserItem(user.email)

                })
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
                setUserItem(user.email)
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
                setUserItem(user.email)

            })
            .catch((error) => {
                setError(error.message || error.email)

            })
    }


    return (

        < Container style={{ marginTop: "5rem", width: "80vh" }}>
            {error ? <p style={{ color: "red" }}> {error} </p> : null}
            <Row style={{ justifyContent: 'center', alignItems: "center", }}>
                <Col md={8} sm={8}>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name :</Form.Label>
                            <Form.Control value={username} onChange={handleChange} type="text" name="username" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={email} onChange={handleChange} type="email" name="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} onChange={handleChange} type="password" name="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
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
