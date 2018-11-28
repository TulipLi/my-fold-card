import React, { Component } from 'react';
import './App.css';
import Card from './components/Card'

let cards = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6']
let cardHeight = 80
let cardMargin = 20
let top = (cardHeight + cardMargin)/2
let DISTANCE = 50
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFold: true,
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
    if (touchMoveY <= DISTANCE && touchMoveY >= -DISTANCE) {
      this.setState({
        touchMoveY: (e.changedTouches[0].pageY - this.state.touchStartY).toFixed(),
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
    if (touchMoveY > 0 && touchMoveY <DISTANCE) { // 回弹
      this.setState({
        touchMoveY: 0,
      })
    } else if (touchMoveY >= DISTANCE) { // 展开
      this.setState({
        touchMoveY: 100,
      })
    } else if (touchMoveY > -DISTANCE && touchMoveY <=0) { // 收起
      this.setState({
        touchMoveY: 100,
      })
    } else if (touchMoveY <= -DISTANCE) { // 回弹
      this.setState({
        touchMoveY: 0,
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
