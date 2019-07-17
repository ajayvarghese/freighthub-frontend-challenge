import React, { Component, useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Shipment.css';
import { request } from './../../utils/request';
import ShipmentDetails from './components/ShipmentDetails';
import CargoList from './components/CargoList';
import icons from './../../constants/icons';

const Shipment = (props) => {
  const [shipmentDetails, setShipmentDetails] = useState(null);
  useEffect(() => {
    const { match: { params: { id } } } = props;
    request(`/rest/shipments/${id}`)
      .then(setShipmentDetails);
    return f => f;
  }, []);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>
        <span className={classNames(styles.shipment_icon, icons.shipment)} />
        Shipment Details
      </h2>
      {shipmentDetails &&
        <div className={styles.content}>
          <ShipmentDetails
            name={shipmentDetails.name}
            status={shipmentDetails.status}
            origin={shipmentDetails.origin}
            destination={shipmentDetails.destination}
            total={shipmentDetails.total}
            id={shipmentDetails.id}
            userId={shipmentDetails.userId}
            type={shipmentDetails.type}
          />
          { shipmentDetails.cargo && shipmentDetails.cargo.length > 0 &&
            <CargoList
              cargoList={shipmentDetails.cargo}
              services={shipmentDetails.services}
            />
          }
        </div>
      }
    </div>
  )
}

export default Shipment;