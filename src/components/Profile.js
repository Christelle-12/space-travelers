import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { leaveMission } from '../Redux/Missions/missionsSlice';
import styles from '../css/missionstable.module.css';

const Profile = () => {
  const missionsData = useSelector((state) => state.missions.data);
  const reservedMissions = missionsData.filter((each) => each.reserved === true);

  const dispatch = useDispatch();

  return (
    <div>
      <table className={styles.profileTable}>
        <tr>
          <th>My Missions</th>
        </tr>
        {reservedMissions.length < 1
          ? (
            <tr>
              <td className={styles.grayed}>
                No missions
                <NavLink to="/mission">
                  <button className={styles.join} type="button">
                    Join A mission
                  </button>
                </NavLink>
              </td>
            </tr>
          )
          : reservedMissions.map((res) => (
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
          ))}
      </table>

    </div>
  );
};

export default Profile;
