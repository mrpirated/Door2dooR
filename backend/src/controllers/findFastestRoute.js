import dbg from "debug";
const debug = dbg("controller:findFastestRoute");
import getPincodeDistance from "./getPincodeDistance";
const findFastestRoute = async (src_pincode, dest_pincode, hotspots) => {
	return new Promise((resolve, reject) => {
		//const pq = new PriorityQueue((x, y) => x.time - y.time);
		var srcdist = {};
		var destdist = {};
		debug(hotspots);
		var allps = [];
		var allpd = [];
		for (var i = 0; i < hotspots.length; i++) {
			allps.push(getPincodeDistance(src_pincode, hotspots[i].pincode));
			allpd.push(getPincodeDistance(hotspots[i].pincode, dest_pincode));
		}
		//debug(allp.length);
		resolve(
			Promise.all(allps)
				.then((response) => {
					debug(response);
					for (var i = 0; i < response.length; i++) {
						srcdist[response[i].data.dest_pincode] = response[i].data;
					}
					return Promise.all(allpd);
				})
				.then((response) => {
					debug(response);
					for (var i = 0; i < response.length; i++) {
						destdist[response[i].data.src_pincode] = response[i].data;
					}
					return { srcdist, destdist };
				})
		);
	});
	//return await getPincodeDistance(src_pincode, dest_pincode);
};
export default findFastestRoute;
