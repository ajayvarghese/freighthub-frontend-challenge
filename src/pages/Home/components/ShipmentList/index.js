import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import styles from './ShipmentList.css';
import { Link, Route } from 'react-router-dom';
import Shipment from './../../../Shipment';
import Pill from './../../../../components/Pill';
import ContentEditable from '../../../../components/ContentEditable';
import { TransportIcon } from './../../index';
import { request } from './../../../../utils/request';
import icons from './../../../../constants/icons';

const SortIcon = ({ sortCondition, sortOrder }) => (
  <span className={classNames(
    styles.sort_ico, {
      [styles[sortOrder]] : sortCondition
    }
  )}/>
);

class ShipmentList extends Component {
  state = {
    sortKey: null,
    sortOrder: ''
  }

  tableHeaders = [
    { label: 'ID', key: 'id', sort: true },
    { label: 'Name', key: 'name', sort: true },
    { label: 'Mode', key: 'mode', sort: true },
    { label: 'Status', key: 'status', sort: true },
    { label: 'Origin', key: 'origin', sort: true },
    { label: '', sort: false },
    { label: 'Destination', key: 'destination', sort: true },
  ]

  static propTypes = {
    shipments: PropTypes.instanceOf(Array),
    currentPage: PropTypes.number,
    totalEntries: PropTypes.number,
    searchKey: PropTypes.string,
    shipmentId: PropTypes.string,
    totalCount: PropTypes.number,
  }

  static defaultProps = {
    shipments: [],
    currentPage: 0,
    totalEntries: 10,
    searchKey: '',
    shipmentId: null,
    totalCount: 0
  }

  setSortedKey = (sortKey) => {
    let sortOrder = 'asc';
    if(this.state.sortKey === sortKey) {
       if (this.state.sortOrder === 'asc') {
        sortOrder = 'desc';
       } else {
        sortOrder = 'asc';
       }
    }
    this.setState({
      sortKey,
      sortOrder,
    });
  }

  sort = (list) => {
    const { sortOrder, sortKey } = this.state;
    return list.sort(function(b, a){
      if(a[sortKey] < b[sortKey]) { return sortOrder === 'asc' ?  1 : -1; }
      if(a[sortKey] > b[sortKey]) { return sortOrder === 'asc' ? -1 : 1 ; }
      return 0;
  })
  }

  formatShipments = () => {
    const { sortOrder } = this.state;
    const { shipments, searchKey } = this.props;
    const filteredList = shipments.filter(shipment => shipment.id.includes(searchKey));
    return sortOrder ? this.sort(filteredList) : filteredList
  }

  changeNameHandler = (editedShipmentId, value) => {
    const editedShipment = this.props.shipments.find(({ id }) => id === editedShipmentId);
    if(editedShipment && value !== editedShipment.name) {
      const { id, ...editedShipmentDetails } = editedShipment;
      const requestBody = { ...editedShipmentDetails, name: value };
      request(`/rest/shipments/${editedShipmentId}`, {
        method: "PUT",
        body: requestBody,
      }).then(r => {
        if(r.status === 200) {
          alert('Name Changed Successfully');
        }
      });
    }
  }

  render() {
    const { currentPage, totalEntries, url, shipmentId,
      totalCount, setCurrentPage } = this.props;
    return (
      <div className={styles.wrapper}>
        <Table size="small">
          <TableHead>
            <TableRow>
            {this.tableHeaders.map( ({ label, key, sort }, index) => (
              <TableCell
                key={key + index}
                className={sort ? styles.cell : ''}
                onClick={sort ? () => this.setSortedKey(key) : (f) => f }
              >
                { label }
                { sort && <SortIcon
                  sortCondition={this.state.sortKey === key}
                  sortOrder={this.state.sortOrder}
                />}
              </TableCell>
            ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.formatShipments()
              .map(row => (
              <Fragment key={row.id}>
                <TableRow
                  className={classNames({
                    [styles.clicked_cell]: shipmentId === row.id
                  })}
                >
                  <TableCell className={styles.cell}>
                    <Link to={`/${row.id}`}>{row.id}</Link>
                  </TableCell>
                  <TableCell className={styles.cell}>
                    <ContentEditable
                      value={row.name}
                      onChange={(value) => this.changeNameHandler(row.id, value)}
                    />
                  </TableCell>
                  <TableCell className={styles.cell}>
                    <span className={styles.mode}>
                      <span className={classNames(styles.mode_icon, icons[row.mode])}/>
                      {row.mode}
                    </span>
                  </TableCell>
                  <TableCell className={styles.cell}>
                    <Pill type={row.status.toLowerCase()}>{row.status}</Pill>
                  </TableCell>
                  <TableCell className={styles.cell}>{row.origin}</TableCell>
                  <TableCell className={styles.transport_cell}><TransportIcon /></TableCell>
                <TableCell className={styles.cell}>{row.destination}</TableCell>
                </TableRow>
                {  shipmentId === row.id && <TableRow>
                  <TableCell colSpan={9} className={styles.expanded_view}>
                    <Route
                      path={`/:id`}
                      component={Shipment}
                    />
                  </TableCell>
                </TableRow> }
              </Fragment>
            ))}
            <TablePagination
              page={currentPage}
              rowsPerPage={totalEntries}
              count={totalCount}
              rowsPerPageOptions={[10]}
              onChangePage={(f, pageNumber) => {
                console.log(f, pageNumber);
                setCurrentPage(pageNumber);
              }}
            />
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default ShipmentList;