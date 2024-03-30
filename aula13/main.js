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
            imageTargetSrc: './../auxiliar/assets/targets/musicband.mind'
        });

        const { renderer, scene, camera } = mindarThree;

        // add light in scene
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbdd, 1);
        scene.add(light);

        const raccoon = await loadGLTF("./../auxiliar/assets/models/musicband-raccoon/scene.gltf");
        raccoon.scene.scale.set(0.1, 0.1, 0.1);
        raccoon.scene.position.set(0, -0.4, 0);
        // permitir a cena ser clicável
        raccoon.scene.userData.clickable = true;

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(raccoon.scene);

        const listener = new THREE.AudioListener();
        camera.add(listener);

        const audio = new THREE.Audio(listener);
        const audioClip = await loadAudio("./../auxiliar/assets/sounds/musicband-drum-set.mp3");
        audio.setBuffer(audioClip);

        document.body.addEventListener("click", (e) => {
            const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            const mouse = new THREE.Vector2(mouseX, mouseY);

            // usando a classe raycaster que irá simular um raio
            // partindo da camera ao ponto clicado na tela para verificar
            // se esse raio colide com algum modelo
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            // configurando os objetos que pode sofrer a interceção e configurando recursividade
            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                let o = intersects[0].object;
                
                while (o.parent && !o.userData.clickable) {
                    o = o.parent;
                }

                if (o.userData.clickable) {
                    if (o === raccoon.scene) {
                        audio.play();
                    }
                }
            }

        });

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }

    start();

});