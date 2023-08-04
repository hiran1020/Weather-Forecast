import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import cities from '../Cities';
import Cards from './Cards';
import {deviceHeight, deviceWidth} from './Dimension';

const Home = props => {
  const [city, setCity] = useState();

  return (
    <View>
      <ImageBackground
        source={require('../assets/images/image3.jpg')}
        style={{height: deviceHeight, width: deviceWidth}}
        imageStyle={{opacity: 0.6, backgroundColor: 'black'}}
      />
      <View style={styles.vone}>
        <View style={styles.vtwo}>
          <Icon name="menu" size={46} color="white" />
          <Image
            source={require('../assets/images/user.png')}
            style={styles.user}
          />
        </View>
        <View style={styles.udetails}>
          <Text style={styles.uname}>Hello Hiran Basnet</Text>
          <Text style={styles.ucity}>Search the City by the Name</Text>
          <View style={styles.search}>
            <TextInput
              value={city}
              onChangeText={val => setCity(val)}
              placeholder="Search City"
              placeholderTextColor="white"
              style={styles.placeholdert}
            />
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Details', {name: city})
              }>
              <Icon name="search" size={22} color={'white'} />
            </TouchableOpacity>
          </View>
          <View />
          <Text style={styles.location}>My Location</Text>
          <FlatList
            horizontal
            data={cities}
            renderItem={({item}) => (
              <Cards
                name={item.name}
                image={require('../assets/images/image1.jpg')}
                navigation={props.navigation}
              />
            )}
          />
        </View>
      </View>
    </View>
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
});
