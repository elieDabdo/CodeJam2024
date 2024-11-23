import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";

function CapturePhoto({ onCapture }) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Capture the photo
  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc); // Save the captured photo
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {!capturedImage && (
        <>
          <div
            style={{
              position: "relative",
              width: "500px",
              height: "500px", // Make it a square
              overflow: "hidden", // Ensures any overflow is clipped
              borderRadius: "10px", // Optional: Adds rounded corners
            }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 500,
                height: 500,
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensures the webcam feed covers the square area
                transform: "scaleX(-1)", // Mirrors the webcam horizontally
              }}
            />
          </div>
          <Button
            variant="primary"
            onClick={captureImage}
            style={{ marginTop: "10px" }}
          >
            Capture Photo
          </Button>
        </>
      )}

      {capturedImage && (
        <>
          <h4 style={{ color: "white" }}>Captured Image:</h4>
          <img
            src={capturedImage}
            alt="Captured"
            style={{
              width: "100%",
              maxWidth: "500px",
              marginBottom: "10px",
              transform: "scaleX(-1)", // Mirrors the captured image
            }}
          />
          <Button variant="secondary" onClick={() => setCapturedImage(null)}>
            Retake Photo
          </Button>
        </>
      )}
    </div>
  );
}

export default CapturePhoto;
