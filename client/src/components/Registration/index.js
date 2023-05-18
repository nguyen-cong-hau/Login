import React, { useState } from 'react';
import {
    Col,
    Row,
    Button,
    FormGroup,
    Input,
} from 'reactstrap';
import { useNavigate } from "react-router-dom"

function Registration() {
    const history = useNavigate();
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
        if (!emailFormat.test(email)) {
            alert("Vui lòng nhập địa chỉ email hợp lệ.");
            return;
        }
        if (password.length < 8) {
            alert('Mật khẩu phải trên 8 ký tư')
            return;
        }
        if (password !== confirmPassword) {
            alert("Mật khẩu không phù hợp");
            return;
        }
        try {
            const response = await fetch('http://localhost:1337/api/resgisters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        name: name,
                        email: email,
                        password: password,
                        confirmPassword: confirmPassword,
                    }
                })
            });

            const data = await response.json();

            if (response.ok) {
                history('/login')
                // Đăng ký thành công
                console.log('Đăng ký thành công!', data);
            } else {
                if (data.email) {
                    alert('Đăng ký không thành công. Email đã được sử dụng.');
                } else {
                    alert('Đăng ký không thành công. Vui lòng đăng ký lại  ');
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Row className="register"  >
            <Col sm='12' md={{ size: 4, offset: 4 }}>
                <div>
                    <h2>Sign Up</h2>
                    <FormGroup row>
                        <Input type='text' placeholder='vui lòng điền tên' required onChange={(e) => setName(e.target.value)} />
                    </FormGroup>
                    <FormGroup row>
                        <Input type='email' placeholder='vui lòng điền email' required onChange={(e) => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup row>
                        <Input type="password" name="password" value={password} placeholder='vui lòng điền mật khẩu' required onChange={(e) => setPassword(e.target.value)} />
                        {passwordError && <div className="error">{passwordError}</div>}
                    </FormGroup>
                    <FormGroup row>
                        <Input type="password" name="confirmPassword" value={confirmPassword} placeholder='vui lòng điền lại mật khẩu' required onChange={(e) => setConfirmPassword(e.target.value)} />
                    </FormGroup>
                    <Button color='primary' onClick={handleSubmit}>Login</Button>
                </div>
            </Col>
        </Row>
    );
}

export default Registration;