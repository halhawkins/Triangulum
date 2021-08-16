import { Component, createRef } from "react";
import TriangleTile from "../TriangleTile/TriangleTile";
import GridData from "./GridData.json";


class Grid extends Component {
    constructor(props){
        super(props);

        this.tri = [];
        this.tritile= [];
        this.tricomp = [];
        
        for(let i = 0; i <= 190; i++){
            this.tri[i] = createRef(null);

        }
        for(let i = 0; i <= 190; i++){
            this.tricomp[i] = createRef(null);
        }
        this.accumulatedScore = 0;

        this.state = {
            totalScore: 0,
            activeTile: 92,
            startpoint: 1,
            currentPlayer: 0,
            player:[
                {
                    path:[
                            {
                                tile: 110, // starting pos
                                startpoint: 0,
                                endpoint: 2
                            }
                        ]
                },
                {
                    path:[
                            {
                                tile: 110, // starting pos
                                startpoint: 0,
                                endpoint: 6
                            }
                        ]
                },
                {
                    path:[
                            {
                                tile: 110, // starting pos
                                startpoint: 0,
                                endpoint: 4
                            }
                        ]
                },
            ],
            tritile: this.tricomp
        }
    }



    componentDidMount(){
        this.state.tritile[this.state.activeTile].current.classList= ["emptytriangle"];
        document.addEventListener('keydown',(e)=>{
            switch(e.code){
                case "ArrowRight":
                    this.state.tritile[this.state.activeTile].current.resetClockwiseAnimation();
                    break;
                case "Enter":
                case "NumpadEnter":
                    this.handleEnter();
                    this.accumulatedScore = 0;
                    break;
            }
        })
    }

    handleEnter = () => {


        if(this.accumulatedScore === 0)
            this.accumulatedScore = 2;
        else
            this.accumulatedScore += this.accumulatedScore;
        let path = this.state.player[this.state.currentPlayer].path;
        path.push({
            startpoint: this.state.startpoint,
            endpoint: this.state.tritile[this.state.activeTile].current.find2ndEnd(this.state.startpoint),
            tile: this.state.activeTile
        });
        let player = [
            {
                path: path
            },
            {
                path: this.state.player[1].path
            },
            {
                path: this.state.player[2].path
            },
        ];

        let oldTile = this.state.activeTile;
        let currentPath = {
            tile: this.state.activeTile,
            startpoint: this.state.startpoint,
            endpoint: this.state.tritile[this.state.activeTile].current.find2ndEnd(this.state.startpoint)
        };
        this.state.tritile[this.state.activeTile].current.setSegOwner(this.state.currentPlayer+1,this.state.startpoint);
        this.state.tritile[this.state.activeTile].current.draw();
        
        let newPath = this.getNextStartPoint(this.state.activeTile,this.state.tritile[this.state.activeTile].current.getOrientation(),currentPath.endpoint);
        
        this.setState({
            activeTile: newPath.newtileindex,
            startpoint: newPath.newstartpoint,
            endpoint: newPath.newendpoint,
            player: player
        });
        this.setState({
            totalScore: this.state.totalScore + this.accumulatedScore
        });
        if(this.state.tritile[this.state.activeTile].current.getShow())
            this.handleEnter();
        this.state.tritile[this.state.activeTile].current.show();
        this.state.tritile[this.state.activeTile].current.draw();
        let score = this.state.totalScore;

        this.props.scorecallback(this.state.tritile[this.state.activeTile].current.GetScreenCordinates(),this.accumulatedScore);//this.state.totalScore);
        console.log("score=",score);
    }

