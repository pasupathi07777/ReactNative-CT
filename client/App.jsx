import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/auth/Login';
import Signup from './src/screens/auth/Signup';
import EmailVerify from './src/screens/auth/EmailVerify';
import Home from './src/screens/Home';
import FirstLoaderScreen from './src/screens/FirstLoaderScreen';
import VerifyOtp from './src/screens/auth/VerifyOtp';
import ResetPassword from './src/screens/auth/ResetPassword';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Chat from './src/screens/main/Chat';
import Posts from './src/screens/main/Posts';
import Notifications from './src/screens/main/Notifications';
import Profile from './src/screens/main/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AddUser from './src/screens/subScreen/AddUser';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#42f44b',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name={'home'} size={22} color={'#000'} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name={'chatbubble-ellipses-outline'}
              size={22}
              color={'#000'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name={'add-circle-outline'} size={22} color={'#000'} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name={'notifications-outline'} size={22} color={'#000'} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          // tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => (
            <Feather name={'user'} size={22} color={'#000'} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="firstLoaderScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="EmailVerify" component={EmailVerify} />
      <Stack.Screen name="verifyOtp" component={VerifyOtp} />
      <Stack.Screen name="home" component={MyTabs} />
      <Stack.Screen name="firstLoaderScreen" component={FirstLoaderScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      {/* <Stack.Screen name="addStudent" component={AddStudent} />
      <Stack.Screen name="addStaff" component={AddStaff} /> */}
      <Stack.Screen name="adduser" component={AddUser} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer >
      <RootStack />
    </NavigationContainer>
  );
}
