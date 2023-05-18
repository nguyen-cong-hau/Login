import { useState } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from 'reactstrap';

function CommentForm() {
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:1337/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    content: content,
                })
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Đã thêm comment thành công!', data);
                setUsername("");
                setContent("");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for='username'>Tên của bạn</Label>
                <Input type='text' name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for='content'>Nội dung bình luận</Label>
                <Input type='textarea' name='content' id='content' value={content} onChange={(e) => setContent(e.target.value)} />
            </FormGroup>
            <Button color='primary' type="submit">Gửi bình luận</Button>
        </Form>
    );
}

export default CommentForm;