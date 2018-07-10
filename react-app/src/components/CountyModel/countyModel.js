import React, { Component } from 'react';
import { getCharities } from '../../queries/charityQueries';
import Pagination from "react-js-pagination";
import CountyCard from './CountyCard.js'
class CountyModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
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
         <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">Counties</h1>
          <p class="lead text-muted">Look up any of the counties in the U.S. and find out information about local charities and poverty statistics</p>
        </div>
         </section>
         <div class="album py-5 bg-dark">
        <div class="container">

          <div class="row">
            <CountyCard />
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

export default CountyModel;   