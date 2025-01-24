import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import orderServices from '../../../../services/orderServices/OrderService';
import customersServices from '../../../../services/customerServices/customersSevices';
import Toast from '../../../../components/toast-message/ToastMessage';
import ServiceMethods from '../../../../utils/ServiceMethods';
import { Table, Button, Spinner, Alert, Container, Modal } from 'react-bootstrap';

function OrderList() {
    const outletContext = useOutletContext() || {};
    const filteredData = outletContext.filteredData || null;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allOrder, setAllOrder] = useState([]);
    const [detailData, setDetailData] = useState(null);
    const [showModal, setShowModal] = useState(false);  // State để hiển thị modal

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await customersServices.getOrdersByUser();
                setOrders(response.data);
            } catch (err) {
                setError("Không thể lấy danh sách đơn hàng!");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getNewOrder = async () => {
        try {
            const response = await orderServices.getOrderList();
            if (response.success) {
                setAllOrder(response.data);
            } else {
                Toast.error(response.message);
            }
        } catch (error) {
            Toast.error("Lỗi khi tải danh sách đơn hàng!");
        }
    };

    useEffect(() => {
        getNewOrder();
    }, [filteredData]);

    const detailOrder = async (id) => {
        try {
            const data = await ServiceMethods.detail(orderServices.detailOrder, id);
            if (data) {
                console.log("Dữ liệu chi tiết đơn hàng: ", data);  // Kiểm tra dữ liệu trả về
                setDetailData(data);  // Lưu thông tin đơn hàng
                setShowModal(true);   // Mở modal hiển thị sản phẩm
                console.log("Chi tiết sản phẩm:", detailData);
            } else {
                Toast.error("Không thể lấy chi tiết đơn hàng!");
            }
        } catch (error) {
            Toast.error("Lỗi khi tải chi tiết đơn hàng!");
        }
    };

    // Hàm xóa đơn hàng
    const deleteOrder = async (orderId) => {
		const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?");
		
		if (confirmDelete) {
			try {
				const response = await orderServices.deleteOrder(orderId);
				if (response.success) {
					Toast.success("Đơn hàng đã được xóa thành công!");
					// Cập nhật lại danh sách đơn hàng sau khi xóa
					setOrders(orders.filter(order => order.id !== orderId));
				} else {
					Toast.error("Không thể xóa đơn hàng!");
				}
			} catch (error) {
				Toast.error("Lỗi khi xóa đơn hàng!");
			}
		}
	};
	
git 
    return (
        <Container>
            <h2 className="my-4 text-center">Danh sách đơn hàng</h2>

            {loading && <Spinner animation="border" className="d-block mx-auto" />}
            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
                <Table striped bordered hover responsive className="mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>Ngày tạo</th>
                            <th>Trạng thái</th>
                            <th>Mô tả</th>
                            <th>Tên khách hàng</th> 
							<th>Địa chỉ</th>
                            <th>Chi tiết đơn hàng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.createdAt}</td>
                                    <td>
                                        <span className={`badge bg-${order.status === 'COMPLETED' ? 'success' : 'warning'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.description}</td>
                                    <td>{order.orderByName}</td>
									<td>{order.address}</td>
                                    <td>
                                        <Button variant="info" size="sm" onClick={() => detailOrder(order.id)}>
                                            Xem chi tiết
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => deleteOrder(order.id)}>
                                            Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">Không có đơn hàng nào.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}

            {/* Modal hiển thị sản phẩm trong đơn hàng */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {detailData ? (
                        <Table striped bordered hover responsive>
                            <thead className="table-dark">
                                <tr>
                                    <th>Image</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                     
                                </tr>
                            </thead>
                            <tbody>
                                {detailData.orderDetaiList && detailData.orderDetaiList.length > 0 ? (
                                    detailData.orderDetaiList.map(item => (
                                        <tr key={item.menuId}>
                                            <td>
                                                <img 
                                                    src={item.image} 
                                                    alt={item.menuName} 
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                                />
                                            </td>
                                            <td>{item.menuName}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.menuPrice.toFixed(3)} VND</td>
                                            <td>{item.menuNote}</td>
                                        
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">Không có sản phẩm nào.</td>
                                    </tr>
                                )}
                            </tbody>
                            {/* Add total price below the table */}
                            <div className="text-end mt-3">
                                <h5>Tổng tiền: 
                                    {detailData.orderDetaiList.reduce((total, item) => total + item.menuPrice * item.quantity, 0).toFixed(3)} VND
                                </h5>
                            </div>
                        </Table>
                    ) : (
                        <p className="text-center">Đang tải dữ liệu...</p>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default OrderList;
