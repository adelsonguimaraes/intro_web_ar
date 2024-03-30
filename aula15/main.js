import * as THREE from './../auxiliar/libs/three.js-r132/build/three.module.js'
import { mockWithVideo, mockWithImage } from './../auxiliar/libs/camera-mock.js';
import { loadGLTF, loadAudio, loadVideo } from "./../auxiliar/libs/loader.js";
import { createChromaMaterial } from "./../auxiliar/libs/chroma-video.js";

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {

        // simulate camera with mock video
        mockWithVideo("./../../auxiliar/assets/mock-videos/course-banner1.mp4");
        // mockWithImage("./../../auxiliar/assets/targets/course-banner1.png");

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './../auxiliar/assets/targets/course-banner.mind'
        });

        const { renderer, scene, camera } = mindarThree;

        // adicionando elemento de video
        const video = await loadVideo("./../auxiliar/assets/videos/guitar-player.mp4");
        // criando textura de video
        const texture = new THREE.VideoTexture(video);
        
        // criando um plano e adicionadno a textura como material da malha
        const geometry = new THREE.PlaneGeometry(1, 1080/1920);
        // *** Substituindo o basic material por chroma material
        // const material = new THREE.MeshBasicMaterial({map: texture});
        const material = createChromaMaterial(texture, 0x00ff00);   
        const plane = new THREE.Mesh(geometry, material);

        // configurando o plano para ao invés de sobrepor, alinhá-lo a imagem
        // dessa forma gera o efeito como se estivesse saindo para fora da imagem
        plane.rotation.x = Math.PI / 2;
        plane.position.y = 0.7;
        plane.scale.multiplyScalar(4);

        
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);

        anchor.onTargetFound = () => {
            video.play()
        }
        anchor.onTargetLost = () => {
            video.pause()
        }

        // video.addEventListener("play", () => {
        //     video.currentTime = 6;
        // });

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }

    start();

});