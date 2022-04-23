import dbg from "debug";

const debug = dbg("controller:getnextTrain");
import moment from "moment";
const getNextTrain = (avaitime, code, allTrain) => {
	var values = allTrain.filter((at) => at.source == code);
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
	return { nextTrains: values };
};
export default getNextTrain;
