// Styling
import "./Login.scss";
import { Box, CircularProgress,} from "../../../Reusable/MaterialUICoreLazy/MaterialUICoreLazy";
import Alert from '@mui/material/Alert';
import { Divider } from "@mui/material";
import Button from "../../../Reusable/Button/Button.jsx";
import { Formik } from "formik";
import { Loginschema } from "./LoginSchema";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userRoleAdded } from "../../../Redux/features/users/userRoleSlice";
import { postRequest } from "../../../Reusable/Service/AxiosClient";
import { useNavigate, Navigate } from "react-router-dom";
import { setCookie } from "react-use-cookie";
import Pilar from "../../../Reusable/ComponentItems/Pilar/Pilar";
import { CustomTextField } from "../../../Reusable/TextField/CustomTextField";
import { Helmet } from "react-helmet-async";
import Sparkles from "../../../Reusable/Animation/Sparkle/Sparkle";

// this is main function
export default function Login() {
    // state
    useEffect(() => {
        setCookie('login', 'login', { path: '/' });
        window.scrollTo(0, 0)
    }, []);
    const [loading, Setloading] = useState(false);
    // error handling
    const [error, Seterror] = useState();
    const [errorText, SeterrorText] = useState("");
    const dispatch = useDispatch();
    // animation
    const navigate = useNavigate();

    // return here
    return (
        <>
            {/* Helmet for SEO opt */}
            <Helmet>
                <title>Login | UMN Festival 2023</title>
                <meta name="description" content="Login | Login now to complete your journey sparta!" />
                <link rel="canonical" href="https://www.umnfestival.com/login" />
            </Helmet>
            {/* Login start here */}
            <Formik
                validationSchema={Loginschema}
                initialValues={{
                    email: "",
                    password: ""
                }}
                onSubmit={(values) => {
                    Setloading(true);
                    async function login() {
                        try {
                            await postRequest('login', {
                                email: values.email,
                                password: values.password
                            }).then((res) => {
                                console.log(res);
                                if (res.status === 201) {
                                    if (res.data.user.role_id === 1) {
                                        dispatch(userRoleAdded("admin"));
                                        localStorage.setItem('LoginID', res.data.login_token);
                                        localStorage.setItem('Email', res.data.user.email);
                                        Setloading(false);
                                        navigate('/admin/database');
                                        window.location.reload();
                                    } else if (res.data.user.role_id === 2) {
                                        dispatch(userRoleAdded("user"));
                                        localStorage.setItem('LoginID', res.data.login_token);
                                        localStorage.setItem('Email', res.data.user.email);
                                        Setloading(false);
                                        navigate('/');
                                        window.location.reload();
                                    } else {
                                        Setloading(false);
                                        SeterrorText(error.response.data.message);
                                        Seterror(true);

                                    }
                                } else {
                                    Setloading(false);
                                    SeterrorText(error.response.data.message);
                                    Seterror(true);
                                }
                            })
                        } catch (error) {
                            console.log(error);
                            SeterrorText(error.response.data.message);
                            Setloading(false);
                            Seterror(true);
                        }
                    }
                    login();
                }}
            >
                {({
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                }) => (
                    <div id="Login"><Pilar />
                        {error === true && loading === false ?
                            <Alert severity="error" sx={{
                                margin: '10px',
                                width: '80%',
                                position: 'absolute',
                                top: '8vh',
                                zIndex: '4',
                            }}>
                                {errorText ? errorText : "Error"}
                            </Alert>
                            : ""}
                        <Box className="form" paddingX={["20px", "30px", "45px"]}>
                            <form noValidate onSubmit={handleSubmit}>
                                {/* Title */}
                                <Box className="Title" fontSize={["35px", "40px", "45px"]}>WELCOME BACK!</Box>
                                {/* Sub Title */}

                                <Box className="Subtitle" fontSize={["10px", "10px", "15px"]}> Let's grow together with UFEST!</Box>
                                <Divider className="Divider" />
                                <CustomTextField
                                    id="email"
                                    name="email"
                                    label="Email Student UMN"
                                    placeholder="Enter UMN student email "
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <p className="error">
                                    {errors.email && touched.email && errors.email}
                                </p>
                                <CustomTextField
                                    type={"password"}
                                    id="password"
                                    name="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                />
                                <p className="error">
                                    {errors.password && touched.password && errors.password}
                                </p>
                                <br />
                                <div className="center">
                                    <Button
                                        type="submit"
                                        disabled={!(errors.email === undefined && errors.password === undefined) || (loading === true)}
                                        onClick={handleSubmit}
                                    >
                                        {loading ? (<CircularProgress
                                            size={24}
                                            sx={{
                                                width: '10px',
                                            }}
                                        />) : "Login"}
                                    </Button>
                                </div>
                            </form>
                            <br />
                            <Box className="center bold" fontSize={["13px", "14px", "15px"]}>
                                Don't have account?&nbsp;
                                <p className="purple underline" onClick={() => {
                                    navigate('/register')
                                }}>
                                    <Sparkles>
                                        Register Now!
                                    </Sparkles>
                                </p>
                            </Box>
                        </Box>
                    </div>
                )
                }
            </Formik >
        </>
    );
}
