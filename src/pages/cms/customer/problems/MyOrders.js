import React, { useEffect, useState } from "react";
import axios from "axios";


import { useOutletContext } from 'react-router';
import orderServices from '../../../../services/orderServices/OrderService';
import ServiceMethods from '../../../../utils/ServiceMethods';
import Toast from '../../../../components/toast-message/ToastMessage';
import CustomTable from '../../../../components/custom-table/CustomTable';
import CustomModalDetail from '../../../../components/custom-modal/CustomModalDetail';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';

const MyOrders = () => {
    const outletContext = useOutletContext() || {};  // ✅ Kiểm tra nếu context không tồn tại
    const filteredData = outletContext.filteredData || null;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detailData, setDetailData] = useState(null); // ✅ State để lưu chi tiết đơn hàng

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await orderServices.getOrderList();
                if (response.success) {
                    setOrders(response.data);
                } else {
                    Toast.error("Không thể lấy danh sách đơn hàng!");
                }
            } catch (err) {
                setError("Lỗi khi tải đơn hàng!");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const detailOrder = async (id) => {
        try {
            const data = await ServiceMethods.detail(orderServices.detailOrder, id);
            if (data) {
                setDetailData(data); // ✅ Lưu dữ liệu đơn hàng để hiển thị trong modal
            } else {
                Toast.error("Không thể lấy chi tiết đơn hàng!");
            }
        } catch (error) {
            Toast.error("Lỗi khi tải chi tiết đơn hàng!");
        }
    };

    return (
        <Container>
            <h2 className="my-4 text-center">Danh sách đơn hàng</h2>

            {loading && <Spinner animation="border" className="d-block mx-auto" />}
            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
                <>
                    {/* ✅ Modal hiển thị chi tiết đơn hàng */}
                    <CustomModalDetail detailData={detailData} hiddenFields={[]} />

                    <Table striped bordered hover responsive className="mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái</th>
                                <th>Mô tả</th>
                                <th>Tên khách hàng</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.createdAt}</td>
                                        <td>
                                            <span className={`badge bg-${order.status === 'COMPLETED' ? 'success' : 'warning'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>{order.description}</td>
                                        <td>{order.orderByName}</td>
                                        <td>
                                            <Button variant="info" size="sm" onClick={() => detailOrder(order.id)}>
                                                Xem chi tiết
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">Không có đơn hàng nào.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
}


export default MyOrders;
