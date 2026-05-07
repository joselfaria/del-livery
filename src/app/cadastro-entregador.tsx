import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { CadastroEntregadorView } from '../views/cadastro-entregador-view';

export default function CadastroEntregador() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: ''
  });

  const irParaLogin = () => {
    router.push('/login');
  };

  const validarCPF = (cpf: string) => {
    const cpfLimpo = cpf.replace(/\D/g, '');

    if (/^(\d)\1+$/.test(cpfLimpo)) return false;

    let soma = 0;

    for (let i = 0; i < 9; i++) {
      soma += Number(cpfLimpo[i]) * (10 - i);
    }

    let resto = soma % 11;
    let digitoJ = 11 - resto;

    if (digitoJ >= 10) digitoJ = 0;

    if (digitoJ !== Number(cpfLimpo[9])) {
      return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
      soma += Number(cpfLimpo[i]) * (11 - i);
    }

    resto = soma % 11;
    let digitoK = 11 - resto;

    if (digitoK >= 10) digitoK = 0;

    if (digitoK !== Number(cpfLimpo[10])) {
      return false;
    }

    return true;
  };

  const handleCadastro = async () => {
    if (!form.nome || !form.email || !form.cpf || !form.senha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      Alert.alert(
        'E-mail Inválido',
        'Por favor, insira um e-mail completo e válido.'
      );
      return;
    }

    const apenasNumerosCPF = form.cpf.replace(/\D/g, '');

    if (apenasNumerosCPF.length !== 11) {
      Alert.alert(
        'CPF Inválido',
        'O CPF deve conter exatamente 11 números.'
      );
      return;
    }

    if (!validarCPF(apenasNumerosCPF)) {
      Alert.alert(
        'CPF Inválido',
        'O CPF informado não é válido.'
      );
      return;
    }

    try {
      const entregadoresSalvos = await AsyncStorage.getItem(
        '@usuarios_entregadores'
      );

      let listaEntregadores = entregadoresSalvos
        ? JSON.parse(entregadoresSalvos)
        : [];

      const emailExiste = listaEntregadores.find(
        (user: any) =>
          user.email.toLowerCase() === form.email.toLowerCase()
      );

      if (emailExiste) {
        Alert.alert(
          'Erro',
          'Este e-mail já está cadastrado no sistema!'
        );
        return;
      }

      listaEntregadores.push({
        ...form,
        cpf: apenasNumerosCPF,
        tipo: 'entregador'
      });

      await AsyncStorage.setItem(
        '@usuarios_entregadores',
        JSON.stringify(listaEntregadores)
      );

      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso!'
      );

      irParaLogin();

    } catch (error) {
      Alert.alert(
        'Erro do Sistema',
        'Não foi possível salvar o cadastro.'
      );
    }
  };

  return (
    <CadastroEntregadorView
      form={form}
      setForm={setForm}
      handleCadastro={handleCadastro}
      irParaLogin={irParaLogin}
    />
  );
}
