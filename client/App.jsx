import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
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
import EditProfile from './src/screens/subScreen/EditProfile';
import EditEmail from './src/screens/subScreen/EditEmail';
import OtpScreen from './src/screens/subScreen/OtpScreen';
import AllStaffs from './src/screens/subScreen/AllStaffs';
import AllStudents from './src/screens/subScreen/AllStudents';
import EditUserDeatils from './src/screens/subScreen/EditUserDeatils';

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
          tabBarActiveTintColor: '#007bff',
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
          tabBarActiveTintColor: '#007bff',
        }}
      />
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name={'add-circle-outline'} size={22} color={'#000'} />
          ),
          tabBarActiveTintColor: '#007bff',
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name={'notifications-outline'} size={22} color={'#000'} />
          ),
          tabBarActiveTintColor: '#007bff',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Feather name={'user'} size={22} color={'#fff'} />
          ),
          tabBarActiveTintColor: '#007bff',
        }}
      />
    </Tab.Navigator>
  );
}



const TabM = createMaterialTopTabNavigator();

function MyTabsM() {
  return (
    <TabM.Navigator>
      <TabM.Screen name=" Staff" component={AllStaffs} />
      <TabM.Screen name="Student" component={AllStudents} />
    </TabM.Navigator>
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
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="home" component={MyTabs} />
      <Stack.Screen name="firstLoaderScreen" component={FirstLoaderScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="adduser" component={AddUser} />
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="editEmail" component={EditEmail} />
      <Stack.Screen name="viewAllUser" component={MyTabsM} />
      <Stack.Screen name="editUserDetails" component={EditUserDeatils} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
