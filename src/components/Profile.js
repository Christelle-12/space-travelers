import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { leaveMission } from '../Redux/Missions/missionsSlice';
import styles from '../css/missionstable.module.css';
import { cancelReserve } from '../Redux/Rockets/RocketsSlice';

const Profile = () => {
  const missionsData = useSelector((state) => state.missions.data);
  const reservedMissions = missionsData.filter((each) => each.reserved === true);
  const rocketsData = useSelector((state) => state.rockets.data);
  const reservedRockets = rocketsData.filter((each) => each.reserved === true);

  const dispatch = useDispatch();

  return (
    <div>
      <table className={styles.profileTable}>
        <tbody>
          <tr>
            <th>My Missions</th>
          </tr>
          {reservedMissions.length < 1 ? (
            <tr>
              <td className={styles.grayed}>
                No missions
                <Link to="/mission">
                  <button className={styles.join} type="button">
                    Join A mission
                  </button>
                </Link>
              </td>
            </tr>
          ) : (
            reservedMissions.map((res) => (
              <tr key={res.id}>
                <td className={styles.tableCell}>
                  {res.name}
                  <button
                    className={styles.leave}
                    type="button"
                    onClick={() => dispatch(leaveMission(res.id))}
                  >
                    Leave Mission
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ul>
        <li>
          <h1>My Rockets</h1>
        </li>
        {(() => {
          if (reservedRockets.length < 1) {
            return (
              <li>
                <span>
                  No rockets reserved
                  <Link to="/">
                    <button type="button">
                      Reserve rocket
                    </button>
                  </Link>
                </span>
              </li>
            );
          }
          return reservedRockets.map((response) => (
            <li key={response.id}>
              <p>{response.name}</p>
              <button onClick={() => dispatch(cancelReserve(response.id))} type="button">
                Cancel Reservation
              </button>
            </li>
          ));
        })()}
      </ul>

    </div>
  );
};

export default Profile;
