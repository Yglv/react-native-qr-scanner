import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity, Modal, TextInput } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Entypo } from '@expo/vector-icons'
import { WebView } from 'react-native-webview'
import Clipboard from 'expo-clipboard'

export const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [text, setText] = useState('')
  const [activeLink, setActiveLink] = useState(false)
  const [link, setLink] = useState('')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }

  const handleClose = () => {
    setActiveLink(false)
  }

  const handleOpen = () => {
    setActiveLink(true)
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission()
  }, [])

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    if (data.slice(0, 4) === 'http') {
      setLink(data)
      handleOpen()
    } else {
      setText(data)
    }
    console.log('Type: ' + type + '\nData: ' + data)
  }

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  // Return the View
  return (
    <>
      <View style={styles.container}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        <Text style={styles.maintext}>{'Not yet scanned'}</Text>
        <TextInput value={text} style={styles.textInputStyle} showSoftInputOnFocus={false}/>
        {scanned && 
          <Button title={'Scan again?'} style={{ marginTop: 40 }} onPress={() => setScanned(false)} color='tomato'/>}
      </View>
      <Modal
        animationType={'slide'}
        visible={activeLink}
        onRequestClose={() => handleClose()}>
        <TouchableOpacity style={{ height: '10%', backgroundColor: '#ffffff', paddingTop: 40, paddingLeft: 330 }}>
          <Entypo name='cross' onPress={() => handleClose()} color='#FF6347' style={styles.closeIcon} size={40}></Entypo>
        </TouchableOpacity>
        <WebView
          source={{
            uri: link
          }}
          originWhitelist={['*']}
          style={{ flex: 1 }}
        />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100
  },
  maintext: {
    fontSize: 30,
    marginTop: 50
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
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
    marginTop: 30,
    marginBottom: 30,
    color: '#969696'
  },
})
