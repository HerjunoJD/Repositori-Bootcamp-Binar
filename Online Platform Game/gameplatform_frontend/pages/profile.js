/* eslint-disable react/jsx-key */
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeAuth } from '../utils/auth';

const profile = (props) => {
  const { players, addData } = props;
  useEffect(() => {
    // console.log(getAuth());
    // console.log(players);
  }, []);
  const router = useRouter();
  const logout = () => {
    removeAuth();
    router.replace('/auth/login');
  };

  useEffect(() => {
    // console.log(players);
  }, [players]);

  const tambahData = () => {
    // console.log('jalan');
    const tambahdata = {
      name: 'juno',
      point: 20,
    };
    addData(tambahdata);
  };
  return (
    <div>
      <h1>profile</h1>
      <button type="button" onClick={logout}>Log Out</button>
      <button type="button" onClick={tambahData}>Tambah</button>

      {players.map((item) => <div>{item.name}</div>)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  players: state.playersreducer.players,
});

const mapDispatchToProps = (dispatch) => ({
  addData: (data) => dispatch({ type: 'ADD', payload: data }),
  // updateLoading: (data)
});

export default connect(mapStateToProps, mapDispatchToProps)(profile);
