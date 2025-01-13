import CustomChart from '../../../components/custom-chart/CustomChart';

function CMSHome() {
	return (
		<div className="card-body p-5">
			<div className="row g-md-5 g-2">
				<div className="col-md-6">
					<CustomChart type="bar" />
				</div>
				<div className="col-md-6">
					<CustomChart type="line" />
				</div>
				<div className="col-md-6">
					<CustomChart type="pie" />
				</div>
				<div className="col-md-6">
					<CustomChart type="bar-line" />
				</div>
			</div>
		</div>
	);
}

export default CMSHome;
