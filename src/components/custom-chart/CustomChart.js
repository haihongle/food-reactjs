import { Bar, Line, Pie } from 'react-chartjs-2';
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

const BarChart = ({ field, className }) => {
	return (
		<Bar
			data={{
				labels: ['Fast Food', 'Casual Dining', 'Fine Dining', 'Cafes', 'Food Trucks'],
				datasets: [
					{
						label: 'Order in this month',
						backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0'],
						data: [150, 200, 120, 80, 60],
					},
				],
			}}
			options={{
				plugins: {
					legend: { display: true },
					title: {
						display: true,
						text: 'Restaurant Sales by Type',
					},
				},
				scales: {
					x: { type: 'category' },
					y: { beginAtZero: true },
				},
			}}
		/>
	);
};

const LineChart = ({ field, className }) => {
	return (
		<Line
			data={{
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'Sales 2023',
						data: [33, 53, 85, 41, 44, 65, 80],
						borderColor: 'rgba(75,192,192,1)',
						backgroundColor: 'rgba(75,192,192,0.2)',
						tension: 0.4,
					},
					{
						label: 'Sales 2022',
						data: [33, 25, 35, 51, 54, 76, 95],
						borderColor: 'rgba(255,99,132,1)',
						backgroundColor: 'rgba(255,99,132,0.2)',
						tension: 0.4,
					},
				],
			}}
			options={{
				plugins: {
					legend: { display: true },
					title: {
						display: true,
						text: 'Sales Performance (2022 vs 2023)',
					},
				},
				scales: {
					x: { type: 'category' },
					y: { beginAtZero: true },
				},
			}}
		/>
	);
};

const PieChart = ({ field, className }) => {
	return (
		<Pie
			data={{
				labels: ['Pizza', 'Hamburger', 'Coca', 'Salad', 'Chicken', 'Steam tofu'],
				datasets: [
					{
						label: 'Votes',
						data: [12, 19, 3, 5, 2, 3],
						backgroundColor: [
							'rgba(255, 99, 132, 0.6)',
							'rgba(54, 162, 235, 0.6)',
							'rgba(255, 206, 86, 0.6)',
							'rgba(75, 192, 192, 0.6)',
							'rgba(153, 102, 255, 0.6)',
							'rgba(255, 159, 64, 0.6)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
						],
						borderWidth: 1,
					},
				],
			}}
			options={{
				plugins: {
					legend: { display: true },
					title: {
						display: true,
						text: 'Vote Distribution',
					},
				},
				scales: {},
			}}
		/>
	);
};

const BarLineChart = ({ field, className }) => {
	return (
		<Bar
			data={{
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'Sales (Bar)',
						data: [33, 53, 85, 41, 44, 65, 80],
						backgroundColor: 'rgba(75,192,192,0.6)',
						borderColor: 'rgba(75,192,192,1)',
						borderWidth: 1,
						type: 'bar',
					},
					{
						label: 'Projected Sales (Line)',
						data: [30, 40, 60, 70, 80, 90, 100],
						backgroundColor: 'rgba(255,99,132,0.6)',
						borderColor: 'rgba(255,99,132,1)',
						borderWidth: 2,
						type: 'line',
						fill: false,
					},
				],
			}}
			options={{
				plugins: {
					legend: { display: true },
					title: {
						display: true,
						text: 'Sales and Projected Sales',
					},
				},
				scales: {
					x: { type: 'category' },
					y: { beginAtZero: true },
				},
			}}
		/>
	);
};

const CustomChart = ({ type, field, className }) => {
	switch (type) {
		case 'bar':
			return <BarChart />;
		case 'line':
			return <LineChart />;
		case 'pie':
			return <PieChart />;
		case 'bar-line':
			return <BarLineChart />;
		default:
			return <div>Element not found</div>;
	}
};

export default CustomChart;
