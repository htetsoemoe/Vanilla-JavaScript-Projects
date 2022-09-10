const about = document.querySelector('.about');
const btns = document.querySelectorAll('.tab-btn');
const articles = document.querySelectorAll('.content');

// listens click event on about (Parent Element)
about.addEventListener('click', eventOfParent => {
    const id = eventOfParent.target.dataset.id;
    //console.log(eventOfParent.target);// gets child element of parent element (.about) ==> <button class='tab-btn'></button> or <p></p>
    
    
    if (id) {
        // removes selected from other buttons
        btns.forEach(btn => {
            btn.classList.remove('active');
        });
        eventOfParent.target.classList.add('active');

        // hides other articles
        articles.forEach(article => {
            article.classList.remove('active');
        });

        // get clicked content
        const element = document.getElementById(id);
        element.classList.add('active');
    }
    
})