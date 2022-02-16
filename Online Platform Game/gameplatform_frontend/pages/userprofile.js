/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import Layout from '../components/Layout';
import style from '../styles/profilecard.module.css';
import firebase from '../config/firebase';
import service from '../services/service';
import loadingimg from '../public/image/loadingrps.gif';

export default function userprofile() {
  const [dataProfile, setDataProfile] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState('');
  const router = useRouter();
  const [form, setForm] = useState();

  // console.log(loadingimg);
  useEffect(async () => {
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (!user) {
        router.replace('/auth/login');
      } else {
        // setUserId({ id: user.uid });
        // setUserId();
        service
          .getProfile(user.uid)
          .then((res) => {
            // console.log(res.data.data);
            // const data1 = res.json();
            setDataProfile(res.data.data);

            // setDataProfile(data1);
          })
          .catch((err) => {
            // console.log(err);
          });
        service
          .scoreNavbar(user.uid)
          .then((res) => {
            // console.log(res);
            setScore(res.data);
            // setBadge(res.data.badge);
            setLoading(false);
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
          });
        // console.log('Ada user nih');
        // console.log(userId);
        // console.log(dataProfile);
      }
    });
  }, []);
  // console.log(dataProfile);

  // var data = new FormData();

  const handleModal = (show) => {
    setShow(show);
  };
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(form);

    service
      .addProfilePicture(dataProfile.id, form)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
    // alert(JSON.stringify(form));
  };
  const handleFile = async () => {
    const formFileData = new FormData();

    formFileData.append('file', form.file);

    await axios({
      method: 'POST',
      url: `https://tranquil-escarpment-07246.herokuapp.com/multimedia/profic/${dataProfile.id}`,
      data: formFileData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <>
      <Layout pageTitle="User Profile">
        {/* <!-- Modal --> */}
        <Modal
          show={show}
          onHide={() => handleModal()}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>Upload new profile picture</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleFile}>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  name="file"
                  // value={form.file}
                  onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
                />
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-warning"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
        {/* <!-- CLOSE Modal --> */}

        <div className={`${style.background} d-flex justify-content-center`}>
          {/* <div class="container mt-4 mb-4 p-3 d-flex justify-content-center "> */}
          <div className="mt-4 mb-4 p-3 align-self-center d-flex align-items-center m-auto ">
            {/* {dataProfile.map((item) => { */}
            {loading ? (
              <>
                {/* <h1 className=" text-white">Loading...</h1> <br /> */}
                {/* <div> */}
                <img src={loadingimg.src} alt="Loading..." />
                {/* </div> */}
              </>
            ) : (
              <div
                className={`${style.card} p-4 position-relative`}
                key={dataProfile.id}
              >
                <span className="position-absolute  top-100 start-50 translate-middle badge rounded-pill py-2 px-4 bg-secondary">
                  Joined 
                  {' '}
                  {moment(dataProfile.updatedAt).format('DD/MM/YYYY')}
                </span>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill py-2 px-4 bg-warning text-dark">
                  {score.badge}
                </span>
                <div
                  className={`${style.image} d-flex flex-column justify-content-center align-items-center`}
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleModal(true)}
                  >
                    {dataProfile.profile_picture === null ? (
                      <>
                        <img
                          src="https://i.imgur.com/wvxPV9S.png"
                          height="100"
                          width="100"
                          alt=""
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={dataProfile.profile_picture}
                          height="100"
                          width="100"
                          alt=""
                        />
                      </>
                    )}
                  </button>
                  <span className={`${style.name} mt-2`}>
                    {dataProfile.nama_lengkap}
                  </span>
                  <span className={style.idd}>{dataProfile.email}</span>
                  <div className="d-flex ">
                    <span className=" text-white">{dataProfile.alamat}</span>
                  </div>
                  <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                    <span className={style.number}>
                      {score.point} 
                      {' '}
                      <span className={style.follow}>Point</span>
                    </span>
                  </div>

                  <div className="d-flex mt-2 mb-4">
                    <Link href="/updateProfile" passHref>
                      <button type="button" className={`${style.btn1} btn btn-dark`}>
                        Edit Profile
                      </button>
                    </Link>
                  </div>
                  {/* 
                <div className={`px-2 rounded mt-4 ${style.date}`}>
                  <span class={style.join}>Joined May,2021</span>
                </div> */}
                </div>
              </div>
            )}

            {/* })} */}
          </div>
        </div>
      </Layout>
    </>
  );
}
