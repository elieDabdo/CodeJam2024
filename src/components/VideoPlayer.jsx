import React, { useRef, useEffect } from 'react';
import { Camera } from '@mediapipe/camera_utils/camera_utils.js';

function VideoPlayer({ webcam, video_url, props, onFrame, detection_frame_rate, canvasRef }) {
  const videoRef = useRef(null);

  const setVideoDimensions = (videoElement) => {
    const scaling_factor = Math.min(videoElement.parentNode.offsetHeight / videoElement.videoHeight, videoElement.parentNode.offsetWidth / videoElement.videoWidth);
    videoElement.style.width = scaling_factor * videoElement.videoWidth + 'px';
    videoElement.style.height = scaling_factor * videoElement.videoHeight + 'px';
    canvasRef.current.style.width = scaling_factor * videoElement.videoWidth + 'px';
    canvasRef.current.style.height = scaling_factor * videoElement.videoHeight + 'px';

  }

  useEffect(() => {
    const handleNewFrame = () => {
      onFrame(videoRef.current)
    };
    if (webcam) {
      const camera = new Camera(videoRef.current, {
          onFrame: async () => {
              handleNewFrame();
              const wait = () => new Promise(resolve => setTimeout(resolve, 1000/detection_frame_rate));
              await wait();
          },
          onloadeddata: () => {setVideoDimensions(videoRef.current);},
          width: 1280,
          height: 720,
      });
  
      camera.start();
      setVideoDimensions(videoRef.current);
      // Cleanup function (optional) to be executed on component unmount
      return () => { camera.stop(); };
    } else {
      const loop = async () => {
        handleNewFrame();
        const wait = () => new Promise(resolve => setTimeout(resolve, 1000/detection_frame_rate));
        await wait();
        requestAnimationFrame(loop);
      }
      const startVideo = () => {
        setVideoDimensions(videoRef.current);
        requestAnimationFrame(loop);
      }
      videoRef.current.addEventListener('loadeddata', startVideo);
      return () => { videoRef.current && videoRef.current.removeEventListener('loadeddata', startVideo)}
    }
  }, [webcam, onFrame, canvasRef]);

  return (
    <div>
      {/* Video Player */}
      <div className={props.className}>
        {webcam ? (
          <video
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              transform: 'scaleX(-1)',
            }}
            ref={videoRef}
            controls={false}
            autoPlay={true}
          ></video>
        ) : (
          <video
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            ref={videoRef}
            controls={true}
            width={props.width}
            height={props.height}
            autoPlay={true}
          >
            <source src={video_url} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;
