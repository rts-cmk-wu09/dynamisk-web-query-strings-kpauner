"use strict";

let body = document.querySelector('body');

let destList = document.createElement('ul');
body.append(destList);

const params = new URLSearchParams(window.location.search);
const destinationId = params.get('id') ?? 'default';

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
            <div class="hello"><span class="material-icons">favorite</span><a href="destinations.html?id=${destination.id}">more</a></div>
            `;
            destList.append(destItem);
            destList.classList.add('listing');

        });
    })
    .then()
    
    // NEW FETCH REQUEST HERE?
    fetch(`./data/${destinationId}.json`)
        .then(response => {
            return response.json()
            })
        .then(destinationData => {
            body.innerHTML = `
            <article class="dest">
                <div class="dest-img">
                    <a href="#" class="favorite"><span class="material-icons">favorite</span>favorit</a>
                    <img src="img/${destinationData.image}" class="pre-img" alt="">
                </div>
                <div class="content">
                    <a href="!#" class="category">${destinationData.destination}</a>
                    <h1>${destinationData.title}</h1>
                    <p class="subtitle">${destinationData.subtitle}</p>
                    <p>${destinationData.text}</p>
                    <h2>Facilities</h2>
                    <ul>
                        ${destinationData.facilities.map(facility => `<li>${facility}</li>`).join('')}
                    </ul>
                </div>
            </article>
            `;
            console.log(URLSearchParams)
        })
        .catch(error => console.error(error));