// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import Button from "react-bootstrap/Button";

// function CapturePhoto() {
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);

//   // Capture photo from webcam
//   const captureImage = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       setCapturedImage(imageSrc); // Save the captured photo
//     }
//   };

//   // Handle "Choose Photo" button
//   const handleChoosePhoto = () => {
//     if (capturedImage) {
//       console.log("Captured Photo:", capturedImage);
//     } else {
//       console.log("No photo captured yet.");
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "10px",
//       }}
//     >
//       {!capturedImage && (
//         <>
//           <div
//             style={{
//               position: "relative",
//               width: "500px",
//               height: "500px", // Make it square
//               overflow: "hidden",
//               borderRadius: "10px",
//             }}
//           >
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               videoConstraints={{
//                 width: 500,
//                 height: 500,
//               }}
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 transform: "scaleX(-1)", // Mirror the webcam
//               }}
//             />
//           </div>
//           <Button variant="primary" onClick={captureImage}>
//             Capture Photo
//           </Button>
//         </>
//       )}

//       {capturedImage && (
//         <>
//           <h4>Selected Image:</h4>
//           <img
//             src={capturedImage}
//             alt="Selected"
//             style={{
//               width: "100%",
//               maxWidth: "500px",
//               marginBottom: "10px",
//               transform: "scaleX(-1)", // Mirror the captured image
//             }}
//           />
//           <div
//             style={{ display: "flex", justifyContent: "center", gap: "10px" }}
//           >
//             <Button variant="secondary" onClick={() => setCapturedImage(null)}>
//               Retake Photo
//             </Button>
//             <Button
//               variant="info"
//               onClick={handleChoosePhoto} // Print the photo to the console
//             >
//               Choose Photo
//             </Button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

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

  // Choose the photo (print to console)
  const handleChoosePhoto = () => {
    const selectedImage = capturedImage || uploadedImage;
    if (selectedImage) {
      console.log("Chosen Photo:", selectedImage);
    } else {
      console.log("No photo selected.");
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
