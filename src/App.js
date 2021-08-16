import './App.css';
import './Grid/Grid';
import AlternateTile from './AlternateTile/AlternateTile';
import Grid from './Grid/Grid';
import { Component, createRef, useRef } from 'react';
import ScoreBoard from './ScoreBoard/ScoreBoard';

import Anime, { anime }  from 'react-animejs-wrapper';

class App extends Component{
  constructor(props){
    super(props);
    this.scoreboardref = createRef(null);
    this.theApp = createRef(null);
    this.state = {
      player1: 0,
      player2: 0,
      player3: 0,
      newscore: 0
    };

    this.triPoint = {
      x:0,
      y:0
    }
    this.motion = {};
  }
  scoreCallback = (triPoint,minorScore) => {
    this.style = {
      color: "#ffffff",
      position: "absolute",
      zindex: 10,
      top: triPoint.y + "px",
      left: triPoint.x + "px"
    };
    console.log("minorscore=",triPoint);
    this.motion = {
      x: 400,
      y: 100,
      translateY: -triPoint.y+50,//[0, 25],
      translateX: 0,//[0, 25],
      scale: [0.8, 4],
      loop: false,
      duration: 600,
      easing: 'spring(1, 100, 12, 0)',
      opacity: [
        { value:1,duration:300},
        { value:0,duration:300}
      ]
    }
    this.motion2 = {
      opacity: 0,
      loop: false,
      duration: 300
    }


    this.setState({
      player1: this.state.player1 + minorScore,
      newscore: minorScore
    });
    
    
    this.scoreboardref.current.updateScore(this.state.player1,this.player2,this.player3);
  };

  render(){
    
    let altTile = createRef();
    let tilescore = "";
    if(this.state.newscore > 0){
      tilescore = <Anime
                    config={this.motion} style={this.style}>
        <div ref={this.scoretile}>{this.state.newscore}</div>
        </Anime>
    }
    return (
      <div className="App"> 
        <AlternateTile ref={altTile}></AlternateTile>
        <ScoreBoard player1={this.state.player1} ref={this.scoreboardref}></ScoreBoard>
        <Grid scorecallback={ this.scoreCallback}></Grid>
        {tilescore}
      </div>
    );
  
  }

}

export default App;
