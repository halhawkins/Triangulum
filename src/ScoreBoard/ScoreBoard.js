import { Component } from "react";

class ScoreBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            player1: props.player1,
            player2: props.player2,
            player3: props.player3
        }
    }

    updateScore = (p1,p2,p3) => {
        console.log("updateScore(" + p1 + "," + p2 + "," + p3 + ");");
        this.setState({
            player1: p1,
            player2: p2,
            player3: p3
        });

    }

    render(){
        return <div className="scoreboard">
            player1: {this.state.player1}
        </div>
    }
}
export default ScoreBoard;