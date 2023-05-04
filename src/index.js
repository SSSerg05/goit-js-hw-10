import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков

const param = {
  url: 'https://restcountries.com/v3.1/name/',
  fields: ['name', 'capital', 'population', 'flags', 'languages'],
};

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  out: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(getInput, DEBOUNCE_DELAY));

function getInput() { 
  refs.out.innerHTML = "";
  refs.list.innerHTML = "";

  let str = refs.input.value.trim();
  getCountries(str);
}

//получить данные
function getCountries(name) {
  //https://restcountries.com/v3.1/name/deutschland
  const str = `${param.url}${name}?status=true&fields=${[...param.fields]}`;
  
  fetch(str)
    .then(responce => {
      return responce.json()
    }).then(countries => { showCountry(countries) });
}


function showCountry(countries) {
  if (countries.status === 404) {
    Notify.failure('Oops, there is no country with that name.'); 
    return
  }

  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length === 1) {
    showOneCountry(countries)
  } else { 
    showListCountry(countries)
  }

  return
}


function showListCountry(countries) { 
 
  let str = ''; 
 
  for (item of countries) {
    str += `
      <li
        data-name="${item.name.official}" 
        data-capital="${item.capital}" 
        data-population="${item.population}" 
        data-flag="${item.flags.svg}"
        data-languages="${item.languages}">
          <span style="vertical-align: text-top;">
            <img src="${item.flags.svg}" width="30" height="20">
          </span>
          ${item.name.common}
      </li>
    `;
  }
  
  refs.list.innerHTML = str;
}

function showOneCountry(country) {
 
  const { name, capital, population, flags, languages } = country[0];
 
  let str = `
    <h3
      <span style="vertical-align: sub;">
        <img src="${flags.svg}" width="30" height="20">
      </span>
      ${name.official}
    </h3>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${Object.values(languages).join(', ')}</p>
    `;

  refs.out.innerHTML = str;
}