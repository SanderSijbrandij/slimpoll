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

  sortByName(a, b) { 
    const first = a.data.text.toUpperCase()
    const second = b.data.text.toUpperCase()
    return first > second ? 1 : -1
  }

  votePerc(amount) {
    const totalVotes = this.props.data.reduce((curr, next) => { return curr + next.voteCount }, 0)
    return (totalVotes === 0) ? '0%' : `${Math.round(amount / totalVotes * 100)}%`
  }

  updateChart(props) {
    const { data } = props

    const pie = d3.pie().value(d => d.voteCount)
    const slices = pie(data).sort(this.sortByName)
    const arc = d3.arc().innerRadius(0).outerRadius(75)

    const pieces = d3.selectAll('path.slice')
      .data(slices)
        .attr('d', arc)

    const legend = d3.select('g.legend')
      .selectAll('text')
        .text(d => d.data.text)
  }

  createChart(props) {
    const { data } = props

    const pie = d3.pie().value(d => d.voteCount)
    const slices = pie(data).sort(this.sortByName)

    const arc = d3.arc().innerRadius(0).outerRadius(75)
    const color = d3.scaleOrdinal(d3.schemeCategory10)
    
    const svg = d3.select('svg#pie')
    const chart = svg.append('g')
      .attr('transform', 'translate(161, 100)')
    
    chart.selectAll('path.slice')
      .data(slices)
      .enter()
        .append('path')
          .attr('class', 'slice')
          .attr('d', arc)
          .attr('fill', d => color(d.data.text))

    svg.append('g')
      .attr('class', 'legend')
        .selectAll('text')
        .data(slices)
        .enter()
          .append('text')
            .text(d => d.data.text)
            .attr('fill', d => color(d.data.text))
            .attr('y', (d, i) => 20 * (i+1))
  }  

  componentDidMount() {
    this.createChart(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.updateChart(newProps)
  }

  render() {
    return <svg id='pie' width='322' height='200'></svg>
  }
}

export default PieChart