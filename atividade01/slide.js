export function createImageSlide(imageList) {
    const slider = document.querySelector('.slider');

    // Limpar slides existentes
    slider.innerHTML = '';

    // Adicionar slides com as imagens fornecidas
    imageList.forEach(imageSrc => {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        const frame = document.createElement('div');
        frame.classList.add('frame');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Imagem';

        frame.appendChild(img);
        slide.appendChild(frame);
        slider.appendChild(slide);
    });

    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    slider.addEventListener('mousedown', startTouch);
    slider.addEventListener('touchstart', startTouch);
    slider.addEventListener('mouseup', endTouch);
    slider.addEventListener('touchend', endTouch);
    slider.addEventListener('mousemove', moveTouch);
    slider.addEventListener('touchmove', moveTouch);
    document.addEventListener('keydown', handleKeyPress);

    function startTouch(event) {
        if (!event.target.classList.contains('frame')) return;
        isDragging = true;
        startPosition = getPositionX(event);
        slider.style.cursor = 'grabbing';
    }

    function endTouch() {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -100 && prevTranslate !== 0) {
            currentTranslate += 100;
        } else if (movedBy > 100 && prevTranslate !== -100 * (slider.children.length - 1)) {
            currentTranslate -= 100;
        }
        setPositionByIndex();
        slider.style.cursor = 'grab';
    }

    function moveTouch(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPosition;
        setPositionByIndex();
    }

    function handleKeyPress(event) {
        if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function setPositionByIndex() {
        slider.style.transform = `translateX(${currentTranslate}%)`;
        prevTranslate = currentTranslate;
    }

    function prevSlide() {
        if (prevTranslate !== 0) {
            currentTranslate += 100;
        } else {
            currentTranslate = -100 * (slider.children.length - 1);
        }
        setPositionByIndex();
    }

    function nextSlide() {
        if (prevTranslate !== -100 * (slider.children.length - 1)) {
            currentTranslate -= 100;
        } else {
            currentTranslate = 0;
        }
        setPositionByIndex();
    }

    const leftOverlay = document.querySelector('.overlay.left');
    const rightOverlay = document.querySelector('.overlay.right');

    leftOverlay.addEventListener('click', prevSlide);
    rightOverlay.addEventListener('click', nextSlide);

}
