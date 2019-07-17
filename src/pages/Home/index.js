import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { request } from './../../utils/request';
import Title from './../../components/Title';
import styles from './Home.css';
import ShipmentList from './components/ShipmentList';

export const TransportIcon = () => <span className={classNames(styles.transport_icon, "flaticon-fast-forward-media-control-button")}/>

const Search = ({ searchKey, setSearchKey }) => (
  <div className={styles.search}>
    <span className={classNames(styles.search_key, "flaticon-search")}></span>
    <input
      type="text"
      value={searchKey}
      className={styles.search_input}
      onChange={setSearchKey}
      placeholder="Search"
    />
  </div>
);

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

  componentDidMount(){
    const { currentPage, totalEntries } = this.state;
    request(`/rest/shipments?_page=${currentPage}&_limit=${this.totalEntries}`)
      .then(r => {
        console.log('Response', r);
        this.setState({ shipments: r.response, totalCount: r.totalCount })
      });
  };

  static getDerivedStateFromProps(props, state) {
    const { location: { pathname }  } = props;
    const urlSplit = pathname.split('/');
    if ( urlSplit[urlSplit.length - 1] !== state.shipmentId ) {
      console.log('asd', urlSplit[urlSplit.length - 1]);
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
          <Search searchKey={this.state.searchKey} setSearchKey={this.setSearchKey} />
          { this.state.shipments && this.state.shipments.length > 0 &&
            <ShipmentList
              shipmentId={this.state.shipmentId}
              searchKey={this.state.searchKey}
              shipments={this.state.shipments}
              currentPage={this.state.currentPage}
              totalEntries={this.totalEntries}
              url={this.props.match.url}
            />
          }
        </div>
      </div>
    )
  }
};

export default Home;