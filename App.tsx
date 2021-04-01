import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import filterImg from './assets/tabs/filter.png';
import searchImg from './assets/tabs/magnifying-glass.png';
import heartImg from './assets/tabs/heart.png';
import dialogImg from './assets/tabs/dialog.png';
import Search from './screens/search/Search';
import SearchList from './screens/search/SearchList';
import { DataStoreProvider, useDataStore } from './store/context';
import SearchDetail from './screens/search/SearchDetail';
import SavedPeopleList from './screens/saved/SavedList';
import {useRoute} from '@react-navigation/native';
import Profile from './screens/Profile';
import Chat from './screens/Chat';

const getImgSource = (name: string) => {
    if (name === 'Search' || name === 'SearchResults') {
      return searchImg;
   } else if (name === 'Messages') {
      return dialogImg;
   } else if (name === 'Saved') {
    return heartImg;
  }
};

const App = () => {
  const Tab = createBottomTabNavigator();
  const SearchStack = createStackNavigator();
  const SavedStack = createStackNavigator();
  const FilterStack = createStackNavigator();
  const ActiveColor = '#EC2761';
  const InActiveColor = '#050038';

  const tabBarOptions = {
    activeTintColor: ActiveColor,
    inactiveTintColor: InActiveColor,
  };
  const stackScreenOptions = {
    headerShown: false,
    gestureEnabled: true,
  };

  const tabScreenOptions = (props: any) => {
  const {route, navigation} = props;
  const [showTab, setShowTab] = useState('');
  const store = useDataStore();

  return ({
    tabBarIcon: ({ color, size }: any) => {
      return (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={getImgSource(route.name)}
            style={{
              opacity: 1,
              tintColor: color === ActiveColor ? ActiveColor : InActiveColor,
              width: size,
              height: size,
            }}
          />
        </View>
      );
    },
    // tabBarButton: (props: any) => {
    //   if (showTab === 'SearchDetail') {
    //     console.log('object :>> ', String(getDetailRoute()));
    //     return(undefined);
    //   } else {
    //     return(
    //       <TouchableOpacity {...props} />
    //     );
    //   }
    // },
    tabBarButton: [
      'Profile',
    ].includes(route.name)
      ? () => {
          return null;
        }
      : undefined,
  }); };

  const ProfileStackScreen = () => {
    return (
      <SearchStack.Navigator screenOptions={stackScreenOptions}>
        <SearchStack.Screen name="Profile" component={Profile} />
      </SearchStack.Navigator>
    );
  };

  const SearchStackScreen = () => {
    return (
      <SearchStack.Navigator screenOptions={stackScreenOptions}>
        <SearchStack.Screen name="Search" component={Search} />
        <SearchStack.Screen name="SearchList" component={SearchList} />
        <SearchStack.Screen name="SearchDetail" component={SearchDetail} />
        <SearchStack.Screen name="Profile" component={Profile} />
      </SearchStack.Navigator>
    );
  };

  const SavedStackScreen = () => {
    return (
      <SearchStack.Navigator screenOptions={stackScreenOptions}>
        <SearchStack.Screen name="Search" component={SavedPeopleList} />
        <SearchStack.Screen name="SearchDetail" component={SearchDetail} />
      </SearchStack.Navigator>
    );
  };

  return (
    <DataStoreProvider>
      <StatusBar style="dark" />

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={tabScreenOptions}
          tabBarOptions={tabBarOptions}
        >
            <Tab.Screen name="Search" component={SearchStackScreen} />
            <Tab.Screen name="Saved" component={SavedStackScreen} />
            <Tab.Screen name="Messages" component={Chat} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />

        </Tab.Navigator>
      </NavigationContainer>
    </DataStoreProvider>
  );
};

export default App;