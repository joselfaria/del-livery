import AsyncStorage from '@react-native-async-storage/async-storage';

export type DeliveryStatus = 'aguardando_coleta' | 'a_caminho' | 'concluido' | 'cancelado';

export type Delivery = {
  id: string;
  number: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  description: string;
  specialInstructions: string;
  price: string;
  status: DeliveryStatus;
  createdAt: string;
};

const STORAGE_KEY = '@del_livery:deliveries';

export async function getDeliveries(): Promise<Delivery[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveDelivery(delivery: Delivery): Promise<void> {
  const deliveries = await getDeliveries();
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([delivery, ...deliveries]));
}

export async function updateDeliveryStatus(id: string, status: DeliveryStatus): Promise<Delivery[]> {
  const deliveries = await getDeliveries();
  const updated = deliveries.map((delivery) => (
    delivery.id === id ? { ...delivery, status } : delivery
  ));

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
