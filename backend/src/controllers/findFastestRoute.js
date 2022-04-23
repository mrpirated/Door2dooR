import dbg from "debug";
const debug = dbg("controller:findFastestRoute");
import getPincodeDistance from "./getPincodeDistance";
import PriorityQueue from "js-priority-queue";
import moment from "moment";
import getNextTrain from "./getNextTrain";
import getAllTrain from "../data/getAllTrain";
import getAllFlight from "../data/getAllFlight";
import getNextFlight from "./getNextFlight";
const findFastestRoute = async (src_pincode, dest_pincode, hotspots) => {
	//debug(dest_pincode);
	var pq = new PriorityQueue({
		comparator: (x, y) => {
			return x.time - y.time;
		},
	});
	var pqc = new PriorityQueue({
		comparator: (x, y) => {
			return x.cost - y.cost;
		},
	});
	var allTrain, allFlight;
	var srcdist = {};
	var destdist = {};
	var fastestRoute, cheapestRoute;
	//debug(hotspots);
	var allps = [];
	var allpd = [];
	allps.push(getPincodeDistance(src_pincode, dest_pincode));
	for (var i = 0; i < hotspots.length; i++) {
		allps.push(getPincodeDistance(src_pincode, hotspots[i].pincode));
		allpd.push(getPincodeDistance(hotspots[i].pincode, dest_pincode));
	}
	//debug(allp.length);
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
				if (response[i].data.duration > 0) {
					pq.queue({
						type: 2,
						distance: parseFloat(response[i].data.distance),
						duration: parseFloat(response[i].data.duration),
						cost: parseFloat((response[i].data.duration * 0.2).toFixed(2)),
						time: parseFloat(response[i].data.duration),
						src_pincode: response[i].data.src_pincode,
						dest_pincode: response[i].data.dest_pincode,
						path: [],
					});
					pqc.queue({
						type: 2,
						distance: parseFloat(response[i].data.distance),
						duration: parseFloat(response[i].data.duration),
						cost: parseFloat((response[i].data.duration * 0.2).toFixed(2)),
						time: parseFloat(response[i].data.duration),
						src_pincode: response[i].data.src_pincode,
						dest_pincode: response[i].data.dest_pincode,
						path: [],
					});
				}
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
			return getAllFlight();
		})
		.then((response) => {
			allFlight = response.data.flight;
			//debug(allFlight);
			var paths = [],
				paths2 = [];
			var vis = [];

			while (paths.length < 5 && pq.length > 0) {
				var top = pq.dequeue();
				//debug(top);
				var lpd = vis.find((v) => v.pincode == top.dest_pincode);
				//debug(lpd);
				if (lpd !== undefined) {
					continue;
				}
				var topv = {
					type: top.type,
					distance: top.distance,
					duration: top.duration,
					cost: top.cost,
					time: top.time,
					src_pincode: top.src_pincode,
					dest_pincode: top.dest_pincode,
				};
				//debug(top.dest_pincode);
				if (top.dest_pincode === dest_pincode) {
					top.path.push(topv);
					paths.push(top.path);
					//debug(paths);
				} else {
					var ht = hotspots.find((h) => h.pincode == top.dest_pincode);
					debug(ht);
					pq.queue({
						type: 2,
						distance: destdist[ht.pincode].distance,
						duration: destdist[ht.pincode].duration,
						cost: parseFloat((destdist[ht.pincode].duration * 0.2).toFixed(2)),
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
						//debug(nextTrains);
						for (var i = 0; i < nextTrains.length; i++) {
							var tpm =
								moment(nextTrains[i].date).format("YYYY-MM-DD") +
								" " +
								nextTrains[i].departure;
							//debug(tpm);
							tpm =
								moment(tpm).diff(moment(), "minutes") + nextTrains[i].duration;
							debug(tpm);
							pq.queue({
								type: 0,
								duration: parseFloat(nextTrains[i].duration),
								distance: parseFloat(nextTrains[i].distance),
								cost: parseFloat(
									(parseFloat(nextTrains[i].duration) * (4 / 60)).toFixed(2)
								),
								src_pincode: nextTrains[i].src_pincode,
								dest_pincode: nextTrains[i].dest_pincode,
								time: tpm,
								path: [...top.path, topv],
							});
							// debug({
							// 	type: 0,
							// 	duration: parseFloat(nextTrains[i].duration),
							// 	distance: 0,
							// 	src_pincode: nextTrains[i].src_pincode,
							// 	dest_pincode: nextTrains[i].dest_pincode,
							// 	time: tpm,
							// 	path: [...top.path, topv],
							// });
						}

						vis.push(ht);
					} else if (ht.type == 1) {
						var avaitime = moment().add(top.time + 120, "minutes");
						//debug(avaitime);
						debug(moment(avaitime).format("llll"));
						var nextFlights = getNextFlight(
							avaitime,
							ht.code,
							allFlight
						).nextFlights;
						debug(nextFlights.length);
						for (var i = 0; i < nextFlights.length; i++) {
							var tpm =
								moment(nextFlights[i].date).format("YYYY-MM-DD") +
								" " +
								nextFlights[i].departure;
							//debug(tpm);
							tpm =
								moment(tpm).diff(moment(), "minutes") + nextFlights[i].duration;
							debug(tpm);
							pq.queue({
								type: 1,
								duration: parseFloat(nextFlights[i].duration),
								distance: parseFloat(nextFlights[i].distance),
								cost: parseFloat(
									(parseFloat(nextFlights[i].duration) * (20 / 6)).toFixed(2)
								),
								src_pincode: nextFlights[i].src_pincode,
								dest_pincode: nextFlights[i].dest_pincode,
								time: tpm,
								path: [...top.path, topv],
							});
							// debug({
							// 	type: 1,
							// 	duration: parseFloat(nextFlights[i].duration),
							// 	distance: parseFloat(nextFlights[i].distance),
							// 	cost: parseFloat(
							// 		(parseFloat(nextFlights[i].duration) * (20 / 6)).toFixed(2)
							// 	),
							// 	src_pincode: nextFlights[i].src_pincode,
							// 	dest_pincode: nextFlights[i].dest_pincode,
							// 	time: tpm,
							// 	path: [...top.path, topv],
							// });
						}
						vis.push(ht);
					}
				}
			}
			vis = [];
			while (paths2.length < 5 && pqc.length > 0) {
				var top = pqc.dequeue();
				var lpd = vis.find((v) => v.pincode == top.dest_pincode);
				//debug(lpd);
				if (lpd !== undefined) {
					continue;
				}
				var topv = {
					type: top.type,
					distance: top.distance,
					duration: top.duration,
					cost: top.cost,
					time: top.time,
					src_pincode: top.src_pincode,
					dest_pincode: top.dest_pincode,
				};
				if (top.dest_pincode === dest_pincode) {
					top.path.push(topv);
					paths2.push(top.path);
					//debug(paths);
				} else {
					var ht = hotspots.find((h) => h.pincode == top.dest_pincode);
					debug(ht);
					pqc.queue({
						type: 2,
						distance: destdist[ht.pincode].distance,
						duration: destdist[ht.pincode].duration,
						cost: parseFloat((destdist[ht.pincode].duration * 0.2).toFixed(2)),
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
						//debug(nextTrains);
						for (var i = 0; i < nextTrains.length; i++) {
							var tpm =
								moment(nextTrains[i].date).format("YYYY-MM-DD") +
								" " +
								nextTrains[i].departure;
							//debug(tpm);
							tpm =
								moment(tpm).diff(moment(), "minutes") + nextTrains[i].duration;
							debug(tpm);
							pqc.queue({
								type: 0,
								duration: parseFloat(nextTrains[i].duration),
								distance: parseFloat(nextTrains[i].distance),
								cost: parseFloat(
									(parseFloat(nextTrains[i].duration) * (4 / 60)).toFixed(2)
								),
								src_pincode: nextTrains[i].src_pincode,
								dest_pincode: nextTrains[i].dest_pincode,
								time: tpm,
								path: [...top.path, topv],
							});
							// debug({
							// 	type: 0,
							// 	duration: parseFloat(nextTrains[i].duration),
							// 	distance: 0,
							// 	src_pincode: nextTrains[i].src_pincode,
							// 	dest_pincode: nextTrains[i].dest_pincode,
							// 	time: tpm,
							// 	path: [...top.path, topv],
							// });
						}

						vis.push(ht);
					} else if (ht.type == 1) {
						var avaitime = moment().add(top.time + 120, "minutes");
						//debug(avaitime);
						debug(moment(avaitime).format("llll"));
						var nextFlights = getNextFlight(
							avaitime,
							ht.code,
							allFlight
						).nextFlights;
						debug(nextFlights.length);
						for (var i = 0; i < nextFlights.length; i++) {
							var tpm =
								moment(nextFlights[i].date).format("YYYY-MM-DD") +
								" " +
								nextFlights[i].departure;
							//debug(tpm);
							tpm =
								moment(tpm).diff(moment(), "minutes") + nextFlights[i].duration;
							debug(tpm);
							pqc.queue({
								type: 1,
								duration: parseFloat(nextFlights[i].duration),
								distance: parseFloat(nextFlights[i].distance),
								cost: parseFloat(
									(parseFloat(nextFlights[i].duration) * (20 / 6)).toFixed(2)
								),
								src_pincode: nextFlights[i].src_pincode,
								dest_pincode: nextFlights[i].dest_pincode,
								time: tpm,
								path: [...top.path, topv],
							});
							// debug({
							// 	type: 1,
							// 	duration: parseFloat(nextFlights[i].duration),
							// 	distance: parseFloat(nextFlights[i].distance),
							// 	cost: parseFloat(
							// 		(parseFloat(nextFlights[i].duration) * (20 / 6)).toFixed(2)
							// 	),
							// 	src_pincode: nextFlights[i].src_pincode,
							// 	dest_pincode: nextFlights[i].dest_pincode,
							// 	time: tpm,
							// 	path: [...top.path, topv],
							// });
						}
						vis.push(ht);
					}
				}
			}
			//debug(pq);
			fastestRoute = paths;
			cheapestRoute = paths2;
			return {
				success: true,
				paths: [...fastestRoute, ...cheapestRoute],
				// fastestRoute: fastestRoute,
				// cheapestRoute: cheapestRoute,
			};
		});
	//return await getPincodeDistance(src_pincode, dest_pincode);
};
export default findFastestRoute;
