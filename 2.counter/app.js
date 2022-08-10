let count = 0;

let value = document.getElementById('value');
let btns = document.querySelectorAll('.btn');

btns.forEach(btn => {
    btn.addEventListener('click', event => {
        let lists = event.currentTarget.classList;
        if (lists.contains('increase')) {
            count++;
        } else if (lists.contains('decrease')) {
            count--;
        } else {
            count = 0;
        }

        if (count < 0) {
            value.style.color = 'red';
        } else if (count > 0) {
            value.style.color = 'green';
        } else {
            value.style.color = 'black';
        }

        value.textContent = count;
    })

})