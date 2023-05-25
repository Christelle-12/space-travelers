import React from 'react';
import PropTypes from 'prop-types';
import styles from './CSS/Rocket.module.css';

const RocketCard = ({ rocket, onReserve, onCancelReserve }) => {
  const {
    id, name, description, more, reserved, flickrImages,
  } = rocket;

  return (
    <ul className={styles.ul}>
      <li className={styles.container}>
        <div className={styles.imgwrap}>
          <img src={flickrImages} alt={name} className={styles.image} />
        </div>
        <div className={styles.textdiv}>
          <h2 className={styles.titlecard}>{name}</h2>
          <div className={styles.descr}>
            {reserved && (
            <p>
              <span className={styles.reserved}>Reserved</span>
              {description}
            </p>
            )}
            {!reserved && (
            <p>
              {description}
            </p>
            )}
          </div>
          {reserved ? (
            <button onClick={() => onCancelReserve(id)} type="button" className={styles.cancelbut}>
              Cancel Reservation
            </button>
          ) : (
            <button onClick={() => onReserve(id)} type="button" className={styles.resbut}>
              Reserve Rocket
            </button>
          )}
          {more && <a href={more}>Learn More</a>}
        </div>
      </li>
    </ul>
  );
};

RocketCard.propTypes = {
  rocket: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    more: PropTypes.string,
    reserved: PropTypes.bool.isRequired,
    flickrImages: PropTypes.string.isRequired,
  }).isRequired,
  onReserve: PropTypes.func.isRequired,
  onCancelReserve: PropTypes.func.isRequired,
};

export default RocketCard;
