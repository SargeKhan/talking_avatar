
import axios from 'axios';
import constants from '../constants'


export function makeSpeech(text) {
  return axios.post(constants.host + '/talk', { text });
}