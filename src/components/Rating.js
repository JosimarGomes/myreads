import React, {Component} from 'react';
import '../App.css';

export default class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    componentWillMount() {
        this.setState({value: this.props.value})
    }

    _onChangeRating(value) {
        this.setState({value})
        this.props.onChangeRating(value)
    }
    render() {
        const {value} = this.state;
        return (
            <fieldset className="rating" defaultValue="4">
                <input type="radio" value="5"   onChange={()=>null} checked={value === 5 ? true : false} /><label onClick={()=>this._onChangeRating(5)} className="full" title="Um dos melhores livros que li"></label>
                <input type="radio" value="4.5" onChange={()=>null} checked={value === 4.5 ? true : false} /><label onClick={()=>this._onChangeRating(4.5)} className="half" title="Um dos melhores livros que li"></label>
                <input type="radio" value="4"   onChange={()=>null} checked={value === 4 ? true : false} /><label onClick={()=>this._onChangeRating(4)} className="full" title="Valeu muito a pena"></label>
                <input type="radio" value="3.5" onChange={()=>null} checked={value === 3.5 ? true : false} /><label onClick={()=>this._onChangeRating(3.5)} className="half" title="Valeu muito a pena"></label>
                <input type="radio" value="3"   onChange={()=>null} checked={value === 3 ? true : false} /><label onClick={()=>this._onChangeRating(3)} className="full" title="Gostei"></label>
                <input type="radio" value="2.5" onChange={()=>null} checked={value === 2.5 ? true : false} /><label onClick={()=>this._onChangeRating(2.5)} className="half" title="Gostei"></label>
                <input type="radio" value="2"   onChange={()=>null} checked={value === 2 ? true : false} /><label onClick={()=>this._onChangeRating(2)} className="full" title="Gostei"></label>
                <input type="radio" value="1.5" onChange={()=>null} checked={value === 1.5 ? true : false} /><label onClick={()=>this._onChangeRating(1.5)} className="half" title="Interessante"></label>
                <input type="radio" value="1"   onChange={()=>null} checked={value === 1 ? true : false} /><label onClick={()=>this._onChangeRating(1)} className="full" title="Nada mal"></label>
                <input type="radio" value="0.5" onChange={()=>null} checked={value === 0.5 ? true : false} /><label onClick={()=>this._onChangeRating(0.5)} className="half" title="Nada mal"></label>
            </fieldset>
        )
    }
}
