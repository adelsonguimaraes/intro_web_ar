import * as THREE from './../auxiliar/libs/three.js-r132/build/three.module.js'
import { mockWithVideo, mockWithImage } from './../auxiliar/libs/camera-mock.js';

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {

        // simulate camera with mock video
        // mockWithVideo("./../../auxiliar/assets/mock-videos/course-banner1.mp4");
        mockWithImage("./../../auxiliar/assets/mock-videos/course-banner1.png");

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './../auxiliar/assets/targets/course-banner.mind'
        });

        const { renderer, scene, camera } = mindarThree;

        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, Transparent: true, opacity: 0.5 });
        const plane = new THREE.Mesh(geometry, material);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(plane);

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }

    start();

});