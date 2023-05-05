const param = {
  url: 'https://restcountries.com/v3.1/name/',
  fields: ['name', 'capital', 'population', 'flags', 'languages'],
};

function fetchCountries(name) {
  //https://restcountries.com/v3.1/name/deutschland
  const str = `${param.url}${name}?status=true&fields=${[...param.fields]}`;
  
  const result = fetch(str)
    .then(responce => {
      return responce.json()
    })
    .catch(console.log.bind(console));

  return result;
}

export default { fetchCountries }