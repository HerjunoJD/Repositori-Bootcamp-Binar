import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import Layout from '../components/Layout';
import firebase from '../config/firebase';
import service from '../services/service';

const GameLeaderboard = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(2);
  const [totalPage, setTotalPage] = useState(0);
  const [dataLeaderboard, setDataLeaderboard] = useState([]);

  useEffect(async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.replace('/auth/login');
      }
      service
        .showLeaderboard(1)
        .then((res) => {
          // console.log(res.data);
          // setDataLeaderboard(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
      getAll(page, limit);
    });
  }, []);

  const getAll = (pageparams, limitparams) => {
    service.leaderboardPagi(pageparams, limitparams).then((res) => {
      // console.log(res.data);
      setDataLeaderboard(res.data.data);
      setPage(pageparams);
      setTotalPage(res.data.pageCount);
    });
  };

  const renderPagination = () => {
    const arr = new Array(4).fill('');
    // console.log(arr);
    // <PaginationCustom action={getAll}
    return (
      <Pagination>
        {arr.map((item, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === page}
            onClick={() => getAll(index + 1, limit)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    );
  };

  const active = 1;
  const items = [];
  for (let number = 1; number <= totalPage; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  const exportPDF = () => {
    // console.log('Pdf Eksport Here!');
  };
  return (
    <Layout pageTitle="Game Leaderboard">
      <div className=" bg-black pt-4 vh-100">
        <div
          className="container bg-black "
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1 className="text-uppercase text-md-center">
            Leaderboard Rock-Paper-Scissors
          </h1>
          <div
            className=" d-flex justify-content-end "
            style={{ marginBottom: '-16px' }}
          >
            <button
              type="button"
              className="btn btn-warning fw-bold"
              onClick={exportPDF}
            >
              Export Pdf
            </button>
          </div>
          {/* TABLE */}
          <Table
            striped
            bordered
            hover
            variant="dark"
            className="mt-4 text-center"
          >
            <thead>
              <tr>
                <th>Username</th>
                <th>Point</th>
                <th>Total Play</th>
                <th>Last played</th>
              </tr>
            </thead>
            <tbody>
              {dataLeaderboard.map((item) => (
                <tr key={item.id}>
                  <td
                    onClick={() => router.push(`/users/${item.id_user_game}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.user.username}
                  </td>
                  <td>{item.point}</td>
                  <td>{item.total_play}</td>
                  <td>{moment(item.updatedAt).format('DD/MM/YYYY')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Pagination>{items}</Pagination> */}

          {renderPagination()}
          {/* TABLE CLOSE */}
        </div>
      </div>
    </Layout>
  );
};

export default GameLeaderboard;
