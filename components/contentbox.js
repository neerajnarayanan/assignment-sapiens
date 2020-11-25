import React from 'react';

import styles from '../styles/ContentBoxStyles.module.css';


function Card(props) {

    const { launchYear, launchSuccess, missionIds, landSuccess, missionName, flightNumber, imageURL } = props

    const renderCardMeta = () => {
        return (
            <div className={styles.CustomCardDescMeta}>
                <div>Launch Year: <span>{launchYear}</span></div>
                <div>Successful Launch: <span>{launchSuccess}</span></div>
                <div>Successful Landing: <span>{landSuccess}</span> </div>
            </div>
        );
    }

    return (
        <div className={styles.CustomCardContainer}>
            <div ><img className={styles.CustomCardImg} src={imageURL} /></div>
            <div className={styles.CustomCardName}>
                {missionName} #{flightNumber}
            </div>
            <>
                Mission Ids :
              <ul>
                    {missionIds && missionIds.length > 0 && missionIds.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>

            </>
            {renderCardMeta()}
        </div>
    );
}

export default Card;
