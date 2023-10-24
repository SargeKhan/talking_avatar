import Avatar from './components/Avatar';
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import STYLES from './styles';
import { Loader, Environment, OrthographicCamera } from '@react-three/drei';
import Bg from './components/Bg';

import ReactAudioPlayer from 'react-audio-player';

import SpeechRecognition from './components/SpeechRecognition';
import { getChatResponse, makeSpeech } from './apis/backend'
import Sidebar from './components/SessionProgressSidebarSection';
const _ = require('lodash');

function App() {

  const audioPlayer = useRef();

  const [speak, setSpeak] = useState(false);
  const [text, setText] = useState("My name is Arwen. I'm a virtual human who can speak whatever you type here along with realistic facial movements.");
  const [audioSource, setAudioSource] = useState(null);
  const [playing, setPlaying] = useState(false);

  // End of play
  function playerEnded(e) {
    setAudioSource(null);
    setSpeak(false);
    setPlaying(false);
  }

  // Player is ready
  function playerReady(e) {
    audioPlayer.current.audioEl.current.play();
    audioPlayer.current.audioEl.current.playbackRate = 1.5;
    setPlaying(true);
  } 

  async function onUserSpeechComplete(userText) {
    try {
      setSpeak(true);
      setText(userText);
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="full">

      
      { /* 
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 500 }}>
        <button style={{marginRight: '10px'}}>Step 1</button>
        <button style={{marginRight: '10px'}}>Step 2</button>
        <button>Step 3</button>
      </div>
  */}

      {/* <div class="absolute top-1/2 transform -translate-y-1/2 z-50">
        <Sidebar />
      </div> */}
      <div className="w-full absolute bottom-10 p-10 z-50">
        {/* 
        <div className="" style={STYLES.area}>
        <textarea rows={4} type="text" style={STYLES.text} value={text} onChange={(e) => setText(e.target.value.substring(0, 200))} />
        <button onClick={() => setSpeak(true)} style={STYLES.speak}> { speak? 'Running...': 'Speak' }</button>
*/}
      <SpeechRecognition onUserSpeechComplete={onUserSpeechComplete} />
      </div>

      <ReactAudioPlayer
        src={audioSource}
        ref={audioPlayer}
        onEnded={playerEnded}
        onCanPlayThrough={playerReady}
        
      />
      
      {/* <Stats /> */}
    <Canvas dpr={2} onCreated={(ctx) => {
        ctx.gl.physicallyCorrectLights = true;
      }}>

      <OrthographicCamera 
      makeDefault
      zoom={2000}
      position={[0, 1.65, 1]}
      />

      {/* <OrbitControls
        target={[0, 1.65, 0]}
      /> */}

      <Suspense fallback={null}>
        <Environment background={false} files="/images/photo_studio_loft_hall_1k.hdr" />
      </Suspense>

      <Suspense fallback={null}>
        <Bg />
      </Suspense>

      <Suspense fallback={null}>



          <Avatar 
            avatar_url="/model.glb" 
            speak={speak} 
            setSpeak={setSpeak}
            text={text}
            makeSpeech={getChatResponse}
            setAudioSource={setAudioSource}
            playing={playing}
            />

      
      </Suspense>

  

  </Canvas>
  <Loader dataInterpolation={(p) => `Loading... please wait`}  />
  </div>
  )
}


export default App;
