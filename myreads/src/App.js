import React, {Component} from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Shelf from './components/Shelf';
import Search from './components/Search';
import Loader from './components/Loader';

class BooksApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  _loading(loading=true) {
    this.setState({loading})
  }

  render() {
    return (
        <BrowserRouter>
          <div className="app">
            < Loader show={this.state.loading} />
            <Route exact path="/" render={()=> <Shelf renderLoading={(loading)=>this._loading(loading)} />} />
            <Route exact path="/search" render={()=><Search renderLoading={(loading)=>this._loading(loading)} />} />
          </div>
        </BrowserRouter>
    )
  }
}

export default BooksApp
