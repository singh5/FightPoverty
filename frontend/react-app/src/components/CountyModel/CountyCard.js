import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class CountyCard extends Component {
  


  render() {

    return (
    <div className="col-md-4">
              <div className="card mb-4 box-shadow">

                 <Link to={{pathname: '/counties/'+ this.props.countyInfo.name, state: this.props.countyInfo}} style = {{color:'black'}}>

                <img className="card-img-top" alt = "" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" src= "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Usa_counties_large.svg/580px-Usa_counties_large.svg.png" />
                <div className="card-body">
                  <h2 className="card-title">{this.props.countyInfo.name}</h2>
                </div>
              </Link>
            </div>
          </div>
   
  );

  }
}

export default CountyCard;   