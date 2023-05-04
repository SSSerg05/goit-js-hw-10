function fetchCountries(name) {
  //https://restcountries.com/v3.1/name/deutschland
  const str = `${param.url}${name}?status=true&fields=${[...param.fields]}`;
  
  fetch(str)
    .then(responce => {
      return responce.json()
    }).then(countries => { showCountry(countries) });
}

export default fetchCountries