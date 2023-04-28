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
  const [jurusan, setjurusan] = useState('');
  const [angkatan, setangkatan] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setuserId] = useState('');
  const [userName, setuserName] = useState('');
  const [fotoKtm, setfotoKtm] = useState('');
  const [buktiJoin, setbuktiJoin] = useState('');
  //error handling
  const [errors, setErrors] = useState({});

  // set cookie
  const [cookies, setCookie, removeCookie] = useCookies(['PreulympicForm']);
  // animation
  const navigate = useNavigate();

  const handlenamaChange = (event) => {
    setnama(event.target.value);
  };

  const handleangkatanChange = (event) => {
    setangkatan(event.target.value);
  };

  const handlejurusanChange = (event) => {
    setjurusan(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleuserIdChange = (event) => {
    setuserId(event.target.value);
  };

  const handleuserNameChange = (event) => {
    setuserName(event.target.value);
  };

  const handlefotoKtmChange = (event) => {
    setfotoKtm(event.target.value);
  };

  const handlebuktiJoinChange = (event) => {
    setbuktiJoin(event.target.value);
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
        setCookie('angkatan', angkatan, {path: '/'});
        setCookie('jurusan', jurusan, {path: '/'});
        setCookie('phoneNumber', phoneNumber, {path: '/'});
        setCookie('userId', userId, {path: '/'});
        setCookie('userName', userName, {path: '/'});
        setCookie('fotoKtm', fotoKtm, {path: '/'});
        setCookie('buktiJoin', buktiJoin, {path: '/'});

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
        <div className="preulympic-form-group">
          <label htmlFor="batchAndMajor">Angkatan </label>
          <input
            type="number"
            id="batchAndMajor"
            value={angkatan}
            onChange={handleangkatanChange}
            placeholder="Angkatan "
            autoComplete="off"
            required
            title={errors.angkatan}
          />
          {errors.angkatan && (
            <div className="preulympic-req-error-message">
              {errors.angkatan}
            </div>
          )}
        </div>
        <div className="preulympic-form-group">
          <label htmlFor="batchAndMajor">Jurusan </label>
          <input
            type="text"
            id="batchAndMajor"
            value={jurusan}
            onChange={handlejurusanChange}
            placeholder="jurusan "
            autoComplete="off"
            required
          />
          {errors.jurusan && (
            <div className="preulympic-req-error-message">
              {errors.jurusan}
            </div>
          )}
        </div>
        <div className="preulympic-form-group">
          <label htmlFor="whatsappNumber">No. Telp Whatsapp</label>
          <input
            type="number"
            id="whatsappNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="No. Telp Whatsapp"
            autoComplete="off"
            required
          />
          {errors.phoneNumber && (
            <div className="preulympic-req-error-message">
              {errors.phoneNumber}
            </div>
          )}
        </div>
        <div className="preulympic-form-group">
          <label htmlFor="idplayer">ID Player</label>
          <input
            type="number"
            id="idplayer"
            value={userId}
            onChange={handleuserIdChange}
            placeholder="ID Player"
            autoComplete="off"
            required
          />
          {errors.userId && (
            <div className="preulympic-req-error-message">
              {errors.userId}
            </div>
          )}
        </div>
        <div className="preulympic-form-group">
          <label htmlFor="userNames">Username Player</label>
          <input
            type="text"
            id="userNames"
            value={userName}
            onChange={handleuserNameChange}
            placeholder="Username Player"
            autoComplete="off"
            required
          />
          {errors.userName && (
            <div className="preulympic-req-error-message">
              {errors.userName}
            </div>
          )}
        </div>
        <div className="fotoktm">
          <label htmlFor="ktmPhotos">Foto KTM Player</label>
          <input 
            type="file" 
            id="ktmPhotos" 
            value={fotoKtm}
            onChange={handlefotoKtmChange}
            multiple required 
          />
          {errors.fotoKtm && (
            <div className="preulympic-req-error-message">
              {errors.fotoKtm}
            </div>
          )}
        </div>
        <div className="buktijoin">
          <label htmlFor="buktiJoin">Bukti Join Whatsapp Community Rebel Squad</label>
          <input 
            type="file" 
            id="buktiJoin" 
            value={buktiJoin}
            onChange={handlebuktiJoinChange}
            required 
            className="pilihfile"
          />
          {errors.buktiJoin && (
            <div className="preulympic-req-error-message">
              {errors.buktiJoin}
            </div>
          )}
        </div>
        <button onClick={handleNextButtonClick}>Next</button>
      </div>
    </div>
  );
};