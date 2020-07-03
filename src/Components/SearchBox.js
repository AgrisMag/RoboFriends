import React from 'react';

const SearchBox = ({ searchField, searchChange }) => {
    return (
        <div className='pa2'>
            <input
                className='pa3 ba b--blue bg-lightest-blue'
                type="search"
                placeholder="Search robots"
                onChange={searchChange}
            />
        </div>
    )
}

export default SearchBox;