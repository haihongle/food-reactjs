const filters = [
	{
		name: 'waiting-orders',
		filter: [
			{
				type: 'select',
				field: 'Order by',
				options: [
					{
						value: 'latest',
						name: 'Latest',
					},
				],
				className: 'col-md-6',
			},
		],
	},
	{
		name: 'all-orders',
		filter: [
			{
				type: 'select',
				field: 'Order by',
				options: [
					{
						value: 'latest',
						name: 'Latest',
					},
				],
				className: 'col-md-6',
			},
		],
	},
];

export default filters;
