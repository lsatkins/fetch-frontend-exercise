import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginPage() {

  const loggedIn = useSelector(state=>state.auth.loggedIn)
  console.log(loggedIn)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the loginUser action with name and email as payload
    dispatch(loginUser({ name, email }))
      .then((response) => {
        // Reset the form fields
        setName('');
        setEmail('');

        // Access the response and handle it accordingly
        if (response.type === 'auth/login/fulfilled') {
          navigate('/search');
        } else {
          console.log('Error:', response.error);
          navigate('/login')
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Logging In...' : 'Submit'}
      </Button>
      
    </Form>
  );
}

export default LoginPage;