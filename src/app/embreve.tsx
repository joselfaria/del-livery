import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EmBreve() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Ionicons name="construct-outline" size={36} color="#1a1a1a" />
        <Text style={styles.title}>Em breve</Text>
        <Text style={styles.text}>Essa área ainda está em desenvolvimento.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 16, paddingVertical: 14 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: { fontSize: 20, fontWeight: '700', color: '#1a1a1a', marginTop: 12 },
  text: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 6 },
});
