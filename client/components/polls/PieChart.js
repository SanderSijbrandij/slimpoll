import React, { Component, PropTypes } from 'react'
import * as d3 from 'd3'
import { getVotes } from '../../helpers/votes'

class PieChart extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  static defaultProps = {
    data: [
      {text: 'default', voteCount: 1}, 
      {text: 'props', voteCount: 1}
    ],
    colors: d3.scaleOrdinal().range(['#f2711c', '#2185d0', '#db2828', '#21ba45', '#6435c9', '#00b5ad', '#a333c8', '#a5673f'])
  }

  createChart(props) {
    const { data } = props
    const totalVotes = getVotes(data)
    
    const margin = { top: 10, bottom: 10, left: 10, right: 10 }
    const width = 322 - margin.left - margin.right
    const height = 322 - margin.top - margin.bottom
    const radius = width/2
    
    const arc = d3.arc().innerRadius(0).outerRadius(radius - 10)
    const labelArc = d3.arc().innerRadius(radius - 50).outerRadius(radius - 50)
    const pie = d3.pie().sort(null).value(d => d.voteCount)
    const color = this.props.colors

    const angle = (d) => {
      const a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90
      return a > 90 ? a - 180 : a
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
      .on('mouseover', d => {
        d3.select('#tooltip')
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY + 'px')
        .style('opacity', 1)
        .style('background-color', color(d.data.text))
        d3.select('#value')
          .text(d.data.voteCount + ' votes - ' + `${Math.round(d.data.voteCount / totalVotes * 100)}%`)
        d3.select('#heading')
          .text(d.data.text)
      })
      .on('mouseout', function () {
        d3.select('#tooltip')
            .style('opacity', 0)
      })

    g.append('path')
      .attr('d', arc)
      .style('fill', d => color(d.data.text))

    g.append('text')
      .attr('transform', d => 'translate(' + labelArc.centroid(d) + ')rotate(' + angle(d) + ')')
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
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
    return (
      <div>
        <svg id='pie'></svg>
        <div id="tooltip" className="hidden">
          <p><strong id='heading'>heading</strong></p>
          <p><span id="value">100</span></p>
        </div>
      </div>
      
    )
  }
}

export default PieChart