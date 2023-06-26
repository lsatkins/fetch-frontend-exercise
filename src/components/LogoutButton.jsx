import Button from 'react-bootstrap/Button';
import {logoutUser} from '../redux/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
      
      <Button onClick={()=>handleLogout()}variant="danger">Log Out</Button>{' '}
      
    </>
  );
}

export default LogoutButton;