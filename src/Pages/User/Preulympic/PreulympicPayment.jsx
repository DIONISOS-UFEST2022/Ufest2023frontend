import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRequest, patchRequest, postRequest } from "../../../Reusable/Service/AxiosClient";
import { useNavigate, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./PreulympicPayment.scss";
import { Formik } from "formik";
import { Loginschema } from "./PreulympicSchema";
import { Box } from "../../../Reusable/MaterialUICoreLazy/MaterialUICoreLazy";
import { PreulympicButton as Button } from "./Components/Button/PreulympicButton";
import FileInput from "./Components/FileInput/FileInput";
import { setCookie, getCookie } from "react-use-cookie";
import Error from "./Components/Error/Error";
import compressImage from "../../../Reusable/ImageCompressor/ImageCompressor";


function PreulympicPayment() {
    // animation
    const [loading, setLoading] = useState(false);
    // return here
    const fileTypes = ["jpg", "png"];
    // const [id, setId] = useState(0);
    const navigate = useNavigate();
    const [error, Seterror] = useState(false);
    const [errorText, SeterrorText] = useState("");
    useEffect(() => {
        setCookie("Preulmstate", 3);
    })

    return (
        <>
            <Formik
                validationSchema={Loginschema}
                initialValues={{
                    buktiPembayaran: "",
                }}
                onSubmit={(values) => {
                    // var id = 0;
                    // setLoading(true);
                    // // formData.append("buktiPembayaran", values.buktiPembayaran);
                    // const formData = new FormData();
                    // async function Submit2() {
                    //     // console.log("this is " + id);
                    //     try {
                    //         console.log(formData.get("buktiPembayaran"));
                    //         await postRequest(`ulympic/${id}?_method=PATCH`, formData).then((res) => {
                    //             setCookie("Preulm", 1212312, {
                    //                 expires: 99,
                    //                 path: "/",
                    //             })
                    //             navigate("/");
                    //         })
                    //     } catch (error) {
                    //         Seterror(true);
                    //         SeterrorText("An Error Occured");
                    //         setLoading(false);
                    //         console.log(error);
                    //     }
                    // }
                    // async function Submit() {
                    //     const token = getCookie("Preulmtoken");
                    //     try {
                    //         const buktiPembayaranCompressed = await compressImage(values.buktiPembayaran);
                    //         formData.append("buktiPembayaran", buktiPembayaranCompressed);
                    //         await getRequest(`ulympic/find/${token}`).then((res) => {
                    //             id = res.data.data.id;
                    //             Submit2();
                    //         })
                    //     } catch (error) {
                    //         // confirm.log(" ini error");
                    //         Seterror(true);
                    //         SeterrorText("An Error Occured");
                    //         console.log(error);
                    //     }

                    // }
                    // Submit();
                    setLoading(true);
                    async function Submit() {
                        let tokenID = getCookie("Preulmtoken");
                        const formData = new FormData();
                        try {
                            console.log(tokenID);
                            const buktiPembayaranCompressed = await compressImage(values.buktiPembayaran);
                            formData.append("buktiPembayaran", buktiPembayaranCompressed);
                            // ulympic/update/gnZvi71zW2wlPWb?_method=PATCH
                            console.log(formData.get("buktiPembayaran"));
                            await postRequest(`ulympic/update/${tokenID}?_method=PATCH`, formData).then((res) => {
                                setLoading(false);
                                console.log(res);
                                setCookie("Preulm", 1212312, {
                                    expires: 99,
                                    path: "/",
                                })
                                navigate("/");
                            })
                        } catch (error) {
                            setLoading(false);
                            Seterror(true);
                            console.log(error);
                        }
                    }
                    Submit();
                }}
            >
                {({
                    values,
                    setFieldValue,
                    handleSubmit,
                    handleChange,
                }) => (
                    <div>
                        <Box>
                            <form className="" noValidate onSubmit={handleSubmit}>
                                <div className="preulympic-payment">
                                    <div className="preulympic-payment-container">
                                        <Error error={error} errorText={errorText} loading={loading} />
                                        <div className="preulympic-payment-border">
                                            <div className="preulympic-payment-logo"></div>
                                            <div className="preulympic-payment-title">
                                                Pembayaran dilakukan ke nomor rekening 7615580589 (BCA) A/N VANIA JIANG

                                                Sejumlah Rp 70.000,00 untuk single slot
                                                Rp 70.000,00 + Rp 80.000,00 untuk multi slot
                                            </div>
                                            <div className="preulympic-payment-bukti">Bukti Pembayaran</div>
                                            {/* <FileInput
                                                onChange={handleChange}
                                                name="file"
                                                values={values.file}
                                                status={values.file ? true : false}
                                            /> */}
                                            {/* <input
                                                className={`input ${values.file ? "inputtrue" : ""}`}
                                                onChange={e => {
                                                    handleChange
                                                    setFieldValue("buktiPembayaran", e.currentTarget.files[0]);
                                                }}
                                                type="file"
                                                accept='image/*'
                                                id="file"
                                                // value={values.file}
                                                name="file"
                                                maxFileSize={5000000}
                                            /> */}


                                            <input
                                                className={`input ${values.buktiPembayaran ? "inputtrue" : ""}`}
                                                onChange={e => {
                                                    handleChange
                                                    setFieldValue("buktiPembayaran", e.currentTarget.files[0]);
                                                }}
                                                type="file"
                                                accept='image/*'
                                                id={"buktiPembayaran"}
                                                // value={values.fotoKtm ? true : false}
                                                name={"buktiPembayaran"}
                                                maxFileSize={5000000}
                                            />

                                            <Button
                                                loading={loading}
                                                disabled={loading || !values.buktiPembayaran}
                                                action={handleSubmit}>Submit</Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Box>
                    </div>)
                }
            </Formik >
        </>
    );
}

export default PreulympicPayment;