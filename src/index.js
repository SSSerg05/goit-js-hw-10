import './css/styles.css';
import debounce from 'lodash.debounce';
import notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
const param = {
  url: 'https://restcountries.com/v3.1/all',
  fields: ['name.official', 'capital', 'population', 'flags.svg', 'languages'],
};

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  out: document.querySelector('.country-info'),
}


// получить данные
function getCountries() {
  // Функция getCountries получает из select id города.
  const cityId = outSelect.value;
  localStorage.setItem('selectCity', outSelect.selectedIndex);

  fetch(`${param.url}?fields=${[...param.fields]}`)
    .then(country => {
      return country.json();
    }).then(showCountry);
}
