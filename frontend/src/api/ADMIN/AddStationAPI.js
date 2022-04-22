import axios from 'axios';
import config from '../../config/config';

const AddStationAPI = async (data) => {
  const { stationCode, name, token } = data;
  console.log(config.baseUrl);
  return await axios
    .post(
      config.baseUrl + config.addStation,
      {
        code: stationCode,
        name: name,
      },
      { headers: { Authorization: 'Bearer' + token } }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { success: false, message: err.message };
    });
};
export default AddStationAPI;
