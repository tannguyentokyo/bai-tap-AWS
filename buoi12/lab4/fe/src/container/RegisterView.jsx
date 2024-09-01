import {Link, useNavigate} from "react-router-dom";
import React from "react";
import * as api from "../service/AuthService";
import {toast} from "react-toastify";
import Space from "../hook/space/space";
import Input from "../hook/input";
import Button from "../hook/button";

const Register = () => {
    const navigate = useNavigate();
    const [payload, setPayload] = React.useState({
        username: '',
        password: '',
        name: ''
    });

    const handleRegister = () => {
        if (payload.name === '' || payload.password === '' || payload.username === '') {
            toast.error("Hãy điền đầy đủ thông tin!")
            return;
        }
        api.register(payload).then(res => {
            if (!res || res?.status === 400) {
                toast.error("Hãy thử lại với username khác!")
                return;
            }
            navigate('/login');
            toast.success("Đăng ký thành công!")
        }).catch(err => {
            toast.error("Đăng ký thất bại!")
        });
    }

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div className={'login-title'}>
                <h1>Đăng ký tài khoản</h1>
            </div>
            <Space height={10}/>
            <div style={{
                width: '300px',
                padding: '20px',
                border: '1px solid #f5f5f5',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                textAlign: 'center',
            }}>
                <Input label={'Username'}
                       type={'text'}
                       value={payload.username}
                       onChange={(value) => setPayload({...payload, username: value})}
                       customStyle={{
                           marginBottom: '30px',
                           width: '100%',
                           padding: '10px',
                           backgroundColor: '#f5f5f5',
                       }}
                />
                <Input label={'Password'}
                       type={'password'}
                       value={payload.password}
                       onChange={(value) => setPayload({...payload, password: value})}
                       customStyle={{
                           marginBottom: '30px',
                           width: '100%',
                           padding: '10px',
                           backgroundColor: '#f5f5f5',
                       }}
                />
                <Input label={'Name'}
                       type={'name'}
                       value={payload.name}
                       onChange={(value) => setPayload({...payload, name: value})}
                       customStyle={{
                           marginBottom: '30px',
                           width: '100%',
                           padding: '10px',
                           backgroundColor: '#f5f5f5',
                       }}
                />
                <div className={'login-btn'}>
                    <Button title={'Đăng ký'} onClick={handleRegister}/>
                </div>
                <div className={'other-link'}>
                    <Link to={'/login'}>Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;