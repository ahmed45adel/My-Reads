import React from 'react';

class SearchButton extends React.Component {
    render() {
        return (
            <div className="open-search">
                <button onClick={() => this.props.showSearchPage(true)}>Add a book</button>
            </div>
        )
    }
}
export default SearchButton;