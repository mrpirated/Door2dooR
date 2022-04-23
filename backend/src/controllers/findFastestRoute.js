import dbg from "debug";
const debug = dbg("controller:findFastestRoute");
import getPincodeDistance from "./getPincodeDistance";
const findFastestRoute = async (src_pincode, dest_pincode, hotspots) => {
	return await getPincodeDistance(src_pincode, dest_pincode);
};
export default findFastestRoute;
