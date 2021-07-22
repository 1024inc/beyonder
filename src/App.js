import React from 'react';
import Home from './Home';
import Game from './Game';


const pageToShow = (pageName) => {
    if (pageName === 'Home') return <Home />;
    if (pageName === 'Game') return <Game />;
    return <div>Not Found</div>;
};


const App = ({ pageName }) => {
    return (
        <div>{pageToShow(pageName)}</div>
    );
};


export default App;


