import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) return;

    try {
      const associadosSalvos = await AsyncStorage.getItem('@usuarios_associados');
      const listaAssociados = associadosSalvos ? JSON.parse(associadosSalvos) : [];
      const comercianteEncontrado = listaAssociados.find(
        (user: any) => user.email.toLowerCase() === email.toLowerCase() && user.senha === senha
      );

      if (comercianteEncontrado) {
        router.push('/painel-lojista'); 
        return; 
      }

      // Lógica do entregador entrará aqui

      Alert.alert('Erro', 'E-mail ou senha incorretos.');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🚲 Del-Livery</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Complete seu login</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input} 
              placeholder="email@exemplo.com" 
              keyboardType="email-address"
              autoCapitalize="none"
              value={email} 
              onChangeText={setEmail} 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput 
              style={styles.input} 
              placeholder="••••••••" 
              secureTextEntry 
              value={senha} 
              onChangeText={setSenha} 
            />
          </View>

          <TouchableOpacity style={styles.buttonSolid} onPress={handleLogin}>
            <Text style={styles.buttonSolidText}>Fazer Login</Text>
          </TouchableOpacity>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}><Text style={styles.socialText}>f</Text></TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}><Text style={styles.socialText}>G</Text></TouchableOpacity>
          </View>

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => router.push('/cadastro-associado')}>
              <Text style={styles.linkText}>Ainda possui uma conta? <Text style={styles.linkTextBold}>Criar Conta</Text></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.linkTextBold}>Esqueci minha senha?</Text>
            </TouchableOpacity>
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
  content: { flex: 1, justifyContent: 'center', marginTop: -20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 30 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 12, color: '#4B5563', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 6, padding: 12, backgroundColor: '#F9FAFB', fontSize: 14, color: '#1F2937' },
  buttonSolid: { backgroundColor: '#1F2937', paddingVertical: 16, borderRadius: 6, marginTop: 10, marginBottom: 30, alignItems: 'center' },
  buttonSolidText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginBottom: 30 },
  socialButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
  socialText: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  linksContainer: { alignItems: 'center' },
  linkText: { color: '#6B7280', fontSize: 14 },
  linkTextBold: { color: '#1F2937', fontWeight: 'bold' },
  forgotPassword: { marginTop: 15 },
  footerCopyright: { textAlign: 'center', fontSize: 12, color: '#9CA3AF' }
});