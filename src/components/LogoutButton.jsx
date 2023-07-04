import Button from 'react-bootstrap/Button';
import {logoutUser} from '../redux/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/button.css'

function LogoutButton() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {

        dispatch(logoutUser())
        .then((response) => {
          // Reset the form fields
          
          if (response.type === 'auth/logout/fulfilled') {
            navigate('/login');
          } else {
            console.log('Error:', response.error);
            navigate('/login')
          }
        })
        .catch((error) => {
          console.log('Error:', error);
        });

    }

    

   
  return (
    <>
      
      <Button className="me-2" onClick={()=>handleLogout()}variant="secondary">Log Out</Button>{' '}
      
    </>
  );
}

export default LogoutButton;