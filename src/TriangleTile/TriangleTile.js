import { Component, createRef } from "react";
import { triCenter } from "./combos";
import combos from "./combos";

class TriangleTile extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = createRef(null);
        this.container = createRef(null);
        
        let segPoints = [1,2,3,4,5,6];
        let seg =[[]];
        let bez0 = {};
        let bez1 = {};
        let bez2 = {};
        let show = false;
        if(this.props.show){
            this.props.show === "show"? show = true: show = false;
        }
        else{
            show = false;
        }
        if(!this.props.borderw){
            this.borderw = 3;
            this.lineWidth = 5;
        }
        else{
            this.borderw = this.props.borderw;
            this.linew = this.borderw-2;
        }

        if(this.props.segs){
            segPoints = this.props.segs;

            seg[0] = [segPoints[0], segPoints[1]];
            seg[1] = [segPoints[2], segPoints[3]];
            seg[2] = [segPoints[4], segPoints[5]];
    
            bez0 = combos[this.findBez(seg[0])];
            bez1 = combos[this.findBez(seg[1])];
            bez2 = combos[this.findBez(seg[2])];    
        }
        else{
            segPoints = this.shuffle(segPoints);
            seg[0] = [segPoints[0], segPoints[1]];
            seg[1] = [segPoints[2], segPoints[3]];
            seg[2] = [segPoints[4], segPoints[5]];
    
            bez0 = combos[this.findBez(seg[0])];
            bez1 = combos[this.findBez(seg[1])];
            bez2 = combos[this.findBez(seg[2])];    
        }
        if(props.first){ // for first tile, do not allow seg 0 to loop point 1 to point 2
            while(this.find2ndEnd(seg,1) === 2){
                console.log("looping");
                this.randomizeSegs(segPoints,seg,bez0,bez1,bez2);
            }
            this.active = true;
        }

        this.state = {
            show: show,
            active: this.active,
            seg: [seg[0],seg[1],seg[2]], // list of connected side points
            bez0: bez0, // pre-computed bezier curves for each segment
            bez1: bez1,
            bez2: bez2,
            segOwners: [0,0,0],
            orientation: parseInt(this.props.orientation,10),
            scalex: parseFloat(this.props.scalex),
            scaley: parseFloat(this.props.scaley),
        }
        console.log("state = ", this.state);
    }

    show = () => {
        this.setState({show:true});
    }

    isTile = () => {
        return !this.props.nontile;
    }

    getShow = () => {
        return this.state.show;
    }
    randomizeSegs = (segPoints,seg,bez0,bez1,bez2) => {

        segPoints = this.shuffle(segPoints);
        console.log(segPoints);
        seg[0] = [segPoints[0], segPoints[1]];
        seg[1] = [segPoints[2], segPoints[3]];
        seg[2] = [segPoints[4], segPoints[5]];

        bez0 = combos[this.findBez(seg[0])];
        bez1 = combos[this.findBez(seg[1])];
        bez2 = combos[this.findBez(seg[2])];    
        this.setState({
            seg: seg,
            bez0:bez0,
            bez1:bez1,
            bez2:bez2
        });
    }

    setActive = (active) => {
        
    }

    getSegOwner = (point) => {
        for(let i = 0; i <= 3; i++){
            if(this.state.seg[i][0] === point || this.state.seg[i][1] === point){
                return this.state.segOwners[i];
            }
        }
    }

    getOrientation = () => {
        return this.state.orientation;
    }

    find2ndEnd = (end1) => {
        for(let i = 0; i < 3;i++){
            if((this.state.seg[i][0] === end1)||this.state.seg[i][1] === end1){
                if(this.state.seg[i][0] === end1){
                    return this.state.seg[i][1];
                }
                else{
                    return this.state.seg[i][0];
                }
            }
        }
    }

    setSegOwner = (player,segpoint) => {
        let segOwners = this.state.segOwners;
        for(let i = 0; i < 3; i++){
            if((this.state.seg[i][0] === segpoint)||this.state.seg[i][1] === segpoint){
                segOwners[i] = player
                this.setState({
                    segOwners: segOwners
                });
            }
        }
        this.forceUpdate();
    }
        
    findBez = (pnts) => {
        for(var i = 0;i < combos.length; i++){
            if( ((combos[i].seg[0] === pnts[0]) && (combos[i].seg[1] === pnts[1])) ||
                ((combos[i].seg[0] === pnts[1]) && (combos[i].seg[1] === pnts[0])) ){
                    var ret = i;
                }
        }
        return ret;
    }

    
    shuffle = (array) => {
        var currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    resetClockwiseAnimation() {
        console.log("in resetClockwiseAnimation()");
        this.a = 0;
            this.cwInterval = setInterval(() => {
                this.a += 5;
                this.draw(this.a);
                if(this.a === 120){
                    clearInterval(this.cwInterval);

                    this.a = 0;
                    this.rotateCW();                
                }
            },5);
        // }
    }

    resetCounterClockwiseAnimation() {
        console.log("in resetCounterClockwiseAnimation()");
        this.a = 0;
            this.cwInterval = setInterval(() => {
                this.a -= 5;
                this.draw(this.a);
                if(this.a === -120){
                    clearInterval(this.cwInterval);
                    this.a = 0;
                    this.rotateCW();                
                    this.rotateCW();                
                }
            },5);
        // }
    }

    componentDidMount(prevProps) {
        console.log("rendered tri");
        if(this.state.show)
            this.draw();
        else
            this.drawPlaceholder();
        let a = 0;
        let c;
    }


    enterKey = () => {
        console.log("enter");
    }

    drawPlaceholder = () => {

        let angle = 0;
        let dpi = window.devicePixelRatio;
        let canvas = createRef(this.canvasRef);

        let style_height = +getComputedStyle(document.getElementById('firsttile')).getPropertyValue("height").slice(0, -2);
        let style_width = +getComputedStyle(document.getElementById('firsttile')).getPropertyValue("width").slice(0, -2);

        this.container.current.width = style_width;// + "px";
        this.container.current.height = style_height;// + "px";

        this.canvasRef.current.height =  style_height * dpi * 2;
        this.canvasRef.current.width =  style_width * dpi * 2;

        this.canvasRef.current.style.width = style_width * dpi;
        this.canvasRef.current.style.height = style_height * dpi;
        this.canvasRef.current.style.height = "32;"

        this.ctx = this.canvasRef.current.getContext('2d');

        let width = this.canvasRef.current.width;
        let height = this.canvasRef.current.height;
        const pos = {
            x: width*triCenter.x,
            y: height*triCenter.y
        };

        this.scalex = width;//width/120;
        this.scaley = height; //height/120;

        
        this.ctx.save();
        this.ctx.clearRect(0,0,width,height);
        
        if(this.state.orientation === 1){
            this.ctx.translate(width/2,height/2);
            this.ctx.rotate(180 * Math.PI / 180.0);
            this.ctx.translate(-(width/2),-(height/2));
        }
        this.ctx.translate(pos.x ,pos.y);  
        this.ctx.rotate(angle * Math.PI / 180.0);
            this.ctx.translate(-pos.x,-pos.y); 

        this.ctx.beginPath();
        this.ctx.moveTo(width/2,0+1);
        this.ctx.lineTo(0+3,height-1);
        this.ctx.lineTo(width-1,height-1);
        this.ctx.closePath();
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.fillStyle = "#000000";
        this.ctx.lineWidth =1;
        this.ctx.stroke();        
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(width/2,0);
        this.ctx.lineTo(0,height);
        this.ctx.lineTo(width,height);
        this.ctx.closePath();
        this.ctx.fillStyle = "#000000";
        this.ctx.globalCompositeOperation = 'destination-in';
        this.ctx.fill();
        this.ctx.globalCompositeOperation = 'source-over';

        this.ctx.restore();

       return angle;

    }

    draw = (angle = 0) => {
        let dpi = window.devicePixelRatio;
        let canvas = createRef(this.canvasRef);

        let style_height = +getComputedStyle(document.getElementById('firsttile')).getPropertyValue("height").slice(0, -2);
        let style_width = +getComputedStyle(document.getElementById('firsttile')).getPropertyValue("width").slice(0, -2);

        this.container.current.width = style_width;// + "px";
        this.container.current.height = style_height;// + "px";

        this.canvasRef.current.height =  style_height * dpi * 2;
        this.canvasRef.current.width =  style_width * dpi * 2;

        this.canvasRef.current.style.width = style_width * dpi;
        this.canvasRef.current.style.height = style_height * dpi;
        this.canvasRef.current.style.height = "32;"

        this.ctx = this.canvasRef.current.getContext('2d');

        let width = this.canvasRef.current.width;
        let height = this.canvasRef.current.height;
        const pos = {
            x: width*triCenter.x,
            y: height*triCenter.y
        };

        this.scalex = width;//width/120;
        this.scaley = height; //height/120;

        
        this.ctx.save();
        this.ctx.clearRect(0,0,width,height);
        
        if(this.state.orientation === 1){
            this.ctx.translate(width/2,height/2);
            this.ctx.rotate(180 * Math.PI / 180.0);
            this.ctx.translate(-(width/2),-(height/2));
        }
        this.ctx.translate(pos.x ,pos.y);  
        this.ctx.rotate(angle * Math.PI / 180.0);
            this.ctx.translate(-pos.x,-pos.y); 

        this.ctx.beginPath();
        this.ctx.moveTo(width/2,0+1);
        this.ctx.lineTo(0+3,height-1);
        this.ctx.lineTo(width-1,height-1);
        this.ctx.closePath();
        this.ctx.strokeStyle = '#00ff00';
        this.ctx.fillStyle = "#003300";
        this.ctx.lineWidth =1;
        this.ctx.stroke();        
        this.ctx.fill();
        this.drawBeziers();

        this.ctx.beginPath();
        this.ctx.moveTo(width/2,0);
        this.ctx.lineTo(0,height);
        this.ctx.lineTo(width,height);
        this.ctx.closePath();
        this.ctx.fillStyle = "#000000";
        this.ctx.globalCompositeOperation = 'destination-in';
        this.ctx.fill();
        this.ctx.globalCompositeOperation = 'source-over';

        this.ctx.restore();

        console.log("location = ",this.GetScreenCordinates(this.container.current));

        return angle;
    }

    
    rotateCW = () => {
        console.log("kaboom");
        var t1 = this.state.seg[0];
        var t2 = this.state.seg[1];
        var t3 = this.state.seg[2];
        var bez0 = {};
        var bez1 = {};
        var bez2 = {};
        var seg = this.state.seg;
        if(t1[0] === 1){
            seg[0][0] = 5;
        }else if(t1[0] === 2){
            seg[0][0] = 6;
        }else{
            seg[0][0] -= 2;
        }

        if(t1[1] === 1){
            seg[0][1] = 5;
        }else if(t1[1] === 2){
            seg[0][1] = 6;
        }else{
            seg[0][1] -= 2;
        }

        if(t2[0] === 1){
            seg[1][0] = 5;
        }else if(t2[0] === 2){
            seg[1][0] = 6;
        }else{
            seg[1][0] -= 2;
        }

        if(t2[1] === 1){
            seg[1][1] = 5;
        }else if(t2[1] === 2){
            seg[1][1] = 6;
        }else{
            seg[1][1] -= 2;
        }


        if(t3[0] === 1){
            seg[2][0] = 5;
        }else if(t3[0] === 2){
            seg[2][0] = 6;
        }else{
            seg[2][0] -= 2;
        }

        if(t3[1] === 1){
            seg[2][1] = 5;
        }else if(t3[1] === 2){
            seg[2][1] = 6;
        }else{
            seg[2][1] -= 2;
        }


        bez0 = combos[this.findBez(this.state.seg[0])];
        bez1 = combos[this.findBez(this.state.seg[1])];
        bez2 = combos[this.findBez(this.state.seg[2])];
        this.setState({
            seg: seg,
            bez0: bez0,
            bez1: bez1,
            bez2: bez2
        });

    }

    drawBeziers = () => {
        console.log('seg0 = ', this.state.segOwners[0])
        let borderw = this.borderw;
        let linew = this.linew;
        let col = "#786c44";
        switch(this.state.segOwners[0]){
            case 1:
                col = "#ff0000";
                break;
            case 2:
                col = "#00ff00";
                break;
            case 3:
                col = "#0000ff";
                break;
            default:
                col = "#786c44";
                break
        }
        this.ctx.beginPath();
        this.ctx.moveTo(+this.state.bez0.points.px1*this.scalex, +this.state.bez0.points.py1*this.scaley);
        this.ctx.bezierCurveTo(+this.state.bez0.points.cx1*this.scalex, 
            this.state.bez0.points.cy1*this.scaley, 
            this.state.bez0.points.cx2*this.scalex, 
            this.state.bez0.points.cy2*this.scaley, 
            this.state.bez0.points.px2*this.scalex, 
            this.state.bez0.points.py2*this.scaley);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.stroke();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = col;
        this.ctx.stroke();

        switch(this.state.segOwners[1]){
            case 1:
                col = "#ff0000";
                break;
            case 2:
                col = "#00ff00";
                break;
            case 3:
                col = "#0000ff";
                break;
            default:
                col = "#786c44";
                break
        }
        this.ctx.beginPath();
        this.ctx.moveTo(this.state.bez1.points.px1*this.scalex, this.state.bez1.points.py1*this.scaley);
        this.ctx.bezierCurveTo(this.state.bez1.points.cx1*this.scalex, 
            this.state.bez1.points.cy1*this.scaley, 
            this.state.bez1.points.cx2*this.scalex, 
            this.state.bez1.points.cy2*this.scaley, 
            this.state.bez1.points.px2*this.scalex, 
            this.state.bez1.points.py2*this.scaley);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.stroke();
        this.ctx.lineWidth =2;
        this.ctx.strokeStyle = col;
        this.ctx.stroke();

        switch(this.state.segOwners[2]){
            case 1:
                col = "#ff0000";
                break;
            case 2:
                col = "#00ff00";
                break;
            case 3:
                col = "#0000ff";
                break;
            default:
                col = "#786c44";
                break
        }
        this.ctx.beginPath();
        this.ctx.moveTo(this.state.bez2.points.px1*this.scalex, this.state.bez2.points.py1*this.scaley);
        this.ctx.bezierCurveTo(this.state.bez2.points.cx1*this.scalex, 
            this.state.bez2.points.cy1*this.scaley, 
            this.state.bez2.points.cx2*this.scalex, 
            this.state.bez2.points.cy2*this.scaley, 
            this.state.bez2.points.px2*this.scalex, 
            this.state.bez2.points.py2*this.scaley);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.stroke();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = col;
        this.ctx.stroke();
    }

    GetScreenCordinates = () => {
        let obj = this.container.current;
        var p = {};
        p.x = obj.offsetLeft;
        p.y = obj.offsetTop;
        while (obj.offsetParent) {
            p.x = p.x + obj.offsetParent.offsetLeft;
            p.y = p.y + obj.offsetParent.offsetTop;
            if (obj === document.getElementsByTagName("body")[0]) {
                break;
            }
            else {
                obj = obj.offsetParent;
            }
        }
        return p;
    }

    render() {
        const containerStyle = {
            height: "50%",
            width: "100%"
        };
        let bgclass = ""
        if(!this.state.show)
            bgclass = "";
        return <div className={bgclass} ref={this.container}><canvas ref={this.canvasRef} style={containerStyle}></canvas></div>
    }
}

export default TriangleTile;