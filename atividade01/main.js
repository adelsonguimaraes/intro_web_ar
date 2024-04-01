import * as THREE from './../auxiliar/libs/three.js-r132/build/three.module.js';
import { mockWithImage } from '../auxiliar/libs/camera-mock.js';
import { CSS3DObject } from '../auxiliar/libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js';
import { createImageSlide } from './slide.js';

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        // './assets/1.jpg',
        // './assets/2.jpg',
        // './assets/3.jpg',
        // './assets/4.jpg'
        'https://media.wired.com/photos/593261cab8eb31692072f129/master/pass/85120553.jpg',
        'https://cdn.wcs.org/2022/05/23/6nga66kfmw_Julie_Larsen_Maher_6306_Red_panda_TET_CPZ_12_05_07.jpg',
        'https://t4.ftcdn.net/jpg/05/69/26/75/360_F_569267503_TpfJTTTUJimJC9XpCyDVbMfmxmqZaZ0O.jpg',
        'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/09/11/1161338360-raposa-do-artico-pequena.jpg',
        'https://crmvsp.gov.br/wp-content/uploads/2022/06/14.06.2022_Selvagens_Arara_Azul-1024x768.jpg'
    ];
    createImageSlide(images);

    const start = async() => {

        mockWithImage('./assets/target.png')
        // mockWithImage('./assets/js.png')

        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './assets/targets.mind'
        });

        const { renderer, cssRenderer, cssScene, camera } = mindarThree

        const obj = new CSS3DObject(document.querySelector('.slider-container'));

        const cssAnchor = mindarThree.addCSSAnchor(0);
        cssAnchor.group.add(obj);

        await mindarThree.start();

        renderer.setAnimationLoop(() => {
            cssRenderer.render(cssScene, camera);
        });
    }

    start();
});