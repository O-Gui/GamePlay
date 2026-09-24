import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';

export function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Segura a tela por 2 segundos e redireciona para o login
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Usa diretamente a imagem splash-icon.png que já tem o logo completo */}
      <Image 
        source={require('../../assets/images/splash-icon.png')} 
        style={styles.logo}
        resizeMode="contain" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1647', // A cor exata de fundo definida por si
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250, // Ajuste este valor se a imagem ficar muito grande ou pequena
    height: 150,
  },
});