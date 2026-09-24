import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, 
  TextInput, ScrollView, StatusBar, SafeAreaView, Modal, FlatList 
} from 'react-native';
import { useRouter } from 'expo-router';

const colors = {
  navy: '#0A1033',
  secondaryNavy: '#1D2746',
  white: '#FFFFFF',
  gray: '#a2a7b9',
  red: '#E51C44',
};

// Lista unificada e completa
const servers = [
  { id: '1', name: 'Lendários', subtitle: 'Administrador', image: require('../../assets/images/logo-lol.png') },
  { id: '2', name: 'Rumo ao topo', subtitle: 'Administrador', image: require('../../assets/images/logo-cs.png') },
  { id: '3', name: 'Bora queimar tudo', subtitle: 'Convidado', image: require('../../assets/images/logo-apex.png') },
  { id: '4', name: 'Yeah, Boy', subtitle: 'Convidado', image: require('../../assets/images/logo-red-dead-redeption.png') },
  { id: '5', name: 'Valorosos', subtitle: 'Convidado', image: require('../../assets/images/logo-valorant.png') },
  { id: '6', name: 'Rolezão Monstro', subtitle: 'Convidado', image: require('../../assets/images/logo-GTA5.png') },
  { id: '7', name: 'Construtores', subtitle: 'Convidado', image: require('../../assets/images/logo-minecraft.png') },
  { id: '8', name: 'Battle Insane', subtitle: 'Convidado', image: require('../../assets/images/logo-bf1.png') },
];

