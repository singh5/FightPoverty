import { backendAPI }  from '../config.js'
import axios from 'axios';


export async function getNumOfCounties () {
  const response = await axios.get(backendAPI+ 'api/county')
	  // .then(function (response) {
	  //   console.log(response);
	  //   return response.data.objects;
	  // })
	  // .catch(function (error) {
	  //   console.log(error);
	  // });
	  // console.log("hello");
	  return response.data.num_results;
	  
}

export async function getMoreCounties (pageNumber) {
  const response = await axios.get(backendAPI+ 'api/county?page=' + pageNumber);
	  // .then(function (response) {
	  //   console.log(response);
	  //   return response.data.objects;
	  // })
	  // .catch(function (error) {
	  //   console.log(error);
	  // });
	  // console.log("hello");
	  return response.data.objects;
	  
}


export async function getAllCounties () {
	let dataObjects = []
	let response = await axios.get(backendAPI + 'api/county?page=1&results_per_page=100');
	dataObjects.push(...response.data.objects)

	const totalNumObjects = response.data.num_results
	let currentPage = 1

	while (currentPage * 100 < totalNumObjects) {
		currentPage += 1
		response = await axios.get(backendAPI + 'api/county?results_per_page=100&page=' + currentPage)
		dataObjects.push(...response.data.objects)
	}

	return dataObjects
}




export async function getSpecificCounty (county) {
  const response = await axios.get(backendAPI+ 'api/county?q={"filters":[{"name":"name","op":"eq","val":"' + county + '"}]}');
	  // .then(function (response) {
	  //   console.log(response);
	  //   return response.data.objects;
	  // })
	  // .catch(function (error) {
	  //   console.log(error);
	  // });
	  // console.log("hello");
	    return response.data.objects;
}

export async function generalCountySearch (text, pageNumber){
  	  const response = await axios.get(backendAPI+ 'api/county?q={"filters":[{"name":"name","op":"like","val":' + '"%25' + text + '%25"' + "}]}"+ "&" + "page=" + pageNumber + '&results_per_page=3');
	  // .then(function (response) {
	  //   console.log(response);
	  //   return response.data.objects;
	  // })
	  // .catch(function (error) {
	  //   console.log(error);
	  // });
	  // console.log("hello");
	  return response.data;

}



export async function countySearch (text, pageNumber){
	const response = await axios.get(backendAPI+ 'api/county?q={"filters":[{"name":"name","op":"like","val":' + '"%25' + text + '%25"' + "}]}"+ "&" + "page=" + pageNumber + '&results_per_page=9');
  // .then(function (response) {
  //   console.log(response);
  //   return response.data.objects;
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  // console.log("hello");
  return response.data;

}

export async function getCounties(
	searchTerm, 
	sort, 
	stateFilters, 
	percentFilter, 
	pageNumber, 
	results_per_page
){
	var link = backendAPI + 'api/county?results_per_page=' + results_per_page + '&page=' + (pageNumber || 1) ; // 1 if no pageNumber provided
	var response;
	var percentFilt = parseInt(percentFilter);

	if (!!searchTerm || sort !== "none" || stateFilters.length > 0 || !!percentFilter) {
		link += "&q={"

		// Determine all filters
		if (!!searchTerm || stateFilters.length > 0 || !!percentFilter) {
			link += `"filters":[`
			

			// ADD SEARCH TERM
			if (!!searchTerm) {
				link += `{"name":"name","op":"like","val":"%25${searchTerm}%25"}`
			}

			// ADD STATE FILTER
			if (stateFilters.length > 0) {
				if (!!searchTerm) {
					link += ","
				}

				link += `{"or":[`

				stateFilters.forEach((stateFilter, i) => {
					i > 0 ? link += `,` : ''					
					link += `{"name":"state","op":"eq","val":"${stateFilter}"}`				
				})		
				
				link += `]}`
			}


			// ADD PERCENT FILTER
			if (!!percentFilter) {
				if ((!!searchTerm && stateFilters.length === 0) || stateFilters.length > 0) {
					link += ","
				}
				if(percentFilt > 9 &&  percentFilt < 24){
					link += `{"name":"county_poverty_percentage","op":"ge","val":"${percentFilt-3}"},{"name":"county_poverty_percentage","op":"le","val":"${percentFilt}"}`
				}
				else if(percentFilt === 9){
					link += `{"name":"county_poverty_percentage","op":"le","val":"${percentFilt}"}`;

				}
				else if(percentFilt === 24){
					link += `{"name":"county_poverty_percentage","op":"ge","val":"${percentFilt-3}"}`;

				}
			}
			

			// Done with filters
			link += `]`
			

			if (sort !== "none") {
				link += `,`
			}
		}
				

		if (sort !== "none") {
			link += `"order_by":[{"field":`
			
			if (sort === "AZ") {
				link += `"name","direction":"asc"`
			} else if (sort === "ZA") {
				link += `"name","direction":"desc"`
			} else if (sort === "0100") {
				link += `"county_poverty_percentage","direction":"asc"`
			} else if (sort === "1000") {
				link += `"county_poverty_percentage","direction":"desc"`
			}

			// Finished with sort param
			link += `}]`				
		}

		// Finished with query filter string
		link += "}"
	}
	try{
		response = await axios.get(link);
	}
	catch(err){
	 	response = {data:{objects:[], num_results:0}};

	}

	return response.data;

}
