import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Text } from 'react-native'
import { Home } from './src/Home'
import { QRScanner } from './src/QRScanner'
import React from 'react'

const Stack = createStackNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name='Home'
          options={({ navigation }) => ({
            headerTitle: () => <Text></Text>,
            headerStyle: {
              backgroundColor: '#ffffff',
              height: 50,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0
            },
          })}
          />
        <Stack.Screen
          component={QRScanner}
          name='QRScanner'
          options={({ navigation }) => ({
            headerTitle: () => <Text></Text>,
            headerStyle: {
              backgroundColor: '#ffffff',
              height: 100,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0
            },
            headerTintColor: '#51D8C7'
          })}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
