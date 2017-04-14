import React, { PureComponent, PropTypes } from 'react'
import { Button, Icon } from 'semantic-ui-react'

class Pagination extends PureComponent {
  static PropTypes = {
    data: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired
  }

  page(e, n) {
    const { currentPage, pages } = this.props.data
    if (n == 'prev') { 
      n = (currentPage == 1) ? 1 : currentPage-1 
    } else if (n == 'next') {
      n = (currentPage == pages) ? pages : currentPage+1
    }
    this.props.fetchData(n)
  }

  makeButtonsArray() {
    const { data } = this.props
    let buttons = []
    
    for (let i = 1; i <= data.pages; i++) {
      const button = data.currentPage == i
      buttons.push(button)
    }
    return buttons
  }

  render() { 
    const pages = this.makeButtonsArray()
    return (
      <div style={{ textAlign: 'center', margin: '0 auto' }}>
      <Button.Group size='mini'>
        <Button style={{width: '85px'}} animated='fade' color='grey' onClick={ (e, n) => this.page(e, 'prev') }>
          <Button.Content hidden><Icon name='chevron left' /></Button.Content>
          <Button.Content visible>previous</Button.Content>
        </Button>
        {
          pages.map((page, index) => {
            return page ? 
              <Button.Or key={index} text={ index + 1 } /> :
              <Button key={index} onClick={ (e, n) => this.page(e, index+1) }>
                { index + 1}
              </Button>
          })
        }
        <Button style={{width: '85px'}} animated='fade' color='grey' onClick={ (e, n) => this.page(e, 'next') } >
          <Button.Content hidden><Icon name='chevron right' /></Button.Content>
          <Button.Content visible>next</Button.Content>
        </Button>
      </Button.Group>
      </div>
    )
  }
}

export default Pagination