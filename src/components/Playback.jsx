import React, { useRef, useEffect } from 'react';
import { Pose } from '@mediapipe/pose/pose.js';

const Playback = () => {
  const webcamVideoRef = useRef(null); // Ref for the webcam video element
  const webcamCanvasRef = useRef(null); // Ref for the canvas element

  useEffect(() => {
    let webcamPose = null;

    const initializePose = async () => {
      try {
        webcamPose = new Pose({
          locateFile: (file) => `${process.env.PUBLIC_URL}/pose/${file}`,
        });

        // Set Mediapipe Pose options
        webcamPose.setOptions({
          selfieMode: true,
          upperBodyOnly: false,
          smoothLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
          modelComplexity: 1,
        });

        // Set the results callback
        webcamPose.onResults((results) => {
          const canvasCtx = webcamCanvasRef.current.getContext('2d');
          if (canvasCtx) {
            // Clear the previous frame
            canvasCtx.clearRect(0, 0, webcamCanvasRef.current.width, webcamCanvasRef.current.height);

            // Draw the results (landmarks, skeleton, etc.)
            drawPoseResults(canvasCtx, results);
          }
        });
      } catch (error) {
        console.error('Pose initialization failed:', error);
      }
    };

    const startWebcam = async () => {
      const video = webcamVideoRef.current;
      video.autoplay = true;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        video.onloadedmetadata = () => {
          video.play();

          // Process webcam frames
          const processFrame = async () => {
            if (webcamPose) {
              await webcamPose.send({ image: video });
            }
            requestAnimationFrame(processFrame);
          };

          processFrame();
        };
      } catch (error) {
        console.error('Webcam access failed:', error);
      }
    };

    const drawPoseResults = (canvasCtx, results) => {
      // Draw pose landmarks and connections
      if (results.poseLandmarks) {
        // Draw lines between key pose landmarks (for skeleton)
        const connections = [
          [11, 13], [13, 15], // Left arm
          [12, 14], [14, 16], // Right arm
          [11, 12], // Shoulders
          [23, 25], [25, 27], // Left leg
          [24, 26], [26, 28], // Right leg
          [23, 24], // Hips
          [27, 29], [28, 30], // Left leg to feet
          [29, 31], [30, 32], // Right leg to feet
        ];

        // Draw the lines
        connections.forEach(([startIdx, endIdx]) => {
          const start = results.poseLandmarks[startIdx];
          const end = results.poseLandmarks[endIdx];
          canvasCtx.beginPath();
          canvasCtx.moveTo(start.x * webcamCanvasRef.current.width, start.y * webcamCanvasRef.current.height);
          canvasCtx.lineTo(end.x * webcamCanvasRef.current.width, end.y * webcamCanvasRef.current.height);
          canvasCtx.strokeStyle = 'red'; // Line color changed to red
          canvasCtx.lineWidth = 2;
          canvasCtx.stroke();
        });

        // Draw landmarks
        results.poseLandmarks.forEach((landmark) => {
          const { x, y } = landmark;
          canvasCtx.beginPath();
          canvasCtx.arc(x * webcamCanvasRef.current.width, y * webcamCanvasRef.current.height, 5, 0, 2 * Math.PI);
          canvasCtx.fillStyle = 'red'; // Landmark color remains red
          canvasCtx.fill();
        });
      }
    };

    initializePose();
    startWebcam();

    return () => {
      // Clean up resources
      if (webcamPose) {
        webcamPose.close();
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
      {/* Webcam Feed and Pose Overlay */}
      <div style={{ position: 'relative', width: '50%', height: '100%' }}>
        <video
          ref={webcamVideoRef} // Using video ref
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ensure the video fills the space
            transform: 'scaleX(-1)', // Flip the webcam feed horizontally
          }}
        />

        {/* Canvas for pose landmarks */}
        <canvas
          ref={webcamCanvasRef} // Using canvas ref
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Game iframe */}
      <iframe
        width="50%"
        height="100%"
        src="https://humbertodias.github.io/unity-small-fighter/"
        title="Game"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ zIndex: 0 }}
      ></iframe>
    </div>
  );
};

export default Playback;