export function AgendarScreen() {
  const router = useRouter();
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedServer, setSelectedServer] = useState<any>(null);
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} translucent={false} />

      {/* CABEÇALHO COM HITSLOP */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendar partida</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
       {/* CATEGORIA */}
        <Text style={styles.sectionTitle}>Categoria</Text>
        <View style={styles.categoryRow}>
          <TouchableOpacity 
            style={[
              styles.categoryCard, 
              selectedCategory === 'ranqueada' && { backgroundColor: '#243189', borderColor: colors.red, borderWidth: 1 }
            ]}
            activeOpacity={0.8}
            onPress={() => setSelectedCategory('ranqueada')}
          >
            {selectedCategory === 'ranqueada' && <View style={styles.activeDot} />}
            <Image source={require('../../assets/images/icon-ranqueada.png')} style={styles.categoryIcon} resizeMode="contain" />
            <Text style={styles.categoryText}>Ranqueada</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.categoryCard, 
              selectedCategory === 'duelo' && { backgroundColor: '#243189', borderColor: colors.red, borderWidth: 1 }
            ]}
            activeOpacity={0.8}
            onPress={() => setSelectedCategory('duelo')}
          >
            {selectedCategory === 'duelo' && <View style={styles.activeDot} />}
            <Image source={require('../../assets/images/duelo.png')} style={styles.categoryIcon} resizeMode="contain" />
            <Text style={styles.categoryText}>Duelo 1x1</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.categoryCard, 
              selectedCategory === 'diversao' && { backgroundColor: '#243189', borderColor: colors.red, borderWidth: 1 }
            ]}
            activeOpacity={0.8}
            onPress={() => setSelectedCategory('diversao')}
          >
            {selectedCategory === 'diversao' && <View style={styles.activeDot} />}
            <Image source={require('../../assets/images/icone-diversão.png')} style={styles.categoryIcon} resizeMode="contain" />
            <Text style={styles.categoryText}>Diversão</Text>
          </TouchableOpacity>
        </View>

        {/* SELEÇÃO DE SERVIDOR */}
        <TouchableOpacity 
          style={styles.serverSelector} 
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
        >
          {selectedServer ? (
            <View style={styles.serverSelectedContent}>
              <Image source={selectedServer.image} style={styles.serverSelectedImage} />
              <View style={styles.serverSelectedTextWrapper}>
                <Text style={styles.serverSelectedName}>{selectedServer.name}</Text>
                <Text style={styles.serverSelectedSubtitle}>{selectedServer.subtitle}</Text>
              </View>
              <Text style={styles.serverEmptyArrow}>›</Text>
            </View>
          ) : (
            <View style={styles.serverEmptyContent}>
              <View style={styles.serverPlaceholderBox} />
              <Text style={styles.serverEmptyText}>Selecione um servidor</Text>
              <Text style={styles.serverEmptyArrow}>›</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* DATA E HORA */}
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimeBlock}>
            <Text style={styles.sectionTitle}>Dia e mês</Text>
            <View style={styles.inputRow}>
              <TextInput style={styles.timeInput} keyboardType="numeric" maxLength={2} />
              <Text style={styles.divider}>/</Text>
              <TextInput style={styles.timeInput} keyboardType="numeric" maxLength={2} />
            </View>
          </View>

          <View style={styles.dateTimeBlock}>
            <Text style={styles.sectionTitle}>Horário</Text>
            <View style={styles.inputRow}>
              <TextInput style={styles.timeInput} keyboardType="numeric" maxLength={2} />
              <Text style={styles.divider}>:</Text>
              <TextInput style={styles.timeInput} keyboardType="numeric" maxLength={2} />
            </View>
          </View>
        </View>

        {/* DESCRIÇÃO */}
        <View style={styles.descriptionHeader}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.charCount}>Max 100 caracteres</Text>
        </View>
        <TextInput 
          style={styles.descriptionInput}
          multiline
          maxLength={100}
          value={description}
          onChangeText={setDescription}
          placeholder=""
          placeholderTextColor={colors.gray}
          textAlignVertical="top"
        />

        {/* BOTÃO AGENDAR */}
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>Agendar</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* MODAL DE SERVIDORES COM HITSLOP NO BOTÃO FECHAR */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecione um servidor</Text>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={servers}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.serverItem}
                onPress={() => {
                  setSelectedServer(item);
                  setModalVisible(false);
                }}
              >
                <Image source={item.image} style={styles.serverItemImage} />
                <View style={styles.serverItemInfo}>
                  <Text style={styles.serverItemName}>{item.name}</Text>
                  <Text style={styles.serverItemSubtitle}>{item.subtitle}</Text>
                </View>
                <Text style={styles.serverItemArrow}>›</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginTop: 20,
  },
  backButton: {
    width: 40,
  },
  backArrow: {
    color: colors.white,
    fontSize: 24,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 24,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: 104,
    height: 120,
    backgroundColor: '#243189',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  categoryCardActive: {
    backgroundColor: '#5f70e2', 
    borderWidth: 1,
    borderColor: colors.red,
  },
  activeDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.red,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    marginBottom: 15,
  },
  categoryText: {
    color: colors.white,
    fontSize: 13,
  },
  serverSelector: {
    width: '100%',
    height: 68,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#243189', 
    borderRadius: 8,
    marginTop: 30,
    overflow: 'hidden', 
  },
  serverEmptyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingRight: 20,
  },
  serverPlaceholderBox: {
    width: 64, 
    height: 68,
    backgroundColor: '#243189', 
    borderRightWidth: 1,
    borderColor: '#243189',
  },
  serverEmptyText: {
    flex: 1, 
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: -10, 
  },
  serverEmptyArrow: {
    color: colors.white, 
    fontSize: 24,
  },
  serverSelectedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingRight: 20,
  },
  serverSelectedImage: {
    width: 64, 
    height: 68, 
  },
  serverSelectedTextWrapper: {
    flex: 1,
    paddingLeft: 20,
  },
  serverSelectedName: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  serverSelectedSubtitle: {
    color: colors.gray,
    fontSize: 13,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeBlock: {
    width: '48%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeInput: {
    width: 64,
    height: 48,
    backgroundColor: '#243189',
    borderRadius: 8,
    color: colors.white,
    fontSize: 15,
    textAlign: 'center',
  },
  divider: {
    color: colors.gray,
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charCount: {
    color: colors.gray,
    fontSize: 13,
    marginTop: 24,
  },
  descriptionInput: {
    width: '100%',
    height: 100,
    backgroundColor: '#243189',
    borderRadius: 8,
    padding: 16,
    color: colors.white,
    fontSize: 15,
    marginBottom: 40,
  },
  submitButton: {
    width: '100%',
    height: 56,
    backgroundColor: colors.red,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.navy,
    marginTop: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalClose: {
    color: colors.white,
    fontSize: 20,
  },
  serverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryNavy,
  },
  serverItemImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 16,
  },
  serverItemInfo: {
    flex: 1,
  },
  serverItemName: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  serverItemSubtitle: {
    color: colors.gray,
    fontSize: 13,
  },
  serverItemArrow: {
    color: colors.gray,
    fontSize: 24,
  }
});