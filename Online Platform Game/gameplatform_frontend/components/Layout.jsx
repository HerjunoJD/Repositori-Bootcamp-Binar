import Head from 'next/head';
import Footer from './Footer';
import styles from '../styles/Layout.module.css';
import Navbars from './Navbar';

export default function Layout(props) {
  const { children, pageTitle } = props;
  return (
    <>
      <Head>
        <title>
          Game Platform |
          {' '}
          {pageTitle}
          {' '}
        </title>
        <meta name="description" content="Website Game Platform" />
      </Head>
      <div className={styles.container}>
        <Navbars />
        <div className={styles.content}>{children}</div>
        <Footer />
      </div>
    </>
  );
}
