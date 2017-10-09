import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import Book from './Book';
import _ from 'lodash';

export default class BookShelf extends Component {

    render() {

        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        { _.map(this.props.books, (book, index) =>
                            < Book book={book} key={book.id}
                                updateBook={(book, shelf)=>this.props._updateBook(book,shelf)}
                                />
                        ) }
                    </ol>
                </div>
            </div>
        );
    }
}

BookShelf.propTypes = {
    title: PropTypes.string,
    books: PropTypes.array,
    updateBook: PropTypes.func
};
