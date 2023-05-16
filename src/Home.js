import { Entypo } from '@expo/vector-icons'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'

import QRCode from 'react-native-qrcode-svg'

export const Home = () => {
  const [inputText, setInputText] = useState('')
  const [qrvalue, setQrvalue] = useState('')
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Entypo name='camera' onPress={() => navigation.navigate('QRScanner')} style={styles.cameraIcon} size={25} color='#969696'></Entypo>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(inputText) => setInputText(inputText)}
          placeholder="Enter Any Value"
          value={inputText}
        />
        <QRCode
          value={qrvalue || 'NA'}
          size={250}
          color="black"
          backgroundColor="white"
          logoSize={30}
          logoMargin={2}
          logoBorderRadius={15}
          logoBackgroundColor="yellow"
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setQrvalue(inputText)}>
          <Text style={styles.buttonTextStyle}>
            Generate
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10
  },
  textStyle: {
    textAlign: 'center',
    margin: 10
  },
  textInputStyle: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 5,
    borderBottomColor: '#51D8C7',
    height: 35,
    fontSize: 20,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 60,
    marginTop: 120,
    color: '#969696'
  },
  buttonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 25,
    width: '80%',
    marginTop: 60,
    padding: 10
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 20
  },
  cameraIcon: {
    position: 'absolute',
    top: 20,
    left: '85%',
    zIndex: 2
  }
})
