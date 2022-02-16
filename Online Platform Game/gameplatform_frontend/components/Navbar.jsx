import { useState, useEffect } from 'react';
import {
  Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem,
} from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import ProfileDropdown from './ProfileDropdown';
import firebase from '../config/firebase';
import service from '../services/service';

export default function Navbars() {
  const [open, setOpen] = useState({ isOpen: false });
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState('');
  const [usernameLogin, setUsernameLogin] = useState('');
  const [score, setScore] = useState('');
  const [badge, setBadge] = useState('');
  const [cekLogin, setCekLogin] = useState(false);
  const toggleCollapse = () => {
    setOpen({ isOpen: !open.isOpen });
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setUsernameLogin(user.email);

        setCekLogin(true);
        service
          .scoreNavbar(user.uid)
          .then((res) => {
            // console.log(res);
            setScore(res.data.point);
            setBadge(res.data.badge);
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
          });
      }
    });
  }, []);

  const router = useRouter();
  const logout = () => {
    firebase.auth().signOut();

    router.replace('/auth/login');
  };

  return (
    <Navbar dark expand="lg" className={styles['bg-nav']}>
      <NavbarBrand href="/" className="ms-lg-5 ps-lg-3 text-white">
        LOGO
      </NavbarBrand>
      <NavbarToggler onClick={toggleCollapse} aria-controls="collapse" aria-expanded={open.isOpen} className="text-white" />
      <Collapse isOpen={open.isOpen} navbar>
        <Nav id="collapse" className="mr-auto text-uppercase" navbar>
          <NavItem className="px-4 ms-lg-5">
            <Link href="/home" passHref>
              <a href="replace" className={styles['nav-item']}>Home</a>
            </Link>
          </NavItem>
          <NavItem className="px-4">
            <Link href="/home" passHref>
              <a href="replace" className={styles['nav-item']}>work</a>
            </Link>
          </NavItem>
          <NavItem className="px-4">
            <Link href="/home" passHref>
              <a href="replace" className={styles['nav-item']}>contact</a>
            </Link>
          </NavItem>
          <NavItem className="px-4">
            <Link href="/home" passHref>
              <a href="replace" className={styles['nav-item']}>about me</a>
            </Link>
          </NavItem>
          <NavItem className="px-4">
            <Link href="/home" passHref>
              <a href="replace" className={styles['nav-item']}>q&a</a>
            </Link>
          </NavItem>
        </Nav>
        <Nav className="ms-auto me-md-5" navbar>
          {cekLogin === false ? (
            <>
              <NavItem className=" justify-content-end px-4">
                <Link href="/auth/login" passHref>
                  <a href="replace" className={styles['nav-item']}>LOGIN</a>
                </Link>
              </NavItem>
              <NavItem className=" justify-content-end px-4">
                <Link href="/auth/register" passHref>
                  <a href="replace" className={styles['nav-item']}>REGISTER</a>
                </Link>
              </NavItem>
            </>
          ) : (
            <NavItem className="px-4">
              <ProfileDropdown
                userLogin={usernameLogin}
                scored={score}
                logout={logout}
                badge={badge}
              />
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}
