import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';
import '../App.css';
import BookShelf from './BookShelf';
import _ from 'lodash';

class Shelf extends Component {
  state = {
    showSearchPage: false,
    allBooks: [],
    booksFiltered: [],
    isFiltered: false
  }
  update = this._update.bind(this);
  inDebounce = null;

  componentWillMount() {
    this._requestInit();
  }
  _update(book,shelf){
      this.props.renderLoading(true);
      BooksAPI.update(book, shelf).then(this._requestInit.bind(this));
  }
  _requestInit() {
    this.props.renderLoading(true);
    BooksAPI.getAll().then(
        allBooks => {
            this.setState({allBooks}) ;
            this.props.renderLoading(false);
        }
    );
  }

  _filtersBook(value){
      const isFiltered = value !== "";
      const {allBooks} = this.state;
      const booksFiltered = [];
      _.map(allBooks, (book)=>{
          if( book.title.toUpperCase().startsWith(value.toUpperCase()) )
            booksFiltered.push(book);
      });
      this.setState({booksFiltered, isFiltered});
  }

  _debounceFilter = (event) => {
      const query = event.target.value;
      clearTimeout(this.inDebounce);
      this.inDebounce = setTimeout(() => this._filtersBook(query), 500);
  };

  render() {
      const allBooks = this.state.booksFiltered.length ? this.state.booksFiltered : this.state.allBooks;

      return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
                <input
                    className="search-top"
                    id="query"
                    type="text"
                    onChange={this._debounceFilter}
                    placeholder="Filter your books by title"
                />
            </div>
            <div className="list-books-content">
                {  this.state.isFiltered ?
                        <BookShelf
                            title={'My books'}
                            books={ this.state.booksFiltered }
                            _updateBook={this.update}
                        />
                    :
                        <div>
                            <BookShelf
                                title={'Currently Reading'}
                                books={ _.filter(allBooks, book => book.shelf === 'currentlyReading') }
                                _updateBook={this.update}
                            />
                            <BookShelf
                                title={'Want to Read'}
                                books={ _.filter(allBooks, book => book.shelf === 'wantToRead') }
                                _updateBook={this.update}
                            />
                            <BookShelf
                                title={'Read'}
                                books={ _.filter(allBooks, book => book.shelf === 'read') }
                                _updateBook={this.update}
                            />
                        </div>
                }
            </div>
            <div>
                <div className="open-search">
                    <Link to="/search">Search</Link>
                </div>
            </div>
        </div>
      )
  }
}

export default Shelf;

Shelf.propTypes = {
    renderLoading: PropTypes.func
};
