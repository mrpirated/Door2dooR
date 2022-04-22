import axios from 'axios';
import config from '../../config/config';

const AddTrainAPI = async (data) => {
  const { trainName, trainNum, days, token } = data;
  console.log(config.baseUrl);
  return await axios
    .post(
      config.baseUrl + config.addStation,
      {
        name: trainName,
        num: trainNum,
        days: days,
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
export default AddTrainAPI;
