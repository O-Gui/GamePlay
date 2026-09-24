import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../theme/colors';

const bannerImg = require('../../assets/images/backgorund.png'); 
const discordIcon = require('../../assets/images/logo-discord.png');

const players = [
  {
    id: '1',
    name: 'Tiago Luchtenberg',
    status: 'Disponível',
    avatar: require('../../assets/images/perfil-de-usuario-tiago.png'),
  },
  {
    id: '2',
    name: 'Rodrigo Gonçalves',
    status: 'Ocupado',
    avatar: require('../../assets/images/usuario-rodrigo.jpg'), // <-- Fica em .jpg
  },
  {
    id: '3',
    name: 'Diego Fernandes',
    status: 'Ocupado',
    avatar: require('../../assets/images/usuario-diego.png'), // <-- Volta para .png
  },
];
export function ServerDetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} translucent={false} />

      {/* Header Fixo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={styles.headerButton}>
          <Feather name="arrow-left" size={24} color={colors.white} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Detalhes</Text>
        
        <TouchableOpacity activeOpacity={0.7} style={styles.headerButton}>
          <Feather name="share-2" size={24} color={colors.red} />
        </TouchableOpacity>
      </View>

      {/* Banner do Jogo */}
      <ImageBackground source={bannerImg} style={styles.banner} resizeMode="cover">
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Lendários</Text>
          <Text style={styles.bannerDescription}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
          </Text>
        </View>
      </ImageBackground>

      {/* Título da Lista de Jogadores */}
      <View style={styles.playersHeader}>
        <Text style={styles.playersTitle}>Jogadores</Text>
        <Text style={styles.playersTotal}>Total 3</Text>
      </View>

      {/* Lista de Jogadores */}
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.playerCard}>
            <Image source={item.avatar} style={styles.playerAvatar} />
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{item.name}</Text>
              <View style={styles.statusRow}>
                <View 
                  style={[
                    styles.statusBullet, 
                    { backgroundColor: item.status === 'Disponível' ? '#3DDC84' : colors.red }
                  ]} 
                />
                <Text style={styles.playerStatus}>{item.status}</Text>
              </View>
            </View>
          </View>
        )}
      />

      {/* Botão Fixo no Rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} activeOpacity={0.85}>
          <View style={styles.discordIconWrapper}>
            <Image source={discordIcon} style={styles.discordIcon} resizeMode="contain" />
          </View>
          <Text style={styles.buttonText}>Entrar na partida</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 24,
    marginTop: 70, 
    height: 60,
  },
  headerButton: { width: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: colors.white, fontSize: 18, fontWeight: '700' },
  banner: { width: '100%', height: 234, justifyContent: 'flex-end' },
  bannerContent: { 
    paddingHorizontal: 24, 
    paddingBottom: 24, 
    backgroundColor: 'rgba(10, 16, 51, 0.4)' 
  },
  bannerTitle: { color: colors.white, fontSize: 28, fontWeight: '700', marginBottom: 8 },
  bannerDescription: { color: colors.white, fontSize: 13, lineHeight: 21 },
  playersHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 24, 
    marginTop: 24, 
    marginBottom: 16 
  },
  playersTitle: { color: colors.white, fontSize: 18, fontWeight: '700' },
  playersTotal: { color: colors.grayLight, fontSize: 13 },
  listContent: { paddingHorizontal: 24, paddingBottom: 100 },
  playerCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)'
  },
  playerAvatar: { width: 48, height: 48, borderRadius: 8, backgroundColor: colors.navyDark },
  playerInfo: { marginLeft: 16 },
  playerName: { color: colors.white, fontSize: 15, fontWeight: '700', marginBottom: 4 },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusBullet: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  playerStatus: { color: colors.grayLight, fontSize: 13 },
  footer: { 
    paddingHorizontal: 24, 
    paddingBottom: 32, 
    paddingTop: 16,
    backgroundColor: colors.navy 
  },
  button: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.red, 
    borderRadius: 8, 
    height: 56,
    overflow: 'hidden',
    marginBottom: 50,
  },
  discordIconWrapper: { 
    width: 56, 
    height: 56, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: colors.redDark 
  },
  discordIcon: { width: 24, height: 24 },
  buttonText: { 
    flex: 1, 
    textAlign: 'center', 
    color: colors.white, 
    fontSize: 15, 
    fontWeight: '700', 
    marginRight: 56 
  },
});