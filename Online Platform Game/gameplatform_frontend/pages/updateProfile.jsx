/* eslint-disable camelcase */
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody } from 'reactstrap';
import { Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import Layout from '../components/Layout';
import firebase from '../config/firebase';
import service from '../services/service';
import styles from '../styles/update.module.css';

const updateProfile = () => {
  const [dataProfile, setDataProfile] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  useEffect(() => {
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
            // console.log(res);
            setDataProfile(res.data.data);
          })
          .catch((err) => {
            // console.log(err);
          });
        // console.log('Ada user nih');
        // console.log(userId);
      }
    });
  }, []);
  // let dataP = { id: userId };
  // console.log(dataProfile);

  const SignupSchema = Yup.object().shape({
    nama_lengkap: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    alamat: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    nomor_telepon: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only number')
      .min(6, 'Minimal 6 digits')
      .max(14, 'Maximal 14 digits')
      .required('Required'),
    tanggal_lahir: Yup.date().required('Required'),
  });
  const {
    id,
    nama_lengkap,
    alamat,
    nomor_telepon,
    tanggal_lahir,
    // profile_picture,
  } = dataProfile;
  // console.log(tanggal_lahir);

  const tanggalCustom = moment(tanggal_lahir).format('DD/MM/YYYY');
  // console.log(hehehe);
  const dataForm = {
    id,
    nama_lengkap,
    tanggal_lahir: tanggalCustom,
    alamat,
    nomor_telepon,
  };
  // console.log(dataForm);
  const handleModal = (show) => {
    setShowModal(show);
  };
  return (
    <Layout pageTitle="Update Profile">
      <Modal show={showModal} onHide={() => handleModal()}>
        <Modal.Header closeButton>EDIT PROFILE</Modal.Header>
        <Modal.Body>
          {/* Anda telah bermain di ronde {round}  <br /> */}
          <center>Data Berhasil di Update!😀</center>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={() => handleModalRound(false)}>Close</Button> */}
          {/* <Link href="/gameleaderboard"> */}
          <Link href="/home" passHref>
            <Button variant="success">Home</Button>
          </Link>
          {/* </Link> */}
        </Modal.Footer>
      </Modal>
      {/* <Navbars /> */}
      <div className={styles.UpdateProfile}>
        <div className={styles.container}>
          <Card
            className="bg-dark text-white"
            style={{
              width: '50rem',
              height: '25rem',
              borderRadius: '28px',
              marginTop: '100px',
            }}
          >
            <CardBody
              style={{
                paddingLeft: '40px',
                paddingRight: '40px',
                paddingTop: '40px',
              }}
            >
              <p
                className="paragrap d-flex justify-content-center"
                style={{ fontSize: '20px' }}
              >
                {' '}
                EDIT PROFILE
                {' '}
              </p>
              {/* <img src={profile_picture} alt="" /> */}
              <Formik
                enableReinitialize
                initialValues={dataForm}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  // same shape as initial values
                  // console.log(values);

                  service
                    .updateProfile(values)
                    .then((res) => {
                      // console.log(res);
                      setShowModal(true);
                    })
                    .catch((err) => {
                      // console.log(err);
                    });
                }}
              >
                {({ errors, touched }) => (
                  <Form style={{ marginTop: '50px' }}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group ">
                          <Field
                            name="nama_lengkap"
                            placeholder="Nama Lengkap"
                            className="form-control input-group-lg reg_name"
                            style={{
                              backgroundColor: '#212529',
                              color: 'white',
                              boxShadow: 'none',
                            }}
                            values="ssssssss"
                          />
                          {errors.nama_lengkap && touched.nama_lengkap ? (
                            <div className="text-danger">
                              {errors.nama_lengkap}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <Field
                            name="tanggal_lahir"
                            placeholder=""
                            className="form-control input-group-lg reg_name"
                            type="date"
                            style={{
                              backgroundColor: '#212529',
                              color: 'white',
                              boxShadow: 'none',
                            }}
                          />
                          {errors.tanggal_lahir && touched.tanggal_lahir ? (
                            <div className="text-danger">
                              {errors.tanggal_lahir}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-xs-6">
                        <label htmlFor="Alamat" className="sr-only" />

                        <Field
                          name="alamat"
                          placeholder="Alamat"
                          className="form-control input-group-lg reg_name"
                          style={{
                            backgroundColor: '#212529',
                            color: 'white',
                            boxShadow: 'none',
                          }}
                        />
                        {errors.alamat && touched.alamat ? (
                          <div className="text-danger">{errors.alamat}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-xs-6">
                        <label htmlFor="Nomor Telepon" className="sr-only" />

                        <Field
                          name="nomor_telepon"
                          placeholder="Nomor telepon"
                          className="form-control input-group-lg reg_name"
                          style={{
                            backgroundColor: '#212529',
                            color: 'white',
                            boxShadow: 'none',
                          }}
                        />
                        {errors.nomor_telepon && touched.nomor_telepon ? (
                          <div className="text-danger">
                            {errors.nomor_telepon}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div
                      className="d-flex justify-content-center"
                      style={{ paddingTop: '20px' }}
                    >
                      <button
                        type="submit"
                        className="btn btn-warning"
                        style={{
                          fontFamily: 'Open Sans, sans-serif ',
                          fontSize: '15px',
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default updateProfile;
