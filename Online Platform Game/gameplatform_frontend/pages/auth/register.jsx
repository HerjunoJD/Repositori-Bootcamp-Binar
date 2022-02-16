import 'bootstrap/dist/css/bootstrap.min.css';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Image from 'next/image';
import firebase from '../../config/firebase';
import service from '../../services/service';

export default function register() {
  const [isLoadingButton, setLoadingButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        router.replace('/home');
      }
    });
  }, []);
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Min 6 character')
      .max(50, 'Too Long!')
      .required('Required'),
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

  return (
    <section className=" vh-100" style={{ backgroundColor: '#3785F2' }}>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="m-3 col-lg-12 col-xl-11">
            <div className="text-black card " style={{ borderRadius: '25px' }}>
              <div className="card-body ">
                <div className="mx-4 mb-3 d-flex justify-content-center mb-lg-4">
                  <div className="row justify-content-center">
                    <div className="order-2 col-md-10 col-lg-6 col-xl-5 order-lg-1">
                      <p className="mx-1 mt-2 mb-3 text-center text-black h1 fw-bold mx-md-4">
                        Sign up
                      </p>
                      {/* Form */}
                      <Formik
                        initialValues={{
                          username: '',
                          email: '',
                          password: '',
                          nama_lengkap: '',
                          alamat: '',
                          nomor_telepon: '',
                          tanggal_lahir: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                          // same shape as initial values
                          setLoadingButton(true);
                          firebase
                            .auth()
                            .createUserWithEmailAndPassword(
                              values.email,
                              values.password,
                            )
                            .then((res) => {
                              firebase
                                .auth()
                                .currentUser.sendEmailVerification()
                                .then(() => {
                                  const data = {
                                    id: res.user.uid,
                                    username: values.username,
                                    email: values.email,
                                    password: values.password,
                                    nama_lengkap: values.nama_lengkap,
                                    alamat: values.alamat,
                                    nomor_telepon: values.nomor_telepon,
                                    tanggal_lahir: values.tanggal_lahir,
                                  };
                                  // POST to API BACKEND
                                  service
                                    .registerApi(data)
                                    .then((res) => {
                                    })
                                    .catch((err) => {
                                    });

                                  // code here
                                  firebase.auth().signOut();
                                  alert(
                                    'Mohon verifikasi email anda terlebih dahulu!',
                                  );
                                  router.replace('/auth/login');
                                })
                                .catch((err) => {
                                  alert(err.message);
                                });
                            })
                            .catch((err) => {
                              alert(err.message);
                            });
                        }}
                      >
                        {({ errors, touched }) => (
                          <Form className="mx-1 mx-md-4">
                            <div className="flex-row mb-4 d-flex align-items-center">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                              <div className="mb-0 form-outline flex-fill">
                                <Field
                                  name="username"
                                  placeholder="Enter username"
                                  className="form-control"
                                />
                                {errors.username && touched.username ? (
                                  <div className="text-danger">
                                    {errors.username}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="flex-row mb-4 d-flex align-items-center">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                              <div className="mb-0 form-outline flex-fill">
                                {/* EMAIL  */}
                                <Field
                                  name="email"
                                  placeholder="youremail@mail.com"
                                  className="form-control"
                                />
                                {errors.email && touched.email ? (
                                  <div className="text-danger">
                                    {errors.email}
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            <div className="flex-row mb-4 d-flex align-items-center">
                              <i className="fas fa-lock fa-lg me-3 fa-fw" />
                              <div className="mb-0 form-outline flex-fill">
                                <Field
                                  name="password"
                                  placeholder="Enter password here"
                                  className="form-control"
                                  type="password"
                                />
                                {errors.password && touched.password ? (
                                  <div className="text-danger">
                                    {errors.password}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="flex-row mb-4 d-flex align-items-center">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                              <div className="mb-0 form-outline flex-fill">
                                <Field
                                  name="nama_lengkap"
                                  placeholder="Enter Fullname"
                                  className="form-control"
                                />
                                {errors.nama_lengkap && touched.nama_lengkap ? (
                                  <div className="text-danger">
                                    {errors.nama_lengkap}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="flex-row mb-4 d-flex align-items-center">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                              <div className="mb-0 form-outline flex-fill">
                                <Field
                                  name="alamat"
                                  placeholder="Enter Address"
                                  className="form-control"
                                />
                                {errors.alamat && touched.alamat ? (
                                  <div className="text-danger">
                                    {errors.alamat}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="flex-row mb-4 d-flex align-items-center">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                              <div className="mb-0 form-outline flex-fill">
                                <Field
                                  name="nomor_telepon"
                                  placeholder="Enter phone number"
                                  className="form-control"
                                />
                                {errors.nomor_telepon
                                && touched.nomor_telepon ? (
                                  <div className="text-danger">
                                    {errors.nomor_telepon}
                                  </div>
                                  ) : null}
                              </div>
                            </div>
                            <div className="flex-row mb-4 d-flex align-items-center">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                              <div className="mb-0 form-outline flex-fill">
                                <Field
                                  name="tanggal_lahir"
                                  type="date"
                                  placeholder="Enter date of birth"
                                  className="form-control"
                                />
                                {errors.tanggal_lahir
                                && touched.tanggal_lahir ? (
                                  <div className="text-danger">
                                    {errors.tanggal_lahir}
                                  </div>
                                  ) : null}
                                <p className="pt-1 mt-2 mb-0 small fw-bold text-black-50">
                                  Have account?
                                  {' '}
                                  <Link href="/auth/login">Login</Link>
                                </p>
                              </div>
                            </div>

                            <div className="mx-4 mb-3 d-flex justify-content-center mb-lg-4">
                              <button
                                disabled={isLoadingButton}
                                type="submit"
                                className="btn btn-primary btn-lg"
                              >
                                {isLoadingButton ? (
                                  <div
                                    className="spinner-border text-white spinner-border-sm me-2"
                                    role="status"
                                  />
                                ) : (
                                  <></>
                                )}
                                Register
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>

                    <div className="order-1 col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-lg-2">
                      <Image
                        src="/img/rps1.jpg"
                        className=" img-fluid"
                        // layout="responsive"
                        width={900}
                        height={600}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
