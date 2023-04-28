//React
import React from "react";
import { Link } from "react-router-dom";
import "./Preulympic.scss";
import { Helmet } from "react-helmet-async";


export default function Preulympic() {
  return (<>
    <Helmet>
      <title>Preulympic | UMN Festival 2023</title>
      <meta name="description" content="Home | Click button to register Preulympic UFEST 2023"/>
      <link rel="canonical" href="https://www.umnfestival.com" />
    </Helmet>
    <div id="preulympic">
      <div className="pre-olympic">
        <div className="pre-olympic__logo"></div>
        <div className="pre-olympic__title">
          <h1>Pre-Ulympic</h1>
        </div>
        <div className="pre-olympic__description">
          <p>
            Pre Ulympic merupakan kegiatan UMN Festival yang bertujuan sebagai
            sarana untuk mahasiswa menuangkan bakatnya dalam bidang e-sport
            khususunya mobile legend.
          </p>
        </div>
        <div className="pre-olympic__cta">
          <p>Daftarkan tim mu segera !!!</p>
          <Link to="/PreulympicRegistration" className="btn">
            Daftar Pre-Ulympic
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
