import { Route } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import ClientLayout from '../layouts/client/ClientLayout';
import CMSLayout from '../layouts/cms/CMSLayout';
import Home from '../pages/client/home/home';
import Authen from '../pages/auth/Authen';
import Cart from '../pages/client/cart/Cart';
import AccountantLayout from '../pages/cms/accountant/AccountantLayout';
import HostLayout from '../pages/cms/host/HostLayout';
import KitchenLayout from '../pages/cms/kitchen/KitchenLayout';
import LeaderLayout from '../pages/cms/leader/LeaderLayout';
import ManagerLayout from '../pages/cms/manager/ManagerLayout';
import MarketingLayout from '../pages/cms/marketing/MarketingLayout';
import ShipperLayout from '../pages/cms/shipper/ShipperLayout';
import Salary from '../pages/cms/accountant/salary/Salary';
import Stock from '../pages/cms/accountant/stock/Stock';
import WarehouseLayout from '../pages/cms/accountant/warehouse/WarehouseLayout';
import Material from '../pages/cms/accountant/warehouse/Material/Material';
import OrderList from '../pages/cms/host/order/OrderList';
import KitchenOrderList from '../pages/cms/kitchen/order/OrderList';
import KitchenOrderDetail from '../pages/cms/kitchen/order/OrderDetail';
import LeaderEmployee from '../pages/cms/leader/employee/Employee';
import Problem from '../pages/cms/leader/problem/Problem';
import Account from '../pages/cms/manager/account/Account';
import Customer from '../pages/cms/manager/customer/Customer';
import Employee from '../pages/cms/manager/employee/Employee';
import Permission from '../pages/cms/manager/permission/Permission';
import Report from '../pages/cms/manager/report/Report';
import Promotion from '../pages/cms/marketing/promotion/Promotion';
import Voucher from '../pages/cms/marketing/voucher/Voucher';
import NewOrder from '../pages/cms/shipper/order/NewOrder';
import MenuList from '../pages/cms/kitchen/menu/MenuList';
import CreateNew from '../pages/cms/kitchen/menu/CreateNew';
import NotFound from '../pages/NotFound';

const routes = (
	<Route element={<MainLayout />}>
		<Route element={<ClientLayout />}>
			<Route path="/" element={<Home />} />
			<Route path="authen" element={<Authen />} />
			<Route path="cart" element={<Cart />} />
		</Route>
		<Route path="cms" element={<CMSLayout />}>
			<Route path="accountant" element={<AccountantLayout />}>
				<Route path="salary" element={<Salary />} />
				<Route path="stock" element={<Stock />} />
				<Route path="warehouse" element={<WarehouseLayout />}>
					<Route path="material" element={<Material />} />
				</Route>
			</Route>
			<Route path="host" element={<HostLayout />}>
				<Route path="order-list" element={<OrderList />} />
			</Route>
			<Route path="kitchen" element={<KitchenLayout />}>
				<Route path="order-list" element={<KitchenOrderList />} />
				<Route path="order-detail" element={<KitchenOrderDetail />} />
				<Route path="menu" element={<MenuList />} />
				<Route path="new-menu" element={<CreateNew />} />
			</Route>
			<Route path="leader" element={<LeaderLayout />}>
				<Route path="today-employee" element={<LeaderEmployee />} />
				<Route path="problem" element={<Problem />} />
			</Route>
			<Route path="manager" element={<ManagerLayout />}>
				<Route path="account" element={<Account />} />
				<Route path="customer" element={<Customer />} />
				<Route path="employee" element={<Employee />} />
				<Route path="permission" element={<Permission />} />
				<Route path="report" element={<Report />} />
			</Route>
			<Route path="marketing" element={<MarketingLayout />}>
				<Route path="promotion" element={<Promotion />} />
				<Route path="voucher" element={<Voucher />} />
			</Route>
			<Route path="shipper" element={<ShipperLayout />}>
				<Route path="new-order" element={<NewOrder />} />
			</Route>
		</Route>
	</Route>
);

const notfoundRoute = <Route path="*" element={<NotFound />} />;

export { routes, notfoundRoute };
