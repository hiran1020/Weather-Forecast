import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_KEY} from './Constants';
import {deviceHeight, deviceWidth} from './Dimension';

export default function Details({route, navigation}) {
  const {name} = route.params;
  const [forecastData, setForecastData] = useState([]);
  const [cityData, setCityData] = useState('');

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API_KEY}`,
    )
      .then(res => res.json())
      .then(res => {
        setForecastData(res.list);
        setCityData(res.city);
      })
      .catch(err => console.log(err));
  }, []);

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
    datetime = new Date(timestamp * 1000 - offset);

    return datetime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      // timeZone: 'UTC',
    });
  };
  // const sunriseTimestamp = cityData.sunrise; // Replace with your actual sunrise timestamp
  // const sunsetTimestamp = cityData.sunset;
  // const offset = cityData.timezone;

  // const sunriseDate = new Date(sunriseTimestamp * 1000 + offset);
  // const sunsetDate = new Date(sunsetTimestamp * 1000 + offset);

  // // Format the Date objects as time strings
  // const sunriseTime = sunriseDate.toLocaleTimeString('en-US', {
  //   hour: '2-digit',
  //   minute: '2-digit',
  // });
  // const sunsetTime = sunsetDate.toLocaleTimeString('en-US', {
  //   hour: '2-digit',
  //   minute: '2-digit',
  // });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        {/* Background Image */}
        <ImageBackground
          source={require('../assets/images/image1.jpg')}
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
                <Text style={styles.sectionTitle}>
                  Sunrise: {formatedTime(cityData.sunrise, cityData.timezone)}
                </Text>
                <Text style={styles.sectionTitle}>
                  Sunset: {formatedTime(cityData.sunset, cityData.timezone)}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.sectionTitle}>Weather Details</Text>
              <ScrollView>
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
                        Temperature: {kelvinToCelsius(forecast.main.temp)}&deg;
                        C
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
                        Visibility: {metersToKilometers(forecast.visibility)} km
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
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
});
