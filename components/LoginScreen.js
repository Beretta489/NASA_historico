import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #0b3d91; /* Azul escuro da NASA */
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const AppTitle = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 8px;
`;

const Button = styled.TouchableOpacity`
  background-color: #e31b6d; /* Vermelho da NASA */
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;

const RegisterButton = styled.TouchableOpacity`
  margin-top: 10px;
`;

const RegisterText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  text-decoration: underline;
`;

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (username && password) {
      try {
        const storedUsername = await AsyncStorage.getItem('@username');
        const storedPassword = await AsyncStorage.getItem('@password');
        
        if (username === storedUsername && password === storedPassword) {
          navigation.navigate('Home');
        } else {
          Alert.alert('Erro', 'Credenciais inválidas');
        }
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
    }
  };

  return (
    <Container>
      <AppTitle>SpaceX App</AppTitle>
      <Input 
        placeholder="Usuário" 
        value={username} 
        onChangeText={setUsername} 
      />
      <Input 
        placeholder="Senha" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <Button onPress={handleLogin}>
        <ButtonText>Entrar</ButtonText>
      </Button>

      <RegisterButton onPress={() => navigation.navigate('Register')}>
        <RegisterText>Não tem conta? Cadastre-se</RegisterText>
      </RegisterButton>
    </Container>
  );
}
