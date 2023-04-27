import './css/styles.css';

const DEBOUNCE_DELAY = 300;

// получить данные
function getWeather() {
  // Функция getWeather получает из select id города.
  const cityId = outSelect.value;
  localStorage.setItem('selectCity', outSelect.selectedIndex);

  fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
.then(weather => {
    return weather.json();
  }).then(showWeather);
}
