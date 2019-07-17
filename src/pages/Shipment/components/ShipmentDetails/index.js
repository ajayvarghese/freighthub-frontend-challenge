import React from 'react';
import classNames from 'classnames';
import styles from "./ShipmentDetails.css";
import Field from './../../../../components/Field';
import Pill from './../../../../components/Pill';
import { TransportIcon } from './../../../Home';


const ShipmentDetails = ({ name, status, origin, destination, total, id, userId, type }) => (
  <div className={styles.wrapper}>
    <div className={styles.field_wrapper}>
      <Field className={styles.field} label="Shipment ID" value={id} />
      <Field className={styles.field} label="User ID" value={userId} />
      <Field className={styles.field} label="Type" value={type} />
      <Field className={styles.field} label="Total" value={total} />
    </div>
    <div className={styles.field_wrapper}>
      <Field  className={styles.field} label="Name" value={name} />
      <Field className={classNames(styles.field, styles.location)}>
        <div className={styles.location_text}>
          <span className={styles.origin}>
            <span className={styles.origin_label}>ORIGIN</span>
              {origin}
          </span>
          <TransportIcon />
          <span className={styles.destination}>
            <span className={styles.destination_label}>DESTINATION</span>
              {destination}
            </span>
        </div>
      </Field>
    </div>
  </div>
);

export default ShipmentDetails;