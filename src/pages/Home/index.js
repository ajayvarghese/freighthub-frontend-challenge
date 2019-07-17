import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { request } from './../../utils/request';
import Title from './../../components/Title';
import Search from './../../components/Search';
import styles from './Home.css';
import ShipmentList from './components/ShipmentList';
import icons from './../../constants/icons';

export const TransportIcon = () =>
  <span className={classNames(styles.transport_icon, icons.transport)}/>

class Home extends Component {
  totalEntries = 20;
  state = {
    currentPage: 0,
    shipments: [],
    shipmentId: null,
    searchKey: '',
    totalCount: 0,
  }

  setSearchKey = (e) => {
    this.setState({
      searchKey: e.target.value,
    })
  }

  setCurrentPage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber
    })
  }

  fetchShipments = () => {
    const { currentPage } = this.state;
    request(`/rest/shipments?_page=${Number(currentPage + 1)}&_limit=${this.totalEntries}`)
      .then(r => {
        this.setState({
          shipments: r.response,
          totalCount: Number(r.totalCount)
        })
      });
  } 

  componentDidUpdate(prevProps, prevState){
    if(prevState.currentPage !== this.state.currentPage){
      this.fetchShipments();
    }
  }

  componentDidMount(){
    this.fetchShipments();
  };

  static getDerivedStateFromProps(props, state) {
    const { location: { pathname }  } = props;
    const urlSplit = pathname.split('/');
    if ( urlSplit[urlSplit.length - 1] !== state.shipmentId ) {
      return {
        shipmentId: urlSplit[urlSplit.length - 1]
      };
    }
    return {};
  };

  render() {
    return (
      <div className={ styles.wrapper }>
        <Title>Shipment List</Title>
        <div className={classNames(styles.content, "layout-container")}>
          <Search
            searchKey={this.state.searchKey}
            setSearchKey={this.setSearchKey}
          />
          { this.state.shipments && this.state.shipments.length > 0 &&
            <ShipmentList
              shipmentId={this.state.shipmentId}
              searchKey={this.state.searchKey}
              shipments={this.state.shipments}
              currentPage={this.state.currentPage}
              totalEntries={this.totalEntries}
              totalCount={this.state.totalCount}
              url={this.props.match.url}
              setCurrentPage={this.setCurrentPage}
            />
          }
        </div>
      </div>
    )
  }
};

export default Home;