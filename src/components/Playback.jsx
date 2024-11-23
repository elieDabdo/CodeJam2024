import React, { useRef, useEffect } from "react";
import { Pose } from "@mediapipe/pose/pose.js";
import { Unity, useUnityContext } from "react-unity-webgl";

const Playback = () => {
  const webcamVideoRef = useRef(null); // Ref for the webcam video element
  const webcamCanvasRef = useRef(null); // Ref for the canvas element

  // Unity context setup
  const { unityProvider, isLoaded, loadingProgression, sendMessage } =
    useUnityContext({
      loaderUrl: "unityBuild/Build/unityBuild.loader.js",
      dataUrl: "unityBuild/Build/unityBuild.data",
      frameworkUrl: "unityBuild/Build/unityBuild.framework.js",
      codeUrl: "unityBuild/Build/unityBuild.wasm",
    });

  const loadingPercentage = Math.round(loadingProgression * 100);

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
          const canvasCtx = webcamCanvasRef.current.getContext("2d");
          if (canvasCtx) {
            // Clear the previous frame
            canvasCtx.clearRect(
              0,
              0,
              webcamCanvasRef.current.width,
              webcamCanvasRef.current.height
            );

            // Draw the results (landmarks, skeleton, etc.)
            drawPoseResults(canvasCtx, results);
          }

          // Send pose data to Unity
          if (results.poseLandmarks) {
            sendPoseToUnity(results.poseLandmarks);
          }
        });
      } catch (error) {
        console.error("Pose initialization failed:", error);
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
        console.error("Webcam access failed:", error);
      }
    };

    const drawPoseResults = (canvasCtx, results) => {
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
          canvasCtx.moveTo(
            start.x * webcamCanvasRef.current.width,
            start.y * webcamCanvasRef.current.height
          );
          canvasCtx.lineTo(
            end.x * webcamCanvasRef.current.width,
            end.y * webcamCanvasRef.current.height
          );
          canvasCtx.strokeStyle = "red";
          canvasCtx.lineWidth = 2;
          canvasCtx.stroke();
        });

        // Draw landmarks
        results.poseLandmarks.forEach((landmark) => {
          const { x, y } = landmark;
          canvasCtx.beginPath();
          canvasCtx.arc(
            x * webcamCanvasRef.current.width,
            y * webcamCanvasRef.current.height,
            5,
            0,
            2 * Math.PI
          );
          canvasCtx.fillStyle = "red";
          canvasCtx.fill();
        });
      }
    };

    const sendPoseToUnity = (poseLandmarks) => {
      sendMessage(
        "MessageHandler", // Unity GameObject name
        "ReceivePoseData", // Unity method to call
        JSON.stringify(poseLandmarks) // Convert landmarks to JSON string
      );
      console.log("Pose data sent to Unity:", poseLandmarks);
    };

    initializePose();
    startWebcam();

    return () => {
      // Clean up resources
      if (webcamPose) {
        webcamPose.close();
      }
    };
  }, [sendMessage]);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      {/* Webcam Feed and Pose Overlay */}
      <div style={{ position: "relative", width: "50%", height: "100%" }}>
        <video
          ref={webcamVideoRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scaleX(-1)", // Flip horizontally
          }}
        />
        <canvas
          ref={webcamCanvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Unity Game */}
      {/* Unity Game */}
<div
  style={{
    width: "50%",
    height: "100%",
    position: "relative", // Ensure it respects its parent stacking context
    zIndex: 2, // Higher z-index to bring it forward
  }}
>
  {isLoaded === false && (
    <div
      className="loading-overlay"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 3, // Overlay above Unity game while loading
        color: "white",
      }}
    >
      <p>Loading... ({loadingPercentage}%)</p>
    </div>
  )}
  <Unity
    className="unity"
    unityProvider={unityProvider}
    style={{
      width: "100%",
      height: "100%",
      position: "absolute", // Fill parent container
      top: 0,
      left: 0,
      zIndex: 2, // Unity content in the foreground
    }}
  />
</div>

    </div>
  );
};

export default Playback;
