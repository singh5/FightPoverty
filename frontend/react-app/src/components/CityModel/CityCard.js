import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class CityCard extends Component {
  


  render() {

    return (
  
   <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        
        <Link to={{pathname: '/cities/'+ this.props.cityInfo.name, state: this.props.cityInfo}} style = {{color:'black'}}>
         <img className="card-img-top" alt = "" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" src="http://www.foodieoncampus.com/wp-content/uploads/2016/01/City-Skyline.jpg" />
         <div className="card-body">
            <h2 className="card-title">{this.props.cityInfo.name}</h2>
         </div>
         </Link>

      </div>
   </div>

   
  );

  }
}

export default CityCard;   