import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class CharityCard extends Component {
  


  render() {

    return (
  <div className="col-md-4">
                    <div className="card mb-4 box-shadow ">

                       <Link to={{pathname: '/charities/'+ this.props.charityInfo.name, state: this.props.charityInfo}} style = {{color:'black'}}>

                        <img className="card-img-top" alt = "" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" src="https://static.makeuseof.com/wp-content/uploads/2016/01/best-sponsor-charity-670x335.jpg"/>
                          <div className="card-body">

                          <h2 className="card-title">{this.props.charityInfo.name}</h2>
                           </div>
                        </Link>
          </div>
          </div>
   
  );

  }
}

export default CharityCard;   