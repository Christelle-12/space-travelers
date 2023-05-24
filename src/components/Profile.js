import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from '../css/missionstable.module.css';

const Profile = () => {
  const missionsData = useSelector((state) => state.missions.data);
  const reservedMissions = missionsData.filter((each) => each.reserved === true);

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
                <button className={styles.join} type="button">
                  <NavLink to="/mission">
                    Join A mission
                  </NavLink>
                </button>
              </td>
            </tr>
          )
          : reservedMissions.map((res) => (
            <tr key={res.id}>
              <td className={styles.tableCell}>{res.name}</td>
            </tr>
          ))}
      </table>

    </div>
  );
};

export default Profile;
