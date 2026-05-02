import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { resetDatabase } from '../services/database';
import { DARK, styles } from '../styles/index.styles';

export default function Welcome() {
  const router = useRouter();

  const handleCadastro = () => {
    router.push('/register');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleResetDatabase = async () => {
    await resetDatabase();
    Alert.alert('Banco resetado', 'Os dados locais foram apagados.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Header />
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Tenha lucro ajudando o meio ambiente</Text>
          <Text style={styles.heroSub}>
            Sua chance de conseguir ajuda no aluguel de uma maneira simples economicamente
            viável e sustentável para o meio ambiente.
          </Text>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleCadastro} activeOpacity={0.85}>
            <Text style={styles.btnPrimaryText}>Cadastro</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSecondary} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.btnSecondaryText}>Login</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como funciona</Text>

          <View style={styles.howRow}>
            <View style={styles.howIconWrap}>
              <Ionicons name="phone-portrait-outline" size={22} color={DARK} />
            </View>
            <View>
              <Text style={styles.howLabel}>Receba Pedidos</Text>
              <Text style={styles.howSub}>Solicitado via aplicativo</Text>
            </View>
          </View>

          <View style={styles.howRow}>
            <View style={styles.howIconWrap}>
              <Ionicons name="bicycle-outline" size={22} color={DARK} />
            </View>
            <View>
              <Text style={styles.howLabel}>Faça a entrega</Text>
              <Text style={styles.howSub}>Receba no final do dia</Text>
            </View>
          </View>

          <View style={styles.howRow}>
            <View style={styles.howIconWrap}>
              <Ionicons name="leaf-outline" size={22} color={DARK} />
            </View>
            <View>
              <Text style={styles.howLabel}>Zero Poluição</Text>
              <Text style={styles.howSub}>Faz bem ao meio ambiente</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parceiros Próximos</Text>

          <View style={styles.partnersList}>
            <View style={styles.partnerCard}>
              <View style={styles.partnerImg}>
                <Ionicons name="image-outline" size={28} color="#ccc" />
              </View>
              <Text style={styles.partnerName}>Rota</Text>
              <Text style={styles.partnerRating}>★ 4.8 (120)</Text>
            </View>

            <View style={styles.partnerCard}>
              <View style={styles.partnerImg}>
                <Ionicons name="image-outline" size={28} color="#ccc" />
              </View>
              <Text style={styles.partnerName}>Esquinão</Text>
              <Text style={styles.partnerRating}>★ 4.5 (89)</Text>
            </View>
          </View>
        </View>

        <View style={styles.social}>
          <TouchableOpacity>
            <Ionicons name="logo-facebook" size={22} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="logo-instagram" size={22} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="logo-twitter" size={22} color="#555" />
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>© 2026 Del-Livery Inc.</Text>

      <TouchableOpacity style={ {borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 12 }} onPress={handleResetDatabase} activeOpacity={0.85}>
        <Text style={{color: '#777', fontSize: 13, fontWeight: '600'}}>Reset Database</Text>
      </TouchableOpacity>


      </ScrollView>

    </SafeAreaView>
  );
}
