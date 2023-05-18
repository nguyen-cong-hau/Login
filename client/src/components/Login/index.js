import React, { useState } from 'react';
import {
    Col,
    Row,
    Button,
    FormGroup,
    Input,
} from 'reactstrap';
import axios from 'axios';


import { Link, useNavigate } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        axios.get('http://localhost:1337/api/resgisters')
            .then(response => {
                const users = response.data.data;
                const user = users.find(user => user.attributes.email === email && user.attributes.password === password);
                if (user) {
                    localStorage.setItem('userName', user.attributes.name);
                    localStorage.setItem('userId', user.id);
                    navigate('/')
                } else {
                    alert('Email hay mật khẩu không đúng')
                    setError("Email hoặc mật khẩu không đúng");
                }
            })
            .catch(error => console.log(error));
    };
    return (
        <Row className="login">
            <Col className='sub-login' sm='12' md={{ size: 4, offset: 4 }}>
                <div >
                    <h2>Sign in</h2>
                    <FormGroup row>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </FormGroup>
                    <FormGroup row>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
                    </FormGroup>
                    <Button color="primary" onClick={handleLogin}>Đăng nhập</Button>

                    <div className='to-register'>
                        <span style={{ fontWeight: '500' }}>
                            Don't have an account?
                        </span>
                        <Link style={{ fontWeight: '500' }} to='/registration'>Sign Up</Link>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default Login;