    getNextStartPoint = (tileIndex,orientation,endpoint) => {
        let newstartpoint = -1;
        let newtileindex = -1;
        let newendpoint = -1;
        if(orientation === 0){
            switch(endpoint){
                case 1:
                    newtileindex = tileIndex+21;
                    newstartpoint = 2;
                    newendpoint = 0;
                    break;
                case 2:
                    newtileindex = tileIndex+21;
                    newstartpoint = 1;
                    newendpoint = 0;
                    break;
                case 3:
                    newtileindex = tileIndex+1;
                    newstartpoint = 4;
                    newendpoint = 0;
                    break;
                case 4:
                    newtileindex = tileIndex+1;
                    newstartpoint = 3;
                    newendpoint = 0;
                    break;
                case 5:
                    newtileindex = tileIndex-1;
                    newstartpoint = 6;
                    newendpoint = 0;
                    break;
                case 6:
                    newtileindex = tileIndex-1;
                    newstartpoint = 5;
                    newendpoint = 0;
                    break;
            }
        }
        else{
            switch(endpoint){
                case 1:
                    newtileindex = tileIndex-21;
                    newstartpoint = 2;
                    newendpoint = 0;
                    break;
                case 2:
                    newtileindex = tileIndex-21;
                    newstartpoint = 1;
                    newendpoint = 0;
                    break;
                case 3:
                    newtileindex = tileIndex-1;
                    newstartpoint = 4;
                    newendpoint = 0;
                    break;
                case 4:
                    newtileindex = tileIndex-1;
                    newstartpoint = 3;
                    newendpoint = 0;
                    break;
                case 5:
                    newtileindex = tileIndex+1;
                    newstartpoint = 6;
                    newendpoint = 0;
                    break;
                case 6:
                    newtileindex = tileIndex+1;
                    newstartpoint = 5;
                    newendpoint = 0;
                    break;
                }
    
        }    
        console.log("newpoints",newtileindex,newstartpoint,newendpoint)
        return {
            newtileindex:newtileindex,
            newstartpoint:newstartpoint,
            newendpoint:newendpoint
        };
    }

    currentTile = (player) => {
        let path = this.state.player[this.state.currentPlayer].path;
        let playerPath = [
            {
                path: path
            },
            {
                path: this.state.player[1].path
            },
            {
                path: this.state.player[2].path
            },
        ];

        let previousTileEndPoint = this.state.player[player].path[this.state.player[player].path.length-1].endpoint;
        let currentOrientation = this.state.tritile[this.state.activeTile].current.getOrientation();
        let currentPoints = this.getNextStartPoint(this.state.player[player].path[this.state.player[player].path.length-1].tile,currentOrientation===0?1:0,previousTileEndPoint);

        
        currentPoints.newendpoint = this.state.tritile[this.state.activeTile].current.find2ndEnd(currentPoints.newstartpoint);
        playerPath[player].path.push(currentPoints);
        
        this.state.tritile[this.state.activeTile].current.setSegOwner(player+1,currentPoints.newendpoint);
        let nextPoints = this.getNextStartPoint(currentPoints.newtileindex,this.state.tritile[currentPoints.newtileindex].current.getOrientation(),currentPoints.newendpoint);
        this.setState({
            activeTile: currentPoints.newtileindex,
            startpoint: currentPoints.newendpoint,
            endpoint: currentPoints.newstartpoint,
            player: player
        });
        return {
            newtileindex: nextPoints.newtileindex,
            newstartpoint: nextPoints.newstartpoint,
            newendpoint: nextPoints.newendpoint
        }
    }
    

    render = () => {
        GridData.tiles[this.state.activeTile].show = "show";
        return <div className="container1">
                    <div className="container">
                        <div className="blackbg" ref={this.tri[0]} id="firsttile"></div>
                        {GridData.tiles.map((item,i) => {
                            return item.nontile === true?
                                <div className="blackbg" key={"div" + i.toString()} ref={this.tri[i]}></div>
                                :
                                <div className="triangle " ref={this.tri[i]} key={"div" + i.toString()}><TriangleTile key={"tri" + i.toString()} show={item.show} orientation={item.orientation} segOwners={item.segOwners} seg={item.seg} rotate={item.rotate} ref={this.state.tritile[i]}></TriangleTile></div>
                        })}
                    </div>
                </div>

    }
}

export default Grid;