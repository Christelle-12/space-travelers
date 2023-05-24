import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets, reserveRocket, cancelReserve } from '../../Redux/Rockets/RocketsSlice';
import RocketCard from './Rocketcards';

const Rocket = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets.data);
  const loading = useSelector((state) => state.rockets.loading);
  const isFetch = useSelector((state) => state.rockets.isFetch);

  useEffect(() => {
    if (!isFetch) {
      dispatch(fetchRockets());
    }
  }, [dispatch, isFetch]);

  const handleReserve = (id) => {
    dispatch(reserveRocket(id));
  };

  const handleCancelReserve = (id) => {
    dispatch(cancelReserve(id));
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {rockets.map((rocket) => (
            <RocketCard
              key={rocket.id}
              rocket={rocket}
              onReserve={handleReserve}
              onCancelReserve={handleCancelReserve}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Rocket;
