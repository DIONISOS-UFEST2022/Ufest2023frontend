import React, { useState, useEffect } from "react";
import "./PreulympicForm.scss";
import { validation } from "./validationForm";
// import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
// import { Formik } from "formik";
// import { postRequest } from "../../../Reusable/Service/AxiosClient";
import { savePreUlympicRegistration  } from "../../../Redux/features/users/preUlympic/preUlympicDataSlice"
// import { UpostRequest } from "../../../Reusable/Service/AxiosClient";
import { useCookies } from 'react-cookie';

export default function PreulympicForm (){
  // input
  const [nama, setnama] = useState('');

  //error handling
  const [errors, setErrors] = useState({});

  // set cookie
  const [cookies, setCookie, removeCookie] = useCookies(['PreulympicForm']);
  // animation
  const navigate = useNavigate();

  const handlenamaChange = (event) => {
    setnama(event.target.value);
  };

  const handleNextButtonClick = () => {
    validation
      .validate(
        { nama, angkatan, 
          jurusan, phoneNumber, 
          userId, userName, 
          fotoKtm, buktiJoin
        },
        //menampilkan semua error sekaligus pada saat validasi gagal
        {abortEarly: false}
      )
      .then(() => {
        // console.log(".then nih");
        setCookie('nama', nama, {path: '/'});

        navigate('/PreulympicPayment');
      })
      .catch((validationErrors) => {
        const errors = {};
        if (validationErrors && validationErrors.inner) {
          validationErrors.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
        }
        setErrors(errors);
      });
  };

  return (
    <div className="preulympic-form-container">
      <div className="preulympic-form-page">
        <div className="preulympic-form-logo"></div>
        <div className="preulympic-form-group">
          <label htmlFor="nama">Nama Player</label>
          <input
            type="text"
            id="nama"
            value={nama}
            onChange={handlenamaChange}
            placeholder="Nama Player"
            autoComplete="off"
            required
          />
          {errors.nama && (
            <div className="preulympic-req-error-message">
              {errors.nama}
            </div>
          )}
        </div>
        <button onClick={handleNextButtonClick}>Next</button>
      </div>
    </div>
  );
};