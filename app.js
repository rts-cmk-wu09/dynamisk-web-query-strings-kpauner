// "use strict";

let body = document.querySelector('body');

let destList = document.createElement('ul');
body.append(destList);
// let destinations;

fetch("./data/destinations.json")
    .then(function(response){
        return response.json(); // interpret it as json and Will try to convert it to a javascript object then return a new promise
    })
    .then(data => {
        let destinations = data.destinations;
        destinations.forEach(destination => {
            let destItem = document.createElement('li');
            destItem.innerHTML = `
                <h2>${destination.title}</h2>
                ${destination.title}
            `;
            destList.append(destItem);
            destList.classList.add('listing');
            console.log(destination);
        });
    })