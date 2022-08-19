import fetch from 'node-fetch';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '8fbcbbe449msh6f4075ade685017p1b45e9jsn9a105cff21e4',
    'X-RapidAPI-Host': 'amazon24.p.rapidapi.com',
  },
};

fetch(
  'https://amazon24.p.rapidapi.com/api/product?categoryID=aps&keyword=&keyword=Clothing&keyword=Baby%20&%20toddler%20clothing&keyword=BABY&keyword=MICKEY&keyword=SURF&country=US&page=1',
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
