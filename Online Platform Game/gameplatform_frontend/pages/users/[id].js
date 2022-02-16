/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import Layout from '../../components/Layout';
import style from '../../styles/profilecard.module.css';
import firebase from '../../config/firebase';
import service from '../../services/service';
import loadingimg from '../../public/image/loadingrps.gif';

export default function usergameprofile() {
  const [dataProfile, setDataProfile] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState(false);
  // const [idDetail, setIdDetail] = useState('');
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState('');
  const router = useRouter();
  // console.log(router.query.id);
  //   useEffect(() => {
  //     const { id } = router.query;
  //     // console.log({ id });
  //     setIdDetail({ id });
  //   });
  //   setIdDetail(router.query.id);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (!user) {
        router.replace('/auth/login');
      } else {
        // setUserId({ id: user.uid });
        // setUserId();
        // const { id } = router.query;
        service
          .getProfile(router.query.id)
          .then((res) => {
            // console.log(res.data.data);
            // console.log('profile ');
            // console.log(res);
            // const data1 = res.json();
            setDataProfile(res.data.data);

            // setDataProfile(data1);
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
          });
        service
          .scoreNavbar(router.query.id)
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
  //   console.log(dataProfile);

  // eslint-disable-next-line no-unused-vars
  const handleModal = (show) => {
    setShow(show);
  };
  return (
    <>
      <Layout pageTitle="User Profile">
        <div className={`${style.background} d-flex justify-content-center`}>
          {/* <div class="container mt-4 mb-4 p-3 d-flex justify-content-center "> */}
          <div className="mt-4 mb-4 p-3 align-self-center d-flex align-items-center m-auto ">
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
                  <button type="button" className="btn btn-secondary">
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
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <span className={style.idd1}>{dataProfile.id}</span>
                  </div>
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
