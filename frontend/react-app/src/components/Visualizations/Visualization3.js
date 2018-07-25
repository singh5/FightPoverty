import React, { Component } from 'react'
import '../../App.css'
import d3tip from 'd3-tip'
import './vis3.css'
import { viz3_height, viz3_width } from './visualization-styles'
var d3 = require('d3')

// https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71
class Visualization3 extends Component {
    constructor(props){
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }

    componentDidMount() {
        this.createBarChart()
    }

    componentDidUpdate() {
        this.createBarChart()
    }

    async createBarChart() {
        const node = this.node

        var margin = {top: 40, right: 40, bottom: 30, left: 80},
        width = viz3_width - margin.left - margin.right,
        height = viz3_height - margin.top - margin.bottom;

        var formatPercent = d3.format("1.0%");
        
        var x = d3.scaleBand()
            .rangeRound([0, width])
            .round(true)
            .padding(.2)
        
        var y = d3.scaleLinear()
            .range([height, 0]);
        
        var xAxis = d3.axisBottom(x);
        
        var yAxis = d3.axisLeft(y)
            .tickFormat(formatPercent);
        
        var tip = d3tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>" + d.county + ":</strong> <span style='color:orange'>" + d.percentage * 100 + "%</span>";
            })

        
        var svg = d3.select(node).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        svg.call(tip);


        const data = await d3.tsv("https://s3.us-east-2.amazonaws.com/unemployment-stats/county-poverty.tsv", type)


        x.domain(data.map(function(d) { return d.county; }));
        y.domain([0, d3.max(data, function(d) { return d.percentage; })]);

        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            // .call(xAxis);
        
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 9)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Poverty %");

        
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { 
                return x(d.county); 
            })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { 
                return y(d.percentage); 
            })
            .attr("height", function(d) { 
                return height - y(d.percentage); 
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)

        
        function type(d) {
            d.percentage = +d.percentage;
            return d;
        }

    }


    render() {

        return (
            <div style={{ paddingTop: '100px' }}>
                <svg 
                    ref={node => this.node = node} 
                    width={viz3_width} 
                    height={viz3_height} 
                    style={{ display: 'block', margin: 'auto' }}
                />
            </div>            
        )
    }
}

export default Visualization3