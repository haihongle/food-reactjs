import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Toast from '../../../components/toast-message/ToastMessage';
import orderServices from '../../../services/orderServices/OrderService';
import { useOutletContext } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

function Cart() {
	const [orders, setOrders] = useState([]);
	const { updateCartCount } = useOutletContext();

	const images = [
		{ id: 1, image: '/images/pizza.jpg' },
		{ id: 2, image: '/images/burger.jpg' },
		{ id: 3, image: '/images/sushi.jpg' },
		{ id: 4, image: '/images/cake.jpg' },
		{ id: 5, image: '/images/kfc.jpg' },
		{ id: 6, image: '/images/bread.jpg' },
		{ id: 7, image: '/images/rice.jpg' },
		{ id: 8, image: '/images/donut.jpg' },
		{ id: 9, image: '/images/banhbao.jpg' },
		{ id: 10, image: '/images/trungchien.jpg' },
		{ id: 11, image: '/images/thitkhotau.jpg' },
	];

	useEffect(() => {
		const storedOrders = JSON.parse(localStorage.getItem('order')) || [];
		setOrders(storedOrders);
	}, []);

	const addToCart = useCallback((order, quantity) => {
		setOrders((prevOrders) => {
			const existingOrder = prevOrders.find((item) => item.id === order.id);
			if (existingOrder) {
				return prevOrders.map((item) =>
					item.id === order.id ? { ...item, quantity: item.quantity + quantity } : item
				);
			} else {
				return [...prevOrders, { ...order, quantity }];
			}
		});
		console.log(order, quantity);
	}, []);

	const handleRemoveItem = useCallback(
		(id) => {
			const updatedOrders = orders.filter((order) => order.id !== id);
			setOrders(updatedOrders);
			localStorage.setItem('order', JSON.stringify(updatedOrders));
			updateCartCount();
		},
		[orders]
	);

	const handleIncreaseQuantity = useCallback(
		(id) => {
			addToCart(
				orders.find((order) => order.id === id),
				1
			);
		},
		[orders, addToCart]
	);

	const handleDecreaseQuantity = useCallback(
		(id) => {
			const order = orders.find((order) => order.id === id);
			if (order && order.quantity > 1) {
				addToCart(order, -1);
				updateCartCount();
			} else {
				handleRemoveItem(id);
			}
			updateCartCount();
		},
		[orders, addToCart, handleRemoveItem]
	);

	const totalPrice = useMemo(() => {
		return orders.reduce((acc, order) => acc + order.price * (order.quantity || 1), 0);
	}, [orders]);

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const submitOrder = async (values, { resetForm }) => {
		const detailList = orders.map((order) => ({
			menuId: order.id,
			quantity: order.quantity,
			note: order.note || '',
		}));

		const orderRequest = {
			description: values.description,
			promotionCode: values.promotionCode,
			fullName: values.fullName,
			address: values.address,
			status: 'WAITING',
			detailList,
		};

		try {
			setIsButtonDisabled(true); // Khóa nút
			const response = await orderServices.createOrder(orderRequest);
			Toast.success('order successful');
			setOrders([]);
			localStorage.removeItem('order');
			updateCartCount();
	
			const paymentModalInstance = window.bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
			if (paymentModalInstance) {
				paymentModalInstance.hide();
			}
		} catch (error) {
			Toast.error('you need to log in to purchase');
			console.error('Error creating order', error);
		} finally {
			setIsButtonDisabled(false); // Mở khóa nút nếu cần
		}
	};

	const handleBuyClick = async (validateForm, setFieldTouched) => {
		await setFieldTouched('description', true);
		await setFieldTouched('promotionCode', true);
		await setFieldTouched('fullName', true);
		await setFieldTouched('address', true);

		const errors = await validateForm();
		if (Object.keys(errors).length === 0) {
			const paymentModal = new window.bootstrap.Modal(document.getElementById('paymentModal'));
			paymentModal.show();
		} else {
			console.log('Form validation failed', errors);
		}
	};

	return (
		<div className="container my-4">
			<h2 className="text-center mb-4">Shopping Cart</h2>
			<div className="row">
				<div className="col-md-8">
					<div className="card mt-0">
						<div className="card-header">
							<h4 className="card-title">Cart items</h4>
						</div>
						<div className="card-body">
							{orders.length === 0 ? (
								<div className="alert alert-warning text-center" role="alert">
									Your Cart is Empty!
								</div>
							) : (
								<table className="table table-bordered">
									<thead className="thead-light">
										<tr>
											<th>Image</th>
											<th>Name Product</th>
											<th>Price</th>
											<th>Quantity</th>
											<th>Cooking Time</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{orders.map((order, index) => (
											<tr key={order.id}>
												<td>
													{order.image == null || order.image == undefined ? (
														<img
															style={{ height: '60px' }}
															src={images[index < images.length ? index : 1].image}
														/>
													) : (
														<img style={{ height: '60px' }} src={order.image} />
													)}
												</td>
												<td>{order.name}</td>
												<td>{order.price} vnđ</td>
												<td>
													<button
														className="btn btn-secondary btn-sm"
														onClick={() => handleDecreaseQuantity(order.id)}
														disabled={(order.quantity || 1) <= 1}
													>
														-
													</button>
													<span className="mx-2">{order.quantity || 1}</span>
													<button
														className="btn btn-secondary btn-sm"
														onClick={() => handleIncreaseQuantity(order.id)}
													>
														+
													</button>
												</td>
												<td>{order.cookTime} minute</td>
												<td>
													<button
														className="btn btn-danger btn-sm"
														onClick={() => handleRemoveItem(order.id)}
													>
														Remove
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card mt-0">
						<div className="card-header">
							<h4 className="card-title">Cart Summary</h4>
						</div>
						<div className="card-body">
							<div className="row g-3 mb-2">
								<div className="col-5">Total Items: </div>
								<div className="col-7">{orders.length}</div>
								<div className="col-5">Total Price: </div>
								<div className="col-7">{totalPrice.toFixed(3)} vnđ</div>
							</div>
							<Formik
								initialValues={{
									description: '',
									promotionCode: '',
									fullName: '',
									// phone: '',
									address: '',
									paymentMethod: '',
								}}
								validationSchema={Yup.object({
									description: Yup.string().required('Description is required'),
									promotionCode: Yup.string(),
									fullName: Yup.string().required('Name is required'),
									// phone: Yup.string().required('Phone number is required'),
									address: Yup.string().required('Address is required'),
								})}
								onSubmit={submitOrder}
							>
								{({ touched, errors, setFieldTouched, submitForm, validateForm }) => (
									<Form>
										<div className="row g-3">
											<div className="col-5 d-flex align-items-center">Description:</div>
											<div className="col-7">
												<Field className="form-control" name="description" type="text" />
												{touched.description && errors.description ? (
													<div className="text-danger">{errors.description}</div>
												) : null}
											</div>
											<div className="col-5 d-flex align-items-center">Promotion Code:</div>
											<div className="col-7">
												<Field className="form-control" name="promotionCode" type="text" />
											</div>
											<div className="col-5 d-flex align-items-center">Full name:</div>
											<div className="col-7">
												<Field className="form-control" name="fullName" type="text" />
												{touched.fullName && errors.fullName ? (
													<div className="text-danger">{errors.fullName}</div>
												) : null}
											</div>
											{/* <div className="col-5 d-flex align-items-center">phone number:</div>
											<div className="col-7">
												<Field className="form-control" name="phone" type="text" />
												{touched.phone && errors.phone ? (
													<div className="text-danger">{errors.phone}</div>
												) : null}
											</div> */}
											<div className="col-5 d-flex align-items-center">Address:</div>
											<div className="col-7">
												<Field className="form-control" name="address" type="text" />
												{touched.address && errors.address ? (
													<div className="text-danger">{errors.address}</div>
												) : null}
											</div>
										</div>
										<button
											type="button"
											onClick={() => handleBuyClick(validateForm, setFieldTouched)}
											className="btn btn-primary mt-4 w-100"
											disabled={orders.length === 0}
										>
											Buy
										</button>
										<div className="modal fade" id="paymentModal">
											<div className="modal-dialog">
												<div className="modal-content">
													<div className="modal-header">
														<h4 className="mb-2">Confirm payment</h4>
													</div>
													<div className="modal-body">
														<div>
															<div className="d-flex">
																<input
																	className="form-check me-2"
																	type="radio"
																	name="paymentMethod"
																	value="creditCard"
																/>
																Credit Card
															</div>

															<div className="d-flex">
																<input
																	className="form-check me-2"
																	type="radio"
																	name="paymentMethod"
																	value="paypal"
																/>
																PayPal
															</div>

															<div className="d-flex">
																<input
																	className="form-check me-2"
																	type="radio"
																	name="paymentMethod"
																	value="cashOnDelivery"
																/>
																Cash on Delivery
															</div>
														</div>
														<textarea className="form-control mt-2" placeholder="Note for shop" />
													</div>
													<div className="modal-footer">
														<button
															className="btn btn-primary"
															onClick={() => {
																submitForm();
																setIsButtonDisabled(true); // Khóa nút ngay khi nhấn
															}}
															disabled={isButtonDisabled} // Khóa nút khi đang gửi
														>
															Confirm Payment
														</button>
													</div>
												</div>
											</div>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
