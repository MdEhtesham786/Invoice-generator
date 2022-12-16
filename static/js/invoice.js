let btn = document.querySelector('.download');
let backBtn = document.querySelector('.back');

btn.addEventListener('click', () => {
    window.print();
});
backBtn.addEventListener('click', () => {
    window.history.back();
});