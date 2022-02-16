/* eslint-disable @next/next/no-img-element */
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import Layout from '../components/Layout';
import firebase from '../config/firebase';
import {
  batu, gunting, kertas, refresh,
} from '../public/img/index';
import service from '../services/service';
import style from '../styles/Gamepage.module.css';

export default function game() {
  const router = useRouter();
  const arr = [
    { value: 0, img: batu.src },
    { value: 1, img: kertas.src },
    { value: 2, img: gunting.src },
  ];

  const [userId, setUserId] = useState('');
  const [action, setAction] = useState(true);
  const [show, setShow] = useState(false);
  const [showRound, setShowRound] = useState(false);
  const [round, setRound] = useState(0);
  const [point, setPoint] = useState(0);

  const handleModal = (show) => {
    setShow(show);
  };
  useEffect(() => {
    if (round === 3) {
      setShow(true);
      setShowRound(false);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.replace('/auth/login');
      } else {
        setUserId(user.uid);
      }
    });
  });
  const iRandom = () => Math.floor(Math.random() * 3);
  // console.log(iRandom());

  const compare = (play1, com1) => {
    let result;
    if (play1 === com1) {
      result = 'seri';
    } else if (play1 === 0) {
      com1 === 2 ? (result = 'menang') : (result = 'kalah');
    } else if (play1 === 1) {
      com1 === 0 ? (result = 'menang') : (result = 'kalah');
    } else if (play1 === 2) {
      com1 === 1 ? (result = 'menang') : (result = 'kalah');
    }
    return result;
  };
  const displayOutput = (result) => {
    const output = document.querySelectorAll('#output div');
    for (let index = 0; index < output.length; index++) {
      if (output[index].classList.contains(result)) {
        output[0].classList.add('visually-hidden');
        output[index].classList.remove('visually-hidden');
      }
    }
  };
  const reset = () => {
    btnReset.addEventListener('click', () => {
      iRandom();
      const player = document.querySelectorAll('#players div img');
      const com = document.querySelectorAll('#coms div img');
      const output = document.querySelectorAll('#output div');
      player.forEach((element) => {
        element.classList.remove(style.selectedColor);
      });
      com.forEach((element) => {
        element.classList.remove(style.selectedColor);
      });
      output.forEach((element) => {
        element.classList.add('visually-hidden');
      });
      output[0].classList.remove('visually-hidden');
      setAction(true);
    });
  };
  const handleModalRound = (show) => {
    setShowRound(show);
    reset();
  };

  const tambahDataGame = () => {
    const dataGame = { user_id: userId, game_id: '1', point };
    service
      .addHistory(dataGame)
      .then((res) => {
      })
      .catch((err) => {
      });
  };
  const gamePlay = (pick) => {
    const comPick = iRandom();
    const player = document.querySelectorAll('#players div img');
    const com = document.querySelectorAll('#coms div img');
    // console.log(comPick);
    // console.log({ "ini player": player });
    // console.log({ "ini com": com });
    // console.log(action);

    if (action) {
      com[comPick].classList.add(style.selectedColor);
      player[pick].classList.add(style.selectedColor);
      setShowRound(true);
      setRound(round + 1);
      const result = compare(pick, comPick);
      if (result === 'menang') {
        setPoint(point + 100);
      } else if (result === 'seri') {
        setPoint(point + 50);
      }
      displayOutput(result);
      // console.log(action);
      setAction(false);
      // console.log("atas " + point);
    } else {
      // console.log("bawah " + point);

      setShowRound(true);
    }
  };
  const cekHasil = (point) => {
    if (point === 300) {
      return (
        <>
          <span className="m-3 fs-6 badge bg-success">
            {point}
            {' '}
          </span>
          <span className="fs-3">🤩🤩🤩</span>
        </>
      );
    } if (point < 300 && point >= 100) {
      return (
        <>
          <span className="m-3 fs-6 badge bg-primary">
            {point}
            {' '}
          </span>
          <span className="fs-3">😊</span>
        </>
      );
    }
    return (
      <>
        <span className="m-3 fs-6 badge bg-danger">
          {point}
          {' '}
        </span>
        <span className="fs-3">😢</span>
        <figure>
          <blockquote>
            <p className=" bg-secondary text-white rounded">
              “Jika salah,
              {' '}
              <i>perbaiki</i>
              {' '}
              , jika gagal
              {' '}
              <i>coba lagi</i>
              {' '}
              .
              Akan tetapi, jika kamu menyerah, maka semuanya akan selesai.“
            </p>
          </blockquote>
        </figure>
      </>
    );
  };
  return (
    <>
      <Layout pageTitle="Game RockPaperScissors">
        {/* MODAL END GAME */}
        <Modal
          show={show}
          onHide={() => handleModal()}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>Game Rock Paper Scissors</Modal.Header>
          <Modal.Body>
            <center>
              Point anda
              {' '}
              {cekHasil(point)}
            </center>
            <br />
            silahkan tekan tombol leaderboard untuk melihat urutan anda!😀
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={() => handleModal(false)}>Close</Button> */}
            <Link href="/gamelist" passHref>
              <Button variant="success" onClick={tambahDataGame}>
                Leaderboard
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>

        {/* MODAL ROUND */}
        <Modal show={showRound} onHide={() => handleModalRound()}>
          <Modal.Header closeButton>Game Rock Paper Scissors</Modal.Header>
          <Modal.Body>
            {/* Anda telah bermain di ronde {round} 😀 <br /> */}
            <ProgressBar
              animated
              variant="success"
              now={round}
              label={`ronde ke-${round} `}
              max={3}
            />
            <center>
              Point anda
              {' '}
              <span className=" m-3 fs-6 badge bg-success">{point}</span>
              {' '}
              <br />
            </center>
            tekan tombol reset untuk bermain di ronde selanjutnya...
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={() => handleModalRound(false)}>Close</Button> */}
            {/* <Link href="/gameleaderboard"> */}
            <Button
              variant="success"
              onClick={() => handleModalRound(false)}
              // onClick={resetRound}
            >
              Ronde selanjutnya
            </Button>
            {/* </Link> */}
          </Modal.Footer>
        </Modal>

        <div className={style.body1}>
          <div className={`${style.game} container`}>
            <div className="pt-4 row justify-content-md-center">
              <div className="text-center col-md-5 col-5">
                <h1 className="fw-bold">YOU</h1>
              </div>
              <div className="col-md-2 col-2" />
              <div className="text-center col-md-5 col-5">
                <h1 className="fw-bold">COM</h1>
              </div>
            </div>
            <div className="mt-3 text-center row justify-content-md-center">
              <div className="col-md-5 col-5" id="players">
                {arr.map((item) => (
                  <div
                    className="card-rps"
                    onClick={() => gamePlay(item.value)}
                    key={item.value}
                  >
                    <img
                      src={item.img}
                      alt="player"
                      width="90px"
                      height="90px"
                      className={`${style.imgrps}`}
                      value="batu"
                      data-anijs="if: click, do: zoomIn animated, to: #output"
                    />
                  </div>
                ))}
              </div>
              <div
                className="mt-3 col-md-2 col-2 align-self-center"
                id="output"
              >
                <div className={style.vs}>
                  <h1>VS</h1>
                </div>
                <div
                  className={`menang ${style.result} visually-hidden custom-animation`}
                >
                  <h1 className="">PLAYER WIN</h1>
                </div>
                <div
                  className={`kalah visually-hidden ${style.result} custom-animation`}
                >
                  <h1>COM WIN</h1>
                </div>
                <div
                  className={`seri visually-hidden ${style.result} custom-animation`}
                >
                  <h1>DRAW</h1>
                </div>
              </div>
              <div className="col-md-5 col-5" id="coms">
                {arr.map((item) => (
                  <div
                    className="card-rps"
                    onClick={() => gamePlay(item.value)}
                    key={item.value}
                  >
                    <img
                      src={item.img}
                      alt="batu"
                      width="90px"
                      height="90px"
                      className={`${style.imgrps}`}
                      value="batu"
                      data-anijs="if: click, do: zoomIn animated, to: #output"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center row justify-content-center">
              <div className="col-12" id="btnReset">
                <img
                  src={refresh.src}
                  alt="refresh"
                  width="75px"
                  height="75px"
                  className={`p-3 ${style.btnreset}`}
                  onClick={reset}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
