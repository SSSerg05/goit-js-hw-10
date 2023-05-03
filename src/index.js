import './css/styles.css';
import debounce from 'lodash.debounce';
import notiflix from 'notiflix';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
const param = {
  //url: 'https://restcountries.com/v3.1/all',
  url: 'https://restcountries.com/v3.1/name/',
  fields: ['name.official', 'capital', 'population', 'flags.svg', 'languages'],
};

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  out: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', getInput);

//fetchCountries('Poland');
getCountries('Poland');

function getInput() { 

}


//получить данные
function getCountries(name) {
  //https://restcountries.com/v3.1/name/deutschland
  const str = `${param.url}${name}`; ////?fields=${[...param.fields]}`;
  fetch(str)
    .then(responce => {
      return responce.json()
    }).then(country => { showCountry(country) });
}

function showCountry([...country]) {
  console.log(country[0]);
  console.log(country[0].name.official);
  console.log(country[0].capital[0]);
  console.log(country[0].flags.svg);
  const str = `
    <li>
      <span>
        <svg width="30" height="20">
          <use href="${country[0].flags.svg}"></use>
        </svg>
      </span>
      ${country[0].name.official}
    </li>`;
  
  refs.list.innerHTML = str;
}