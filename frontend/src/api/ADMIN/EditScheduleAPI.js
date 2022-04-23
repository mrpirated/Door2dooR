import axios from 'axios';
import config from '../../config/config';

const EditScheduleAPI = async (data) => {
  const { num, code, arrivalTime, departureTime, pos, days, token } = data;
  console.log(config.baseUrl);
  return await axios
    .post(
      config.baseUrl + config.addStation,
      {
        num: num,
        code: code,
        arrivalTime: arrivalTime,
        departureTime: departureTime,
        pos: pos,
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
export default EditScheduleAPI;
