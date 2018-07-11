import React, { Component } from 'react';
import { getCharities } from '../../queries/charityQueries';
import Pagination from "react-js-pagination";
import CharityCard from './CharityCard.js';

class CharityModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      charities:[]
    };
  }
 
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  async componentWillMount () {
    const charities = await getCharities()
    this.setState({ charities: charities });
  }



  render() {

    return (
      <div>
        <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Charities</h1>
          <p className="lead text-muted">Learn about different charities around the U.S.</p>
        </div>
      </section>

      <div className="album py-5 bg-dark">
        <div className="container">

          <div className="row">
            {this.state.charities.map((dynamicCharity, i) => <CharityCard 
                  key = {i} charityInfo = {dynamicCharity}/>)}
          </div>
          </div>
          </div>
          


    <div style={{display: 'flex', justifyContent: 'center'}}>
    <Pagination
      hideNavigation
      pageRangeDisplayed={10}
      activePage={this.state.activePage}
      itemsCountPerPage={10}
      totalItemsCount={200}
      onChange={this.handlePageChange}
    />
    </div>
    </div>

    );

  }
}

export default CharityModel;   