import React, { useState, useEffect } from "react";
import "./PreulympicRegistration.scss";
import { validation } from "./validationUlympic";
// import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
// import { Formik } from "formik";
// import { postRequest } from "../../../Reusable/Service/AxiosClient";
// import { savePreUlympicRegistration  } from "../../../Redux/features/users/preUlympic/preUlympicDataSlice"
// import { UpostRequest } from "../../../Reusable/Service/AxiosClient";
import { postPreUlympicRegistration } from "../../../Reusable/Service/AxiosClient";
import { useCookies } from 'react-cookie';

export default function PreulympicRegistration() {
    // saving input
    const [teamName, setTeamName] = useState('');
    const [numberOfPlayers, setNumberOfPlayers] = useState('');
    // error handling
    const [errors, setErrors] = useState({});

    //set cookie
    const [cookies, setCookie, removeCookie] = useCookies(['PreulympicRegistration']);
    // animation
    const navigate = useNavigate();

    const handleTeamNameChange = (event) => {
      setTeamName(event.target.value);
    };

    const handleNumberOfPlayersChange = (event) => {
      setNumberOfPlayers(event.target.value);
    };
    // const dispatch = useDispatch();
    const handleNextButtonClick = () => {
      validation
        .validate(
          { teamName, numberOfPlayers },
          //menampilkan semua error sekaligus pada saat validasi gagal
          { abortEarly: false }
        )
        .then(() => {
          setCookie('namaTim', teamName, {path: '/'});
          setCookie('jumlahAnggota', numberOfPlayers, {path: '/'});
        
        //   // Send data to server
        // axios.post('/pre-olympic-registration', {
        //   teamName: cookies.namaTim,
        //   numberOfPlayers: cookies.jumlahAnggota
        // })
        // .then((response) => {
        //   // Handle response from server
        //   console.log(response);
        // })
        // .catch((error) => {
        //   // Handle error
        //   console.log(error);
        // });
        
          // Pindah ke halaman selanjutnya
          navigate('/PreulympicRebelSquad');
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
    <div className="preulympic-req-container">
      <div className="preulympic-req-page">
        <div className="preulympic-req-logo"></div>
          <div className="preulympic-req-group">
            <label htmlFor="teamName">
              Nama Tim (Berdasarkan bahasa yunani)
            </label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={handleTeamNameChange}
            placeholder="Nama Tim"
            autoComplete="off"
            pattern="[A-Za-z\s]+"
            required
          />
          {errors.teamName && (
            <div className="preulympic-req-error-message">
              {errors.teamName}
            </div>
          )}
        </div>
        <div className="preulympic-req-group">
          <label htmlFor="numberOfPlayers">Jumlah Pemain:</label>
          <input
            type="number"
            placeholder="Jumlah Player 5 - 7"
            id="numberOfPlayers"
            value={numberOfPlayers}
            onChange={handleNumberOfPlayersChange}
            autoComplete="off"
            required
            title={errors.numberOfPlayers}
          />
          {errors.numberOfPlayers && (
            <div className="preulympic-req-error-message">
              {errors.numberOfPlayers}
            </div>
          )}
        </div>
        <button onClick={handleNextButtonClick}>Next</button>
      </div>
    </div>
  );
};