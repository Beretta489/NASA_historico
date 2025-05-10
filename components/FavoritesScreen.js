import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #0b3d91;
  padding: 10px;
`;

const Card = styled.TouchableOpacity`
  background-color: #002f6c;
  margin-bottom: 10px;
  border-radius: 12px;
  padding: 10px;
`;

const CardImage = styled.Image`
  height: 200px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const CardTitle = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;

const CardSub = styled.Text`
  color: #d0d0d0;
  font-size: 14px;
`;

const RemoveButton = styled.TouchableOpacity`
  background-color: #e31b6d;
  padding: 6px;
  border-radius: 6px;
  margin-top: 8px;
  align-items: center;
`;

const RemoveButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  const loadFavorites = async () => {
    const data = await AsyncStorage.getItem('@favorites');
    setFavorites(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const handleRemove = async (id) => {
    const updated = favorites.filter(item => item.id !== id);
    await AsyncStorage.setItem('@favorites', JSON.stringify(updated));
    setFavorites(updated);
    Alert.alert('Removido', 'Lançamento removido dos favoritos.');
  };

  return (
    <Container>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('Details', { launch: item })}>
            {item.links?.patch?.small && (
              <CardImage source={{ uri: item.links.patch.small }} resizeMode="cover" />
            )}
            <CardTitle>{item.name}</CardTitle>
            <CardSub>Status: {item.success === true ? 'Sucesso' : item.success === false ? 'Falha' : 'Desconhecido'}</CardSub>
            <CardSub>Data: {new Date(item.date_utc).toLocaleDateString()}</CardSub>
            <RemoveButton onPress={() => handleRemove(item.id)}>
              <RemoveButtonText>Remover dos Favoritos</RemoveButtonText>
            </RemoveButton>
          </Card>
        )}
      />
    </Container>
  );
}
