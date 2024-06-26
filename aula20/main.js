import * as THREE from './../auxiliar/libs/three.js-r132/build/three.module.js'
import { mockWithVideo, mockWithImage } from './../auxiliar/libs/camera-mock.js';
import { loadGLTF, loadAudio, loadVideo } from "./../auxiliar/libs/loader.js";
import { CSS3DObject } from './../auxiliar/libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js';

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: './../auxiliar/assets/targets/musicband.mind',
        uiScanning: "#scanning",
        uiLoading: "no",
      });
      const {renderer, scene, camera} = mindarThree;
  
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.5});
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