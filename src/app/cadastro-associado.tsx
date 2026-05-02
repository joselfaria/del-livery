import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

// Importa apenas a View desenhada
import { CadastroAssociadoView } from '../views/cadastro-associado-view';

export default function CadastroAssociado() {
  const router = useRouter();
  
  // 1. ESTADO
  const [form, setForm] = useState({ 
    nome: '', email: '', telefone: '', cnpj: '', endereco: '', senha: '' 
  });

  // 2. FUNÇÕES DE ROTEAMENTO
  const irParaLogin = () => {
    router.push('/login');
  };

  // 3. REGRAS DE NEGÓCIO E VALIDAÇÃO
  const handleCadastro = async () => {
    if (!form.nome || !form.email || !form.telefone || !form.cnpj || !form.endereco || !form.senha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      Alert.alert('E-mail Inválido', 'Por favor, insira um e-mail completo e válido.');
      return;
    }

    const apenasNumerosTelefone = form.telefone.replace(/\D/g, '');
    const apenasNumerosCNPJ = form.cnpj.replace(/\D/g, '');

    if (apenasNumerosTelefone.length < 10 || apenasNumerosTelefone.length > 11) {
      Alert.alert('Telefone Inválido', 'O telefone deve ter o DDD e o número correto.');
      return;
    }

    if (apenasNumerosCNPJ.length !== 14) {
      Alert.alert('CNPJ Inválido', 'O CNPJ deve conter exatamente 14 números.');
      return;
    }

    try {
      const associadosSalvos = await AsyncStorage.getItem('@usuarios_associados');
      let listaAssociados = associadosSalvos ? JSON.parse(associadosSalvos) : [];
      
      const emailExiste = listaAssociados.find((user: any) => user.email.toLowerCase() === form.email.toLowerCase());
      if (emailExiste) {
        Alert.alert('Erro', 'Este e-mail já está cadastrado no sistema!'); 
        return;
      }

      listaAssociados.push({ 
        ...form, 
        telefone: apenasNumerosTelefone,
        cnpj: apenasNumerosCNPJ,
        tipo: 'associado' 
      });
      
      await AsyncStorage.setItem('@usuarios_associados', JSON.stringify(listaAssociados));
      
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      irParaLogin(); 
      
    } catch (error) {
      Alert.alert('Erro do Sistema', 'Não foi possível salvar o cadastro.');
    }
  };

  // 4. RENDERIZA A VIEW (Passando os dados para ela desenhar)
  return (
    <CadastroAssociadoView 
      form={form}
      setForm={setForm}
      handleCadastro={handleCadastro}
      irParaLogin={irParaLogin}
    />
  );
}