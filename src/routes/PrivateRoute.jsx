// import PropTypes from 'prop-types';
import { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../pages/providers/AuthProvider';


const PrivateRoutes = ({children}) => {
const {user,loading} =useContext(AuthContext);
const location=useLocation();

if(user){
    return children;
}
if(loading){
    return (
    <div className='text-center'>
    <span className="loading loading-spinner loading-lg"></span>
    </div>
    )
}
    return <Navigate state={{from:location}} to="/login" replace></Navigate>
};
// PrivateRoutes.propTypes={
//     children:PropTypes.node,
// }
export default PrivateRoutes;