import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Field, Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import firebase from '../../config/firebase';
import style from '../../styles/Login.module.css';

export default function login() {
  const [isLoadingButton, setLoadingButton] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // firebase cek
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/auth/login');
      }
    });
  }, []);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Min 6 character')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  return (
    <section className="vh-100" style={{ backgroundColor: '#fff' }}>
      <div className={`container-fluid ${style['h-custom']}`}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <Image
              src="/img/rps.png"
              className=" card-img"
              layout="responsive"
              width={1000}
              height={1000}
              alt="login-img"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                // same shape as initial values
                setLoadingButton(true);
                // setLoadingButton(true);
                firebase
                  .auth()
                  .signInWithEmailAndPassword(values.email, values.password)
                  .then((res) => {
                    // cek email  verified
                    if (res.user.emailVerified) {
                      router.replace('/home');
                    } else {
                      alert('Verifikasi email anda terlebih dahulu!');
                      setLoadingButton(false);
                      firebase.auth().signOut();
                    }
                  })
                  .catch((err) => {
                    alert(err.message);
                    setLoadingButton(false);
                  });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="flex-row d-flex align-items-center justify-content-center justify-content-lg-start">
                    <p className="mb-0 text-black lead fw-normal me-3">
                      Sign in with
                    </p>
                    <button
                      type="button"
                      className="mx-1 btn btn-primary btn-floating"
                    >
                      <i className="bi bi-facebook" />
                    </button>

                    <button
                      type="button"
                      className="mx-1 btn btn-primary btn-floating"
                    >
                      <i className="bi bi-google" />
                    </button>

                    <button
                      type="button"
                      className="mx-1 btn btn-primary btn-floating"
                    >
                      <i className="bi bi-github" />
                    </button>
                  </div>

                  <div
                    className={`${style.divider} d-flex align-items-center my-4`}
                  >
                    <p className="mx-3 mb-0 text-center fw-bold">Or</p>
                  </div>

                  {/* <!-- Email input --> */}
                  <div className="mb-4 form-outline">
                    <Field
                      name="email"
                      placeholder="youremail@mail.com"
                      className="form-control form-control-lg"
                      type="text"
                    />
                    {errors.email && touched.email ? (
                      <div className="text-danger">{errors.email}</div>
                    ) : null}
                  </div>

                  {/* <!-- Password input --> */}
                  <div className="mb-3 form-outline">
                    <Field
                      name="password"
                      placeholder="Enter password here"
                      className="form-control form-control-lg"
                      type="password"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-danger">{errors.password}</div>
                    ) : null}
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    {/* <!-- Checkbox --> */}
                    <div className="mb-0 form-check">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example3"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-body">
                      Forgot password?
                    </a>
                  </div>

                  <div className="pt-2 mt-4 text-center text-lg-start">
                    <button
                      disabled={isLoadingButton}
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    >
                      {isLoadingButton ? (
                        <div
                          className="spinner-border text-white spinner-border-sm me-2"
                          role="status"
                        />
                      ) : (
                        <></>
                      )}
                      Login
                    </button>
                    <p className="pt-1 mt-2 mb-0 small fw-bold text-black-50">
                      Don't have an account?
                      <Link href="/auth/register">Register</Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 text-center bg-primary bg-opacity-75 d-flex flex-column flex-md-row text-md-start justify-content-between px-xl-5">
        {/* <!-- Copyright --> */}
        <div className="mb-3 text-white mb-md-0">
          Copyright © 2021. All rights reserved.
        </div>
        {/* <!-- Copyright --> */}

        {/* <!-- Right --> */}
        <div>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-twitter" />
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-google" />
          </a>
          <a href="#!" className="text-white">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        {/* <!-- Right --> */}
      </div>
    </section>
  );
}
