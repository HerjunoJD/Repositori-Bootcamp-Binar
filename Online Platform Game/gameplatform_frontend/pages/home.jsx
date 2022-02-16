import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import Layout from '../components/Layout';
import firebase from '../config/firebase';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [usernameLogin, setUsernameLogin] = useState('');

  const router = useRouter();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.replace('/auth/login');
      } else {
        setUsernameLogin(user.email);
      }
    });
  }, []);
  return (
    <Layout pageTitle="Home">
      <div className={styles.home}>
        <div className={styles.containeHome}>
          <Card
            className="bg-dark text-white mx-auto"
            style={{
              width: '50rem',
              height: '17rem',
              borderRadius: '28px',
              marginTop: '10%',
            }}
            data-testid="card"
          >
            <CardBody style={{ paddingLeft: '40px', paddingRight: '40px' }}>
              <div className={styles.row}>
                <div
                  className="col-sm-6 col-md-6 col-lg-12"
                  style={{ paddingTop: '20px' }}
                >
                  <div
                    className="d-flex justify-content-start"
                    style={{ fontSize: '20px', fontWeight: 900 }}
                    data-testid="welcome"
                  >
                    WELCOME, [
                    {' '}
                    {usernameLogin}
                    {' '}
                    ]
                  </div>
                  <div className="d-flex justify-content-end">
                    <Link href="/userprofile" passHref>
                      <Button
                        style={{
                          height: '40px',
                          width: '160px',
                          borderRadius: '10px',
                          fontWeight: 500,
                          fontSize: '15px',
                          backgroundColor: '#FFB548',
                          border: 'none',
                          color: 'black',
                        }}
                      >
                        USER PROFIL
                      </Button>
                    </Link>
                  </div>
                </div>
                <div
                  className="col-sm-6 col-md-6 col-lg-12"
                  style={{ paddingTop: '20px' }}
                >
                  <div className="d-flex justify-content-end">
                    <Link href="/gamelist" passHref>
                      <Button
                        // variant="warning"
                        style={{
                          height: '40px',
                          width: '160px',
                          borderRadius: '10px',
                          fontWeight: 500,
                          fontSize: '15px',
                          backgroundColor: '#FFB548',
                          border: 'none',
                          color: 'black',
                        }}
                      >
                        LIST GAME
                      </Button>
                    </Link>
                  </div>
                </div>
                <div
                  className="col-sm-6 col-md-6 col-lg-12"
                  style={{ paddingTop: '20px' }}
                >
                  <div className="d-flex justify-content-end">
                    <Link href="/gameleaderboard" passHref>
                      <Button
                        // variant="warning"
                        style={{
                          height: '40px',
                          width: '160px',
                          borderRadius: '10px',
                          fontWeight: 500,
                          fontSize: '15px',
                          backgroundColor: '#FFB548',
                          border: 'none',
                          color: 'black',
                        }}
                      >
                        LIST PLAYER
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
