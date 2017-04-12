import React, { Component, PropTypes } from 'react'
import * as d3 from 'd3'

class PieChart extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  static defaultProps = {
    data: [
      {text: 'default', voteCount: 1}, 
      {text: 'props', voteCount: 1}
    ]
  }

  createChart(props) {
    const { data } = props
    const totalVotes = data.reduce((curr, next) => { return curr + next.voteCount }, 0)
    
    const margin = { top: 10, bottom: 10, left: 10, right: 10 }
    const width = 322 - margin.left - margin.right
    const height = 322 - margin.top - margin.bottom
    const radius = width/2
    
    const arc = d3.arc().innerRadius(0).outerRadius(radius - 10)
    const labelArc = d3.arc().innerRadius(radius - 50).outerRadius(radius - 50)
    const pie = d3.pie().sort(null).value(d => d.voteCount)
    const color = d3.scaleOrdinal().range(['#f2711c', '#2185d0', '#db2828', '#21ba45', '#6435c9', '#00b5ad', '#a333c8', '#a5673f'])

    const pieTween = (b) => {
      b.innerRadius = 0
      const i = d3.interpolate({ startAngle: 0, endAngle: 0}, b)
      return (t) => { return arc(i(t)) }
    }

    const svg = d3.select('svg#pie')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width/2 + ', ' + height/2 + ')')

    const g = svg.selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc')
    
    g.append('path')
      .attr('d', arc)
      .style('fill', d => color(d.data.text))

    g.append('text')
      .attr('transform', d => 'translate(' + labelArc.centroid(d) + ')')
      .attr('dy', '.35em')
      .text(d => { 
        return d.data.voteCount > 0 ?
          `${Math.round(d.data.voteCount / totalVotes * 100)}%` :
          null
      })
      .attr('fill', 'white')
  }  

  componentDidMount() {
    this.createChart(this.props)
  }

  componentWillReceiveProps(newProps) {
    // TODO: fix an update method so I can use animations
    this.createChart(newProps)
  }

  render() {
    return <svg id='pie'></svg>
  }
}

export default PieChart