import axios from 'axios';
import config from '../../config/config';

const trackRoutesAPI = async (data) => {
  const { trackId, token } = data;
  return await axios
    .get(config.baseUrl + +'?trackId=' + trackId, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return { success: false, message: err.message };
    });
};
export default trackRoutesAPI;
