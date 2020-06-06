import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
    //o exact na rota da Home é para verificação exata da rota, se não inserir, ele vai pegar outras rotas que começam com /rota....
    return(
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/create-point" />
        </BrowserRouter>
    );
}

export default Routes;