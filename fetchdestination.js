let body = document.querySelector('body');

const params = new URLSearchParams(window.location.search);
const destinationId = params.get('id') ?? 'default';

fetch(`./data/${destinationId}.json`)
.then(response => response.json())
.then(destinationData => {
    body.innerHTML = `
    <article class="dest">
        <div class="dest-img">
            <a href="#" class="favorite"><span class="fa-regular fa-heart fa-lg"></span>favorit</a>
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
})
.catch(error => console.error(error));