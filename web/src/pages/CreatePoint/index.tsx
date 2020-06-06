import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';
import api from '../../services/api';

import Logo from '../../assets/logo.svg';

import './styles.css';

// interface representação do formato que o objeto vai ter
interface Item{
    id: number;
    title: string;
    image_url: string;
}
interface IBGEUFResponse {
    sigla: string;
}
interface IBGECityResponse {
    nome: string;
}

const CreatePoint = () => {
    // Estado serve para armazenar informações dentro do componente
    // Estados para um array ou objeto: manualmente informar o tipo de variável que vai ser armazenada dentro dela - para isso fazer uma interface
    const [ items, setItems ] = useState<Item[]>([]); // informa que o objeto que vai ser salvo dentro do estado é do tipo de Item que foi criado na interface
    const [ ufs, setUfs ] = useState<string[]>([]);
    const [ cities, setCities ] = useState<string[]>([]);
    const [ selectedUf, setSelectedUf ] = useState('0');
    const [ selectedCity, setSelectedCity ] = useState('0');
    const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0, 0]);
    const [ selectedPosition, setSelectedPosition ] = useState<[number, number]>([0, 0]);

    // Parameatros: 1 - Qual função quer executar 2 - Quando quer executar;
    // Se deixar parametro de quando executar vazio, ele vai realizar apenas uma vez;
    useEffect( () => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, [] );

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then(response => {
                const ufInitials = response.data.map(uf => uf.sigla);
                setUfs(ufInitials);
            });
    }, []);

    useEffect(() => {
        if(selectedUf == '0') return;
        // carregar cidades sempre que a UF mudar
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => city.nome);
                setCities(cityNames);
            });
    }, [selectedUf]);

    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>){ // changeEvent é a mudança de um valor || tem que passar qual é o tipo de elemento que estamos alterando
        const uf = event.target.value;
        setSelectedUf(uf);
    }
    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;
        setSelectedCity(city);
    }
    function handleMapClick(event: LeafletMouseEvent){
        console.log(event.latlng);
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

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

                    <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
                        <TileLayer 
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        /> 
                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select 
                                onChange={handleSelectedUf}
                                value={selectedUf}
                                name="uf"
                                id="uf"
                            >
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select
                                value={selectedCity}
                                onChange={handleSelectedCity} 
                                name="city" 
                                id="city"
                            >
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
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