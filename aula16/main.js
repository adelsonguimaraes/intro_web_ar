import * as THREE from './../auxiliar/libs/three.js-r132/build/three.module.js'
import { mockWithVideo, mockWithImage } from './../auxiliar/libs/camera-mock.js';
import { loadGLTF, loadAudio, loadVideo } from "./../auxiliar/libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {

    let video = null;
    const init = async() => {
        video = await loadVideo('./../../auxiliar/assets/mock-videos/sintel.mp4');
        video.play();
        video.pause();
    }

    const start = async () => {

        // simulate camera with mock video
        mockWithVideo("./../../auxiliar/assets/mock-videos/sintel.mp4");
        // mockWithImage("./../../auxiliar/assets/targets/course-banner1.png");

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './../auxiliar/assets/targets/sintel.mind'
        });

        const { renderer, scene, camera } = mindarThree;

        // adicionando elemento de video
        const video = await loadVideo("./../auxiliar/assets/videos/sintel/sintel.mp4");
        // criando textura de video
        const texture = new THREE.VideoTexture(video);
        
        // criando um plano e adicionadno a textura como material da malha
        const geometry = new THREE.PlaneGeometry(1, 204/480);
        const material = new THREE.MeshBasicMaterial({map: texture});
        const plane = new THREE.Mesh(geometry, material);
        
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);

        anchor.onTargetFound = () => {
            video.play()
        }
        anchor.onTargetLost = () => {
            video.pause()
        }

        video.addEventListener("play", () => {
            video.currentTime = 6;
        });

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }

    // start();

    const button = document.createElement("button");
    button.textContent = "Start AR";
    button.addEventListener("click", () => {
        start();
        button.remove();
    });
    document.body.appendChild(button);

});