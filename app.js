"use strict";

const body = document.querySelector('body');

const destList = document.createElement('ul');
destList.classList.add('listing');
body.append(destList);


fetch('./data/destinations.json')
    .then(response => response.json())
    .then(data => {
        const destinations = data.destinations;
        destinations.forEach(destination => {
            let isFavorite = JSON.parse(localStorage.getItem(`${destination.id}`));
            const destItem = document.createElement('li'); // list
            destList.append(destItem);
            const destImg = document.createElement('img'); // img
            destImg.setAttribute('src', `img/${destination.image}`); 
            destItem.append(destImg);
            const moreBar = document.createElement('div'); // more
            moreBar.classList.add('more');
            destItem.append(moreBar);
            const favLink = document.createElement('a'); // fav
            favLink.setAttribute('id', `${destination.id}`);
            favLink.classList.add('favorite');
            if (isFavorite) {
                favLink.classList.add('fa-solid');
                favLink.classList.remove('fa-regular');
              } else {
                favLink.classList.remove('fa-solid');
                favLink.classList.add('fa-regular');
              }
            // Maybe use the destination ID to distinguish between listitems? target-parentNode
            moreBar.append(favLink);
            const destLink = document.createElement('a'); // destination link
            destLink.setAttribute('href', `destinations.html?id=${destination.id}`)
            destLink.classList.add('dest-link');
            moreBar.append(destLink);
            const destMore = document.createTextNode('more')
            destLink.append(destMore); 
            

            // FAVORITE
            favLink.addEventListener("click", e => {          
                isFavorite = !isFavorite;
                favLink.classList.toggle('fa-solid');
                favLink.classList.toggle('fa-regular');
                localStorage.setItem(`${destination.id}`, isFavorite); 
              })
        });         
    })
    .catch(error => console.error(error));


