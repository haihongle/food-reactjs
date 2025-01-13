const filters = [
	{
		name: 'cms',
		filter: [
			{
				type: 'input',
				field: 'Revenue',
			},
			{
				type: 'input-date',
				field: 'From date',
			},
			{
				type: 'input-date',
				field: 'To date',
			},
			{
				type: 'select',
				field: 'Something',
				options: [
					{
						value: '1',
						name: '1',
					},
				],
			},
		],
	},
];

export default filters;
