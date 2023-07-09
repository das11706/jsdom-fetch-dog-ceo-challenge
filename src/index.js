console.log('%c HI', 'color: firebrick')


document.addEventListener('DOMContentLoaded', function(){
  loadDogImages();
  loadDogBreeds();
});


function loadDogImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  return fetch(imgUrl)
    .then(resp => resp.json())
    .then(images => {
      images.message.forEach(image => addImage(image))
    });
}


function addImage(dogImage) {
  let container = document.querySelector("#dog-image-container");
  let newImage = document.createElement('img');
  newImage.src = dogImage;
  container.appendChild(newImage);
}


function loadDogBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  return fetch(breedUrl)
    .then(resp => resp.json())
    .then(results => {
      breeds = Object.keys(results.message);
      updateBreedList(breeds);
      addBreedSelectListener();
    });
}


function addBreed(dogBreed) {
  let ul = document.querySelector("#dog-breeds");
  let li = document.createElement('li');
  li.innerText = dogBreed;
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}


function updateColor(event) {
  event.target.style.color = 'green';
}

function updateBreedList(breeds) {
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}


function removeChildren(element) {
  let child = element.lastElementChild;
  while(child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}


function selectBreedStartingWith(letter) {
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}


function addBreedSelectListener() {
  let breedDropdown = document.querySelector('#breed-dropdown');
  breedDropdown.addEventListener('change', function (event) {
    selectBreedStartingWith(event.target.value);
  });
}