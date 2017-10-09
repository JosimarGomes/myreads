import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import Rating from './Rating';
import _ from 'lodash';

export default class Book extends Component {

    _updateBook(book,shelf) {
        this.props.updateBook(book,shelf);
        // BooksAPI.update(book, shelf).then( ()=>{
        //     this.props.reloadShelf();
        // });
    }


    _updateRating(rating) {
        const { book } = this.props;
        book.averageRating = rating;
        // this._updateBook(book, book.shelf)
    }

    render() {
        const { book } = this.props;
        return(
            <li key={book.key} id={book.id}>
                <div className="book flip-left">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail || null}")` }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={book.shelf || 'none'} onChange={ (event)=> this._updateBook(book,event.target.value) } >
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{ _.map(book.authors, (name, index)=> <p key={index}>{name}</p>) }</div>
                    < Rating value={book.averageRating} onChangeRating={(rating)=>this._updateRating(rating)} />
                </div>
            </li>
        );
    }

}

Book.propTypes = {
    book: PropTypes.object,
    onUpdateBook: PropTypes.func
};
