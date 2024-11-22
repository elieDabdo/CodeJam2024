
import React, {useLocation} from 'react-router-dom';
import { useState } from 'react';
import Playback from '../Playback';
import PlaybackSettings from '../PlaybackSettings';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ScrollToTop from '../ScrollToTop';
import './Game.css';

const Game = () => {

    const [ trainingVideoMaximized, setTrainingVideoMaximized ] = useState(true);
    const [ drawCamSkelOnCam, setDrawCamSkelOnCam ] = useState(true);
    const [ drawCamSkelOnVideo, setDrawCamSkelOnVid ] = useState(true);
    const [ drawVidSkelOnCam, setDrawVidSkelOnCam ] = useState(true);
    const [ drawVidSkelOnVideo, setDrawVidSkelOnVid ] = useState(true);
    const location = useLocation();
    console.log('Selected file:', location);
    const video = location.state.video;

    return (
        <>
          <div className="game-container">
            <Navbar />
            <ScrollToTop />
            <div style={{  display: 'grid', gridTemplateColumns: '8fr 2fr' }}>
              <Playback video_url={video} user_params={
                  {
                    training_video_maximized:trainingVideoMaximized,
                    draw_webcam_skeleton_on_webcam:drawCamSkelOnCam,
                    draw_webcam_skeleton_on_training:drawCamSkelOnVideo,
                    draw_training_skeleton_on_training:drawVidSkelOnCam,
                    draw_training_skeleton_on_webcam:drawVidSkelOnVideo
                  }}
                  style={{ gridColumn: '1' }} />
              <PlaybackSettings setTrainingVideoMaximized={setTrainingVideoMaximized}
                setDrawCamSkelOnCam={setDrawCamSkelOnCam}
                setDrawCamSkelOnVid={setDrawCamSkelOnVid}
                setDrawVidSkelOnCam={setDrawVidSkelOnCam}
                setDrawVidSkelOnVid={setDrawVidSkelOnVid}
                style={{ gridColumn: '2' }}/>
            </div>
            <Footer />
          </div>
        </>
    );
};

export default Game;
