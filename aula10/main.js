import * as THREE from './../auxiliar/libs/three.js-r132/build/three.module.js'
import { mockWithVideo, mockWithImage } from './../auxiliar/libs/camera-mock.js';
import { loadGLTF } from "./../auxiliar/libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {

        // simulate camera with mock video
        // mockWithVideo("./../../auxiliar/assets/mock-videos/course-banner1.mp4");
        // mockWithImage("./../../auxiliar/assets/targets/course-banner1.png");

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './../auxiliar/assets/targets/musicband.mind'
        });

        const { renderer, scene, camera } = mindarThree;

        // add light in scene
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbdd, 1);
        scene.add(light);

        const gltf = await loadGLTF("./../auxiliar/assets/models/musicband-raccoon/scene.gltf");
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(0, -0.4, 0);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(gltf.scene);

        // gltf.animations
        const mixer = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();

        const clock = new THREE.Clock();

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            const delta = clock.getDelta(); // usando a class clock para pegar o tempo decorrido da animação em delta

            // exemplo de animação externa, direto no código js
            gltf.scene.rotation.set(0, gltf.scene.rotation.y + delta, 0);

            mixer.update(delta); // atualizando a animação a cada quadro
            renderer.render(scene, camera);
        });
    }

    start();

});