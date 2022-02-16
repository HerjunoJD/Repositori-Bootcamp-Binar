import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import firebase from '../config/firebase';
import styles from '../styles/GameDetail.module.css';
import Layout from '../components/Layout';

export default function GameDetail() {
  const router = useRouter();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.replace('/auth/login');
      }
    });
  }, []);
  return (
    <Layout pageTitle="Game Detail">
      <div className={styles.body}>
        <div className={styles.detailContainer}>
          <div className={styles.detailImage}>
            <Image
              src="/rockscissorpaper.jpeg"
              alt="Logo Game RPS"
              width={500}
              height={550}
            />
          </div>
          <div className={styles.detailContent}>
            <div className={styles.detailTitle}>
              <p className={styles.gameTitle}>Rock-Paper-Scissors</p>
            </div>
            <div className={styles.detailDescription}>
              <p className={styles.gameDescription}>
                Rock, Paper, Scissors. The familiar game of Rock, Paper,
                Scissors is played like this: at the same time, two players
                display one of three symbols: a rock, paper, or scissors. A rock
                beats scissors, scissors beat paper by cutting it, and paper
                beats rock by covering it. Whenever one player wins, the other
                loses.
              </p>
            </div>
            <div className={styles.detailButton}>
              <Link href="/game" passHref>
                <button type="button" className={styles.btnDetail}>PLAY NOW</button>
              </Link>
              <Link href="/gameleaderboard" passHref>
                <button type="button" className={styles.btnDetail}>Leaderboard</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
