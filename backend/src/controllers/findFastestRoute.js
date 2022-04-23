import dbg from "debug";
const debug = dbg("controller:findFastestRoute");
import getPincodeDistance from "./getPincodeDistance";
import PriorityQueue from "js-priority-queue";
import moment from "moment";
import getNextTrain from "./getNextTrain";
import getAllTrain from "../data/getAllTrain";
const findFastestRoute = async (src_pincode, dest_pincode, hotspots) => {
	//debug(dest_pincode);
	var pq = new PriorityQueue({
		comparator: (x, y) => {
			return x.time - y.time;
		},
	});
	var allTrain;
	var srcdist = {};
	var destdist = {};
	//debug(hotspots);
	var allps = [];
	var allpd = [];
	allps.push(getPincodeDistance(src_pincode, dest_pincode));
	for (var i = 0; i < hotspots.length; i++) {
		allps.push(getPincodeDistance(src_pincode, hotspots[i].pincode));
		allpd.push(getPincodeDistance(hotspots[i].pincode, dest_pincode));
	}
	//debug(allp.length);
	const timer = (ms) => new Promise((res) => setTimeout(res, ms));
	return await Promise.all(allps)
		.then((response) => {
			//debug(response);
			for (var i = 0; i < response.length; i++) {
				srcdist[response[i].data.dest_pincode] = response[i].data;
				srcdist[response[i].data.dest_pincode].distance = parseFloat(
					srcdist[response[i].data.dest_pincode].distance
				);
				srcdist[response[i].data.dest_pincode].duration = parseFloat(
					srcdist[response[i].data.dest_pincode].duration
				);
				srcdist[response[i].data.dest_pincode].time = parseFloat(
					srcdist[response[i].data.dest_pincode].time
				);
				if (response[i].data.duration > 0)
					pq.queue({
						type: 2,
						distance: parseFloat(response[i].data.distance),
						duration: parseFloat(response[i].data.duration),
						time: parseFloat(response[i].data.duration),
						src_pincode: response[i].data.src_pincode,
						dest_pincode: response[i].data.dest_pincode,
						path: [],
					});
			}
			//debug(pq.priv);
			return Promise.all(allpd);
		})
		.then((response) => {
			//debug(response);
			//debug(srcdist);
			for (var i = 0; i < response.length; i++) {
				destdist[response[i].data.src_pincode] = response[i].data;
				destdist[response[i].data.src_pincode].distance = parseFloat(
					destdist[response[i].data.src_pincode].distance
				);
				destdist[response[i].data.src_pincode].duration = parseFloat(
					destdist[response[i].data.src_pincode].duration
				);
				destdist[response[i].data.src_pincode].time = parseFloat(
					destdist[response[i].data.src_pincode].time
				);
			}
			return { srcdist, destdist };
		})
		.then((response) => {
			return getAllTrain();
		})
		.then((response) => {
			allTrain = response.data.trains;
			var paths = [];
			var vis = [];

			while (paths.length < 10 && pq.length > 0) {
				var top = pq.dequeue();
				debug(top);
				var lpd = vis.find((v) => v.pincode == top.dest_pincode);
				debug(lpd);
				if (lpd !== undefined) {
					continue;
				}
				var topv = {
					type: top.type,
					distance: top.distance,
					duration: top.duration,
					time: top.time,
					src_pincode: top.src_pincode,
					dest_pincode: top.dest_pincode,
				};
				debug(top.dest_pincode);
				if (top.dest_pincode === dest_pincode) {
					top.path.push(topv);
					paths.push(top.path);
					debug(paths);
				} else {
					var ht = hotspots.find((h) => h.pincode == top.dest_pincode);
					debug(ht);
					pq.queue({
						type: 2,
						distance: destdist[ht.pincode].distance,
						duration: destdist[ht.pincode].duration,
						time: parseFloat(
							(top.time + destdist[ht.pincode].duration).toFixed(2)
						),
						src_pincode: top.dest_pincode,
						dest_pincode: dest_pincode,
						path: [...top.path, topv],
					});
					if (ht.type == 0) {
						var avaitime = moment().add(top.time + 60, "minutes");
						debug(moment(avaitime).format("llll"));

						var nextTrains = getNextTrain(
							avaitime,
							ht.code,
							allTrain
						).nextTrains;
						debug(nextTrains);
						for (var i = 0; i < nextTrains.length; i++) {
							var tpm =
								moment(nextTrains[i].date).format("YYYY-MM-DD") +
								" " +
								nextTrains[i].departure;
							debug(tpm);
							tpm =
								moment(tpm).diff(moment(), "minutes") + nextTrains[i].duration;
							debug(tpm);
							pq.queue({
								type: 0,
								duration: parseFloat(nextTrains[i].duration),
								distance: 0,
								src_pincode: nextTrains[i].src_pincode,
								dest_pincode: nextTrains[i].dest_pincode,
								time: tpm,
								path: [...top.path, topv],
							});
							debug({
								type: 0,
								duration: parseFloat(nextTrains[i].duration),
								distance: 0,
								src_pincode: nextTrains[i].src_pincode,
								dest_pincode: nextTrains[i].dest_pincode,
								time: tpm,
								path: [...top.path, topv],
							});
						}

						vis.push(ht);
					}
				}
			}
			return paths;
		});
	//return await getPincodeDistance(src_pincode, dest_pincode);
};
export default findFastestRoute;
