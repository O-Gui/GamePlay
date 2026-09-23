import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Segura a tela por 2 segundos e redireciona para o login
    const timer = setTimeout(() => {
      // Como estamos no Expo Router, isso vai procurar o arquivo src/app/login.tsx
      router.replace('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <View style={styles.logoWrapper}>
        {/* Agora usamos uma imagem real para o triângulo do Photoshop */}
        <Image 
          source={require('../../assets/splash/splash_background.png')} // <-- Coloque sua imagem aqui
          style={styles.triangle}
          resizeMode="contain" // Garante que a imagem se ajuste ao container
        />

        {/* Texto da logo */}
        <View style={styles.textRow}>
          <Text style={styles.textGame}>Game</Text>
          <Text style={styles.textPlay}>Play</Text>
        </View>
      </View>
    </View>
  );
}

const NAVY = '#101A34';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Importante para o posicionamento da imagem de fundo
  },
  triangle: {
    position: 'absolute', // Fica atrás do texto
    width: 200, // Ajuste o tamanho conforme necessário
    height: 150, // Ajuste o tamanho conforme necessário
    left: -50, // Posiciona a imagem à esquerda, como no design original
    opacity: 0.08, // Mantém a transparência definida no design
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textGame: {
    fontSize: 42,
    fontWeight: '800',
    color: '#E8ECF4',
    letterSpacing: 0.5,
    zIndex: 1, // Garante que o texto fique acima da imagem
  },
  textPlay: {
    fontSize: 42,
    fontWeight: '800',
    color: '#E63950',
    letterSpacing: 0.5,
    zIndex: 1, // Garante que o texto fique acima da imagem
  },
});