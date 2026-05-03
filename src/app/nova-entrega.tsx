import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Delivery, saveDelivery } from '../services/deliveries';
import { DARK, GRAY, styles } from '../styles/nova-entrega.styles';

export default function NewDeliveryScreen() {
  const router = useRouter();

  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const generateOrderNumber = () => {
    const raw = Math.floor(Math.random() * 9000) + 1000;
    return `#${raw}`;
  };

  const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  };

  const getMerchantId = async () => {
    const currentUserRaw = await AsyncStorage.getItem('@del_livery:currentUser');
    const currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;
    return currentUser?.id || currentUser?.email?.toLowerCase();
  };

  const validate = () => {
    if (!recipientName.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o nome do destinatário.');
      return false;
    }
    if (!recipientPhone.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o telefone do destinatário.');
      return false;
    }
    if (!address.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o endereço de entrega.');
      return false;
    }
    if (!price.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o valor da entrega.');
      return false;
    }
    return true;
  };

  const handleConfirm = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const merchantId = await getMerchantId();

      if (!merchantId) {
        Alert.alert('Sessão expirada', 'Faça login novamente para criar uma entrega.');
        router.replace('/login' as any);
        return;
      }

      const delivery: Delivery = {
        id: generateId(),
        number: generateOrderNumber(),
        merchantId,
        recipientName: recipientName.trim(),
        recipientPhone: recipientPhone.trim(),
        address: address.trim(),
        description: description.trim(),
        specialInstructions: specialInstructions.trim(),
        price: price.trim(),
        status: 'aguardando_coleta',
        createdAt: new Date().toISOString(),
      };

      await saveDelivery(delivery);

      router.replace('/painel-lojista' as any);

      Alert.alert('Pedido criado!', `Entrega ${delivery.number} registrada com sucesso.`);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar o pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={DARK} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Entrega</Text>
        <View style={{ width: 36 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.sectionBlock}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="person-outline" size={16} color={DARK} />
              <Text style={styles.sectionTitle}>Destinatário</Text>
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Nome</Text>
              <View style={styles.fieldBox}>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Nome completo"
                  placeholderTextColor="#bbb"
                  value={recipientName}
                  onChangeText={setRecipientName}
                />
              </View>
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Telefone (WhatsApp)</Text>
              <View style={styles.fieldBox}>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="(00) 00000-0000"
                  placeholderTextColor="#bbb"
                  value={recipientPhone}
                  onChangeText={setRecipientPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>

          <View style={styles.sectionBlock}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="location-outline" size={16} color={DARK} />
              <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Endereço</Text>
              <View style={styles.fieldBox}>
                <Ionicons name="search-outline" size={16} color={GRAY} style={styles.fieldIcon} />
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Buscar rua, número e bairro..."
                  placeholderTextColor="#bbb"
                  value={address}
                  onChangeText={setAddress}
                />
              </View>
            </View>

            <View style={styles.mapPlaceholder}>
              <Ionicons name="map-outline" size={32} color="#ccc" />
              <Text style={styles.mapPlaceholderText}>O mapa aparecerá aqui</Text>
            </View>
          </View>

          <View style={styles.sectionBlock}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="cube-outline" size={16} color={DARK} />
              <Text style={styles.sectionTitle}>Detalhes do Pacote</Text>
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Descrição dos itens</Text>
              <View style={[styles.fieldBox, styles.fieldBoxMulti]}>
                <TextInput
                  style={[styles.fieldInput, styles.fieldInputMulti]}
                  placeholder="ex: 2 Pizzas, 1 Refri"
                  placeholderTextColor="#bbb"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Instruções especiais ou pontos de referência</Text>
              <View style={[styles.fieldBox, styles.fieldBoxMulti]}>
                <TextInput
                  style={[styles.fieldInput, styles.fieldInputMulti]}
                  placeholder="ex: Tocar campainha, portão azul..."
                  placeholderTextColor="#bbb"
                  value={specialInstructions}
                  onChangeText={setSpecialInstructions}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          <View style={styles.sectionBlock}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="cash-outline" size={16} color={DARK} />
              <Text style={styles.sectionTitle}>Preço</Text>
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Valor da entrega</Text>
              <View style={styles.fieldBox}>
                <Text style={styles.fieldPrefix}>R$ </Text>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="0,00"
                  placeholderTextColor="#bbb"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.confirmBtn, loading && styles.confirmBtnDisabled]}
            onPress={handleConfirm}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
                <Text style={styles.confirmBtnText}>Confirmar Entrega</Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.footer}>© 2026 Del-Livery Inc.</Text>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/painel-lojista' as any)}>
          <Ionicons name="home-outline" size={22} color="#ccc" />
          <Text style={styles.navLabel}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="add-circle" size={22} color={DARK} />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Nova Entrega</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/embreve' as any)}>
          <Ionicons name="wallet-outline" size={22} color="#ccc" />
          <Text style={styles.navLabel}>Pagamentos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
