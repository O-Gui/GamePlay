import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Aqui importaremos o arquivo de rotas em breve (ex: import { Routes } from './src/routes')
import { Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#0A1033' }}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent 
      />
      
      {/* O NavigationContainer vai envelopar todas as nossas rotas */}
      <NavigationContainer>
        {/* Placeholder para a validação inicial até criarmos o src/routes */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#FFF', fontSize: 18 }}>GamePlay - Setup Inicial</Text>
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}