import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../Components/CardList.js';
import SearchBox from '../Components/SearchBox.js';
import Scroll from '../Components/Scroll.js';
import './App.css';
import ErrorBoundry from '../Components/ErrorBoundry';

import { setSearchField } from '../actions'

//Shows what piece of state need to listen to and send down as props
const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

//listen to props that are actions and which ones need to be dispatched
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }

    render() {
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase());
        })
        return !robots.length ?
            <h1>Loading</h1> :
            (

                <div className='tc' >
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>

            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);