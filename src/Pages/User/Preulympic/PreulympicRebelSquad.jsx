import React from "react";
import "./PreulympicRebelSquad.scss";
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function PreulympicRebelSquad(){
  // navigasi onclick pindah page
  const navigate = useNavigate();
  const navigateToForm = () => {
    navigate('/PreulympicForm');
  };

  return (
    <div className="preulympic-rebel-squad-container">
      <div className="preulympic-rebel-squad-border">
        <div className="preulympic-rebel-squad-logo"></div>
            <div className="preulympic-rebel-squad-title">
              Pastikan setiap peserta bergabung ke dalam group Whatsapp Community <strong>Rebel Squad</strong> dengan mengclick tombol di bawah
            </div>
              <a className="preulympic-rebel-squad-button" 
                  //taro nomornya nya dibawah
                  href="https://wa.me/">
                  Join Rebel Squad Group
              </a>
            <div className="preulympic-rebel-squad-next-button">
              <button onClick={navigateToForm}>Next</button>
            </div>      
      </div>
    </div>
  );
};