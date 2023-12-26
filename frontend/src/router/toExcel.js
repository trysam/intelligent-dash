import axios from 'axios';
const urlBase = 'http://localhost:3000';

const getFile = async (file) => {
  try {
    const response = await axios.get(urlBase,file);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default toExcel