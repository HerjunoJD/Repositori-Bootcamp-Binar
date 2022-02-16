import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import firebase from '../config/firebase';
import Card from '../components/Card';
import Layout from '../components/Layout';

const GameList = () => {
  const [data, setData] = useState();
  const [message, setMessage] = useState();
  // eslint-disable-next-line no-unused-vars
  const [dataLength, setDataLength] = useState();

  const router = useRouter();

  const getLeaderboardData = async (id) => {
    await axios
      .get(
        `https://tranquil-escarpment-07246.herokuapp.com/games/leaderboard/cekgame/${id}
      `,
      )
      .then((res) => {
        setData(res.data.data[0]);
        setDataLength(res.data.data.length);

        setMessage(res.data.message);
        // for (var i = 0; i < dataLength; i++) {
        //     var obj = res.data.data[i];
        //     let game = obj.game_id
        //     if (game === 1) {
        //       console.log(obj);
        //     }
        // }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.replace('/auth/login');
      }
      getLeaderboardData(user.uid);
    });
  }, []);
  // console.log(data);
  return (
    <Layout pageTitle="Game List">
      <div className="game-list">
        <Card userData={data} message={message} />
      </div>
    </Layout>
  );
};

export default GameList;
