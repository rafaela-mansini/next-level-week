import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Picker } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';
import Axios from 'axios';

interface UfIbgeResponse{
  sigla: string
}
interface CityIbgeResponse{
  nome: string
}

const Home = () => {
  const navigation = useNavigation(); // ela possui a função navigate que serve para navegar de uma tela para outra


  const [ uf, setUf ] = useState<string[]>([]);
  const [ city, setCity ] = useState<string[]>([]);

  const [ selectedUf, setSelectedUf ] = useState("Selecione");
  const [ selectedCity, setSelectedCity ] = useState("Selecione");

  useEffect(() => {
    Axios.get<UfIbgeResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);
        setUf(ufInitials);
      });
  }, []);

  useEffect(() => {
    if(selectedUf == 'Selecione') return;
    
    Axios.get<CityIbgeResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);
        setCity(cityNames);
      })
  }, [handleSelectedUf]);


  function handleNavigateToPoints(){
    navigation.navigate('Points', {
      selectedUf, selectedCity
    }); 
  }

  function handleSelectedUf(uf: string){
    setSelectedUf(uf);
    setSelectedCity('Selecione');
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={ Platform.OS === 'ios' ? 'padding' : undefined }>
      <ImageBackground 
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}

      >
          <View style={styles.main}>
            <Image source={require('../../assets/logo.png')} />
            <View>
              <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
              <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
            </View> 
          </View>

          <View style={styles.footer}>
            {/* <TextInput 
              style={styles.input}
              placeholder="Digite a UF"
              value={uf}
              maxLength={2}
              autoCapitalize="characters"
              autoCorrect={false}
              onChangeText={text => setUf(text)}
            /> */}
            {/* <TextInput 
              style={styles.input}
              placeholder="Digite a Cidade"
              value={city}
              autoCorrect={false}
              onChangeText={ setCity }
            /> */}
            
            <Picker
              selectedValue={selectedUf}
              style={styles.input}
              onValueChange={(itemValue) => handleSelectedUf(itemValue)}
            >
              <Picker.Item label="Selecione uma UF" value="Selecione" />
              {
                uf.map(uf => (
                  <Picker.Item key={uf} label={uf} value={uf} />
                ))
              }
            </Picker>

            <Picker
              selectedValue={selectedCity}
              style={styles.input}
              onValueChange={(itemValue) => setSelectedCity(itemValue)}
            >
              <Picker.Item label="Selecione uma Cidade" value="Selecione" />
              {
                city.map(city => (
                  <Picker.Item key={city} label={city} value={city} />
                ))
              }
            </Picker>
              
            <RectButton style={styles.button} onPress={handleNavigateToPoints}>
              <View style={styles.buttonIcon}>
                <Text>
                  <Icon name="arrow-right" color="#FFF" size={24} />
                </Text>
              </View>
              <Text style={styles.buttonText}>Entrar</Text>
            </RectButton>
          </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );    
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu-Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto-Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto-Bold',
      fontSize: 16,
    }
});

export default Home;