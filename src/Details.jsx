import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_KEY} from './Constants';
import {deviceHeight, deviceWidth} from './Dimension';

const ErrorModal = ({visible, message, onClose}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.errorMessage}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function Details({route, navigation}) {
  const {name} = route.params;
  const [forecastData, setForecastData] = useState([]);
  const [cityData, setCityData] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API_KEY}`,
    )
      .then(res => res.json())
      .then(res => {
        if (res.cod === '200') {
          setForecastData(res.list);
          setCityData(res.city);
          setError(null); // Clear any previous error when data is successfully fetched
        } else {
          setError('No such city.Make sure you entered the correct name ');
        }
      })
      .catch(err => {
        setError('Network error. Please try again later.');
        console.log('Error:', err);
      });
  }, []);
  const onCloseErrorModal = () => {
    setError(null); // Clear the error state
    navigation.navigate('Home'); // Navigate back to the home screen
  };

  const kelvinToCelsius = temp => (temp - 273.15).toFixed(2);

  const metersToKilometers = visibility => (visibility / 1000).toFixed(2);

  getWeatherIcon = weatherType => {
    switch (weatherType) {
      case 'Clear':
        return 'partly-sunny';
      case 'Clouds':
        return 'cloudy-outline';
      case 'Rain':
        return 'rainy-outline';
      case 'Snow':
        return 'snow-outline';
      case 'Sunny':
        return 'sunny-outline';
      default:
        return 'help-with-circle'; // Default icon
    }
  };

  formatedTime = (timestamp, offset) => {
    // datetime = new Date(timestamp * 1000 - offset);
    const datetime = new Date(timestamp * 1000 - offset * 1000);

    const options = {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    };

    return new Intl.DateTimeFormat('en-US', options).format(datetime);
  };
  const getBackgroundImage = forecastType => {
    switch (forecastType) {
      case 'Clear':
        return require('../assets/images/clear.jpg');
      case 'Clouds':
        return require('../assets/images/cloudy.jpg');
      case 'Rain':
        return require('../assets/images/rainy.jpg');
      case 'Snow':
        return require('../assets/images/snowy.jpg');
      case 'Sunny':
        return require('../assets/images/sunny.jpg');
      default:
        return require('../assets/images/default.jpg'); // Default background image
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ErrorModal
        visible={!!error} // Show the modal only when there's an error
        onClose={onCloseErrorModal} // Function to close the modal and navigate back to home
      />

      {error ? ( // Conditional rendering for error message
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : forecastData.length > 0 ? (
        <View>
          {/* Background Image */}
          <ImageBackground
            source={getBackgroundImage(forecastData[0].weather[0].main)}
            // Get the appropriate background image based on the weather type
            style={styles.backgroundImage}
            imageStyle={styles.imageStyle}>
            {/* Back button and user icon */}
            <View style={styles.backButtonContainer}>
              <View style={styles.vtwo}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Icon name="arrow-back" style={styles.backIcon} />
                </TouchableOpacity>
                <Image
                  source={require('../assets/images/user.png')}
                  style={styles.user}
                />
              </View>
            </View>

            {/* Weather Details */}
            <View style={styles.weatherDetailsContainer}>
              <View>
                <Text style={styles.cityName}>{name}</Text>
                {forecastData.length > 0 && (
                  <View>
                    <Text style={styles.weatherDescription}>
                      {forecastData[0].weather[0].main}
                    </Text>
                    <Icon
                      name={getWeatherIcon(forecastData[0].weather[0].main)}
                      size={64}
                      color="skyblue"
                      style={styles.weatherIcon}
                    />
                  </View>
                )}
              </View>

              {forecastData.length > 0 && (
                <Text style={styles.temperatureText}>
                  {kelvinToCelsius(forecastData[0].main.temp)}&deg; C
                </Text>
              )}
              <View>
                <View style={styles.cityItem}>
                  {cityData && (
                    <View style={styles.cityItem}>
                      {cityData.sunrise && (
                        <Text style={styles.sectionTitle}>
                          Sunrise:{' '}
                          {formatedTime(cityData.sunrise, cityData.timezone)}
                        </Text>
                      )}
                      {cityData.sunset && (
                        <Text style={styles.sectionTitle}>
                          Sunset:{' '}
                          {formatedTime(cityData.sunset, cityData.timezone)}
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              </View>
              <View>
                <Text style={styles.sectionTitle}>Weather Details</Text>
                {/* <ScrollView>
                  <View style={styles.weatherInfoContainer}>
                    {forecastData.map((forecast, index) => (
                      <View key={index} style={styles.forecastItem}>
                        <Text style={styles.weatherInfo}>
                          Date and Time: {forecast.dt_txt}
                        </Text>
                        <View style={styles.ForecastIcon}>
                          <Text style={styles.weatherInfo}>
                            Forecast: {forecast.weather[0].main}
                          </Text>
                          <Icon
                            name={getWeatherIcon(forecast.weather[0].main)}
                            size={25}
                            color="skyblue"
                            style={styles.ForecastIcone}
                          />
                        </View>
                        <Text style={styles.weatherInfo}>
                          Temperature: {kelvinToCelsius(forecast.main.temp)}
                          &deg; C
                        </Text>
                        <Text style={styles.weatherInfo}>
                          Wind: {forecast.wind.speed} m/s
                        </Text>
                        <Text style={styles.weatherInfo}>
                          Pressure: {forecast.main.pressure} hPa
                        </Text>
                        <Text style={styles.weatherInfo}>
                          Humidity: {forecast.main.humidity}%
                        </Text>
                        <Text style={styles.weatherInfo}>
                          Visibility: {metersToKilometers(forecast.visibility)}{' '}
                          km
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView> */}
                <View style={styles.weatherInfoSlides}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {forecastData.map((forecast, index) => (
                      <View key={index} style={styles.weatherInfoSlide}>
                        <Text style={styles.weatherInfo}>
                          Date and Time: {forecast.dt_txt}
                        </Text>
                        <View style={styles.ForecastIcon}>
                          <Text style={styles.weatherInfo}>
                            Forecast: {forecast.weather[0].main}
                          </Text>
                          <Icon
                            name={getWeatherIcon(forecast.weather[0].main)}
                            size={25}
                            color="skyblue"
                            style={styles.ForecastIcone}
                          />
                        </View>
                        <Text style={styles.weatherInfo}>
                          Temperature: {kelvinToCelsius(forecast.main.temp)}
                          &deg; C
                        </Text>
                        <Text style={styles.weatherInfo}>
                          Wind: {forecast.wind.speed} m/s
                        </Text>
                        <Text style={styles.weatherInfo}>
                          Pressure: {forecast.main.pressure} hPa
                        </Text>
                        <Text style={styles.weatherInfo}>
                          Humidity: {forecast.main.humidity}%
                        </Text>
                        <Text style={styles.weatherInfo}>
                          Visibility: {metersToKilometers(forecast.visibility)}{' '}
                          km
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  backgroundImage: {
    height: deviceHeight,
    width: deviceWidth,
  },
  user: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  imageStyle: {
    opacity: 0.6,
    backgroundColor: 'black',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    fontSize: 46,
    color: 'white',
  },
  vtwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth - 20,
  },
  userIconContainer: {},
  userIcon: {
    height: 46,
    width: 46,
    borderRadius: 50,
  },
  weatherDetailsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: deviceHeight - 100,
    marginTop: 75,
  },
  weatherInfoSlides: {
    height: deviceHeight * 0.4, // Adjust this value according to your design
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  weatherInfoSlide: {
    width: deviceWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    flex: 1,
    borderColor: 'gray',
    borderWidth: 2,
  },
  cityName: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  weatherDescription: {
    fontSize: 24,
    color: 'skyblue',
    textAlign: 'center',
  },
  temperatureText: {
    color: 'green',
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    marginBottom: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  weatherInfoContainer: {
    width: deviceWidth - 60,
    paddingBottom: 20,
  },
  forecastItem: {
    marginTop: 20,
    borderColor: 'blue',
  },
  weatherInfo: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  weatherIcon: {
    marginTop: 10,
    textAlign: 'center',
  },
  ForecastIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ForecastIcone: {
    padding: 10,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
  },
});
