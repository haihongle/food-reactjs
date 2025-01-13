import authenServices from '../../services/userServices/AuthenServices';
import { useState } from 'react';
import Toast from '../../components/toast-message/ToastMessage';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import style from './Login.module.scss';

function Login() {
    const [loginError, setLoginError] = useState(null);
    const [, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
	

    const submitLogin = async (e) => {
        e.preventDefault();

        const data = {
            username: e.target.username?.value ?? null,
            password: e.target.password?.value ?? null,
        };

        try {
            const response = await authenServices.login(data);
            if (response?.success) {
                // Đăng nhập thành công
                Toast.success(response.message);
                setCookie('token', response.data.token, { path: '/' });

                // Giải mã JWT để lấy thông tin user
                const decodedToken = jwtDecode(response.data.token);
                localStorage.setItem('user', JSON.stringify(decodedToken));

                // Điều hướng dựa trên vai trò người dùng
                if (decodedToken.role === 'BOSS', 'ACCOUNTANT', 'MANAGER', 'MARKETING') {
                    navigate('/cms/home'); // Điều hướng đến CMS
                }
                if (decodedToken.role === 'USER') {
                    navigate('/'); // Điều hướng đến trang mua sắm
                }
            } else {
                // Xử lý trường hợp đăng nhập thất bại
                setLoginError(true);
                Toast.error(response?.message || 'Invalid login credentials');
            }
        } catch (error) {
            Toast.error('An error occurred during login');
        }
    };

    const handlePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const navigateToRegister = () => {
        navigate('/cms/registerUser'); // Điều hướng đến trang đăng ký
    };

    return (
        <div className={`${style.loginContainer} ps-4 pe-4`}>
            <div className={`${style.loginForm} col-md-6 col-lg-4 col-12`}>
                <h3 className="mb-4 text-center fs-2 fw-bolder">Login</h3>
                <form onSubmit={submitLogin}>
                    <div className={style.formGroup}>
                        <input
                            type="text"
                            className={style.loginInput}
                            name="username"
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className={style.formGroup}>
                        <input
                            id="password-field"
                            name="password"
                            type={passwordVisible ? 'text' : 'password'}
                            className={style.loginInput}
                            placeholder="Password"
                            required
                        />
                        <span
                            onClick={handlePassword}
                            className={`${style.fieldIcon} fa fa-fw ${
                                passwordVisible ? 'fa-eye-slash' : 'fa-eye'
                            } toggle-password`}
                        ></span>
                    </div>
                    {loginError && (
                        <p className="text-danger mt-3 text-center fw-semibold mb-2">
                            Incorrect username or password
                        </p>
                    )}
                    <div>
                        <button type="submit" className={style.loginButton}>
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <p>
                        Don't have an account?{' '}
                        <button
                            onClick={navigateToRegister}
                            className={style.registerLink}
                        >
                            Register here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;