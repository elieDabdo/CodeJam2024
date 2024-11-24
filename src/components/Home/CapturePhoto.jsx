import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"; // Import Alert from react-bootstrap

function CaptureOrUploadPhoto() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null); // State for success messages
  const [errorMessage, setErrorMessage] = useState(null); // State for error messages

  // Path to the existing image in the public folder
  const existingImagePath = process.env.PUBLIC_URL + "/SmallGuyTexture.png"; // Replace with your image filename

  // Capture photo from webcam
  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc); // Save the captured photo
      setUploadedImage(null); // Clear uploaded image
      setConfirmationMessage(null); // Clear any previous messages
      setErrorMessage(null); // Clear any previous errors
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
        setConfirmationMessage(null); // Clear any previous messages
        setErrorMessage(null); // Clear any previous errors
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to combine images using Canvas
  const combineImages = async () => {
    const selectedImage = capturedImage || uploadedImage;
    if (!selectedImage) {
      setErrorMessage("No image selected to combine.");
      return;
    }

    try {
      // Load existing image
      const existingImg = await loadImage(existingImagePath);

      // Load captured or uploaded image
      const selectedImg = await loadImage(selectedImage);

      // Create a canvas with the dimensions of the existing image
      const canvas = document.createElement("canvas");
      canvas.width = existingImg.width;
      canvas.height = existingImg.height;
      const ctx = canvas.getContext("2d");

      // Draw the existing image as the background
      ctx.drawImage(existingImg, 0, 0, canvas.width, canvas.height);

      // Position the captured/uploaded image at specific coordinates with specific size
      // In this case: x = 10, y = 112, width = 400, height = 400
      ctx.drawImage(selectedImg, 10, 112, 400, 400);

      // Convert the canvas to a data URL
      const combinedDataUrl = canvas.toDataURL("image/jpeg");

      // Now, use the combinedDataUrl as needed (e.g., send to server)
      // For this example, we'll save it to localStorage
      await saveCombinedImage(combinedDataUrl);

      console.log("Images combined and saved successfully.");
      setConfirmationMessage("Photo has been chosen successfully."); // Set success message

      // Optionally, clear the message after 3 seconds
      setTimeout(() => {
        setConfirmationMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error combining images:", error);
      setErrorMessage("Failed to combine and save the photo."); // Set error message

      // Optionally, clear the error message after 3 seconds
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  // Helper function to load an image and return a Promise
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // To avoid CORS issues
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  };

  // Function to save the combined image to localStorage
  const saveCombinedImage = async (combinedDataUrl) => {
    try {
      const base64Image = await encodeToBase64(combinedDataUrl);

      // Save to localStorage as a JSON string
      const imageData = {
        image: base64Image, // Base64 encoded string
        timestamp: new Date().toISOString(), // Optional metadata
      };
      localStorage.setItem("selectedImage", JSON.stringify(imageData));
      console.log("Combined image saved as Base64:", imageData);
    } catch (error) {
      console.error("Failed to encode and save combined image:", error);
      throw error; // Propagate the error to be handled in combineImages
    }
  };

  // Existing encodeToBase64 function
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

  // Handle choosing the photo (which now combines and saves the image)
  const handleChoosePhoto = async () => {
    await combineImages();
    // Optionally, perform additional actions after saving
    // For example, navigate to another page or trigger playback
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
                setConfirmationMessage(null);
                setErrorMessage(null);
              }}
            >
              Retake Photo
            </Button>
            <Button variant="info" onClick={handleChoosePhoto}>
              Choose Image
            </Button>
          </div>
        </>
      )}

      {/* Display Confirmation and Error Messages */}
      <div style={{ marginTop: "20px", width: "100%", maxWidth: "500px" }}>
        {confirmationMessage && (
          <Alert variant="success">{confirmationMessage}</Alert>
        )}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </div>
    </div>
  );
}

export default CaptureOrUploadPhoto;
