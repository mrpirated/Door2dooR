import axios from "axios";
import config from "../../config/config";
const pintocity= async(data) =>
{
    const pincode =data;
    console.log(config.pintocityurl);
    console.log(pincode);
    return await axios
		.get(config.pintocityurl + pincode )
		.then((res) => {
            console.log(res.data);
			return res.data[0].PostOffice;
		})
		.catch((err) => {
			console.log(err);
			return { success: false, message: err.message };
		});
}
export default pintocity;