import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import cities from '../Cities';
import Cards from './Cards';
import {deviceHeight, deviceWidth} from './Dimension';

const Home = ({navigation}) => {
  const [city, setCity] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredCitiess, setFilteredCitiess] = useState([]);
  const handleSearchCity = () => {
    if (city.trim() !== '') {
      navigation.navigate('Details', {name: city});
    }
  };

  const handleCityChange = val => {
    setCity(val);
    // Filter cities based on the user input
    const filtered = cities.filter(item =>
      item.name.toLowerCase().includes(val.toLowerCase()),
    );
    // setFilteredCities(filtered);
    setFilteredCities(filtered.slice(0, 3));
    // setFilteredCities(filtered);
    setFilteredCitiess(filtered);
  };

  const renderCityItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setCity(item.name);
        setFilteredCities([]); // Close the dropdown after selecting an item
      }}>
      <Text style={styles.dropdownText}>{item.name}</Text>
    </TouchableOpacity>
  );
  const handleOutsidePress = () => {
    Keyboard.dismiss();
  };
  const handleUserImageClick = () => {
    // Reload the page or reset the search input field
    setCity('');
    setFilteredCities([]);
    setFilteredCitiess([]);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View>
        <ImageBackground
          source={require('../assets/images/image3.jpg')}
          style={{height: deviceHeight, width: deviceWidth}}
          imageStyle={{opacity: 0.6, backgroundColor: 'black'}}
        />
        <View style={styles.vone}>
          <View style={styles.vtwo}>
            <Icon name="menu" size={46} color="white" />
            <TouchableOpacity onPress={handleUserImageClick}>
              <Image
                source={require('../assets/images/user.png')}
                style={styles.user}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.udetails}>
            <Text style={styles.uname}>Hello Hiran Basnet</Text>
            <Text style={styles.ucity}>Search the City by the Name</Text>
            <View style={styles.search}>
              <TextInput
                value={city}
                onChangeText={handleCityChange}
                placeholder="Search City"
                placeholderTextColor="white"
                style={styles.placeholdert}
              />
              <TouchableOpacity onPress={handleSearchCity}>
                <Icon name="search" size={22} color={'white'} />
              </TouchableOpacity>
            </View>
            {/* Render the dropdown */}

            {filteredCities.length > 0 && (
              <FlatList
                data={filteredCities}
                renderItem={renderCityItem}
                keyExtractor={(item, index) => index.toString()} // Use the index as the key
                style={styles.dropdownContainer}
              />
            )}
            {/* End of dropdown */}

            <Text style={styles.location}>My Location</Text>
            {/* Card List */}
            <FlatList
              horizontal
              data={filteredCitiess.length > 0 ? filteredCitiess : cities} // Use filteredCities if available, otherwise use the original cities array
              renderItem={({item}) => (
                <Cards
                  name={item.name}
                  image={require('../assets/images/image1.jpg')}
                  navigation={navigation}
                />
              )}
            />
            {/* End of Card List */}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;
const styles = StyleSheet.create({
  vone: {
    position: 'absolute',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  vtwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth - 20,
  },
  user: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  udetails: {
    paddingHorizontal: 20,
    marginTop: 100,
  },
  uname: {
    fontSize: 35,
    color: 'white',
  },
  ucity: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  placeholdert: {
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 16,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 45,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  location: {
    color: 'white',
    fontSize: 22,
    paddingHorizontal: 10,
    marginTop: 150,
  },

  dropdownContainer: {
    position: 'absolute',
    top: 155,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
  },
});
