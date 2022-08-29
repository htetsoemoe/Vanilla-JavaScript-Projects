//using selectors inside the element
const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    const btn = question.querySelector('.question-btn');
    //console.log(btn);

    btn.addEventListener('click', () => {
        //console.log(question);// User clicks the btn and gets parent article of clicked btn

        // gets parents of previous-clicked btn (article) & current-clicked btn (article)
        questions.forEach(item => {
            console.log(item);
            // If show-text class isn't exit in current click btn's article
            if (item !== question) {
                item.classList.remove('show-text');
            }
        });

        // add show-text class to article's class-list
        question.classList.toggle('show-text');
    })
})




// traversing the dom
