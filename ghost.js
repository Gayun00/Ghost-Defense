export class Ghost {
    constructor(ghostCount, moveWidth, willMoveCount, leftCount, downCount) {
        this.ghostCount = ghostCount;
        this.aliveGhostCount;

        this.moveWidth = moveWidth;
        this.willMoveCount = willMoveCount;

        this.leftCount = leftCount;
        this.downCount = downCount;

        this.$ghostField = document.querySelector('.ghost__field');
        this.$ghostFieldWidth = this.$ghostField.getBoundingClientRect().width;
        this.$ghostFieldHeight = this.$ghostField.getBoundingClientRect().height;
    }

    createRandomGhost(num) {
        for(let i = 0; i < num; i++) {
            console.log('created ghost')
            const $ghostEl = document.createElement('div');
            $ghostEl.classList.add('ghost__container')
            $ghostEl.innerHTML = `
                <img class="ghost__img" src="images/enemy.png">`
            this.$ghostField.appendChild($ghostEl);
            const $ghostElWidth = $ghostEl.getBoundingClientRect().width;

            const x = this.createRandomNumber(
                (this.willMoveCount * this.moveWidth) + $ghostElWidth / 2,
                this.$ghostFieldWidth - (this.willMoveCount * this.moveWidth + $ghostElWidth / 2));
            const y = this.createRandomNumber(0, this.$ghostFieldHeight);
            $ghostEl.style.left = `${x}px`;
            $ghostEl.style.top = `${y}px`;
        }
    }

    createRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    moveGhostTo(isLeft, moveWidth) {
        if (isLeft === true) {
            this.leftCount--;
            this.downCount++;
        } else  {
            this.leftCount++;
            this.downCount++;
        }
        this.$ghostField.style.transform =`
            translate(${this.leftCount * moveWidth}px, ${this.downCount * moveWidth}px)`;
    }

    countAliveGhost() {
        this.aliveGhostCount = 0;
        this.$ghostField.forEach((ghost) => {
            if(ghost.classList.contains('ghost__img--dead')) {
                this.aliveGhostCount++;
            }
        })
        return this.aliveGhostCount;
    }
}
