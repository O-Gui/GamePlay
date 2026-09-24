import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// Usando o nome exato que está na sua pasta (com o erro de digitação original)
const backgroundUnion = require('../../assets/images/backgorundUnion.png');
const personagem1 = require('../../assets/images/degrade.png');
const discordIcon = require('../../assets/images/logo-discord.png');

const colors = {
  navy: '#0A1033',
  white: '#FFFFFF',
  graylight: '#ABB1CC',
  red: '#E51C44',
  redDark: '#991F36'
};

export function LoginScreen() {
  const router = useRouter();

  function handleDiscordLogin() {
    router.replace('/home');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Área das imagens: Container apenas para empilhar as artes */}
      <View style={styles.imagesContainer}>
        <Image 
          source={backgroundUnion} 
          style={styles.backgroundLines} 
          resizeMode="cover" 
        />
        <Image 
          source={personagem1} 
          style={styles.character} 
          resizeMode="contain" 
        />
      </View>

      {/* Textos e Botão */}
      <View style={styles.content}>
        <Text style={styles.title}>
          Conecte-se{'\n'}
          e organize suas{'\n'}
          jogatinas
        </Text>

        <Text style={styles.subtitle}>
          Crie grupos para jogar seus games{'\n'}favoritos com seus amigos
        </Text>

        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleDiscordLogin}>
          <View style={styles.iconWrapper}>
            <Image source={discordIcon} style={styles.icon} resizeMode="contain" />
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
    backgroundColor: colors.navy, // BACKGROUND É SÓ COR AQUI!
  },
  imagesContainer: {
    width: '100%',
    height: 420,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
  },
  backgroundLines: {
    position: 'absolute', // Coloca as linhas vermelhas coladas no fundo
    width: '100%',
    height: '100%',
  },
  character: {
    width: '100%',
    height: 360, // Ajusta o tamanho do lutador
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -20,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 40,
    marginBottom: 16,
  },
  subtitle: {
    color: colors.graylight,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 40,
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: colors.red,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: colors.redDark,
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonText: {
    flex: 1,
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 56,
  }
});