import React, { useState, useReducer, useEffect } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Image 
} from 'react-native'

import * as Location from 'expo-location'

import { useNavigation } from '../utils';

const screenWidth = Dimensions.get('screen').width;

export const LandingScreen = () => {

  const { navigate } = useNavigation()
  
  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState(null);
  const [displayAddress, setDisplayAddress] = useState("Esperando a Localização");

  useEffect(() => {

    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location: any = await Location.getCurrentPositionAsync({});

      const { coords } = location;

      if(coords){

        const { latitude,longitude } = coords;

        let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude });

        for(let item of addressResponse){
          setAddress(item);
          let currentAddress = `${item.name}, ${item.street}, ${item.postalCode}, ${item.country}`;
          setDisplayAddress(currentAddress)

          if(currentAddress.length > 0){
            setTimeout(() =>(
              navigate('homeStack')
            ), 2000)
          }
          return;
        }
      }else{
        //diga q algo deu errado com a localização
      }
      
    })();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.navigation}>

      </View>
      <View style={styles.body}>
        <Image source={require('../images/deliveryIcon.png')} style={styles.deliveryIcon}/>
        <View style={styles.adressContainer}>
          <Text style={styles.adressTitle}>Seu endereço de entrega</Text>
        </View>
        <Text style={styles.subtitle}>{displayAddress}</Text>
      </View>
      <View style={styles.footer}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
  navigation: {
    flex: 2,
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryIcon :{
    width: 120,
    height: 120,
  },
  adressContainer: {
    width: screenWidth -100,
    borderBottomColor: 'black',
    borderBottomWidth: .5,
    padding: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  adressTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7D7D7D',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '200',
    color: '#4F4F4F'
  },
  footer: {
    flex: 1,
  }
})
