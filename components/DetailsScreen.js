// src/screens/DetailsScreen.js
import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #0b3d91;
`;

const Content = styled.ScrollView`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
`;

const SubTitle = styled.Text`
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 10px;
`;

const DetailText = styled.Text`
  font-size: 16px;
  color: #ccc;
  margin-bottom: 20px;
`;

const CardImage = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const StatusText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => (props.success ? '#32CD32' : '#FF6347')};
  margin-bottom: 20px;
`;

const LinkButton = styled.TouchableOpacity`
  background-color: #1a73e8;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const LinkButtonText = styled.Text`
  color: #fff;
  text-align: center;
`;

const FavoriteButton = styled.TouchableOpacity`
  background-color: #ffcc00;
  padding: 12px;
  border-radius: 8px;
  margin-top: 20px;
`;

const FavoriteButtonText = styled.Text`
  color: #000;
  font-weight: bold;
  text-align: center;
`;

const DetailsScreen = () => {
  const route = useRoute();
  const { launch } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

const checkIfFavorite = async () => {
  try {
    const favorites = await AsyncStorage.getItem('@favorites');
    const parsed = favorites ? JSON.parse(favorites) : [];
    const exists = parsed.some(item =>
      (item.id && item.id === launch.id) ||
      (item.flight_number && item.flight_number === launch.flight_number)
    );
    setIsFavorite(exists);
  } catch (err) {
    console.error(err);
  }
};

const toggleFavorite = async () => {
  try {
    const favorites = await AsyncStorage.getItem('@favorites');
    let parsed = favorites ? JSON.parse(favorites) : [];

    const idOrFlight = launch.id || launch.flight_number;
    const exists = parsed.some(item =>
      (item.id && item.id === idOrFlight) ||
      (item.flight_number && item.flight_number === idOrFlight)
    );

    if (exists) {
      parsed = parsed.filter(item =>
        !((item.id && item.id === idOrFlight) ||
          (item.flight_number && item.flight_number === idOrFlight))
      );
    } else {
      parsed.push(launch);
    }

    await AsyncStorage.setItem('@favorites', JSON.stringify(parsed));
    setIsFavorite(!exists);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <Container>
      <Content>
        <Title>{launch.name}</Title>
        {launch.links?.patch?.small && (
          <CardImage source={{ uri: launch.links.patch.small }} resizeMode="cover" />
        )}

        <SubTitle>Status:</SubTitle>
        <StatusText success={launch.success}>
          {launch.success === true ? 'Sucesso' : launch.success === false ? 'Falha' : 'Desconhecido'}
        </StatusText>

        <SubTitle>Data:</SubTitle>
        <DetailText>{new Date(launch.date_utc).toLocaleDateString()}</DetailText>

        <SubTitle>Descrição:</SubTitle>
        <DetailText>{launch.details || 'Sem descrição disponível'}</DetailText>

        <SubTitle>Link do vídeo:</SubTitle>
        {launch.links?.webcast ? (
          <LinkButton onPress={() => Linking.openURL(launch.links.webcast)}>
            <LinkButtonText>Assistir lançamento</LinkButtonText>
          </LinkButton>
        ) : (
          <DetailText>Não disponível</DetailText>
        )}

        <SubTitle>Artigo:</SubTitle>
        {launch.links?.article ? (
          <LinkButton onPress={() => Linking.openURL(launch.links.article)}>
            <LinkButtonText>Ler artigo</LinkButtonText>
          </LinkButton>
        ) : (
          <DetailText>Não disponível</DetailText>
        )}

      

        <FavoriteButton onPress={toggleFavorite}>
          <FavoriteButtonText>
            {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </FavoriteButtonText>
        </FavoriteButton>
      </Content>
    </Container>
  );
};

export default DetailsScreen;