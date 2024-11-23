import React, { useEffect, useRef, useState } from 'react';

function WebcamFeed() {
  const videoRef = useRef(null);
  const [hasStream, setHasStream] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasStream(true);
        }
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
        setHasStream(false); // Ensure we show the error message
      });
  }, []);
  

  return (
    <div className="webcam-container">
      {hasStream ? (
        <video ref={videoRef} autoPlay playsInline width="320" height="240" />
      ) : (
        <p>No webcam detected</p>
      )}
    </div>
  );
}

export default WebcamFeed;
