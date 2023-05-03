function fetchCountries(name) {
  //https://restcountries.com/v3.1/name/deutschland
  const str = `${param.url}${name}`;
  fetch(str)
    .then(responce => {
      return responce.json()
    }).then(country => { showCountry(country) });
}

export default fetchCountries