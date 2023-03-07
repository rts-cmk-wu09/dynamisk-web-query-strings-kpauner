let body = document.querySelector('body');

const params = new URLSearchParams(window.location.search);
const destinationId = params.get('id') ?? 'default';

fetch(`./data/${destinationId}.json`)
.then(response => response.json()) // Promise handler
.then(data => {
    
    const listId = data.id;

    let listing = {
        id: listId,
        isFavorite: false,
        isReserve: false
    };

    const getList = JSON.parse(localStorage.getItem(listId));
    
    if (getList) {
        listing.isFavorite = getList.isFavorite;
        listing.isReserve = getList.isReserve;
      } else {
        listing.isFavorite = false;
        listing.isReserve = false;
      }
    
    console.log(getList)

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
    favLink.setAttribute('id', data.id);
    favLink.classList.add('favorite');
    
    if (listing.isFavorite) {
        favLink.classList.add('fa-solid');
        favLink.classList.remove('fa-regular');
        } else {
        favLink.classList.remove('fa-solid');
        favLink.classList.add('fa-regular');
    }
    favContainer.append(favLink);

    const destMore = document.createTextNode('favorite')
    favLink.append(destMore);

    let reserveBtn = document.createElement('button');
    reserveBtn.innerText = 'Reserve';
    reserveBtn.classList.add('reserve');   
    listing.isReserve
        ? (reserveBtn.classList.add('btn-solid'), reserveBtn.classList.remove('btn-regular'), reserveBtn.innerText = 'Reserved')
        : (reserveBtn.classList.remove('btn-solid'), reserveBtn.classList.add('btn-regular'), reserveBtn.innerText = 'Reserve');

    const content = document.createElement('div'); // img Container
    content.classList.add('content');
    destItem.append(content);
    content.innerHTML = `
    <a href="!#" class="category">${data.destination}</a>
        <h1>${data.title}</h1>
        <p class="subtitle">${data.subtitle}</p>
        <p>${data.text}</p>
        <h2>Facilities</h2>
        <ul>
        ${data.facilities.map(facility => `<li>${facility}</li>`).join('')}
    </ul>
    `;

    content.append(reserveBtn)

    document.body.addEventListener("click", e => {
        if (e.target.classList.contains('favorite')) {
            favLink.classList.toggle('fa-solid');
            favLink.classList.toggle('fa-regular');
            listing.isFavorite = !listing.isFavorite;
            localStorage.setItem(listId, JSON.stringify(listing));
        } else if (e.target.classList.contains('reserve')) {
            reserveBtn.classList.toggle('btn-solid');
            reserveBtn.classList.toggle('btn-regular');
            if (listing.isReserve) {
                reserveBtn.innerText = 'Reserve';
            } else {
                reserveBtn.innerText = 'Reserved';
            }
            listing.isReserve = !listing.isReserve;
            localStorage.setItem(listId, JSON.stringify(listing));
        }
    });
})
.catch(error => console.error(error));