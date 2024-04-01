import * as THREE from './../auxiliar/libs/three.js-r132/build/three.module.js'
import { mockWithVideo, mockWithImage } from './../auxiliar/libs/camera-mock.js';
import { loadGLTF, loadAudio, loadVideo } from "./../auxiliar/libs/loader.js";
import { CSS3DObject } from './../auxiliar/libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js';

const createYoutube = () => {
    return new Promise((resolve, reject) => {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        const onYouTubeIframeAPIReady = () => {
            const player = new YT.Player('player', {
                videoId: 'kEGnVCczjH4',
                events: {
                    onReady: () => {
                        resolve(player);
                    }
                }
            });
        }
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    });
}

document.addEventListener('DOMContentLoaded', () => {

    const start = async () => {
        const player = await createYoutube();

        // simulate camera with mock video
        mockWithVideo("./../../auxiliar/assets/mock-videos/course-banner1.mp4");
        // mockWithImage("./../../auxiliar/assets/targets/course-banner1.png");

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './../auxiliar/assets/targets/course-banner.mind'
        });

        // adicionando cssRender e cssScene para lidar com o objeto css
        const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;

        // pegando o elemento css e transformando em  objeto 3D
        const obj = new CSS3DObject(document.querySelector('#ar-div'));
        // criando a ancora para o objeto css
        const cssAnchor = mindarThree.addCSSAnchor(0);
        cssAnchor.group.add(obj);

        cssAnchor.onTargetFound = () => {
            player.playVideo();
        }
        cssAnchor.onTargetLost = () => {
            player.pauseVideo();
        }

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            // chamando o cssRender e cssScene
            cssRenderer.render(cssScene, camera);
        });
    }

    start();
});