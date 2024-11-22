import React from 'react';
import './Preset.scss';

const Preset = ({ pictureUrl, title, video }) => {
  const isDark = true;

  return (
    <div className={isDark ? "experience-card-dark" : "experience-card"}>
      <div className="experience-banner">
        <div className="experience-blurred_div"></div>
        <div className="experience-div-company">
          <h5 className="experience-text-company">{title}</h5>
        </div>

        <img
          className="experience-roundedimg"
          src={pictureUrl}
        />
      </div>
     
      </div>
  );
}

export default Preset