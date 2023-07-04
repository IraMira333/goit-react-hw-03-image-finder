import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36597774-2e36ba17425207cc180a817c1';

export const imagesPerPage = 12;

const options = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: imagesPerPage,
}).toString();

export const searchImages = async (dataSubmit, page) => {
  const { data } = await axios.get(
    `${URL}?key=${API_KEY}&q=${dataSubmit}&page=${page}&${options}`
  );
  return data;
};
