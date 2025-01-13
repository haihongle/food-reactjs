import { Routes, Route } from 'react-router';
import { lazy } from 'react';
import NotFound from '../pages/not-found/NotFound';
import PrivateRoute from '../utils/PrivateRoute';
import LoadingSpiner from '../components/loading-spinner/LoadingSpiner';
import { Suspense } from 'react';

// Import Layout
import ClientLayout from '../layouts/client/ClientLayout';
import CMSLayout from '../layouts/cms/CMSLayout';
import CustomerLayout from '../pages/cms/customer/CustomerLayout';
import MenuLayout from '../pages/cms/menus/MenuLayout';
import EmployeeLayout from '../pages/cms/employees/EmployeeLayout';
import MarketingLayout from '../pages/cms/marketing/MarketingLayout';
import OrderLayout from '../pages/cms/orders/OrderLayout';
import ScheduleLayout from '../pages/cms/schedules/ScheduleLayout';
import ReportLayout from '../pages/cms/reports/ReportLayout';
import WarehouseLayout from '../pages/cms/warehouse/WarehouseLayout';
import AccountantLayout from '../pages/cms/accountant/AccountantLayout';

// Lazy load components
const MainLayout = lazy(() => import('../layouts/MainLayout'));

//---- Client
const Home = lazy(() => import('../pages/client/home/home'));
const Cart = lazy(() => import('../pages/client/cart/Cart'));

//User
const Register = lazy(() => import('../pages/userinfor/Register'));
const UserProfile = lazy(() => import('../pages/userinfor/UserProfile'));

//---- CMS

const Login = lazy(() => import('../pages/login/Login'));
const CMSInfor = lazy(() => import('../pages/cms/cms-infor/cms-infor'));
const CMSHome = lazy(() => import('../pages/cms/cms-home/CMSHome'));

//---- Customer
const Customer = lazy(() => import('../pages/cms/customer/customer-list/CustomerList'));
const Problem = lazy(() => import('../pages/cms/customer/problems/Problem'));

//---- Employee
const EmployeeList = lazy(() => import('../pages/cms/employees/employee-list/EmployeeList'));
const CreateUser = lazy(() => import('../pages/cms/employees/user/CreateUser'));
const Permission = lazy(() => import('../pages/cms/employees/permission/Permission'));
const Salary = lazy(() => import('../pages/cms/employees/salary/Salary'));

//---- Marketing
const Promotion = lazy(() => import('../pages/cms/marketing/promotion/Promotion'));
const Voucher = lazy(() => import('../pages/cms/marketing/voucher/Voucher'));

//---- Menu
const MenuList = lazy(() => import('../pages/cms/menus/menu/MenuList'));

//---- Order
const AllOrders = lazy(() => import('../pages/cms/orders/all-orders/AllOrders'));
const WaitingOrders = lazy(() => import('../pages/cms/orders/waiting-orders/WaitingOrders'));
const CompletedOrders = lazy(() => import('../pages/cms/orders/completed-orders/CompletedOrders'));
const CancelOrders = lazy(() => import('../pages/cms/orders/cancel-orders/CancelOrders'));

//---- Schedule
const TodaySchedule = lazy(() => import('../pages/cms/schedules/today-schedule/TodaySchedule'));
const ArrageSchedule = lazy(
	() => import('../pages/cms/schedules/arrange-schedule/ArrangeSchedule')
);

//---- Reports
const LeaveApplications = lazy(
	() => import('../pages/cms/reports/leave-applications/LeaveApplications')
);
// const LeaveApplications = lazy(
// 	() => import('../pages/cms/reports/leave-applications/LeaveApplications')
// );
const Revenues = lazy(() => import('../pages/cms/reports/revenues/Revenues'));

//---- Warehouse
const Material = lazy(() => import('../pages/cms/warehouse/materials/Material'));
const Inventory = lazy(() => import('../pages/cms/warehouse/inventory/Inventory'));
const InventoryHistory = lazy(() => import('../pages/cms/warehouse/inventory/InventoryHistory'));

//---- Accountant
const ImExRecipe = lazy(() => import('../pages/cms/accountant/recipe/ImExRecipe'));
const ImExRecipeDetail = lazy(() => import('../pages/cms/accountant/recipe/ImExRecipeDetail'));
const ImExDetailHistory = lazy(
	() => import('../pages/cms/accountant/im-ex-history/ImExDetailHistory')
);
const CreateRecipeForm = lazy(() => import('../pages/cms/accountant/new-recipe/CreateRecipeForm'));

