import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";

function CapturePhoto() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Capture photo from webcam
  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc); // Save the captured photo
    }
  };

  // Handle "Choose Photo" button
  const handleChoosePhoto = () => {
    if (capturedImage) {
      console.log("Captured Photo:", capturedImage);
    } else {
      console.log("No photo captured yet.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {!capturedImage && (
        <>
          <div
            style={{
              position: "relative",
              width: "500px",
              height: "500px", // Make it square
              overflow: "hidden",
              borderRadius: "10px",
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
                objectFit: "cover",
                transform: "scaleX(-1)", // Mirror the webcam
              }}
            />
          </div>
          <Button variant="primary" onClick={captureImage}>
            Capture Photo
          </Button>
        </>
      )}

      {capturedImage && (
        <>
          <h4>Selected Image:</h4>
          <img
            src={capturedImage}
            alt="Selected"
            style={{
              width: "100%",
              maxWidth: "500px",
              marginBottom: "10px",
              transform: "scaleX(-1)", // Mirror the captured image
            }}
          />
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button variant="secondary" onClick={() => setCapturedImage(null)}>
              Retake Photo
            </Button>
            <Button
              variant="success"
              onClick={handleChoosePhoto} // Print the photo to the console
            >
              Choose Photo
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CapturePhoto;
