import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/cadastro';

// Aqui dizemos quais dados e funções essa View vai receber da Lógica
interface CadastroViewProps {
  form: any;
  setForm: (form: any) => void;
  handleCadastro: () => void;
  irParaLogin: () => void;
}

export function CadastroAssociadoView({ form, setForm, handleCadastro, irParaLogin }: CadastroViewProps) {
  // Função para formatar CNPJ: 00.000.000/0000-00
  function formatarCNPJ(value: string) {
    const numeros = value.replace(/\D/g, '');
    let cnpjFormatado = '';
    if (numeros.length > 0) cnpjFormatado = numeros.substring(0, 2);
    if (numeros.length >= 3) cnpjFormatado += '.' + numeros.substring(2, 5);
    if (numeros.length >= 6) cnpjFormatado += '.' + numeros.substring(5, 8);
    if (numeros.length >= 9) cnpjFormatado += '/' + numeros.substring(8, 12);
    if (numeros.length >= 13) cnpjFormatado += '-' + numeros.substring(12, 14);
    return cnpjFormatado;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🚲 Del-Livery</Text>
        </View>

        <Text style={styles.title}>Seja um Associado</Text>
        <Text style={styles.subtitle}>
          Cadastre sua empresa para economizar, e trabalhar com sustentabilidade
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome da Empresa</Text>
          <TextInput style={styles.input} placeholder="Sua empresa" value={form.nome} onChangeText={(t) => setForm({...form, nome: t})} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput style={styles.input} placeholder="email@exemplo.com" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={(t) => setForm({...form, email: t})} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput style={styles.input} placeholder="(00) 00000-0000" keyboardType="phone-pad" value={form.telefone} onChangeText={(t) => setForm({...form, telefone: t})} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CNPJ</Text>
          <TextInput
            style={styles.input}
            placeholder="00.000.000/0000-00"
            keyboardType="numeric"
            value={form.cnpj}
            onChangeText={(t) => setForm({ ...form, cnpj: formatarCNPJ(t) })}
            maxLength={18}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Endereço</Text>
          <TextInput style={styles.input} placeholder="Endereço completo" value={form.endereco} onChangeText={(t) => setForm({...form, endereco: t})} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.input} placeholder="••••••••" secureTextEntry value={form.senha} onChangeText={(t) => setForm({...form, senha: t})} />
        </View>

        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox}><Text style={styles.checkMark}>✓</Text></View>
          <Text style={styles.termsText}>Aceito os termos de serviço e a política de privacidade.</Text>
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
            <TouchableOpacity style={styles.socialButton}><Text style={styles.socialText}>f</Text></TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}><Text style={styles.socialText}>G</Text></TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footerCopyright}>© 2026 Del-Livery Inc.</Text>

      </ScrollView>
    </SafeAreaView>
  );
}