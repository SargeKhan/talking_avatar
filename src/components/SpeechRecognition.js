import React, {useEffect, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const Dictaphone = ({onUserSpeechComplete, isLoading}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    function handleKeyPress(event) {
      if (event.code === 'Space') {
        if (!listening) {
          SpeechRecognition.startListening();
        } else if (listening) {
          SpeechRecognition.stopListening();
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);  // Empty array means this useEffect runs once, similar to componentDidMount

  useEffect(() => {
    if (!listening && transcript !== '') {
      onUserSpeechComplete(transcript)
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
   <div>
    <div className="visible md:invisible">
        <button className="mb-4 text-center w-full" onClick={SpeechRecognition.startListening}>Tap to start speaking</button>
    </div>
    <div className="invisible md:visible bg-gray-200 p-4 rounded-lg shadow-md w-full">
     <p className="mb-4 text-center w-full">Press "Space" to start talking to the me</p>
      <p className="mb-4 text-center w-full">Microphone: {listening ? 'on' : 'off'}</p>
      <p className="mb-4 text-center w-full">Status: {isLoading ? 'Loading...' : 'Ready..'}</p>
      <div className="mb-4 text-center w-full">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={SpeechRecognition.startListening}>Start</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={SpeechRecognition.stopListening}>Stop</button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={resetTranscript}>Reset</button>
      </div>
      </div>
    </div>
  );
};
export default Dictaphone;