import React, { useState } from 'react';
import authenServices from '../../services/userServices/AuthenServices';
import Toast from '../../components/toast-message/ToastMessage';
import { useNavigate } from 'react-router';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        primaryPhone: '',
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            Toast.error('Passwords do not match!');
            return;
        }

        try {
            const response = await authenServices.register({
                username: formData.username,
                password: formData.password,
                fullName: formData.fullName,
                primaryPhone: formData.primaryPhone,
                email: formData.email,
            });

            if (response.success) {
                Toast.success('Registration successful!');
                setFormData({
                    username: '',
                    password: '',
                    confirmPassword: '',
                    fullName: '',
                    primaryPhone: '',
                    email: '',
                });
                navigate('/cms/Login');
            } else {
                Toast.error(response.message || 'Registration failed.');
            }
        } catch (error) {
            Toast.error('An error occurred during registration.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="mb-4 text-center fs-4 fw-bold">Register</h3>
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="form-control"
                                        placeholder="Enter username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        className="form-control"
                                        placeholder="Re-enter password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        className="form-control"
                                        placeholder="Enter full name"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="primaryPhone" className="form-label">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="primaryPhone"
                                        id="primaryPhone"
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        value={formData.primaryPhone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Enter email address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                            </form>
                            <div className="text-center">
                                <p>
                                    Already have an account?{' '}
                                    <button
                                        className="btn btn-link p-0 text-primary"
                                        style={{ textDecoration: 'none' }}
                                        onClick={() => navigate('/cms/Login')}
                                    >
                                        Login here
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
