import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '23761306-59ca6a0f0608395e39c81a3c2';

const apiService = ({ query = '', page = 1, pageSize = 12 }) => {
  return axios
    .get(
      `/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${pageSize}`,
    )
    .then(response => response.data.hits);
};
export { apiService };
