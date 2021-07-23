import React from 'react';
import Home from './Home';
import Game from './Game';


export const ConfigContext = React.createContext();
const configValue = {
 userName: '',
 email: ''
};

const pageToShow = (pageName) => {
    let handleCallback = (username, email) => {
        configValue.userName = username
        configValue.email = email
    }

    if (pageName === 'Home') return <Home login={handleCallback}/>;
    if (pageName === 'Game') return <Game />;
    return <div>Not Found</div>;
};



const App = ({ pageName }) => {
    return (
        <ConfigContext.Provider value={configValue} >
            <div>{pageToShow(pageName)}</div>
        </ConfigContext.Provider>
    );
};


export default App;


