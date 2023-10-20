import Avatar from './components/Avatar';
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import STYLES from './styles';
import { Loader, Environment, OrthographicCamera } from '@react-three/drei';
import Bg from './components/Bg';

import ReactAudioPlayer from 'react-audio-player';

import SpeechRecognition from './components/SpeechRecognition';
import { chatWithOpenAI } from './apis/chatgpt';
import { makeSpeech } from './apis/backend'
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

  // Player is read
  function playerReady(e) {
    audioPlayer.current.audioEl.current.play();
    setPlaying(true);

  } 

  async function onUserSpeechComplete(userText) {
    try {
      const text = await chatWithOpenAI(userText)
      setText(text)
      setSpeak(true);
    } catch (error) {
      setText("failed to talk to AI agent")
      setSpeak(true);
    }
  }

  return (
    <div className="full">
      <div style={{position: 'absolute', top: '10px', left: '10px', zIndex: 500}}>
        <button style={{marginRight: '10px'}}>Step 1</button>
        <button style={{marginRight: '10px'}}>Step 2</button>
        <button>Step 3</button>
      </div>
      <div style={STYLES.area}>
        <textarea rows={4} type="text" style={STYLES.text} value={text} onChange={(e) => setText(e.target.value.substring(0, 200))} />
        <button onClick={() => setSpeak(true)} style={STYLES.speak}> { speak? 'Running...': 'Speak' }</button>
        <SpeechRecognition onUserSpeechComplete={onUserSpeechComplete}/>
      </div>

      <div style={STYLES.area2}>
        <p style={STYLES.text}>1- Assalam o alikum ammi, apka kiya haal hai?</p>
        <p style={STYLES.text}>2- Boolein Bismillah.</p>
        <p style={STYLES.text}>3- Boolein Pakistan zindabad</p>
        <input type="number" onChange={(e) => setText(e.target.value === '1' ? "Assalam o alikum ammi, apka kiya haal hai?" : e.target.value === '2' ? "Boolein Bismillah." : e.target.value === '3' ? "Boolein Pakistan zindabad" : "")} />
        <button onClick={() => setSpeak(true)} style={STYLES.speak}> { speak? 'Running...': 'Speak' }</button>
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
            makeSpeech={makeSpeech}
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
