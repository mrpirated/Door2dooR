import moment from "moment";
const generateRandomTrackId = () => {
	var st = "T";
	st += moment().format("YYMMDD");
	st += "B";
	st += moment().format("HHmmss");

	return st;
};
export default generateRandomTrackId;
