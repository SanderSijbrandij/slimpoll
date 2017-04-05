import React, { PureComponent, PropTypes } from 'react'
import * as d3 from 'd3'

class PollChart extends PureComponent {
  static propTypes = {
    answers: PropTypes.array.isRequired
  }

  componentDidMount() {
    const { answers } = this.props
    console.log(this.props)
    this.createChart(answers)
  }

  componentDidReceiveProps(newProps) {
    const answers = newProps.answers
    this.createChart(answers)
  }

  sortByText(a, b) {
    const nameA = a.data.text.toUpperCase()
    const nameB = b.data.text.toUpperCase()
    return nameA < nameB ? -1 : 1
  }

  updateChart(answers) {
    var pie = d3.pie().value(d => d.voteCount)
    var slices = pie(answers).sort(this.sortByText)
    var arc = d3.arc().innerRadius(0).outerRadius(75)

    const slice = d3.selectAll('path.slice')
      .data(slices)
        .attr('d', arc)

    const legend = d3.select('legend')
      .selectAll('text')
        .text(d => '- ' + d.data.text + ' (' +  d.data.voteCount + ')')
  }

  createChart(answers) {
    const numberOfOptions = answers.length
    const pie = d3.pie().value(d => d.voteCount)
    const slices = pie(answers).sort(this.sortByText)
    const arc = d3.arc().innerRadius(0).outerRadius(75)
    const color = d3.scaleOrdinal(d3.schemeCategory10)
    const svg = d3.select('svg.pie')
    const g = svg.append('g')
      .attr('transform', 'translate(200, 75)')

    g.selectAll('path.slice')
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
          .text(d => '- ' + d.data.text + ' (' + d.data.voteCount + ')')
          .attr('fill', d => color(d.data.text))
          .attr('y', (d, i) => 20 * (i+1))
  }

  render() {
    const totalVotes = this.props.answers.reduce((curr, next) => {
      return curr + next.voteCount
    }, 0)

    return (
      <div className='poll-graph'>
        <svg className='pie'></svg><br />
        <span>Total votes: { totalVotes }</span>
      </div>
    )
  }
}

export default PollChart
