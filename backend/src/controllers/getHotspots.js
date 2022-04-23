import dbg from "debug";
import getStationList from "../data/getStationList";
import getAirport from "../data/getAirport";
const debug = dbg("controller:getHotspots");

const getHotspots = async () => {
	var stationList, airport;
	return await getStationList()
		.then((response) => {
			stationList = response.data.stationList;
			return getAirport();
		})
		.then((response) => {
			airport = response.data.airport;
			var values = [];
			for (var i = 0; i < stationList.length; i++) {
				values.push({ type: 0, ...stationList[i] });
			}
			for (var i = 0; i < airport.length; i++) {
				values.push({ type: 1, ...airport[i] });
			}
			return Promise.resolve({ success: true, data: { hotspots: values } });
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default getHotspots;
