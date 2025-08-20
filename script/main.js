// Masinile incarcate initial - fara filtrare
const cars = [
  {
    id: 1,
    brand: 'Hyundai',
    model: 'Kona',
    price: 50000,
    image: './assets/hyundai-kona.jpg',
    isOnSale: false,
  },
  {
    id: 2,
    brand: 'Hyundai',
    model: 'Tucson',
    price: 45000,
    image: './assets/hyundai-tucson.jpg',
    isOnSale: true,
  },
  {
    id: 3,
    brand: 'Hyundai',
    model: 'Santa Fe',
    price: 75000,
    image: './assets/hyundai-santa-fe.jpg',
    isOnSale: true,
  },
  {
    id: 4,
    brand: 'Hyundai',
    model: 'i-30',
    price: 35000,
    image: './assets/hyundai-i30.jpg',
    isOnSale: false,
  },
];

const priceSlider = document.getElementById('price-slider');
const priceValue = document.getElementById('price-value');
const selectOptionSort = document.getElementById('sort-options');
const searchCar = document.querySelector('#searchCar');
const radioForm = document.querySelector('#radioForm');
const searchForm = document.querySelector('#searchForm');

// Cautarea masinilor dupa key-ul 'model'
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchWishCar();
});

function searchWishCar() {
  const wishCar = searchCar.value;
  cars.forEach((car) => {
    if (car.model !== wishCar) return;
    if (wishCar) {
      console.log(wishCar);
      const vehicleListContainer = document.getElementById('vehicle-list');
      vehicleListContainer.innerHTML = ''; // Stergerea initiala a datelor din container
      const carArticle = document.createElement('article');
      carArticle.innerHTML = `
        <img src="${car.image}" alt="Hyundai ${
        car.model
      }" width="400" height="250" />
        <h2>Brand: ${car.brand}</h2>
        <h3>Model: ${car.model}</h3>
        <p>Price: <b>$${car.price.toLocaleString()}</b></p>
      `;
      vehicleListContainer.appendChild(carArticle);
      searchCar.value = '';
    }
  });
}

// Filtrarea dupa key-ul 'isOnSale'
radioForm.addEventListener('submit', (e) => {
  e.preventDefault();
  isOnSaleCars();
});

function isOnSaleCars() {
  const vehicleListContainer = document.getElementById('vehicle-list');
  vehicleListContainer.innerHTML = ''; // Stergerea initiala a datelor din container
  const selectedRadio = document.querySelector('.isOnSale:checked');
  const checkedValue = selectedRadio ? selectedRadio.value === 'true' : null;
  console.log(checkedValue);
  cars.forEach((car) => {
    if (checkedValue === null || car.isOnSale === checkedValue) {
      const carArticle = document.createElement('article');
      carArticle.innerHTML = `
        <img src="${car.image}" alt="Hyundai ${
        car.model
      }" width="400" height="250" />
        <h2>Brand: ${car.brand}</h2>
        <h3>Model: ${car.model}</h3>
        <p>Price: <b>$${car.price.toLocaleString()}</b></p>
      `;
      vehicleListContainer.appendChild(carArticle);
    }
  });
}

// Functia pentru randarea masinilor bazata pe parametrul 'pasat'
function renderCars(carList) {
  const vehicleListContainer = document.getElementById('vehicle-list');
  vehicleListContainer.innerHTML = ''; // Stergerea initiala a datelor din container

  carList.forEach((car) => {
    const carArticle = document.createElement('article');
    carArticle.innerHTML = `
        <img src="${car.image}" alt="Hyundai ${
      car.model
    }" width="400" height="250" />
        <h2>Brand: ${car.brand}</h2>
        <h3>Model: ${car.model}</h3>
        <p>Price: <b>$${car.price.toLocaleString()}</b></p>
      `;
    vehicleListContainer.appendChild(carArticle);
  });
}

function setMaxPriceInSlider() {
  const maxCarPrice = Math.max(...cars.map((car) => car.price));
  priceSlider.max = maxCarPrice; // Valoarea maxima
  priceSlider.value = maxCarPrice; // Valoarea initiala a silder-ului
  priceValue.textContent = `$${maxCarPrice.toLocaleString()}`;
}

// Filtrarea masinilor bazata pe alegerile utilizatorului
function filterCars() {
  const selectedModels = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkBox) => checkBox.value);

  console.log(selectedModels);
  const maxPrice = parseInt(priceSlider.value);
  const sortOption = selectOptionSort.value;

  let filteredCars = cars.filter((car) => {
    const matchesModel =
      selectedModels.length === 0 || selectedModels.includes(car.model);
    const matchesPrice = car.price <= maxPrice;
    return matchesModel && matchesPrice;
  });

  // Sortarea elementelor bazata pe
  if (sortOption === 'price-asc') {
    /* 
      caz 1 a-b = un numar negativ a o sa fie pozitionat inaintea elementului b
      caz 2 a-b = 0 ramane ordinea actuala
      caz 3 a-b = un numar pozitiv a o sa fie pozitionat dupa elementul b
    */
    filteredCars.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    filteredCars.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'alphabetic-asc') {
    /* 
     a.model.localeCompare(b.model) returneaza -1, 0, 1
    */
    filteredCars.sort((a, b) => a.model.localeCompare(b.model));
  } else if (sortOption === 'alphabetic-desc') {
    filteredCars.sort((a, b) => b.model.localeCompare(a.model));
  }

  renderCars(filteredCars);
}

// Logica pentru a face filtrarea cu price slider
priceSlider.addEventListener('input', function (event) {
  priceValue.textContent = `$${parseInt(
    event.currentTarget.value
  ).toLocaleString()}`;
  filterCars();
});

// Logica pentru a face filtrarea cu modelele - input checkbox
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener('change', filterCars);
});

// Sorting by options
selectOptionSort.addEventListener('change', filterCars);

// Setarea valorii initiale pentru price slider
setMaxPriceInSlider();
// Randarea initiala a masinilor
renderCars(cars);
