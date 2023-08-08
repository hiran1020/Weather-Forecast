import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import cities from '../Cities';

const CityCard = ({country, name, geonameid, navigation}) => {
  const handleCardPress = () => {
    navigation.navigate('Details', {name});
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <View style={styles.cardContentLeft}>
          <Text style={styles.cardText}>{country}</Text>
          <Text style={styles.cardText}>{name}</Text>
          <Text style={styles.cardText}>{geonameid}</Text>
        </View>
        <View style={styles.cardContentRight}>
          <View style={styles.icon}>
            <Icon name="snow-outline" size={30} color="skyblue" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const History = ({navigation}) => {
  const [city, setCity] = useState('');
  const [filteredCities, setFilteredCities] = useState(cities); // Initialize with all cities
  const handleSearchCity = () => {
    if (city.trim() !== '') {
      navigation.navigate('Details', {name: city});
    }
  };
  const handleCityChange = val => {
    setCity(val);
    // Filter cities based on the user input (both city and country names)
    const filtered = cities.filter(
      item =>
        item.name.toLowerCase().includes(val.toLowerCase()) ||
        item.country.toLowerCase().includes(val.toLowerCase()),
    );
    setFilteredCities(filtered);
  };

  return (
    <View>
      <View style={styles.search}>
        <TextInput
          value={city}
          onChangeText={handleCityChange}
          placeholder="Search By City/Country"
          placeholderTextColor="black"
          style={styles.placeholdert}
        />
        <TouchableOpacity onPress={handleSearchCity}>
          <Icon name="search" size={22} color={'white'} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredCities}
        keyExtractor={item => item.geonameid.toString()}
        renderItem={({item}) => (
          <CityCard
            country={item.country}
            name={item.name}
            geonameid={item.geonameid}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 3,
    padding: 10,
  },
  icon: {
    flexDirection: 'row',
  },
  cardContentLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  cardContentRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  placeholdert: {
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 16,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 45,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
export default History;
