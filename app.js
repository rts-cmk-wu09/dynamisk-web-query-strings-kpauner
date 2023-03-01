"use strict";

const body = document.querySelector('body');

const destList = document.createElement('ul');
destList.classList.add('listing');
body.append(destList);

//add eventlistener load?
let isFavorite = JSON.parse(localStorage.getItem('isFavorite'));


fetch('./data/destinations.json')
    .then(response => response.json())
    .then(data => {
        const destinations = data.destinations;
        destinations.forEach(destination => {
            const destItem = document.createElement('li'); // list
            destList.append(destItem);
            const destImg = document.createElement('img'); // img
            destImg.setAttribute('src', `img/${destination.image}`); 
            destItem.append(destImg);
            const moreBar = document.createElement('div'); // more
            moreBar.classList.add('more');
            destItem.append(moreBar);
            const favLink = document.createElement('a'); // fav
            favLink.setAttribute('href', '#')
            favLink.classList.add('favorite');
            favLink.classList.toggle(isFavorite === true ? 'fa-solid' : 'fa-regular');
            moreBar.append(favLink);
            const destLink = document.createElement('a'); // destination link
            destLink.setAttribute('href', `destinations.html?id=${destination.id}`)
            destLink.classList.add('dest-link');
            moreBar.append(destLink);
            const destMore = document.createTextNode('more')
            destLink.append(destMore);  

            // FAVORITE
            favLink.addEventListener("click", e => {
                e.preventDefault();
                favLink.classList.toggle('fa-regular')
                favLink.classList.toggle('fa-solid')
                isFavorite = !isFavorite; 
                localStorage.setItem('isFavorite', isFavorite); 
            })
        });         
    })
    .catch(error => console.error(error));


