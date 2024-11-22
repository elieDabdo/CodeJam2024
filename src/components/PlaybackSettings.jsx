import React, { useState } from 'react';
import { Switch, Row, Col } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles

function PlaybackSettings(
    {setTrainingVideoMaximized,
        setDrawCamSkelOnCam,
        setDrawCamSkelOnVid,
        setDrawVidSkelOnCam,
        setDrawVidSkelOnVid}
        ) {
    // State to manage the toggle button values
    const [toggleValues, setToggleValues] = useState({
      toggle1: true,
      toggle2: true,
      toggle3: true,
    });

    setTrainingVideoMaximized(toggleValues.toggle1)
    setDrawVidSkelOnCam(toggleValues.toggle2);
    setDrawVidSkelOnVid(toggleValues.toggle2);
    setDrawCamSkelOnCam(toggleValues.toggle3);
    setDrawCamSkelOnVid(toggleValues.toggle3);
  
    // Function to handle toggle button changes
    const handleToggleChange = (toggleName) => {
      setToggleValues((prevValues) => ({
        ...prevValues,
        [toggleName]: !prevValues[toggleName],
      }));
      if (toggleName === 'toggle1') setTrainingVideoMaximized(toggleValues.toggle1);

      if (toggleName === 'toggle2') {
        setDrawVidSkelOnCam(toggleValues.toggle2);
        setDrawVidSkelOnVid(toggleValues.toggle2);
      } 

      if (toggleName === 'toggle3') {
        setDrawCamSkelOnCam(toggleValues.toggle3);
        setDrawCamSkelOnVid(toggleValues.toggle3);
      } 
    };
  
    return (
      <div style={{ transform: "translate(-50%)", position: "relative", left: "50%", justifyContent: 'center', flexDirection: 'column', display: 'flex' }}>
        <h1 style={{color:'white'}}>Settings</h1>
        <br></br>
        {/* <Row gutter={[16, 24]}>
            <Col span={24} style={{fontWeight:'500', fontSize:'1.25rem', display: 'flex', justifyContent: 'left', paddingLeft: '3rem', color:'white'}}>
                <Switch
                checked={toggleValues.toggle1}
                onChange={() => handleToggleChange('toggle1')}
                style={{ marginRight: '1vw', textAlign: 'left', color:'white'}}
                />
                Swap Videos
            </Col>
        </Row> */}
        <br></br>
        <Row gutter={[16, 24]}>
            <Col span={24} style={{fontWeight:'500', fontSize:'1.25rem', display: 'flex', justifyContent: 'left', paddingLeft: '3rem', color:'white'}}>
                <Switch
                checked={toggleValues.toggle2}
                onChange={() => handleToggleChange('toggle2')}
                style={{ marginRight: '1vw', textAlign: 'left', color:'white'}}
                />
                Display Teacher's Pose
            </Col>
        </Row>
        <br></br>
        <Row gutter={[16, 24]}>
            <Col span={24} style={{fontWeight:'500', fontSize:'1.25rem', display: 'flex', justifyContent: 'left', paddingLeft: '3rem', color:'white'}}>
                <Switch
                checked={toggleValues.toggle3}
                onChange={() => handleToggleChange('toggle3')}
                style={{ marginRight: '1vw', textAlign: 'left', color:'white'}}
                />
                Display Your Pose
            </Col>
        </Row>
        <br></br>
      </div>
    );
  };
  
  export default PlaybackSettings;