'use strict';

const $heroContainer = document.querySelector('.hero__container');
const $heroImg = document.querySelector('.hero__img');

window.addEventListener('keydown', handleHero);

let LEFT_COUNT = 0;
let UP_COUNT = 0;
let SPEED = 10;

function handleHero(e) {
    const key = e.key;

    if (key === 'ArrowLeft') {
        handleHeroAngle('left');
        moveHero('left');
    } else if (key === 'ArrowRight') {
        handleHeroAngle('right');
        moveHero('right');
    } else if (key === 'ArrowUp') {
        handleHeroAngle('back');
        moveHero('up');
    } else {
        handleHeroAngle ('front');
        moveHero('down');
    }
}

function handleHeroAngle(direction) {
    if($heroImg.classList.contains('hero--front')) {
        $heroImg.classList.remove('hero--front');
    } else if ($heroImg.classList.contains('hero--back')) {
        $heroImg.classList.remove('hero--back');
    } else if ($heroImg.classList.contains('hero--left')) {
        $heroImg.classList.remove('hero--left');
    } else if ($heroImg.classList.contains('hero--right')) {
        $heroImg.classList.remove('hero--right');
    }
        $heroImg.classList.add(`hero--${direction}`);
}

function moveHero(direction) {
    if (direction === 'left') {
        LEFT_COUNT--;
    } else if (direction === 'right') {
        LEFT_COUNT++;
    } else if (direction === 'up') {
        UP_COUNT--;
    } else {
        UP_COUNT++;
    }
    $heroContainer.style.transform =` translate(${LEFT_COUNT * SPEED}px, ${UP_COUNT * SPEED}px)`;
}

// ghost

const $ghostContainers = document.querySelectorAll('.ghost__container');

const $ghostField = document.querySelector('.ghost__field');
const $ghostFieldWidth = $ghostField.getBoundingClientRect().width;
const $ghostFieldHeight = $ghostField.getBoundingClientRect().height;

$ghostContainers.forEach(($ghostContainer) => {
    $ghostContainer.addEventListener('transitionend', stopGhostMove)
})

function stopGhostMove(e) {
    const ghostTop = e.target.getBoundingClientRect().top;
    if (ghostTop === 700) {
        console.log('here stop it there');
    }
}



let GHOST_DOWN_COUNT = 0;
let GHOST_LEFT_COUNT = 0;

let MOVED_COUNT = 0;
let WILL_MOVE_COUNT = 40;
let GHOST_MOVE_WIDTH = 2

let GHOST_SPEED_ONCE = 10;
let GHOST_SPEED =  GHOST_SPEED_ONCE * 2;

const GHOST_COUNT = 30;


function moveGhost() {

}

function handleMoveToDownLeft() {
    const moveToDownLeft = setInterval(() => {
        moveGhostDownAndLeft();
        MOVED_COUNT++;
        if (MOVED_COUNT === WILL_MOVE_COUNT) {
            MOVED_COUNT = 0;
            clearInterval(moveToDownLeft);
            handleMoveToDownRight();
        }
    }, GHOST_SPEED)
}

// handleMoveToDownLeft();

function handleMoveToDownRight() {
    const moveToDownRight = setInterval(() => {
        moveGhostDownAndRight();
        MOVED_COUNT++;
        if (MOVED_COUNT === WILL_MOVE_COUNT) {
            MOVED_COUNT = 0;
            clearInterval(moveToDownRight);
            handleMoveToDownLeft();
        }
    }, GHOST_SPEED)
}



function moveGhostDownAndLeft() {
    moveGhostTo('down');
    setTimeout(() => {
        moveGhostTo('left')
    }, GHOST_SPEED_ONCE)
}

function moveGhostDownAndRight() {
    moveGhostTo('down');
    setTimeout(() => {
        moveGhostTo('right')
    }, GHOST_SPEED_ONCE)
}


function moveGhostTo(direction) {
    if (direction === 'left') {
        GHOST_LEFT_COUNT--;
    } else if (direction === 'right') {
        GHOST_LEFT_COUNT++;
    } else {
        GHOST_DOWN_COUNT++;
    }
    $ghostContainer.style.transform =` translate(${GHOST_LEFT_COUNT *GHOST_MOVE_WIDTH}px, ${GHOST_DOWN_COUNT *GHOST_MOVE_WIDTH}px)`;

}

// random ghost
function createRandomGhost(count) {
    for(let i = 0; i < count; i++) {
        const $ghostEl = document.createElement('div');
        $ghostEl.classList.add('ghost__container')
        $ghostEl.innerHTML = `
            <img class="ghost__img" src="images/enemy.png" alt="">`
        $ghostField.appendChild($ghostEl);

        const x = createRandomNumber(0, $ghostFieldWidth);
        const y = createRandomNumber(0, $ghostFieldHeight);
        $ghostEl.style.left = `${x}px`;
        $ghostEl.style.top = `${y}px`;
    }

}

createRandomGhost(GHOST_COUNT)
function createRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

console.log($ghostFieldHeight)
