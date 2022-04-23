import React from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import moment from "moment";
export default function DataTable(props) {
	var idx = 1;
	const navigate = useNavigate();

	return (
		<div>
			{console.log(props.data)}
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
								<td>{idx++}</td>
								{Object.keys(d).map(function (key, index) {
									//console.log(d);
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
											navigate(props.onclicklink, { state: { data: d} });
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
