import axios from "axios";
import config from "../../config/config";
const PintoCordinates= async(data) =>
{
    const city =data;
    console.log(config.pincodeurl);
    console.log(city);
    return await axios
		.get(config.pincodeurl + city, )
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { success: false, message: err.message };
		});
}
export default PintoCordinates;