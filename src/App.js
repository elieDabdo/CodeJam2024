import React from 'react';
import { useUnityContext } from 'react-unity-webgl';
import { Unity } from 'react-unity-webgl';
import Webcam from "react-webcam";

function App() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "Build/unityBuild.loader.js",
    dataUrl: "Build/unityBuild.data",
    frameworkUrl: "Build/unityBuild.framework.js",
    codeUrl: "Build/unityBuild.wasm",
  });

  // Round the loading progression to a whole number
  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <div className="container">
      {!isLoaded && (
        <div className="loading-overlay">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}

      {/* Webcam Feed */}
      <div className="webcam-container">
        <Webcam
          audio={false}
          className="webcam"
        />
      </div>

      {/* Unity WebGL Content */}
      <div className="unity-container">
        <Unity className="unity" unityProvider={unityProvider} />
      </div>
    </div>
  );
}

export default App;
