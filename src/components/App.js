import React, { useState } from 'react';
import Header from '../core/components/header/header';
import TicTacToe from '#core/components/tic-tac-toe/tic-tac-toe'

const App = () => {

    return (
        <div>
            <Header />
            
            <br></br>
            <TicTacToe></TicTacToe>
        </div>
    );
};

export default App;
