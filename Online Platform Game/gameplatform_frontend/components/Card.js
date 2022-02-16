import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cardStyles from '../styles/Card.module.css';
import supermario from '../public/image/gamelist/supermario.jpeg';
import dota2 from '../public/image/gamelist/dota2.jpeg';
import valorant from '../public/image/gamelist/valorant.jpeg';
import mobilelegends from '../public/image/gamelist/mobilelegends.jpeg';
import watchdogs from '../public/image/gamelist/watchdogs.jpeg';
import pubg from '../public/image/gamelist/pubg.jpeg';
import freefire from '../public/image/gamelist/ff.jpeg';
import rps from '../public/image/gamelist/rockscissorpaper.jpeg';

const Card = ({ userData, message }) => {
  const games = [
    {
      id: 1,
      title: 'Super Mario',
      image: supermario,
    },
    { id: 2, title: 'DOTA 2', image: dota2 },
    {
      id: 3,
      title: 'Valorant',
      image: valorant,
    },
    {
      id: 4,
      title: 'Mobile Legends',
      image: mobilelegends,
    },
    {
      id: 5,
      title: 'Watch Dogs',
      image: watchdogs,
    },
    { id: 6, title: 'PUBG', image: pubg },
    { id: 7, title: 'Free Fire', image: freefire },
  ];
  return (
    <div className=" bg-black" data-testid="card">
      {/* <div className=" "></div> */}
      <div className={`${cardStyles.available} `}>
        <h1 data-testid="title1">AVAILABLE</h1>
      </div>

      <div className={cardStyles.cardAvailable}>
        <div className={`${cardStyles.availableImage} position-relative`}>
          <span
            className="position-absolute  top-0 start-50 translate-middle-x badge rounded-pill py-2 px-4 bg-light text-dark"
            style={{ zIndex: '99' }}
          >
            {message}
          </span>
          <Link href="/gamedetail" passHref>
            <Image src={rps} height="250px" width="150px" alt="" data-testid="cardLink" />
          </Link>
          {userData?.total_play > 0 && (
            <div className={cardStyles.gameInfo}>
              <p className={`${cardStyles.gameInfoItem} ${cardStyles.tooltip}`}>
                {userData.total_play}
                X
              </p>
              <p className={cardStyles.gameInfoItem}>
                {' '}
                {userData.point}
              </p>
            </div>
          )}
        </div>
        <div className={cardStyles.availableTitle}>
          <h3 className=" fs-5">Rock-Scissor-Paper</h3>
        </div>
      </div>
      <div className={cardStyles.comingsoon}>
        <h1 data-testid="title2">COMING SOON</h1>
      </div>
      <div className={cardStyles.cardRow}>
        {games.map((game) => (
          <div className={cardStyles.cardContainer} key={game.id}>
            <div className={cardStyles.imageContainer}>
              <Image src={game.image} height="250px" width="150px" alt="" />
            </div>
            <div className={cardStyles.cardTitle}>
              <h3 className=" fs-6">{game.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
