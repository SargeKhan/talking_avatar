# Talking avatar


A ThreeJS-powered virtual human being that uses a set of neat [Azure APIs](https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/how-to-speech-synthesis-viseme) to do some talking!

[ta.webm](https://user-images.githubusercontent.com/1557195/209548068-9b55b5a6-c4dd-4f7c-979f-87fefa0fcb74.webm)


Add Chat GPT to the mix and maybe you can have for yourself a nice face to chat with. 🙂


### To run
1- Install docker on the system (search internet).
2- While in the project directory, build image

```
docker build -t avatar_front_end .
```
3- Run docker
```
docker run -p 3000:3000 avatar_front_end
```

## Backend
You'll also need https://github.com/bornfree/talking_avatar_backend for the text to speech conversion.
