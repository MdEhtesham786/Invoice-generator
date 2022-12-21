let searchBar = document.getElementById('searchBar');
let searchBarResp = document.getElementById('searchBar-resp');
let query;
let isVisible;
let iterator = 0;
let info = document.querySelector('.info');
let url = 'http://127.0.0.1:5000/static';
fetch(url).then(res => res.json()).then(json => {
    // console.log(json.Data);
});
let title;
let date;
let Data = document.querySelectorAll('.card');
let arr = [];
let navbar = document.querySelector('.navbar');
let burger_btn = document.querySelector('.burger-btn');
let burger = document.getElementById('burger');
let cross = document.getElementById('cross');
//Burger
burger_btn.addEventListener('click', () => {
    if (burger.classList.contains('block')) {
        burger.classList.remove('block');
        burger.classList.add('hidden');
        cross.classList.remove('hidden');
        cross.classList.add('block');
        navbar.style.height = '13.6rem';
    } else {
        cross.classList.remove('block');
        cross.classList.add('hidden');
        burger.classList.remove('hidden');
        burger.classList.add('block');
        navbar.style.height = '4rem';

    }
});
Data.forEach((data) => {
    arr.push({
        title: data.lastElementChild.firstElementChild.innerText,
        date: data.lastElementChild.firstElementChild.nextElementSibling.innerText,
        name: data.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerText,
        element: data
    });
});
const result = arr.map((item) => {
    return { title: item.title, date: item.date, name: item.name, element: item.element };
});
searchBar.addEventListener('keyup', (e) => {

    iterator = 0;
    searchBarResp.value = '';
    query = e.target.value.replace(/\s+/g, '').toLowerCase();
    result.forEach((item) => {
        isVisible = item.title.replace(/\s+/g, '').toLowerCase().includes(query) || item.date.replace(/\s+/g, '').toLowerCase().includes(query) || item.name.replace(/\s+/g, '').toLowerCase().includes(query);
        item.element.classList.toggle('hide', !isVisible);
        if (isVisible) {
            console.log('t');
        } else {
            iterator += 1;
            console.log(iterator);
        }
    });
    if (iterator == arr.length) {
        console.log('No data found');
        info.innerText = 'No pdf found';
    } else {
        info.innerText = '';
    }
});
searchBarResp.addEventListener('keyup', (e) => {
    iterator = 0;
    searchBar.value = '';
    query = e.target.value.replace(/\s+/g, '').toLowerCase();
    arr.forEach((item) => {
        isVisible = item.title.replace(/\s+/g, '').toLowerCase().includes(query) || item.date.replace(/\s+/g, '').toLowerCase().includes(query) || item.name.replace(/\s+/g, '').toLowerCase().includes(query);
        item.element.classList.toggle('hide', !isVisible);
        if (isVisible) {
            console.log('true');
        } else {
            iterator += 1;
            console.log(iterator);
        }
    });
    if (iterator == arr.length) {
        console.log('No data found');
        info.innerText = 'No pdf found';
    } else {
        info.innerText = '';
    }
});