const routes = (
	<Routes>
		<Route element={<MainLayout />}>
			<Route element={<ClientLayout />}>
				<Route
					path="/"
					element={
						<Suspense fallback={<LoadingSpiner />}>
							<Home />
						</Suspense>
					}
				/>
				<Route
					path="cart"
					element={
						<Suspense fallback={<LoadingSpiner />}>
							<Cart />
						</Suspense>
					}
				/>
			</Route>

			<Route path="cms">
                <Route
                    path="login"
                    element={
                        <Suspense fallback={<LoadingSpiner />}>
                            <Login />
                        </Suspense>
                    }
                />
                <Route
                    path="registerUser"
                    element={
                        <Suspense fallback={<LoadingSpiner />}>
                            <Register />
                        </Suspense>
                    }
                />
				
				<Route
					path="userProfile"
					element={
						<Suspense fallback={<LoadingSpiner />}>
							<UserProfile />
						</Suspense>
					}
				/>

				<Route element={<PrivateRoute />}>
					<Route element={<CMSLayout />}>
						<Route
							path="home"
							element={
								<Suspense fallback={<LoadingSpiner />}>
									<CMSHome />
								</Suspense>
							}
						/>
						<Route
							path="user-info"
							element={
								<Suspense fallback={<LoadingSpiner />}>
									<CMSInfor />
								</Suspense>
							}
						/>
						<Route path="customers" element={<CustomerLayout />}>
							<Route
								path="customer-list"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<Customer />
									</Suspense>
								}
							/>
							<Route
								path="problems"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<Problem />
									</Suspense>
								}
							/>
						</Route>

						<Route path="employees" element={<EmployeeLayout />}>
							<Route
								path="employee-list"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<EmployeeList />
									</Suspense>
								}
							/>
							<Route
								path="salary"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<Salary />
									</Suspense>
								}
							/>
							<Route
								path="users"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<CreateUser />
									</Suspense>
								}
							/>
							<Route
								path="permissions"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<Permission />
									</Suspense>
								}
							/>
						</Route>

						<Route path="marketing" element={<MarketingLayout />}>
							<Route
								path="promotions"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<Promotion />
									</Suspense>
								}
							/>
							<Route
								path="vouchers"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<Voucher />
									</Suspense>
								}
							/>
						</Route>

						<Route path="menu" element={<MenuLayout />}>
							<Route
								path="menu-list"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<MenuList />
									</Suspense>
								}
							/>
						</Route>

						<Route path="orders" element={<OrderLayout />}>
							<Route
								path="all-orders"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<AllOrders />
									</Suspense>
								}
							/>
							<Route
								path="waiting-orders"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<WaitingOrders status={'WAITING'} />
									</Suspense>
								}
							/>
							<Route
								path="cancel-orders"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<CancelOrders status={'FAILED'} />
									</Suspense>
								}
							/>
							<Route
								path="completed-orders"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<CompletedOrders status={'COMPLETED'} />
									</Suspense>
								}
							/>
						</Route>

						<Route path="schedules" element={<ScheduleLayout />}>
							<Route
								path="today-schedule"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<TodaySchedule />
									</Suspense>
								}
							/>
							<Route
								path="arrange-schedule"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<ArrageSchedule />
									</Suspense>
								}
							/>
						</Route>

						<Route path="reports" element={<ReportLayout />}>
							{/*<Route*/}
							{/*	path="leave-applications"*/}
							{/*	element={*/}
							{/*		<Suspense fallback={<LeaveApplications />}>*/}
							{/*			<ArrageSchedule />*/}
							{/*		</Suspense>*/}
							{/*	}*/}
							{/*/>*/}
							<Route
								path="revenues"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<Revenues />
									</Suspense>
								}
							/>
						</Route>

						<Route path="warehouse" element={<WarehouseLayout />}>
							<Route
								path="materials"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<Material />
									</Suspense>
								}
							/>
							<Route
								path="inventory"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<Inventory />
									</Suspense>
								}
							/>
							<Route
								path="inventory-history"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<InventoryHistory />
									</Suspense>
								}
							/>
						</Route>

						<Route path="accountant" element={<AccountantLayout />}>
							<Route
								path="import-recipe"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<ImExRecipe repType={'IMPORT'} />
									</Suspense>
								}
							/>
							<Route
								path="import-history"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<ImExDetailHistory repType={'IMPORT'} />
									</Suspense>
								}
							/>
							<Route
								path="export-recipe"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<ImExRecipe repType={'EXPORT'} />
									</Suspense>
								}
							/>
							<Route
								path="export-history"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<ImExDetailHistory repType={'EXPORT'} />
									</Suspense>
								}
							/>
							<Route
								path="recipe/create"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<CreateRecipeForm />
									</Suspense>
								}
							/>
							<Route
								path="recipe/:id"
								element={
									<Suspense fallback={<LoadingSpiner />}>
										<ImExRecipeDetail />
									</Suspense>
								}
							/>
						</Route>
					</Route>
				</Route>
			</Route>
		</Route>
		<Route path="*" element={<NotFound />} />
	</Routes>
);

export default routes;
