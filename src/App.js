import React, { Component } from 'react';
import './App.css';
import Card from './components/Card'

let cards = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6']
let cardHeight = 80
let cardMargin = 20
let top = (cardHeight + cardMargin)/2
let DISTANCE = 100
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: true,
      touchStartY: 0,
      touchMoveY: 0,
      touchEndY: 0,
    }
  }
  componentDidMount() {
    console.info('componentDidMount')
    document.addEventListener('touchstart', this.touchstart)
    document.addEventListener('touchmove', this.touchmove)
    document.addEventListener('touchend', this.touchend)
  }
  touchstart = (e) => {
    this.setState({
      touchStartY: e.targetTouches[0].pageY
    })
  }
  touchmove = (e) => {
    const touchMoveY = e.changedTouches[0].pageY - this.state.touchStartY
    const {status} = this.state
    if ((status && touchMoveY > 0) || (!status && touchMoveY < 0)) {
      return
    }
    if (touchMoveY <= DISTANCE && touchMoveY >= -DISTANCE) {
      this.setState({
        touchMoveY: touchMoveY.toFixed(),
      })
    } else if(touchMoveY > DISTANCE) {
      this.setState({
        touchMoveY: DISTANCE
      })
    } else if (touchMoveY < -DISTANCE) {
      this.setState({
        touchMoveY: -DISTANCE
      })
    }
  }
  touchend = (e) => {
    const touchMoveY = e.changedTouches[0].pageY - this.state.touchStartY
    const {status} = this.state
    if (touchMoveY > 0 && touchMoveY < DISTANCE) { // 恢复
      console.info('huifu', touchMoveY)
      this.setState({
        touchMoveY: status ? 100 : 0,
      })
    } else if (touchMoveY >= DISTANCE) { // 展开
      console.info('zhankai', touchMoveY)
      this.setState({
        touchMoveY: 100,
        status: true
      })
    } else if (touchMoveY > -DISTANCE && touchMoveY < 0) { // 恢复
      console.info('huifu', touchMoveY)
      this.setState({
        touchMoveY: status ? 100 : 0,
        
      })
    } else if (touchMoveY <= -DISTANCE) { // 收起
      console.info('shouqi', touchMoveY)
      this.setState({
        touchMoveY: 0,
        status: false,
      })
    }
  }
  componentWillUnmount() {
    document.removeEventListener('touchstart', this.touchstart)
    document.removeEventListener('touchmove', this.touchmove)
    document.removeEventListener('touchend', this.touchend)
    console.info('componentWillUnmount')
  }
  render() {
    const {touchMoveY} = this.state
    return (
      <div className="container">
        {
          cards.map((card, index) => {
            const style={
              top: -index*(top - touchMoveY*0.5),
              height: cardHeight + 'px',
              marginBottom: cardMargin + 'px',

            }
            return (
              <Card
                key={index}
                card={card}
                style={style}
              />
            )
          })
        }
      </div>
    );
  }
}

export default App;
