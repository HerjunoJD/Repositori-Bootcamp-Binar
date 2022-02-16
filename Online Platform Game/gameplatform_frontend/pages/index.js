import React from 'react';
// import Navbar from "../../src/components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
// import { useRouter } from "next/router"
import Image from 'next/image';
import style from '../styles/Landingpage.module.css';
import scrollBtn from '../public/image/scroll.svg';
import rpsImg from '../public/image/rockpaperstrategy.jpg';
import switchLeft from '../public/image/switch-left.svg';
import switchRight from '../public/image/switch-right.svg';
import review1 from '../public/image/review-1.jpg';
import review2 from '../public/image/review-2.jpg';
import review3 from '../public/image/review-3.jpg';
import twitter from '../public/image/twitter.svg';
import twitter1 from '../public/image/twitter1.svg';
import newsteller from '../public/image/newsteller.png';
import facebook from '../public/image/facebook.svg';
import youtube from '../public/image/youtube.png';
import twitch from '../public/image/twitch.svg';
import Navbars from '../components/Navbar';

const landingpage = () => (
  <div>
    <Navbars />

    <header className={style.bg}>
      <div className="container">
        <div className="row align-items-center vh-100">
          <div className="text-center text-white  col-12 justify-content-center align-items-center">
            <h1 className={`${style.h1} text-uppercase`}>
              Play traditional game
            </h1>

            <h3>Experience new traditional game play</h3>
            <Link href="/auth/login" passHref>
              <button type="button" className={` btn ${style.btnplay}`}>PLAY NOW</button>
            </Link>
          </div>
          <div className="text-center">
            <a href="#games" className={`${style.btnstory} text-center`}>
              <Image src={scrollBtn} alt="" />
            </a>
          </div>
        </div>
      </div>
    </header>

    <section className={`${style.theGames}`} id="games">
      <div className="container">
        <div className="align-content-center row vh-100">
          <div className="text-white col-12 col-md-4">
            <h3>What's so special?</h3>
            <h1>The Games</h1>
          </div>
          <div className="col-12 col-md-8">
            <div
              id="carouselExampleIndicators"
              className="mt-5 carousel slide"
              data-ride="carousel"
            >
              <ol className={`${style.carouselindicators}`}>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                />
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                />
                <ol
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                />
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <Image src={rpsImg} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <Image src={rpsImg} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <Image src={rpsImg} className="d-block w-100" alt="..." />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <Image src={switchLeft} alt="" />
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <Image src={switchRight} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className={`${style.features}`}>
      <div className="container">
        <div className="row justify-content-end align-content-center vh-100">
          <div className="text-white col-12 col-sm-7 col-md-5">
            <h3 className="">What’s so special?</h3>
            <h1 className="text-uppercase">features</h1>
            <div className="mt-5">
              <ul>
                <li>TRADITIONAL GAMES</li>
                <p>
                  If you miss your childhood, we provide many traditional
                  games here
                </p>
                <li>GAMES SUIT</li>
                <li>TBD</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className={`${style.system}`}>
      <div className="container">
        <div className="row vh-100 align-content-center justify-content-start">
          <div className="col-12">
            <p className="text-center text-white">
              Can My Computer Run this game?
            </p>
          </div>
          <div className="text-white col-12 col-md-6">
            <h1 className="text-white text-uppercase text-system">
              system
              {' '}
              <br />
              requirements
            </h1>
            <div className="table-responsive">
              <table className="table text-white">
                <tbody>
                  <tr>
                    <td>
                      <h1>OS:</h1>
                      <h3>
                        Windows 7 64-bit only (No OSX support at this time)
                      </h3>
                    </td>
                    <td>
                      <h1>PROCESSOR:</h1>
                      <h3>
                        Intel Core 2 Duo @ 2.4 GHZ or AMD Athlon X2 @ 2.8 GHZ
                      </h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h1>MEMORY:</h1>
                      <h3>4 GB RAM</h3>
                    </td>
                    <td>
                      <h1>STORAGE:</h1>
                      <h3>8 GB available space</h3>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h1>GRAPHICS:</h1>
                      <h3>
                        NVIDIA GeForce GTX 660 2GB or AMD Radeon HD 7850 2GB
                        DirectX11 (Shader Model 5)
                      </h3>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className={style.topscore}>
      <div className="container vh-100">
        <div className="text-white row">
          <div className="col-md-6 col-12 align-self-center">
            <h1 className="text-uppercase text-system">TOP SCORES</h1>
            <h3>
              This top score from various games provided
              {' '}
              <br />
              on this platform
            </h3>
            <button type="button" className={`btn ${style.btnmore}`}>See More</button>
          </div>
          <div className="col-md-6 col-12 align-self-center">
            <div className="row justify-content-end">
              <div className="mt-2 col-md-11 col-12 d-inline-block">
                <div className={`${style.squarereview} d-block`}>
                  <div className={style.profilereview}>
                    <Image src={review1} className={style.imgscore} alt="" />

                    <div className={`${style.textprofile}`}>
                      <Image
                        src={twitter}
                        className={`${style.twitter} position-absolute`}
                        alt=""
                      />
                      <h2 className={style.title}>Evan Lahti</h2>
                      <p className={style.subtitle}>PC Gamer</p>
                    </div>
                  </div>
                  <p className={style.quote}>
                    “One of my gaming highlights of the year.”
                  </p>
                  <p className={style.date}>October 18, 2018</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-start">
              <div className="mt-2 col-md-11 col-12 d-inline-block">
                <div className={`${style.squarereview} d-block`}>
                  <div className={style.profilereview}>
                    <div className="img-score">
                      <Image src={review2} className={style.imgscore} alt="" />
                    </div>

                    <div className={`${style.textprofile}`}>
                      <Image
                        src={twitter}
                        className={`${style.twitter} position-absolute`}
                        alt=""
                      />
                      <h2 className={style.title}>Jada Griffin</h2>
                      <p className={style.subtitle}>Nerdreactor</p>
                    </div>
                  </div>
                  <p className={style.quote}>
                    “The next big thing in the world of streaming and survival
                    games.”
                  </p>
                  <p className={style.date}>December 21, 2018</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-end">
              <div className="mt-2 col-md-11 col-12 d-inline-block">
                <div className={`${style.squarereview} d-block`}>
                  <div className={style.profilereview}>
                    <Image src={review3} className={style.imgscore} alt="" />

                    <div className={style.textprofile}>
                      {/* <img
                          src={twitter}
                          className="position-absolute twitter"
                          alt=""
                        /> */}
                      <Image
                        src={twitter}
                        className={`${style.twitter} position-absolute`}
                        alt=""
                      />
                      <h2 className={style.title}>Aaron Williams</h2>
                      <p className={style.subtitle}>Uproxx</p>
                    </div>
                  </div>
                  <p className={style.qupte}>
                    “Snoop Dogg Playing The Wildly Entertaining ‘SOS’ Is
                    Ridiculous.”
                  </p>
                  <p className={style.date}>December 24, 2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className={style.newsteller}>
      <div className="container">
        <div className="row vh-100">
          <div className="col-md-5 col-12 align-self-center">
            <Image src={newsteller} alt="" />
          </div>
          <div className="col-md-7 col-12 align-self-center">
            <div className={`${style.textnews} text-white`}>
              <h3>
                Want to stay in
                {' '}
                <br />
                touch?
              </h3>
              <h1 className="text-uppercase">newsletter SUBSCRIBE</h1>
              <p>
                In order to start receiving our news, all you have to do is
                enter your email address. Everything else will be taken care
                of by us. We will send you emails containing information about
                game. We don’t spam.
              </p>
            </div>
            <div className={style.emailsubs}>
              <form>
                <div className="form-row align-items-center">
                  <div className={`${style.formgroup} col-auto`}>
                    {/* <label for="inlineFormInput">Your email address</label> */}
                    <input
                      type="text"
                      className="mb-2 form-control"
                      id="inlineFormInput"
                      placeholder="Your email address"
                      defaultValue="youremail@binar.co.id"
                    />
                  </div>

                  <div className="col-auto">
                    <button type="submit" className="mb-2 btn">
                      Subscribe now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer className={`${style.footer}`}>
      <div className="container">
        <div className="flex-wrap text-white  d-flex justify-content-end bd-highlight text-uppercase link-footer">
          <div className="p-2 f-text align-self-center">Main</div>
          <div className="p-2 f-text align-self-center">About</div>
          <div className="p-2 f-text align-self-center">Game Features</div>
          <div className="p-2 f-text align-self-center">
            System requirements
          </div>
          <div className="p-2 f-text align-self-center">quotes</div>
          <div className="ml-3 d-flex">
            <div className="p-2 f-icon align-self-center">
              <Image src={facebook} width="10px" alt="" />
            </div>
            <div className="p-2 f-icon align-self-center">
              <Image src={twitter1} width="20px" alt="" />
            </div>
            <div className="p-2 f-icon align-self-center">
              {/* <img
                  src={youtube}
                  style={{ marginBottom: "-10px" }}
                  alt=""
                  width="25px"
                /> */}
              <Image src={youtube} width="25px" style={{ marginBottom: '-10px' }} alt="" />
            </div>
            <div className="p-2 f-icon align-self-center">
              {/* <img src={twitch} alt="" width="20px" /> */}
              <Image src={twitch} width="25px" alt="" />
            </div>
          </div>
        </div>
        <hr />
        <div className="text-white d-flex justify-content-between">
          <div className="p-2 copyright">
            <p className="">© 2018 Your Games, Inc. All Rights Reserved</p>
          </div>

          <div className="p-2 text-right">
            <span>Privacy Policy | Terms of Services | Code of Conduct </span>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default landingpage;
