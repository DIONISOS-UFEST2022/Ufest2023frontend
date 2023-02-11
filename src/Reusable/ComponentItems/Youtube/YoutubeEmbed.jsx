import React from "react";
import PropTypes from "prop-types";
import "./Youtube.scss";


const YoutubeEmbed = ({ embedId }) => (
    <div className="video-responsive">
        <iframe
            // width="853"
            // height="180"
            className="video-responsive-item"
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;