import React, { useEffect, useState } from 'react';
import  { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';

import Logo from '../../assets/logo.svg';

import './styles.css';

// interface representação do formato que o objeto vai ter
interface Item{
    id: number;
    title: string;
    image_url: string;
}

const CreatePoint = () => {
    // Estado serve para armazenar informações dentro do componente
    // Estados para um array ou objeto: manualmente informar o tipo de variável que vai ser armazenada dentro dela - para isso fazer uma interface
    const [ items, setItems ] = useState<Item[]>([]); // informa que o objeto que vai ser salvo dentro do estado é do tipo de Item que foi criado na interface

    // Parameatros: 1 - Qual função quer executar 2 - Quando quer executar;
    // Se deixar parametro de quando executar vazio, ele vai realizar apenas uma vez;
    useEffect( () => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, [] );

    return(
        <div id="page-create-point">
            <header>
                <img src={Logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft /> Voltar para Home
                </Link>
            </header>

            <form>
                <h1>Cadastro do<br/>ponto de coleta</h1>
                <fieldset>
                    <legend><h2>Dados</h2></legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text" name="name" id="name" />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input type="text" name="whatsapp" id="whatsapp"/>
                        </div>
                    </div>

                </fieldset>
                
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={[51.505, -0.09]} zoom={15}>
                        <TileLayer 
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        /> 
                        <Marker position={[51.505, -0.09]} />
                    </Map>

                    <div className="field-group">
                        
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                            </select>
                        </div>

                    </div>
                    
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    {/* Sempre que utilizar o map no react é necessário colocar uma propriedade key unico para encontrar e atualizar de forma rapida o item  */}
                    <ul className="items-grid">
                        {items.map(item => (
                            <li key={item.id}>
                                <img src={item.image_url} alt="{item.title}" />
                                <span>{item.title}</span>
                            </li>
                        ))}
                        
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>

            </form>
        </div>
    );
}

export default CreatePoint;