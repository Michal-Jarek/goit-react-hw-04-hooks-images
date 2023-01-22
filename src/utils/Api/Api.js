import axios from 'axios';

const apiKey = 'key=30058964-66debb9f20d9f056f9054d1c1';
const basePath = `?${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  timeout: 3000,
});

const inquiry = async (description, page) => {
  let searchedItem = description.replace(' ', '+');
  const response = await instance.get(
    `${basePath}&page=${page}&q=${searchedItem}`
  );
  return response.data;
};

export { inquiry };
