let body = document.querySelector('body');

const params = new URLSearchParams(window.location.search);
const destinationId = params.get('id') ?? 'default';
let isFavorite = JSON.parse(localStorage.getItem(`${data.id}`));

fetch(`./data/${destinationId}.json`)
.then(response => response.json()) // Promise handler
.then(data => {

    const destItem = document.createElement('article'); // article
    destItem.classList.add('dest');
    body.append(destItem);

    const imgContainer = document.createElement('div'); // img Container
    imgContainer.classList.add('dest-img');
    destItem.append(imgContainer);

    const destImg = document.createElement('img'); // img
    destImg.setAttribute('src', `img/${data.image}`); 
    imgContainer.append(destImg);

    const favContainer = document.createElement('span'); // fav Container
    favContainer.classList.add('favcontainer');
    imgContainer.append(favContainer);

    const favLink = document.createElement('a'); // fav
    favLink.setAttribute('id', `${data.id}`);
    favLink.classList.add('favorite');
    if (isFavorite) {
        favLink.classList.add('fa-solid');
        favLink.classList.remove('fa-regular');
        } else {
        favLink.classList.remove('fa-solid');
        favLink.classList.add('fa-regular');
    }
    favContainer.append(favLink);

    const destMore = document.createTextNode('favorite')
    favLink.append(destMore);

    const content = document.createElement('div'); // img Container
    content.classList.add('content');
    destItem.append(content);
    content.innerHTML = `
    <a href="!#" class="category">${data.destination}</a>
        <h1>${data.title}</h1>
        <p class="subtitle">${data.subtitle}</p>
        <p>${data.text}</p>
        <button class="
        ${localStorage.getItem('reserved') ? 'reserved' : 'reserve'}">Reserve</button>
        <h2>Facilities</h2>
        <ul>
        ${data.facilities.map(facility => `<li>${facility}</li>`).join('')}
    </ul>
    `;

    favLink.addEventListener("click", e => {          
        isFavorite = !isFavorite;
        favLink.classList.toggle('fa-solid');
        favLink.classList.toggle('fa-regular');
        localStorage.setItem(`${data.id}`, isFavorite); 
    })
})
.catch(error => console.error(error));