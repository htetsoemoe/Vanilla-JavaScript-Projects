const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

let color = document.querySelector('.color');
let btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
        hexColor += hex[this.getRandomNumber()];
    }

    color.textContent = hexColor;
    document.body.style.backgroundColor = hexColor;
});

function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
}
