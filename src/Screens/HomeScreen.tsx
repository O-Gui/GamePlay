import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

// Cores exatas do design
const colors = {
  navy: '#0A1033',
  secondaryNavy: '#1D2746', 
  white: '#FFFFFF',
  gray: '#ABB1CC',
  red: '#E51C44',
  green: '#32BD50'
};

// 1. Categorias (Scroll horizontal)
const categories = [
  { id: '1', title: 'Ranqueada', icon: require('../../assets/images/icon-ranqueada.png') },
  { id: '2', title: 'Duelo 1x1', icon: require('../../assets/images/duelo.png') },
  { id: '3', title: 'Diversão', icon: require('../../assets/images/icone-diversão.png') }, 
];

// 2. Lista completa de partidas agendadas (todos os jogos integrados)
const matches = [
  {
    id: '1', title: 'Lendários', category: 'Ranqueada', date: '18/06 às 21:00h', isHost: true,
    image: require('../../assets/images/logo-lol.png')
  },
  {
    id: '2', title: 'Rumo ao topo', category: '1x1', date: '20/06 às 09:00h', isHost: true,
    image: require('../../assets/images/logo-cs.png')
  },
  {
    id: '3', title: 'Bora queimar tudo', category: 'Ranqueada', date: '20/06 às 14:20h', isHost: true,
    image: require('../../assets/images/logo-apex.png')
  },
  {
    id: '4', title: 'Yeah, boy', category: 'Diversão', date: '23/06 às 19:00h', isHost: false,
    image: require('../../assets/images/logo-red-dead-redeption.png')
  },
  {
    id: '5', title: 'Valorosos', category: 'Diversão', date: '18/06 às 21:00h', isHost: true,
    image: require('../../assets/images/logo-valorant.png')
  },
  {
    id: '6', title: 'Rolezão Monstro', category: 'Diversão', date: '25/06 às 20:00h', isHost: false,
    image: require('../../assets/images/logo-GTA5.png')
  },
  {
    id: '7', title: 'Construtores', category: 'Diversão', date: '26/06 às 15:00h', isHost: false,
    image: require('../../assets/images/logo-minecraft.png')
  },
  {
    id: '8', title: 'Battle Insane', category: 'Ranqueada', date: '28/06 às 22:00h', isHost: true,
    image: require('../../assets/images/logo-bf1.png')
  }
];

export function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} translucent={false} />

      {/* CABEÇALHO */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={require('../../assets/images/perfil-de-usuario-tiago.png')} 
              style={styles.avatar} 
            />
          </View>
          <View>
            <Text style={styles.greeting}>Olá, <Text style={styles.greetingBold}>Tiago</Text></Text>
            <Text style={styles.subtitle}>Hoje é dia de vitória</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => router.push('/agendar')}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* CATEGORIAS (Scroll Horizontal) */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryCard} activeOpacity={0.8}>
              <Image source={cat.icon} style={styles.categoryIcon} resizeMode="contain" />
              <Text style={styles.categoryText}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* TÍTULO DAS PARTIDAS */}
      <View style={styles.matchesHeader}>
        <Text style={styles.matchesTitle}>Partidas agendadas</Text>
        <Text style={styles.matchesCount}>Total {matches.length}</Text>
      </View>

      {/* LISTA DE PARTIDAS (Scroll Vertical Infinito com todos os jogos) */}
      <FlatList
        data={matches}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.matchesList}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.matchCard} 
            activeOpacity={0.8} 
            onPress={() => router.push('/details')}
          >
            <Image source={item.image} style={styles.matchImage} />
            
            <View style={styles.matchContent}>
              {/* Linha 1: Título e Categoria */}
              <View style={styles.matchRow}>
                <Text style={styles.matchTitle}>{item.title}</Text>
                <Text style={styles.matchCategory}>{item.category}</Text>
              </View>
              
              {/* Linha 2: Data e Status */}
              <View style={styles.matchRow}>
                <Text style={styles.matchDate}>📅 {item.date}</Text>
                <Text style={[
                  styles.matchStatus, 
                  { color: item.isHost ? colors.red : colors.green }
                ]}>
                  {item.isHost ? 'Anfitrião' : 'Visitante'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 70, 
    marginBottom: 40,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 8, 
    borderWidth: 2,
    overflow: 'hidden',
    marginRight: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  greeting: {
    fontSize: 20,
    color: colors.white,
  },
  greetingBold: {
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 13,
    color: colors.gray,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.red,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontSize: 24,
  },
  categoriesContainer: {
    marginBottom: 40,
  },
  categoryCard: {
    width: 104,
    height: 120,
    backgroundColor: '#243189', 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    marginBottom: 15,
  },
  categoryText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  matchesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  matchesTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchesCount: {
    color: colors.gray,
    fontSize: 13,
  },
  matchesList: {
    paddingHorizontal: 24,
    paddingBottom: 40, 
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, 
  },
  matchImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  matchContent: {
    flex: 1,
    marginLeft: 20,
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, 
  },
  matchTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  matchCategory: {
    color: colors.gray,
    fontSize: 13,
  },
  matchDate: {
    color: colors.gray,
    fontSize: 13,
  },
  matchStatus: {
    fontSize: 13,
  }
});