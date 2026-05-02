import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { DARK, styles } from '../styles/index.styles';

type HeaderProps = {
  route?: string;
};

export default function Header({ route }: HeaderProps) {
  const router = useRouter();

  if (route) {
    return (
      <TouchableOpacity
        style={styles.header}
        onPress={() => router.push(route as any)}
        activeOpacity={0.75}
      >
        <Ionicons name="arrow-back" size={22} color={DARK} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.header}>
      <Ionicons name="bicycle-outline" size={22} color={DARK} />
      <Text style={styles.headerLogo}>Del-Livery</Text>
    </View>
  );
}
