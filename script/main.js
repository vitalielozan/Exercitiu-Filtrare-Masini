// Masinile incarcate initial - fara filtrare
import { CARS } from './constants.js';
const priceSlider = document.getElementById('price-slider');
const priceValue = document.getElementById('price-value');
const selectOptionSort = document.getElementById('sort-options');
const searchCar = document.querySelector('#searchCar');
const filterForm = document.querySelector('#filterForm');
const radioSale = document.querySelectorAll('input[name="Sale"]');

// Cautarea masinilor dupa key-ul 'model'
// searchForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   searchWishCar();
// });

filterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(filterForm);
  const objectFormData = Object.fromEntries(formData.entries());
  const brands = formData.getAll('brand');
  filterCars(objectFormData, brands);
});

// searchCar.addEventListener('input', (e) => {
//   searchWishCar(e.target.value);
// });

// function searchWishCar(searchItem) {
//   const vehicleListContainer = document.getElementById('vehicle-list');
//   vehicleListContainer.innerHTML = ''; // Stergerea initiala a datelor din container
//   CARS.forEach((car) => {
//     if (!car.model.toLowerCase().includes(searchItem.toLowerCase())) return;
//     if (searchItem) {
//       const carArticle = document.createElement('article');
//       carArticle.innerHTML = `
//       <div class="article"
//         <img src="${car.image}" alt="${
//         car.model
//       }" class="img-article" width="400" height="250" />
//         <h2>${car.brand}</h2>
//         <h3>Model: ${car.model}</h3>
//         <p>Price: <b>$${car.price.toLocaleString()}</b></p>
//         </div>
//       `;
//       vehicleListContainer.appendChild(carArticle);
//     }
//   });
// }

// Filtrarea dupa key-ul 'isOnSale'
// radioForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   isOnSaleCars();
// });

// radioSale.forEach((radioBtn) => {
//   radioBtn.addEventListener('change', (e) => {
//     isOnSaleCars(e.target.value);
//   });
// });

// function isOnSaleCars(isOnSale) {
//   const vehicleListContainer = document.getElementById('vehicle-list');
//   vehicleListContainer.innerHTML = ''; // Stergerea initiala a datelor din container
//   const checkedValue = isOnSale ? isOnSale === 'true' : null;
//   console.log(checkedValue);
//   CARS.forEach((car) => {
//     if (checkedValue === null || car.isOnSale === checkedValue) {
//       const carArticle = document.createElement('article');
//       carArticle.innerHTML = `
//       <div class= "article">
//         <img src="${car.image}" alt="${
//         car.model
//       }" class="img-article" width="400" height="250" />
//         <h2>${car.brand}</h2>
//         <h3>Model: ${car.model}</h3>
//         <p>Price: <b>$${car.price.toLocaleString()}</b></p>
//         </div>
//       `;
//       vehicleListContainer.appendChild(carArticle);
//     }
//   });
// }

// Functia pentru randarea masinilor bazata pe parametrul 'pasat'
function renderCars(carList) {
  const vehicleListContainer = document.getElementById('vehicle-list');
  vehicleListContainer.innerHTML = ''; // Stergerea initiala a datelor din container

  carList.forEach((car) => {
    const carArticle = document.createElement('article');
    carArticle.innerHTML = `
    <div class="article">
        <img src="${car.image}" alt="${
      car.model
    }" class="img-article" width="400" height="250" />
        <h2>${car.brand}</h2>
        <h3>Model: ${car.model}</h3>
        <p>Price: <b>$${car.price.toLocaleString()}</b></p>
        </div>
      `;
    vehicleListContainer.appendChild(carArticle);
  });
}

function setMaxPriceInSlider() {
  const maxCarPrice = Math.max(...CARS.map((car) => car.price));
  priceSlider.max = maxCarPrice; // Valoarea maxima
  priceSlider.value = maxCarPrice; // Valoarea initiala a silder-ului
  priceSlider.addEventListener('input', () => {
    priceValue.textContent = `$${Number(priceSlider.value).toLocaleString()}`;
    priceValue.classList.add('animate');
    setTimeout(() => priceValue.classList.remove('animate'), 300);
  });
  priceValue.textContent = `$${maxCarPrice.toLocaleString()}`;
}

// Filtrarea masinilor bazata pe alegerile utilizatorului
function filterCars(formData, brands) {
  const { price, sale, search, sortOptions } = formData;
  const maxPrice = parseInt(price);
  console.log(maxPrice, sale, search, sortOptions, brands);
  let filteredCars = CARS.filter((car) => {
    const matchesBrand =
      brands.length === 0 ||
      brands.some((brand) => brand.toLowerCase() === car.brand.toLowerCase());
    const matchesPrice = car.price <= maxPrice;
    const matchesSale =
      sale === undefined || car.isOnSale === (sale === 'true');
    const matchesSearch =
      !search || car.model.toLowerCase().includes(search.toLowerCase());
    return matchesBrand && matchesPrice && matchesSale && matchesSearch;
  });

  // Sortarea elementelor bazata pe
  if (sortOptions === 'price-asc') {
    filteredCars.sort((a, b) => a.price - b.price);
  } else if (sortOptions === 'price-desc') {
    filteredCars.sort((a, b) => b.price - a.price);
  } else if (sortOptions === 'alphabetic-asc') {
    filteredCars.sort((a, b) => a.model.localeCompare(b.model));
  } else if (sortOptions === 'alphabetic-desc') {
    filteredCars.sort((a, b) => b.model.localeCompare(a.model));
  }
  console.log(filteredCars);
  renderCars(filteredCars);
}

// // Logica pentru a face filtrarea cu price slider
// priceSlider.addEventListener('input', function (event) {
//   priceValue.textContent = `$${parseInt(
//     event.currentTarget.value
//   ).toLocaleString()}`;
//   filterCars();
// });

// // Logica pentru a face filtrarea cu modelele - input checkbox
// document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
//   checkbox.addEventListener('change', filterCars);
// });

// // Sorting by options
// selectOptionSort.addEventListener('change', filterCars);

// Setarea valorii initiale pentru price slider
setMaxPriceInSlider();
// Randarea initiala a masinilor
renderCars(CARS);
