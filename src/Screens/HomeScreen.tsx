import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../theme/colors';
import { mockMatches, mockCategories, Match } from '../utils/mockHome';

const avatarUser = require('../../assets/images/perfil de usuario tiago.png');

export function HomeScreen() {
  const router = useRouter();
  // Estado para controlar a visibilidade do modal de saída
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  function handleAddPress() {
    router.push('/agendar');
  }

  function handleLogout() {
    setShowLogoutModal(false);
    // Substitui todo o histórico e volta para o Login
    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} translucent={false} />

      {/* Header */}
      <View style={styles.header}>
        {/* Avatar agora é clicável para abrir o modal de Sair */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => setShowLogoutModal(true)}>
          <Image source={avatarUser} style={styles.avatar} />
        </TouchableOpacity>
        
        <View style={styles.headerTexts}>
          <Text style={styles.greeting}>
            Olá, <Text style={styles.greetingName}>Guilherme</Text>
          </Text>
          <Text style={styles.subGreeting}>Hoje é dia de vitória</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.85}
          onPress={handleAddPress}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Categorias */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesRow}
      >
        {mockCategories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard} activeOpacity={0.85}>
            <Image source={category.icon} style={styles.categoryIcon} resizeMode="contain" />
            <Text style={styles.categoryLabel}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de partidas agendadas */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Partidas agendadas</Text>
        <Text style={styles.listTotal}>Total {mockMatches.length}</Text>
      </View>

      <FlatList
        data={mockMatches}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <MatchRow match={item} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal de Sair (Logout) */}
      <Modal transparent visible={showLogoutModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Deseja sair do <Text style={styles.modalTitleBold}>GamePlay</Text>?
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButtonNo} 
                activeOpacity={0.8} 
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.modalButtonNoText}>Não</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalButtonYes} 
                activeOpacity={0.8} 
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonYesText}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// O MatchRow agora também tem o useRouter para navegar para os Detalhes
function MatchRow({ match }: { match: Match }) {
  const router = useRouter();
  const isHost = match.status === 'Anfitrião';

  return (
    <TouchableOpacity 
      style={styles.matchRow} 
      activeOpacity={0.7}
      onPress={() => router.push('/detalhes')} // Roteamento para a tela de detalhes
    >
      <Image source={match.gameLogo} style={styles.matchThumb} resizeMode="cover" />

      <View style={styles.matchInfo}>
        <View style={styles.matchTopLine}>
          <Text style={styles.matchTitle}>{match.title}</Text>
          <Text style={styles.matchCategory}>{match.category}</Text>
        </View>

        <View style={styles.matchBottomLine}>
          <Text style={styles.matchDate}>
            📅 {match.date} às {match.time}
          </Text>
          <Text style={[styles.matchStatus, isHost ? styles.hostColor : styles.guestColor]}>
            {isHost ? '● Anfitrião' : '● Visitante'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy, paddingTop: 16 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 24 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.navyDark },
  headerTexts: { flex: 1, marginLeft: 12 },
  greeting: { color: colors.white, fontSize: 18, fontWeight: '400' },
  greetingName: { fontWeight: '800' },
  subGreeting: { color: colors.grayLight, fontSize: 13, marginTop: 2 },
  addButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: colors.white, fontSize: 22, fontWeight: '700', marginTop: -2 },
  categoriesRow: { paddingHorizontal: 20, paddingVertical: 20, gap: 12 },
  categoryCard: { width: 96, height: 108, borderRadius: 16, backgroundColor: '#141B3B', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  categoryIcon: { width: 40, height: 40, marginBottom: 10 },
  categoryLabel: { color: colors.white, fontSize: 12, fontWeight: '600', textAlign: 'center' },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 8 },
  listTitle: { color: colors.white, fontSize: 16, fontWeight: '700' },
  listTotal: { color: colors.grayLight, fontSize: 13 },
  listContent: { paddingHorizontal: 20, paddingBottom: 24 },
  matchRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(255,255,255,0.08)' },
  matchThumb: { width: 52, height: 52, borderRadius: 12, backgroundColor: colors.navyDark },
  matchInfo: { flex: 1, marginLeft: 14 },
  matchTopLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  matchTitle: { color: colors.white, fontSize: 15, fontWeight: '700' },
  matchCategory: { color: colors.grayLight, fontSize: 12 },
  matchBottomLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  matchDate: { color: colors.grayLight, fontSize: 12 },
  matchStatus: { fontSize: 12, fontWeight: '600' },
  hostColor: { color: colors.red },
  guestColor: { color: '#3DDC84' },
  
  // Estilos do Modal de Logout
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.navy,
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  modalTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 24,
  },
  modalTitleBold: {
    fontWeight: '800',
    color: colors.red, // Destaque na palavra GamePlay
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  modalButtonNo: {
    flex: 1,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  modalButtonNoText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
  modalButtonYes: {
    flex: 1,
    height: 56,
    borderRadius: 8,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonYesText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
});