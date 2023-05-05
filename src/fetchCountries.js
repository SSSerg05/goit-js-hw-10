const param = {
  url: 'https://restcountries.com/v3.1/name/',
  fields: ['name', 'capital', 'population', 'flags', 'languages'],
};

function fetchCountries(name) {
  //https://restcountries.com/v3.1/name/deutschland
  const str = `${param.url}${name}?status=true&fields=${[...param.fields]}`;
  
  return fetch(str)
    .then(responce => {
      return responce.json()
    })
    .catch(console.log.bind(console));
}

export default { fetchCountries }