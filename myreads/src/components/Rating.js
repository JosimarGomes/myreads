import React, {Component} from 'react';
import '../App.css';
import Input from './Input';

export default class Rating extends Component {
    state = {
        value: ""
    }

    componentWillMount() {
        this.setState({value: this.props.value})
    }

    _onChangeRating(value) {
        this.setState({value})
        this.props.onChangeRating(value)
    }
    render() {

        const ratings = [
            { rate: 5, title: 'Um dos melhores livros que já li!' },
            { rate: 4, title: 'Valeu muito a pena!' },
            { rate: 3, title: 'Gostei!' },
            { rate: 2, title: 'Gostei!' },
            { rate: 1, title: 'Nada mal!' },
        ];

        const {value} = this.state;
        return (
            <fieldset className="rating" defaultValue="4">
                { ratings.map( (item, index)=><Input key={index} value={value} {...item} onChangeRating={(rate)=>this._onChangeRating(rate)}/> ) }
            </fieldset>
        )
    }
}
