import React, { useEffect, useState } from 'react';
import Toast from '../../../../components/toast-message/ToastMessage';
import ReportServices from '../../../../services/reportServices/ReportServices';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	ArcElement,
	Title,
	Tooltip,
	Legend
);

const data = {
	totalAssetValue: 0,
	totalCapitalValue: 0,
	totalRevenue: 0,
	totalProfit: 0,
	totalCost: 0,
};

const Revenues = () => {
	const styles = {
		container: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '20px',
			backgroundColor: '#f9f9f9',
			borderRadius: '8px',
			boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
			maxWidth: '400px',
			margin: 'auto',
		},
		title: {
			fontSize: '24px',
			marginBottom: '20px',
			color: '#333',
		},
		item: {
			margin: '10px 0',
			padding: '10px',
			border: '1px solid #ccc',
			borderRadius: '4px',
			width: '100%',
			textAlign: 'left',
			backgroundColor: '#fff',
		},
	};

	const [report, setReport] = useState();

	const getReport = async () => {
		try {
			const response = await ReportServices.getReport();
			if (response.success) {
				setReport(response.data);
			} else {
				Toast.error(response.message);
			}
		} catch (error) {
			Toast.error(error);
		}
	};

	useEffect(() => {
		getReport();
	}, []);

	return (
		<div className="card-body">
			<div className="row g-3">
				<div style={styles.container} className="col-md-6">
					{report && (
						<>
							<h1 style={styles.title}>Financial Summary</h1>
							<div style={styles.item}>
								<strong>Total Asset Value:</strong> $
								{Intl.NumberFormat('id-ID').format(report.totalAssetValue)}
							</div>
							<div style={styles.item}>
								<strong>Total Capital Value:</strong> $
								{Intl.NumberFormat('id-ID').format(report.totalCapitalValue)}
							</div>
							<div style={styles.item}>
								<strong>Total Revenue:</strong> $
								{Intl.NumberFormat('id-ID').format(report.totalRevenue)}
							</div>
							<div style={styles.item}>
								<strong>Total Profit:</strong> $
								{Intl.NumberFormat('id-ID').format(report.totalProfit)}
							</div>
							<div style={styles.item}>
								<strong>Total Cost:</strong> ${Intl.NumberFormat('id-ID').format(report.totalCost)}
							</div>
						</>
					)}
				</div>
				<div className="col-md-6">
					{report && (
						<Bar
							data={{
								labels: [
									'Total Asset Value',
									'Total Capital Value',
									'Total Revenue',
									'Total Profit',
									'Total Cost',
								],
								datasets: [
									{
										label: 'Financial this month',
										backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0'],
										data: [
											report.totalAssetValue || 0,
											report.totalCapitalValue || 0,
											report.totalRevenue || 0,
											report.totalProfit || 0,
											report.totalCost || 0,
										],
									},
								],
							}}
							options={{
								plugins: {
									legend: { display: true },
									title: {
										display: true,
										text: 'Financial Summary',
									},
								},
								scales: {
									x: { type: 'category' },
									y: { beginAtZero: true },
								},
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
export default Revenues;
