import React from 'react';

// para receber parametros, melhor visualizado se utilizar o compontente como constante
// React.FC (Function Component) Componente escrito em formato de função -- é um objeto generico -- tipo que pode receber um parametro que informa quais propriedades ele pode receber

// interface define a tipagem de um objeto que não tem um tipo pre definido.
// criado uma interface chamada HeaderProps que é um objeto que contém title, caso não seja obrigatório o parametro, deixar como: title?: string
// enviar como parametro para a React.FC
interface HeaderProps {
    title: string;    
} 

const Header: React.FC<HeaderProps> = (props) => {
    return(
        // chaves dentro do html significa que insere algo de javascript no HTML
        <header>
            <h1>{ props.title }</h1>
        </header>
    );
}

export default Header;