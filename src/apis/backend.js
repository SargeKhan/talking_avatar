
import axios from 'axios';
import constants from '../constants'

// Comment these lines
export function makeSpeech(text) {
  // return axios.post(constants.host + '/talk', { text });
  return Promise.resolve();
}

// export function getSpeechResponse(text) {
//   return axios.post(constants.host + '/talk', { text });
// }
export function getChatResponse(user_speech) {
  return axios.post(constants.host + '/chat', { user_speech  });
}