import { useRouter } from 'expo-router'; // <-- Importação do Expo Router
import {
    Image,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Assets referenciados com os nomes exatos dos teus ficheiros
const backgroundUnion = require('../../assets/images/backgorundUnion.png');
const personagem1 = require('../../assets/images/personagem1.png');
const discordIcon = require('../../assets/images/logo discord.png');

// Cores definidas localmente para manter o teu StyleSheet intacto
const colors = {
  navy: '#0A1033',
  white: '#FFFFFF',
  grayLight: '#ABB1CC',
  red: '#E51C44',
  redDark: '#991F36'
};

export function LoginScreen() {
  const router = useRouter(); // <-- Hook de navegação do Expo Router

  function handleDiscordLogin() {
    // Fluxo mockado: navega para a rota /home
    router.replace('/home');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} translucent />

      <ImageBackground
        source={backgroundUnion}
        style={styles.backgroundArt}
        resizeMode="cover"
      >
        <Image source={personagem1} style={styles.character} resizeMode="contain" />
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.title}>
          Conecte-se{'\n'}e organize suas{'\n'}jogatinas
        </Text>

        <Text style={styles.subtitle}>
          Crie grupos para jogar seus games favoritos com seus amigos
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={handleDiscordLogin} // Chama a função que usa o router.replace
        >
          <View style={styles.discordIconWrapper}>
            <Image source={discordIcon} style={styles.discordIcon} resizeMode="contain" />
          </View>
          <Text style={styles.buttonText}>Entrar com Discord</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  backgroundArt: {
    height: '48%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  character: {
    width: '85%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 38,
  },
  subtitle: {
    color: colors.grayLight,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 21,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 14,
    marginTop: 32,
    overflow: 'hidden',
  },
  discordIconWrapper: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.redDark,
  },
  discordIcon: {
    width: 26,
    height: 26,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 56, // compensa o ícone à esquerda pra centralizar o texto
  },
});