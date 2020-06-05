import React, { useState } from 'react';
// JSX: Sintaxe de XML dentro do Javascript (transpila em código javascript React)
import './App.css';

import Header from './Header';

function App() {

  // Estado do componente: armazenar informação dentro do componente -- informações mantidas dentro do próprio componente
  // Fica acessível dentro de outros componentes em tempo real
  const [ counter, setCounter ] = useState(0); //retorna [valor do estado, função para atualizar valor do estado]
  //imutabilidade, para alterar um estado, não pode alterar diretamete, e sim criar um novo estado com as alterações que queremos

  function handleButtonClick(){
    //precisa ser utilizado o estado caso queira que o componente reflita a alteração
    setCounter(counter + 1); //utiliza o método setCounter criado no momento do useState para setar o novo valor para o estado counter
  }

  return (
    <div>
      <Header title="Ecoleta" />
      <h2>{counter}</h2>
      <button type="button" onClick={handleButtonClick}>Aumentar</button>
    </div>
  );
}

export default App;
