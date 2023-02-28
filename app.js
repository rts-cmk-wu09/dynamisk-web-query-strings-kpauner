"use strict";

let body = document.querySelector('body');

let destList = document.createElement('ul');
body.append(destList);

let url = ``;

fetch('./data/destinations.json')
    .then(function(response){
        return response.json(); // interpret it as json and Will try to convert it to a javascript object then return a new promise
    })
    .then(data => {
        let destinations = data.destinations;
        destinations.forEach(destination => {
            let destItem = document.createElement('li');
            destItem.innerHTML = `
            <img src="img/${destination.image}" class="pre-img" alt="">
            <div class="hello"><span class="material-icons">favorite</span><a href="?id=${destination.id}">more</a></div>
            `;
            destList.append(destItem);
            destList.classList.add('listing');

            // NEW FETCH REQUEST HERE?

        });
    })