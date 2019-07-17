import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Shipment.css';
import Title from './../../components/Title';
import { request } from './../../utils/request';
import ShipmentDetails from './components/ShipmentDetails';
import CargoList from './components/CargoList';

class Shipment extends Component {
  state = {
    shipmentDetails: null,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    console.log('ID', id);
    request(`/rest/shipments/${id}`)
      .then(r => this.setState({ shipmentDetails: r }));
  }
  render() {
    const { shipmentDetails } = this.state;
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.header}>
          <span className={classNames(styles.shipment_icon, "flaticon-tracking")} />
          Shipment Details
        </h2>
        {this.state.shipmentDetails &&
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
}

export default Shipment;