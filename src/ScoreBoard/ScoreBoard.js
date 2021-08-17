import { Component, createRef } from "react";
import Anime, { anime }  from 'react-animejs-wrapper';

class ScoreBoard extends Component{
    constructor(props){
        super(props);
        this.anim = createRef(null);
        this.sparkle = createRef(null);
        this.state = {
            player1: props.player1,
            player2: props.player2,
            player3: props.player3
        }
        this.score = "scoresparkle";
    }

    updateScore = (p1,p2,p3) => {
        // this.classN = "score";
        this.classN = "scoresparkle";
        this.setState({
            player1: p1,
            player2: p2,
            player3: p3
        });
        let t = setInterval(() => {
            this.forceUpdate();
            this.classN = "scoresparkle";
            t = clearInterval();
        },100)
    }

    render(){
        // this.classN = "score";
        let scoreval = <Anime config={this.motion} ref={this.anim}><span className={this.classN} ref="this.sparkle">{this.state.player1}</span></Anime>
        return <div className="scoreboard">
            Player1: {scoreval}
        </div>
    }
}
export default ScoreBoard;