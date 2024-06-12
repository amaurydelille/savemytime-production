import { useAuth } from '../contexts/UserAuthContext.tsx';
import { useNavigate } from 'react-router-dom';

const CheckAuthentication = () => {

    const { token } = useAuth();
    const { id } = useAuth();
    const navigate = useNavigate();

    if (!token || !id) navigate('/auth/');
}

export default CheckAuthentication;