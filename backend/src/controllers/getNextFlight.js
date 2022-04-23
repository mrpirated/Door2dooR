import dbg from "debug";

const debug = dbg("controller:getNextFlight");
import moment from "moment";
const getNextFlight = (avaitime, code, allFlight) => {
	var values = allFlight.filter((at) => at.source == code);
	//debug(values);
	for (var i = 0; i < values.length; i++) {
		var tp =
			moment(avaitime).format("YYYY-MM-DD") +
			" " +
			moment(values[i].departure, "HH:mm:ss").format("HH:mm:ss");
		//debug(tp);
		if (moment(tp).diff(moment(avaitime)) < 0) {
			tp = moment(tp).add(24, "hours");
		}
		values[i].date = moment(tp).toDate();
	}
	return { nextFlights: values };
};
export default getNextFlight;
