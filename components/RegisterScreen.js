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
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (username && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          await AsyncStorage.setItem('@username', username);
          await AsyncStorage.setItem('@password', password);
          navigation.navigate('Login');
        } catch (error) {
          Alert.alert('Erro', 'Ocorreu um erro ao tentar registrar');
        }
      } else {
        Alert.alert('Erro', 'As senhas não coincidem');
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
      <Input 
        placeholder="Confirmar Senha" 
        secureTextEntry 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
      />
      <Button onPress={handleRegister}>
        <ButtonText>Cadastrar</ButtonText>
      </Button>
    </Container>
  );
}
