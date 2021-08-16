import { Component } from "react";
import TriangleTile from '../TriangleTile/TriangleTile';

class AlternateTile extends Component {
    render() {
        return <div className="alternatetile-div">
            <TriangleTile orientation="1" scalex="0.75" scaley="0.75"></TriangleTile>
        </div>
    }
}
export default AlternateTile;