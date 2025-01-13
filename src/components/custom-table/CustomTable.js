import styles from './CustomTable.module.scss';
import handleDatetime from '../../utils/HandleDatetime';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function camelCaseToNormal(text) {
	const result = text.replace(/([a-z])([A-Z])/g, '$1 $2');
	return result.charAt(0).toUpperCase() + result.slice(1);
}

const CustomTable = ({ data, actions, hiddenFields = [] }) => {
	const headers =
		data && data.length > 0
			? Object.keys(data[0]).filter((header) => !hiddenFields.includes(header))
			: [];

	return (
		<>
			<div className="table-responsive">
				{data && data.length > 0 ? (
					<table className={`${styles['tableContainer']}`}>
						<thead>
							<tr>
								<th className="text-center">No.</th>
								{headers.map((header) => (
									<th className="text-center" key={header}>
										{camelCaseToNormal(header)}
									</th>
								))}
								{actions && <th className={`${styles['tableManage']}`}>Manage</th>}
							</tr>
						</thead>
						<tbody>
							{data.map((row, index) => {
								const formattedRow = handleDatetime(row);

								return (
									<tr key={row.id || index}>
										<td
											className={`text-center ${
												formattedRow['timeStatus'] === 'danger'
													? styles['dangerBackground']
													: formattedRow['timeStatus'] === 'warning'
														? styles['warningBackground']
														: ''
											}`}
										>
											{index + 1}
										</td>
										{headers.map((header, i) => {
											const timeStatus = formattedRow['timeStatus'];
											return (
												<td
													key={header}
													className={`${
														timeStatus === 'danger'
															? styles['dangerBackground']
															: timeStatus === 'warning'
																? styles['warningBackground']
																: ''
													}`}
												>
													{typeof formattedRow[header] === 'boolean' ? (
														<div className="d-flex align-items-center justify-content-center">
															{formattedRow[header] ? (
																<i
																	className={`${styles['tableTrue']} fa-solid fa-circle-check`}
																></i>
															) : (
																<i
																	className={`${styles['tableFalse']} fa-solid fa-circle-xmark`}
																></i>
															)}
														</div>
													) : (
														formattedRow[header]
													)}
												</td>
											);
										})}
										{actions && (
											<td className={`${styles['tableManage']} text-nowrap`}>
												{actions.detail && (
													<>
														<button
															data-tooltip-id="detail-tooltip"
															data-tooltip-content="Show detail"
															data-tooltip-delay-show="50"
															data-tooltip-place="top-end"
															className="btn btn-sm btn-primary me-1"
															onClick={() => actions.detail(row.id)}
														>
															<i className="fa-solid fa-eye"></i>
														</button>
														<Tooltip id="detail-tooltip" />
													</>
												)}
												{actions.delete && (
													<>
														<button
															data-tooltip-id="delete-tooltip"
															data-tooltip-content="Delete"
															data-tooltip-delay-show="50"
															data-tooltip-place="top-end"
															className="btn btn-sm btn-danger"
															onClick={() => actions.delete(row.id)}
														>
															<i className="fa-solid fa-trash"></i>
														</button>
														<Tooltip id="delete-tooltip" />
													</>
												)}
												{actions.toggle && (
													<>
														<button
															data-tooltip-id="toggle-tooltip"
															data-tooltip-content={actions.toggle.tooltip}
															data-tooltip-delay-show="50"
															data-tooltip-place="top-end"
															className="btn btn-sm btn-secondary"
															onClick={() => actions.toggle.function(row.id)}
														>
															<i className="fa-solid fa-pen-to-square"></i>
														</button>
														<Tooltip id="toggle-tooltip" />
													</>
												)}
											</td>
										)}
									</tr>
								);
							})}
						</tbody>
					</table>
				) : (
					<div className="d-flex align-items-center justify-content-center">
						<img className="user-avatar" src={'/Nothing.png'} alt="" />
						<h1 className="m-0 ps-1 fw-semibold text-secondary">THERE IS NO DATA</h1>
					</div>
				)}
			</div>
		</>
	);
};

export default CustomTable;
