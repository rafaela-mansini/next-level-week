import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';
import { useFonts } from '@use-expo/font';

import Routes from './src/routes';

export default function App() {
  // obrigatoriamente, não podemos retornar dois componentes, eles devem estar encapsulados por um maior. Para não utilizar a <View> utiliza-se o conceito de Fragment que é abrir e fechar a tag sem nenhum conteudo dentro
  
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Ubuntu-Bold': require('./assets/fonts/Ubuntu/Ubuntu-Bold.ttf'),
  });

  if(!fontsLoaded){
    return <AppLoading />
  }
  
  //Statusbar: backgroundcolor transparent, deixa a barra sem cor alguma e o translucent utiliza o statusbar para inserir conteúdo
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}