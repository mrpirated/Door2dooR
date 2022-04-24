import React from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import moment from "moment";
export default function DataTable(props) {
	var idx = 1;
	const navigate = useNavigate();

	return (
		<div>
			<Table responsive='sm'>
				<thead>
					<tr>
						{/* <th>#</th> */}
						{props.columns.map((column) => (
							<th>{column.title}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{props.data.map((d) => {
						console.log(d);
						return (
							<tr>
								{Object.keys(d).map(function (key, index) {
									return <td>{d[key]}</td>;
								})}
                                <td>
									<Button
										block
										variant='dark'
										size='sm'
										type='submit'
										id={idx}
										onClick={(e) => {
											navigate(props.onclicklink, { state: { source: d.source, destination: d.destination, cost: d.cost, duration: d.duration, data: props.resData, markersGrp: props.markersGrp, idx:d.srno}});
										}}
									>
										+
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}
