import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
  } from 'react-native';
import Constants from 'expo-constants';
import { Image } from 'react-native-elements';
import GoBackHeader from '../components/header/GoBackHeader';
import { Feather } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { Rating } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, MaterialIcons, Ionicons, SimpleLineIcons } from '@expo/vector-icons';

const formatData = (data: any[], numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };

const MyWork: React.FC<any> = observer(({navigation}) => {

    return (
      <>
        <SafeAreaView style={styles.topSafeArea} />
        <StatusBar style="dark" />
        <View style={styles.header}>
        <GoBackHeader navigation={navigation} />
        </View>
        <ScrollView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
        <Text style={{
            alignItems: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            marginLeft: 10,
          }}
        >MyWork</Text>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#a0e0fa' ,
            borderRadius: 5,
            marginRight: 30,
            marginLeft: 30,
            padding: 5,
            borderWidth: 1,
            borderColor: '#7e7c7c', 
        }}>
            <TouchableOpacity
              onPress={() => console.log('')}>
              <View style={{
                padding: 5,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: '#302e2e',
                backgroundColor : '#1f98e94',
                marginRight: 20,
                flexDirection: 'row' }}>
                <Text style={{ fontSize: 20 }}>Work in progress</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('')}>
            <View style={{ marginRight: 20, flexDirection: 'row' }}>
              <Text style={{ fontSize: 20 }}>Past Projects</Text>
            </View>
          
        </TouchableOpacity>
            
        </View>
        </ScrollView>
 
      </>
    );
  });

export default MyWork;

const styles = StyleSheet.create({
  topSafeArea: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f9f9f9',
  },
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#f9f9f9',
    },
    hiText: {
      color: '#050038',
      textAlign: 'left',
      fontSize: 40,
      lineHeight: 50,
      fontWeight: 'bold',
      paddingLeft: 5,
    },
    item: {
      flex: 1,
      flexDirection: 'column',
      margin: 10,
      backgroundColor: '#ffffff',
      shadowColor: 'rgba(0,0,0, .4)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1, // IOS
      elevation: 2, // Android
      justifyContent: 'center',
      paddingBottom: 4,
    },
    itemInvisible: {
      backgroundColor: 'transparent',
      shadowColor: 'transparent',
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 250,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 0,
      height: 44,
      backgroundColor: '#f9f9f9',
    },
    subHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    content: {
      padding: 10,
      backgroundColor: '#f9f9f9',
    },
    itemText: {
      color: '#000000',
      fontSize: 18,
    },
    userText: {
      color: '#050038',
      textAlign: 'left',
      fontSize: 30,
      lineHeight: 30,
      paddingLeft: 5,
    },
    rating: {
      paddingVertical: 10,
    },
  });