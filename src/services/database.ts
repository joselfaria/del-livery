import AsyncStorage from '@react-native-async-storage/async-storage';

const DATABASE_KEYS = [
  '@del_livery:deliveries',
  '@del_livery:currentUser',
  '@usuarios_associados',
];

export async function resetDatabase() {
  await AsyncStorage.multiRemove(DATABASE_KEYS);
}
