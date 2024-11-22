import React, { useRef, useEffect } from 'react';
// import '@mediapipe/control_utils/control_utils.css';
import { Pose } from '@mediapipe/pose/pose.js';
import VideoPlayer from './VideoPlayer';
import { onWebcamPose, onTrainingPose } from '../visualization.js'

// async function importStylesheet() {
//     return new Promise((resolve, reject) => {
//       const link = document.createElement('link');
//       link.href = '@mediapipe/control_utils/control_utils.css';
//       link.rel = 'stylesheet';
//       link.onload = () => resolve(link);
//       link.onerror = importStylesheet;
  
//       document.head.appendChild(link);
//     });
//   }

async function importPose() {
    while (!Pose) {
        try {
            // Attempt to import the Pose class
            ({ Pose } = await import('@mediapipe/pose/pose.js'));
        } catch (error) {
            console.error('Error importing Pose.js:', error);
            await new Promise(resolve => setTimeout(resolve, 200)); // Wait for 1 second before retrying
        }
    }
}
  
// Call the function to start the import and retry process for the stylesheet
// await importStylesheet();
await importPose();

// CREATE POSE DETECTOR OBJECTS
let initialized = false;
const wait = () => new Promise(resolve => setTimeout(resolve, 1000));

let trainingPose;
let webcamPose;

//SET OPTIONS
const poseOptions = {
    selfieMode: true,
    upperBodyOnly: false,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
    runningMode: "VIDEO",
    modelSelection: 0,
    modelComplexity: 0
}

const initialize = async ({onlyTraining, onlyWebcam}) => {
    try {
        if (!onlyWebcam) {
            trainingPose = await new Pose({
                locateFile: (file) => `${process.env.PUBLIC_URL}/pose/${file}`
                });
        }
        if (!onlyTraining) {
            webcamPose = await new Pose({
                locateFile: (file) => `${process.env.PUBLIC_URL}/pose/${file}`
                });
        }
        webcamPose.setOptions(poseOptions);
        poseOptions.selfieMode = false;
        trainingPose.setOptions(poseOptions);
        return true;
    } catch {
        console.log("Failed model instantiation.")
        return false;
    }
}

while (!initialized) {
    await initialize({onlyTraining:false, onlyWebcam:false}).then((success) => {
        initialized = success;
    })
    await wait()
}

const maximized_detection_frame_rate = 60;
const minimized_detection_frame_rate = 60;

let webcamReceivedResults = true;
let trainingReceivedResults = true;

await wait();
  
function Playback({ video_url, user_params }) {
    const webcamCanvasRef = useRef(null);
    const trainingCanvasRef = useRef(null);

    // DEFINE POSE DETECTION CALLBACK FUNCTION
    useEffect(() => {
        let initOnResults = false;
        while (!initOnResults) {
            try {
                trainingPose.onResults((results) => onTrainingPose(results, webcamCanvasRef.current.getContext('2d'), trainingCanvasRef.current.getContext('2d'), user_params));
                webcamPose.onResults((results) => onWebcamPose(results, webcamCanvasRef.current.getContext('2d'), trainingCanvasRef.current.getContext('2d'), user_params));
                initOnResults = true;
            } catch {
                console.log("Failed onResults setup.")
            }
        }
    })
    const minimizedProps = {className:"min-player", height:'30%', width:'500vh'};
    const maximizedProps = {className:"max-player", height:'100vh', width:'100%'};
    
    const trainingVideoDetectionRate = user_params.training_video_maximized ? maximized_detection_frame_rate : minimized_detection_frame_rate;
    const webcamVideoDetectionRate = user_params.training_video_maximized ? minimized_detection_frame_rate : maximized_detection_frame_rate;

    const trainingVideoProps = user_params.training_video_maximized ? maximizedProps : minimizedProps;
    const webcamPlayerProps = user_params.training_video_maximized ? minimizedProps : maximizedProps;

    // DEFINE FRAME CALLBACKS
    const handleTrainingVideoFrame = async (video) => {
        try {
            if (trainingReceivedResults) {
                trainingReceivedResults = false;
                await trainingPose.send({image: video});
                trainingReceivedResults = true;
              }
        } catch {
            console.log("Failed inference on training video. Waiting and trying again.") 
            initialize({onlyTraining:true, onlyWebcam:false});
            await wait();
        }
        //run media pipe pose model on frame and get landmark information
    }
    
    // DEFINE FRAME CALLBACKS
    const handleWebcamVideoFrame = async (video) => {
        try {
            if (webcamReceivedResults) {
                webcamReceivedResults = false;
                await webcamPose.send({image: video});
                webcamReceivedResults = true;
              }
        } catch {
            console.log("Failed inference on webcam video. Waiting and trying again.") 
            initialize({onlyTraining:false, onlyWebcam:true});
            await wait();
        }
        //run media pipe pose model on frame and get landmark information
    }
    
    return (
      <div>
        <div className='videos'>
            <canvas ref={trainingCanvasRef} className={trainingVideoProps.className} style={{zIndex: 11, pointerEvents: 'none'}}></canvas>
            <canvas ref={webcamCanvasRef} className={webcamPlayerProps.className} style={{zIndex: 11, pointerEvents: 'none'}}></canvas>
            {/* TRAINING VIDEO */}
            <VideoPlayer
                video_url={video_url}
                props={trainingVideoProps}
                onFrame={handleTrainingVideoFrame}
                detection_frame_rate={trainingVideoDetectionRate}
                canvasRef={trainingCanvasRef}
            />
        
            {/* WEBCAM INPUT */}
            <VideoPlayer
                webcam={true}
                props={webcamPlayerProps}
                onFrame={handleWebcamVideoFrame}
                detection_frame_rate={webcamVideoDetectionRate}
                canvasRef={webcamCanvasRef}
            />
        </div>
      </div>
    );
  }
  
  export default Playback;