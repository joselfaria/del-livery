import { DARK } from '@/styles/index.styles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProfilePopup, { CurrentUser } from '../components/ProfilePopup';
import {
  assignDeliveryToCyclist,
  Delivery,
  DeliveryStatus,
  getDeliveries,
  updateDeliveryStatus,
} from '../services/deliveries';

type StatusConfig = {
  label: string;
  bg: string;
  color: string;
};

const STATUS_CONFIG: Record<DeliveryStatus, StatusConfig> = {
  a_caminho: { label: 'A CAMINHO', bg: '#1a1a1a', color: '#fff' },
  aguardando_coleta: { label: 'DISPONÍVEL', bg: '#f0f0f0', color: '#555' },
  concluido: { label: 'Concluído', bg: '#eaf3de', color: '#3b6d11' },
  cancelado: { label: 'Cancelado', bg: '#fdecea', color: '#b71c1c' },
};

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getUserId(user: CurrentUser) {
  return user.id || user.email?.toLowerCase();
}

function Header({ onProfilePress }: { onProfilePress: () => void }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Ionicons name="bicycle" size={24} color={DARK} />
        <Text style={styles.headerLogo}>Del-Livery</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color={DARK} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={onProfilePress} activeOpacity={0.75}>
          <Ionicons name="person-outline" size={22} color={DARK} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function WelcomeBanner({ userName }: { userName: string }) {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerGreeting}>Bem-vindo, {userName}</Text>
      <Text style={styles.bannerTitle}>Painel do Ciclista</Text>
      <View style={styles.bannerInfo}>
        <Ionicons name="map-outline" size={16} color="#fff" />
        <Text style={styles.bannerInfoText}>Entregas disponíveis para aceitar</Text>
      </View>
    </View>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <View style={styles.emptyState}>
      <Ionicons name="cube-outline" size={24} color="#bbb" />
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

function DeliveryCard({
  order,
  actionLabel,
  actionIcon,
  onAction,
}: {
  order: Delivery;
  actionLabel?: string;
  actionIcon?: keyof typeof Ionicons.glyphMap;
  onAction?: (id: string) => void;
}) {
  const statusCfg = STATUS_CONFIG[order.status];

  return (
    <View style={styles.activeCard}>
      <View style={[styles.statusPill, { backgroundColor: statusCfg.bg }]}>
        <Text style={[styles.statusPillText, { color: statusCfg.color }]}>{statusCfg.label}</Text>
      </View>

      <View style={styles.activeCardBody}>
        <View style={{ flex: 1 }}>
          <Text style={styles.activeOrderNumber}>Pedido {order.number}</Text>
          <Text style={styles.activeOrderDest}>Destino: {order.address}</Text>
          <View style={styles.deliveryPersonRow}>
            <Ionicons name="person-circle-outline" size={14} color={GRAY} />
            <Text style={styles.deliveryPersonName}>{order.recipientName}</Text>
          </View>
          {!!order.description && (
            <Text style={styles.activeOrderEta} numberOfLines={2}>
              {order.description}
            </Text>
          )}
        </View>

        <View style={styles.cardActions}>
          <Text style={styles.activeOrderPrice}>R$ {order.price}</Text>
          {actionLabel && onAction && (
            <TouchableOpacity style={styles.actionBtn} onPress={() => onAction(order.id)} activeOpacity={0.85}>
              {actionIcon && <Ionicons name={actionIcon} size={14} color="#fff" />}
              <Text style={styles.actionBtnText}>{actionLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

function HistoryRow({ order }: { order: Delivery }) {
  const statusCfg = STATUS_CONFIG[order.status];

  return (
    <View style={styles.historyRow}>
      <View style={styles.historyDot} />
      <View style={styles.historyInfo}>
        <Text style={styles.historyNumber}>Pedido {order.number}</Text>
        <Text style={styles.historyDate}>{formatDate(order.createdAt)}</Text>
      </View>
      <View style={styles.historyRight}>
        {order.status === 'concluido' ? (
          <Text style={styles.historyValue}>R$ {order.price}</Text>
        ) : (
          <Text style={[styles.historyBadge, { color: statusCfg.color, backgroundColor: statusCfg.bg }]}>
            {statusCfg.label}
          </Text>
        )}
      </View>
    </View>
  );
}

function BottomNav({
  onAtualizar,
  onPagamentos,
}: {
  onAtualizar: () => void;
  onPagamentos: () => void;
}) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home" size={22} color={DARK} />
        <Text style={[styles.navLabel, styles.navLabelActive]}>Início</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={onAtualizar} activeOpacity={0.85}>
        <Ionicons name="refresh-outline" size={22} color="#ccc" />
        <Text style={styles.navLabel}>Atualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={onPagamentos} activeOpacity={0.85}>
        <Ionicons name="wallet-outline" size={22} color="#ccc" />
        <Text style={styles.navLabel}>Ganhos</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function PainelAssociado() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [profileVisible, setProfileVisible] = useState(false);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const cyclistId = currentUser ? getUserId(currentUser) : undefined;

  const availableOrders = deliveries.filter((delivery) => (
    delivery.status === 'aguardando_coleta' && !delivery.cyclistId
  ));
  const activeOrders = deliveries.filter((delivery) => (
    cyclistId && delivery.cyclistId === cyclistId && delivery.status === 'a_caminho'
  ));
  const historyOrders = deliveries.filter((delivery) => (
    cyclistId
    && delivery.cyclistId === cyclistId
    && (delivery.status === 'concluido' || delivery.status === 'cancelado')
  ));

  const loadData = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);

      const [savedDeliveries, currentUserRaw] = await Promise.all([
        getDeliveries(),
        AsyncStorage.getItem('@del_livery:currentUser'),
      ]);

      if (!currentUserRaw) {
        router.replace('/login' as any);
        return;
      }

      setCurrentUser(JSON.parse(currentUserRaw));
      setDeliveries(savedDeliveries);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as entregas.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleAccept = async (id: string) => {
    if (!cyclistId) return;

    const updated = await assignDeliveryToCyclist(id, cyclistId);
    setDeliveries(updated);
  };

  const handleFinish = (id: string) => {
    Alert.alert('Concluir entrega', 'Deseja marcar esta entrega como concluída?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: async () => {
          const updated = await updateDeliveryStatus(id, 'concluido');
          setDeliveries(updated);
        },
      },
    ]);
  };

  const handlePagamentos = () => {
    router.push('/embreve' as any);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@del_livery:currentUser');
    setCurrentUser(null);
    setProfileVisible(false);
    router.replace('/' as any);
  };

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <Header onProfilePress={() => undefined} />
        <ActivityIndicator color={DARK} style={styles.loading} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header onProfilePress={() => setProfileVisible(true)} />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => loadData(true)} tintColor={DARK} />
        }
      >
        <WelcomeBanner userName={currentUser.nome || currentUser.name || 'Ciclista'} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Entregas Disponíveis</Text>
          <Text style={styles.sectionMeta}>{availableOrders.length} Novas</Text>
        </View>

        {loading ? (
          <ActivityIndicator color={DARK} style={styles.loading} />
        ) : availableOrders.length ? (
          availableOrders.map((order) => (
            <DeliveryCard
              key={order.id}
              order={order}
              actionLabel="Aceitar"
              actionIcon="checkmark-circle-outline"
              onAction={handleAccept}
            />
          ))
        ) : (
          <EmptyState text="Nenhuma entrega disponível." />
        )}

        <View style={[styles.sectionHeader, { marginTop: 8 }]}>
          <Text style={styles.sectionTitle}>Minhas Entregas</Text>
          <Text style={styles.sectionMeta}>{activeOrders.length} Em curso</Text>
        </View>

        {activeOrders.length ? (
          activeOrders.map((order) => (
            <DeliveryCard
              key={order.id}
              order={order}
              actionLabel="Concluir"
              actionIcon="flag-outline"
              onAction={handleFinish}
            />
          ))
        ) : (
          <EmptyState text="Nenhuma entrega em curso." />
        )}

        <View style={[styles.sectionHeader, { marginTop: 8 }]}>
          <Text style={styles.sectionTitle}>Histórico Recente</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>Ver Todos</Text>
          </TouchableOpacity>
        </View>

        {historyOrders.length ? (
          <View style={styles.historyCard}>
            {historyOrders.slice(0, 5).map((order, index) => (
              <React.Fragment key={order.id}>
                <HistoryRow order={order} />
                {index < Math.min(historyOrders.length, 5) - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>
        ) : (
          <EmptyState text="Nenhuma entrega finalizada ainda." />
        )}

        <Text style={styles.footer}>© 2026 Del-Livery Inc.</Text>
      </ScrollView>

      <BottomNav onAtualizar={() => loadData(true)} onPagamentos={handlePagamentos} />
      <ProfilePopup
        visible={profileVisible}
        user={currentUser}
        onClose={() => setProfileVisible(false)}
        onLogout={handleLogout}
      />
    </SafeAreaView>
  );
}

const GRAY = '#888';
const LIGHT_GRAY = '#e5e5e5';
const BG = '#ffffff';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: LIGHT_GRAY },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerLogo: { fontSize: 16, fontWeight: '700', color: DARK },
  headerRight: { flexDirection: 'row', gap: 12 },
  iconBtn: { padding: 4 },

  banner: { backgroundColor: DARK, margin: 16, borderRadius: 20, padding: 22 },
  bannerGreeting: { fontSize: 12, color: '#aaa', marginBottom: 4 },
  bannerTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 16 },
  bannerInfo: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.15)', alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 30 },
  bannerInfoText: { color: '#fff', fontSize: 13, fontWeight: '600' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: DARK },
  sectionMeta: { fontSize: 12, color: GRAY },
  sectionLink: { fontSize: 12, color: GRAY },

  loading: { marginVertical: 24 },
  emptyState: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 10, borderRadius: 16, padding: 22, borderWidth: 0.5, borderColor: LIGHT_GRAY },
  emptyText: { fontSize: 12, color: GRAY, marginTop: 8 },

  activeCard: { backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 10, borderRadius: 16, padding: 16, borderWidth: 0.5, borderColor: LIGHT_GRAY },
  statusPill: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginBottom: 10 },
  statusPillText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  activeCardBody: { flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  activeOrderNumber: { fontSize: 14, fontWeight: '700', color: DARK, marginBottom: 4 },
  activeOrderDest: { fontSize: 12, color: GRAY, marginBottom: 4 },
  deliveryPersonRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  deliveryPersonName: { fontSize: 12, color: GRAY },
  activeOrderEta: { fontSize: 12, color: '#555', fontWeight: '500' },
  activeOrderPrice: { fontSize: 13, fontWeight: '700', color: DARK },
  cardActions: { alignItems: 'flex-end', gap: 8 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: DARK, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  actionBtnText: { fontSize: 12, color: '#fff', fontWeight: '600' },

  historyCard: { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16, padding: 16, borderWidth: 0.5, borderColor: LIGHT_GRAY },
  historyRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  historyDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: LIGHT_GRAY },
  historyInfo: { flex: 1 },
  historyNumber: { fontSize: 13, fontWeight: '600', color: DARK },
  historyDate: { fontSize: 11, color: GRAY, marginTop: 2 },
  historyRight: { alignItems: 'flex-end' },
  historyValue: { fontSize: 13, fontWeight: '700', color: DARK },
  historyBadge: { fontSize: 10, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  divider: { height: 0.5, backgroundColor: LIGHT_GRAY },

  footer: { textAlign: 'center', fontSize: 11, color: '#bbb', marginTop: 24, paddingBottom: 8 },

  navbar: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', paddingVertical: 12, paddingBottom: 20, borderTopWidth: 0.5, borderTopColor: LIGHT_GRAY },
  navItem: { alignItems: 'center', gap: 3 },
  navLabel: { fontSize: 10, color: '#ccc' },
  navLabelActive: { color: DARK, fontWeight: '600' },
});
