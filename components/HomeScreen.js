// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #0b3d91;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

const FavoritesButton = styled.TouchableOpacity`
  background-color: #ffcc00;
  padding: 8px 16px;
  border-radius: 8px;
`;

const FavoritesText = styled.Text`
  color: #000;
  font-weight: bold;
`;

const SearchInput = styled.TextInput`
  background-color: #fff;
  padding: 10px;
  margin: 10px 20px;
  border-radius: 8px;
`;

const Card = styled.TouchableOpacity`
  background-color: #1e2a78;
  flex: 1;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
`;

const CardImage = styled.Image`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
`;

const MissionName = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

const StatusText = styled.Text`
  color: ${props => (props.success ? '#32CD32' : '#FF6347')};
  margin-top: 5px;
`;

const HomeScreen = () => {
  const [launches, setLaunches] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchLaunches();
  }, []);

  useEffect(() => {
    setFiltered(
      launches.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, launches]);

  const fetchLaunches = async () => {
    try {
      const res = await axios.get('https://api.spacexdata.com/v4/launches');
      setLaunches(res.data);
      setFiltered(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <Card onPress={() => navigation.navigate('Details', { launch: item })}>
      {item.links?.patch?.small && (
        <CardImage source={{ uri: item.links.patch.small }} resizeMode="contain" />
      )}
      <MissionName>{item.name}</MissionName>
      <StatusText success={item.success}>
        {item.success ? 'Sucesso' : 'Falha'}
      </StatusText>
    </Card>
  );

  return (
    <Container>
      <Header>
        <Title>SpaceX App</Title>
        <FavoritesButton onPress={() => navigation.navigate('Favorites')}>
          <FavoritesText>Favoritos</FavoritesText>
        </FavoritesButton>
      </Header>
      <SearchInput
        placeholder="Buscar missão..."
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#888"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </Container>
  );
};

export default HomeScreen;

