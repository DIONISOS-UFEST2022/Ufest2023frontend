import React, { useRef } from "react";
import "./PreulympicPayment.scss";

const PreulympicPayment = () => {
const fileInputRef = useRef(null);

const handleFileInputChange = () => {
    const file = fileInputRef.current.files[0];
    console.log(file); // 
};

    return (
        <div className="preulympic-payment-container">
            <div className="preulympic-payment-border">
                    <div className="preulympic-payment-logo"></div>
                        <div className="preulympic-payment-title">
                            Pembayaran dilakukan ke no rekening BCA (No Rekening Vajang) A/N Vania Jiang
                        </div>
                    <div className="preulympic-payment-bukti">Bukti Pembayaran</div>
                    <div className="preulympic-payment-file">
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileInputChange}
                        />
                        <button onClick={() => fileInputRef.current.click()}>
                            Choose File
                        </button>
                    </div>
            </div>
                    <div className="preulympic-payment-Submit-button">
                        <button>Submit</button>
                    </div>
        </div>
    );
};

export default PreulympicPayment;
