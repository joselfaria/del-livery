import Header from '@/components/Header';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/cadastro';

interface CadastroViewProps {
  form: any;
  setForm: (form: any) => void;
  handleCadastro: () => void;
  irParaLogin: () => void;
}

export function CadastroEntregadorView({
  form,
  setForm,
  handleCadastro,
  irParaLogin
}: CadastroViewProps) {

  function formatarCPF(value: string) {
    const numeros = value.replace(/\D/g, '');
    let cpfFormatado = '';

    if (numeros.length > 0) cpfFormatado = numeros.substring(0, 3);
    if (numeros.length >= 4) cpfFormatado += '.' + numeros.substring(3, 6);
    if (numeros.length >= 7) cpfFormatado += '.' + numeros.substring(6, 9);
    if (numeros.length >= 10) cpfFormatado += '-' + numeros.substring(9, 11);

    return cpfFormatado;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header route="/" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Text style={styles.title}>Seja um Entregador</Text>
        <Text style={styles.subtitle}>
          Cadastre-se para realizar entregas e gerar renda com liberdade
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome completo"
            value={form.nome}
            onChangeText={(t) => setForm({ ...form, nome: t })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="email@exemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(t) => setForm({ ...form, email: t })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="(00) 00000-0000"
            keyboardType="phone-pad"
            value={form.telefone}
            onChangeText={(t) => setForm({ ...form, telefone: t })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="000.000.000-00"
            keyboardType="numeric"
            value={form.cpf}
            onChangeText={(t) => setForm({ ...form, cpf: formatarCPF(t) })}
            maxLength={14}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Endereço completo"
            value={form.endereco}
            onChangeText={(t) => setForm({ ...form, endereco: t })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            value={form.senha}
            onChangeText={(t) => setForm({ ...form, senha: t })}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <Text style={styles.termsText}>
            Aceito os termos de serviço e a política de privacidade.
          </Text>
        </View>

        <TouchableOpacity style={styles.buttonSolid} onPress={handleCadastro}>
          <Text style={styles.buttonSolidText}>Criar Conta</Text>
        </TouchableOpacity>

        <View style={styles.footerSection}>
          <TouchableOpacity style={styles.loginLink} onPress={irParaLogin}>
            <Text style={styles.loginText}>
              Já possui uma conta? <Text style={styles.loginTextBold}>Fazer Login</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>f</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>G</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footerCopyright}>
          © 2026 Del-Livery Inc.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}
