import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Cabeçalho / Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🚲 Del-Livery</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Bem vindo</Text>
          <Text style={styles.subtitle}>
            Comece a ganhar dinheiro ou economizar de maneira sustentavel
          </Text>

          {/* Botões - Ambos Escuros conforme wireframe */}
          <TouchableOpacity style={styles.buttonSolid} onPress={() => alert('Em breve!')}>
            <Text style={styles.buttonSolidText}>Quero ser um Ciclista</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.buttonSolid}
            onPress={() => router.push('/cadastro-associado')}
          >
            <Text style={styles.buttonSolidText}>Quero ser um Associado</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerSection}>
          <TouchableOpacity style={styles.loginLink} onPress={() => router.push('/login')}>
            <Text style={styles.loginText}>
              Já possui uma conta? <Text style={styles.loginTextBold}>Fazer Login</Text>
            </Text>
          </TouchableOpacity>

          {/* Botões Sociais */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}><Text style={styles.socialText}>f</Text></TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}><Text style={styles.socialText}>G</Text></TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footerCopyright}>© 2026 Del-Livery Inc.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingHorizontal: 30, paddingVertical: 40, justifyContent: 'space-between' },
  logoContainer: { alignItems: 'center', marginTop: 20 },
  logoText: { fontSize: 20, fontWeight: 'bold', color: '#1F2937' },
  content: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 10, textAlign: 'left' },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'left', marginBottom: 40, lineHeight: 20 },
  buttonSolid: { backgroundColor: '#1F2937', paddingVertical: 16, borderRadius: 6, marginBottom: 15, alignItems: 'center' },
  buttonSolidText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  footerSection: { alignItems: 'center', marginBottom: 30 },
  loginLink: { marginBottom: 30 },
  loginText: { color: '#6B7280', fontSize: 14 },
  loginTextBold: { color: '#1F2937', fontWeight: 'bold' },
  socialContainer: { flexDirection: 'row', gap: 15 },
  socialButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
  socialText: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  footerCopyright: { textAlign: 'center', fontSize: 12, color: '#9CA3AF' }
});