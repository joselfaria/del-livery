import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Delivery, saveDelivery } from '../services/deliveries';

function generateOrderNumber(): string {
  const raw = Math.floor(Math.random() * 9000) + 1000;
  return `#${raw}`;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ---------------------------------------------------------------------------
// Field component
// ---------------------------------------------------------------------------
type FieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  icon?: keyof typeof Ionicons.glyphMap;
  keyboardType?: 'default' | 'phone-pad' | 'numeric' | 'decimal-pad';
  multiline?: boolean;
  prefix?: string;
};

function Field({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  keyboardType = 'default',
  multiline = false,
  prefix,
}: FieldProps) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.fieldBox, multiline && styles.fieldBoxMulti]}>
        {icon && <Ionicons name={icon} size={16} color={GRAY} style={styles.fieldIcon} />}
        {prefix && <Text style={styles.fieldPrefix}>{prefix}</Text>}
        <TextInput
          style={[styles.fieldInput, multiline && styles.fieldInputMulti]}
          placeholder={placeholder}
          placeholderTextColor="#bbb"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Main Screen
// ---------------------------------------------------------------------------
export default function NewDeliveryScreen() {
  const router = useRouter();

  // Form state
  const [recipientName, setRecipientName]               = useState('');
  const [recipientPhone, setRecipientPhone]             = useState('');
  const [address, setAddress]                           = useState('');
  const [description, setDescription]                   = useState('');
  const [specialInstructions, setSpecialInstructions]   = useState('');
  const [price, setPrice]                               = useState('');
  const [loading, setLoading]                           = useState(false);

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------
  function validate(): boolean {
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
  }

  // ---------------------------------------------------------------------------
  // Submit
  // ---------------------------------------------------------------------------
  async function handleConfirm() {
    if (!validate()) return;

    setLoading(true);
    try {
      const delivery: Delivery = {
        id: generateId(),
        number: generateOrderNumber(),
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
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
          {/* Destinatário */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="person-outline" size={16} color={DARK} />
              <Text style={styles.sectionTitle}>Destinatário</Text>
            </View>

            <Field
              label="Nome"
              placeholder="Nome completo"
              value={recipientName}
              onChangeText={setRecipientName}
            />
            <Field
              label="Telefone (WhatsApp)"
              placeholder="(00) 00000-0000"
              value={recipientPhone}
              onChangeText={setRecipientPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Endereço */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="location-outline" size={16} color={DARK} />
              <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
            </View>

            <Field
              label="Endereço"
              placeholder="Buscar rua, número e bairro..."
              value={address}
              onChangeText={setAddress}
              icon="search-outline"
            />

            {/* Map placeholder */}
            <View style={styles.mapPlaceholder}>
              <Ionicons name="map-outline" size={32} color="#ccc" />
              <Text style={styles.mapPlaceholderText}>O mapa aparecerá aqui</Text>
            </View>
          </View>

          {/* Detalhes do Pacote */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="cube-outline" size={16} color={DARK} />
              <Text style={styles.sectionTitle}>Detalhes do Pacote</Text>
            </View>

            <Field
              label="Descrição dos itens"
              placeholder="ex: 2 Pizzas, 1 Refri"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <Field
              label="Instruções especiais ou pontos de referência"
              placeholder="ex: Tocar campainha, portão azul..."
              value={specialInstructions}
              onChangeText={setSpecialInstructions}
              multiline
            />
          </View>

          {/* Preço */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="cash-outline" size={16} color={DARK} />
              <Text style={styles.sectionTitle}>Preço</Text>
            </View>

            <Field
              label="Valor da entrega"
              placeholder="0,00"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              prefix="R$ "
            />
          </View>

          {/* Confirm button */}
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

      {/* Bottom Nav */}
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

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const DARK = '#1a1a1a';
const GRAY = '#888';
const LIGHT_GRAY = '#e5e5e5';
const BG = '#ffffff';

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: BG },
  scroll:       { flex: 1 },
  scrollContent:{ paddingBottom: 32 },

  // Header
  header:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: LIGHT_GRAY },
  backBtn:      { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#f0f0f0' },
  headerTitle:  { fontSize: 16, fontWeight: '700', color: DARK },

  // Section block
  sectionBlock: { backgroundColor: '#fff', marginHorizontal: 16, marginTop: 16, borderRadius: 16, padding: 16, borderWidth: 0.5, borderColor: LIGHT_GRAY },
  sectionTitleRow:{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: DARK, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Field
  fieldWrap:    { marginBottom: 12 },
  fieldLabel:   { fontSize: 12, color: GRAY, marginBottom: 6, fontWeight: '500' },
  fieldBox:     { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, borderWidth: 0.5, borderColor: LIGHT_GRAY, paddingHorizontal: 12, height: 46 },
  fieldBoxMulti:{ height: 80, alignItems: 'flex-start', paddingVertical: 10 },
  fieldIcon:    { marginRight: 8 },
  fieldPrefix:  { fontSize: 14, color: DARK, fontWeight: '600', marginRight: 4 },
  fieldInput:   { flex: 1, fontSize: 14, color: DARK },
  fieldInputMulti:{ flex: 1, fontSize: 14, color: DARK, height: '100%' },

  // Map placeholder
  mapPlaceholder:{ height: 120, backgroundColor: '#f0f0f0', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 4, gap: 6 },
  mapPlaceholderText:{ fontSize: 12, color: '#ccc' },

  // Confirm button
  confirmBtn:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: DARK, marginHorizontal: 16, marginTop: 24, borderRadius: 14, paddingVertical: 16 },
  confirmBtnDisabled:{ opacity: 0.6 },
  confirmBtnText:{ color: '#fff', fontSize: 15, fontWeight: '700' },

  // Footer
  footer:       { textAlign: 'center', fontSize: 11, color: '#bbb', marginTop: 20, paddingBottom: 8 },

  // Bottom nav
  navbar:       { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', paddingVertical: 12, paddingBottom: 20, borderTopWidth: 0.5, borderTopColor: LIGHT_GRAY },
  navItem:      { alignItems: 'center', gap: 3 },
  navLabel:     { fontSize: 10, color: '#ccc' },
  navLabelActive:{ color: DARK, fontWeight: '600' },
});
