import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import {Provider} from 'react-redux';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import TradeScreen from './screens/TradeScreen';
import LookupScreen from './screens/LookupScreen';
import { store } from './redux/store';

const Login = createStackNavigator(
  {
    LoginScreen,
    RegisterScreen,
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
)

const Home = createStackNavigator(
  {
    HomeScreen,
  },
  {
    initialRouteName: "HomeScreen",
  }
);

const Trade = createStackNavigator(
  {
    TradeScreen,
  },
  {
    initialRouteName: "TradeScreen",
  }
);

const Lookup = createStackNavigator(
  {
    LookupScreen,
  },
  {
    initialRouteName: "LookupScreen",
  }
);

const TabNavigator = createBottomTabNavigator({
  Home,
  Trade,
  Lookup,
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home`;
      } else if (routeName === 'Trade') {
        iconName = `ios-cart`;
      } else if (routeName === 'Lookup') {
        iconName = `ios-search`;
      }

      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  }),
}
);

const switchNavigator = createSwitchNavigator({
  Login,
  TabNavigator,
})

const AppNavigator = createAppContainer(switchNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator screenProps={{user: {}}}/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
