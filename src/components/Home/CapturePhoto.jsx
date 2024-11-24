// export default CapturePhoto;
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";

function CaptureOrUploadPhoto() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Capture photo from webcam
  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc); // Save the captured photo
      setUploadedImage(null); // Clear uploaded image
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target.result;
        setUploadedImage(imageSrc); // Save the uploaded image
        setCapturedImage(null); // Clear captured image
      };
      reader.readAsDataURL(file);
    }
  };

  const encodeToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      // Check if the image is already a Base64 string
      if (typeof image === "string" && image.startsWith("data:image")) {
        // Remove the prefix using a regex and resolve
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        resolve(base64Data);
      } else if (image instanceof File) {
        // Handle File objects (e.g., uploaded images)
        const reader = new FileReader();
        reader.onload = () => {
          // Remove the prefix from the Base64 string
          const base64Data = reader.result.replace(
            /^data:image\/\w+;base64,/,
            ""
          );
          resolve(base64Data);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(image); // Read file as Base64
      } else {
        reject(new Error("Unsupported image format."));
      }
    });
  };

  // Choose the photo (save as JSON string to localStorage)
  const handleChoosePhoto = async () => {
    const selectedImage = capturedImage || uploadedImage;

    try {
      const base64Image = await encodeToBase64(selectedImage);

      // Save to localStorage as a JSON string
      const imageData = {
        image: base64Image, // Base64 encoded string
        timestamp: new Date().toISOString(), // Optional metadata
      };
      localStorage.setItem("selectedImage", JSON.stringify(imageData));
      console.log("Selected image saved as Base64:", imageData);
    } catch (error) {
      console.error("Failed to encode image to Base64:", error);
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
      {/* Show Webcam and Buttons if No Image is Selected */}
      {!capturedImage && !uploadedImage && (
        <>
          <div
            style={{
              position: "relative",
              width: "500px",
              height: "500px",
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
          <div style={{ display: "flex", gap: "10px" }}>
            <Button variant="primary" onClick={captureImage}>
              Capture Photo
            </Button>
            <label htmlFor="upload-photo" className="btn btn-secondary">
              Upload Photo
            </label>
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />
          </div>
        </>
      )}

      {/* Show Selected Image and Options to Retake or Choose */}
      {(capturedImage || uploadedImage) && (
        <>
          <h4>Selected Image:</h4>
          <img
            src={capturedImage || uploadedImage}
            alt="Selected"
            style={{
              width: "100%",
              maxWidth: "500px",
              marginBottom: "10px",
              transform: capturedImage ? "scaleX(-1)" : "none", // Mirror only captured images
            }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="secondary"
              onClick={() => {
                setCapturedImage(null);
                setUploadedImage(null);
              }}
            >
              Retake Photo
            </Button>
            <Button variant="info" onClick={handleChoosePhoto}>
              Choose Photo
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CaptureOrUploadPhoto;
