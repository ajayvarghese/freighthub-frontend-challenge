import React from 'react';
import classNames from 'classnames';
import styles from "./CargoList.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Field from '././../../../../components/Field';

const CargoList = ({ cargoList, services }) => (
  <div className={styles.wrapper}>
    <div className={classNames(styles.list, styles.cargo_list)}>
      <h3 className={styles.header}>CargoList</h3>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={styles.cell}>Type</TableCell>
            <TableCell className={styles.cell}>Description</TableCell>
            <TableCell className={styles.cell}>Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cargoList.map(cargo => (
            <TableRow key={`Services-${cargo.type}`}>
              <TableCell className={styles.cell}>{cargo.type}</TableCell>
              <TableCell className={styles.cell}>{cargo.description}</TableCell>
              <TableCell className={styles.cell}>{cargo.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <div className={classNames(styles.list, styles.services)}>
      <h3 className={styles.header}>Services</h3>
      <div className={styles.field_wrapper}>
        {services.map((service, index) =>
          <Field
            key={`Services-${service.type}-${index}`}
            className={styles.field}
            label={service.type}
            value={service.value || '-'}
          />)
        }
      </div>
    </div>
  </div>
);

export default CargoList;