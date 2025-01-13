const M = 'MANAGER';
const U = 'USER';
const A = 'ACCOUNTANT';
const H = 'SALE';
const K = 'KITCHEN';
const MA = 'MARKETING';
const S = 'SHIPPER';

const sidebar = [
	
	{
		item_name: 'Accountant', 
		icon: <i className="fa-solid fa-pen-fancy"></i>,
		path: 'accountant',
		is_main: true,
		roles: [M, A],
		has_children: true,
		children_item: [
			{
				item_name: 'Import Recipes',
				icon: '-',
				roles: [M, A],
				path: 'accountant/import-recipe',
				has_children: false,
			},
			{
				item_name: 'Import History',
				icon: '-',
				roles: [M, A],
				path: 'accountant/import-history',
				has_children: false,
			},
			{
				item_name: 'Export Recipes',
				icon: '-',
				roles: [M, A],
				path: 'accountant/export-recipe',
				has_children: false,
			},
			{
				item_name: 'Export History',
				icon: '-',
				roles: [M, A],
				path: 'accountant/export-history',
				has_children: false,
			},
		],
	},
	{
		item_name: 'Customers',
		icon: <i className="fa-solid fa-user"></i>,
		path: 'customers',
		roles: [U],
		is_main: true,
		has_children: true,
		children_item: [
			{
				item_name: 'Customer list',
				icon: '-',
				roles: [U],
				path: 'customers/customer-list',
				has_children: false,
			},
			{
				item_name: 'Problems',
				icon: '-',
				roles: [U],
				path: 'customers/problems',
				has_children: false,
			},
		],
	},
	{
		item_name: 'Employees',
		icon: <i className="fa-solid fa-user-tie"></i>,
		path: 'employees',
		roles: [M, A],
		is_main: true,
		has_children: true,
		children_item: [
			{
				item_name: 'Create users',
				icon: '-',
				roles: [M],
				path: 'employees/users',
				has_children: false,
			},
			{
				item_name: 'Employee list',
				icon: '-',
				roles: [M, A],
				path: 'employees/employee-list',
				has_children: false,
			},
			// {
			// 	item_name: 'Permission',
			// 	icon: '-',
			// 	roles: [M],
			// 	path: 'employees/permissions',
			// 	has_children: false,
			// },
			// {
			// 	item_name: 'Salary',
			// 	icon: '-',
			// 	roles: [M, A],
			// 	path: 'employees/salary',
			// 	has_children: false,
			// },
		],
	},
	{
		item_name: 'Orders',
		icon: <i className="fa-solid fa-list-check"></i>,
		path: 'orders',
		is_main: true,
		roles: [M, H, K],
		has_children: true,
		children_item: [
			{
				item_name: 'All orders',
				icon: '-',
				roles: [M, H],
				path: 'orders/all-orders',
				has_children: false,
			},
			{
				item_name: 'Waiting orders',
				icon: '-',
				roles: [M, H, K],
				path: 'orders/waiting-orders',
				has_children: false,
			},
			{
				item_name: 'Cancel orders',
				icon: '-',
				roles: [M, H, K, S],
				path: 'orders/cancel-orders',
				has_children: false,
			},
			{
				item_name: 'Completed orders',
				icon: '-',
				roles: [M, H, K, S],
				path: 'orders/completed-orders',
				has_children: false,
			},
		],
	},
	{
		item_name: 'Menus',
		icon: <i className="fa-solid fa-book"></i>,
		path: 'menus',
		is_main: true,
		roles: [M, K],
		has_children: true,
		children_item: [
			{
				item_name: 'Menu list',
				icon: '-',
				roles: [M, K],
				path: 'menu/menu-list',
				has_children: false,
			},
		],
	},
	// {
	// 	item_name: 'Schedules',
	// 	icon: <i className="fa-regular fa-calendar-days"></i>,
	// 	path: 'schedules',
	// 	is_main: true,
	// 	roles: [M, A],
	// 	has_children: true,
	// 	children_item: [
	// 		{
	// 			item_name: 'Today schedule',
	// 			icon: '-',
	// 			roles: [M, A],
	// 			path: 'schedules/today-schedule',
	// 			has_children: false,
	// 		},
	// 		{
	// 			item_name: 'Arrange schedule',
	// 			icon: '-',
	// 			roles: [M, A],
	// 			path: 'schedules/arrange-schedule',
	// 			has_children: false,
	// 		},
	// 	],
	// },
	{
		item_name: 'Reports',
		icon: <i className="fa-solid fa-chart-line"></i>,
		path: 'reports',
		is_main: true,
		roles: [M, A],
		has_children: true,
		children_item: [
			// {
			// 	item_name: 'Leave applications',
			// 	icon: '-',
			// 	roles: [M],
			// 	path: 'reports/leave-applications',
			// 	has_children: false,
			// },
			{
				item_name: 'Revenues',
				icon: '-',
				roles: [M, A],
				path: 'reports/revenues',
				has_children: false,
			},
		],
	},
	{
		item_name: 'Marketing',
		icon: <i className="fa-solid fa-chart-simple"></i>,
		path: 'marketing',
		is_main: true,
		roles: [M, MA],
		has_children: true,
		children_item: [
			{
				item_name: 'Promortions',
				icon: '-',
				roles: [M, MA],
				path: 'marketing/promotions',
				has_children: false,
			},
			{
				item_name: 'Vouchers',
				icon: '-',
				roles: [M, MA],
				path: 'marketing/vouchers',
				has_children: false,
			},
		],
	},
	{
		item_name: 'Warehouse',
		icon: <i className="fa-solid fa-warehouse"></i>,
		path: 'warehouse',
		is_main: true,
		roles: [M, A],
		has_children: true,
		children_item: [
			{
				item_name: 'Materials',
				icon: '-',
				roles: [M, A],
				path: 'warehouse/materials',
				has_children: false,
			},
			{
				item_name: 'Inventory',
				icon: '-',
				roles: [M, A],
				path: 'warehouse/inventory',
				has_children: false,
			},
			{
				item_name: 'Inventory History',
				icon: '-',
				roles: [M, A],
				path: 'warehouse/inventory-history',
				has_children: false,
			},
		],
	},
];

export default sidebar;
