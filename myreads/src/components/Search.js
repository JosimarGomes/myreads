import React, {PureComponent} from 'react';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import '../App.css';
import _ from 'lodash';



class Search extends PureComponent {

    state = {
        allBooks: [],
        mybooks: [],
        title: '',
    };
    inDebounce = null;

    componentWillMount() {
        this.props.renderLoading();
        BooksAPI.getAll().then(
            mybooks => {
                this.setState({mybooks});
                this.props.renderLoading(false);
                this._renderSugestions();
            }
        );
    }
    _search(query) {
        if(!query) return;
        this.props.renderLoading(true);
        BooksAPI.search(query).then(
            allBooks => {

                if(!allBooks.error) {
                    allBooks = this._normalizeshelf(allBooks);
                    this.setState({allBooks, title:'Search results...'});
                }
                this.props.renderLoading(false);
            }
        );
    }
    _renderSugestions() {
        this.props.renderLoading(true);
        const {mybooks} =this.state;
        const arrWords = [];

        _.map(mybooks, (book)=>{
            let arrTitle = book.title.split(" ");
            _.map(arrTitle, (word)=>{
                arrWords.push(word);
            })
        });
        const sortedIndice = Math.floor(Math.random() * arrWords.length);
        const wordSugestion = arrWords[sortedIndice];

        BooksAPI.search(wordSugestion).then(
            allBooks => {
                if(allBooks.error) {
                    this._renderSugestions();
                }
                else {
                    _.remove(allBooks, (book, index)=>{
                        return index > 6;
                    })
                    allBooks = this._normalizeshelf(allBooks);

                    this.setState({allBooks, title:'Suggestions for you...'});
                    this.props.renderLoading(false);
                };

            }
        );

        return;
    }

    _update(book,shelf){
        this.props.renderLoading(true);
        BooksAPI.update(book, shelf).then( ()=>{
            this.props.renderLoading(false);
        });
    }

    _normalizeshelf(allBooks){
        _.map(allBooks, (book)=>{
            _.map(this.state.mybooks, (mybook)=>{
                if(book.id === mybook.id)
                    book.shelf = mybook.shelf;
            })
        })

        return allBooks
    }
    _debounceSearch = (event) => {
        const query = event.target.value;
        clearTimeout(this.inDebounce);
        this.inDebounce = setTimeout(() => this._search(query), 1000);
    };

    render() {

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" />
                    <div className="search-books-input-wrapper">
                        <input id="query"
                            type="text"
                            onChange={ this._debounceSearch }
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    < BookShelf
                        title={this.state.title}
                        books={ this.state.allBooks || [] }
                        _updateBook={(book,shelf)=>this._update(book,shelf)}
                    />
                </div>
            </div>
        )
    }

}

export default Search;
