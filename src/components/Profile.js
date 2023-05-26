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
    <div className={styles.flex}>
      <table className={styles.profileTable}>
        <tbody>
          <tr>
            <th>My Missions</th>
          </tr>
          {reservedMissions.length < 1 ? (
            <tr className={styles.row}>
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
              <tr key={res.id} className={styles.row}>
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
      <table className={styles.profileTable}>
        <tr>
          <th>My Rockets</th>
        </tr>
        {(() => {
          if (reservedRockets.length < 1) {
            return (
              <tr className={styles.row}>
                <td className={styles.grayed}>
                  No rockets reserved
                  <Link to="/">
                    <button type="button" className={`${styles.join} ${styles.profilebutton}`}>
                      Reserve rocket
                    </button>
                  </Link>
                </td>
              </tr>
            );
          }
          return reservedRockets.map((response) => (
            <tr key={response.id} className={styles.row}>
              <td className={styles.tableCell}>
                {response.name}
                <button onClick={() => dispatch(cancelReserve(response.id))} type="button" className={`${styles.leave} ${styles.profilebutton}`}>
                  {' '}
                  Cancel Reservation
                </button>
              </td>
            </tr>
          ));
        })()}
      </table>

    </div>
  );
};

export default Profile;
