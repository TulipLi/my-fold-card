import React, { Component } from 'react';
import './App.css';
import FoldCard from './components/FoldCard'

let cards = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6']

class App extends Component {

  render() {
    return (
      <div className="container">
        <FoldCard>
          {
            cards.map((card, index) => {
              //这里面可以放 每个卡片的内容
              return (
                <div className="item" key={index}>{card}</div>
              )
            })
          }
        </FoldCard>
      </div>
    );
  }
}

export default App;
