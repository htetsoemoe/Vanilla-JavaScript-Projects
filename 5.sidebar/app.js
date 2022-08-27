const toggleBtn = document.querySelector('.sidebar-toggle');
const sideBar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');

// Toggle Button
toggleBtn.addEventListener('click', () => {
    // if (sideBar.classList.contains('show-sidebar')) {
    //     sideBar.classList.remove('show-sidebar');
    // } else {
    //     sideBar.classList.add('show-sidebar');
    // }

    sideBar.classList.toggle('show-sidebar');
});

// Close Button
closeBtn.addEventListener('click', () => {
    sideBar.classList.remove('show-sidebar');
});