import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../services/authentication/AuthenticationContext';
import ContactContext from '../services/contactState/ContactContext';

const Navbar = ({ title, icon}) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { clearContacts } = contactContext;

  // useEffect(() => {
  //   loadUser();
  //   // eslint-disable-next-line
  // }, []);

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes ={
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'Contact Organizer',
  icon: 'far fa-address-book'
}

export default Navbar;