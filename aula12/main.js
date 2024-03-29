import * as THREE from './../auxiliar/libs/three.js-r132/build/three.module.js'
import { mockWithVideo, mockWithImage } from './../auxiliar/libs/camera-mock.js';
import { loadGLTF, loadAudio } from "./../auxiliar/libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {

        // simulate camera with mock video
        // mockWithVideo("./../../auxiliar/assets/mock-videos/course-banner1.mp4");
        // mockWithImage("./../../auxiliar/assets/targets/course-banner1.png");

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './../auxiliar/assets/targets/musicband.mind',
            // simultaneos tracks
            maxTrack: 2,
        });

        const { renderer, scene, camera } = mindarThree;

        // add light in scene
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbdd, 1);
        scene.add(light);

        const raccoon = await loadGLTF("./../auxiliar/assets/models/musicband-raccoon/scene.gltf");
        raccoon.scene.scale.set(0.1, 0.1, 0.1);
        raccoon.scene.position.set(0, -0.4, 0);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(raccoon.scene);

        // add audio
        const audioClip = await loadAudio("./../auxiliar/assets/sounds/musicband-background.mp3");
        const listener = new THREE.AudioListener();
        const audio = new THREE.PositionalAudio(listener);

        // adicionando a escuta do audio a camera
        camera.add(listener);
        // adicionando o audio a ancora
        anchor.group.add(audio);
    
        // configurando a distância de audio para o efeito de som espacial (diminui de acordo com a distância)
        // começa a diminuir em 100
        audio.setRefDistance(100);

        // atribuindo o clip de audio ao buffer e ativando a repetição
        audio.setBuffer(audioClip);
        audio.setLoop(true);

        anchor.onTargetFound = () => {
            // iniciando o audio quando o modelo é detectado
            audio.play();

            console.log("on target found");
        }

        anchor.onTargetLost = () => {
            // parando o audio quando o modelo é perdido
            audio.pause();

            console.log("on target lost");
        }

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }

    start();

});