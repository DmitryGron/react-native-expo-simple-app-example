import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, ScrollView, SafeAreaView, ActivityIndicator, TextInput, TouchableOpacity, Dimensions,} from 'react-native';
import { Card, Icon, Image, Button, AirbnbRating } from 'react-native-elements';
import GoBackHeader from '../components/header/GoBackHeader';
import MapView from '../components/map/MapView';
import { AntDesign } from '@expo/vector-icons';
import { useDataStore } from '../store/context';
import { observer } from 'mobx-react-lite';

const Hire: React.FC<any> = observer(({ navigation, route }) => {
  const { person = {} } = route.params;
  const store = useDataStore();
  const { removePeople, getSavedPeople, setSavedPeople} = store;
  const [value, onChangeText] = React.useState('Some comment');

  if (!store) throw Error('Store shouldn\'t be null');
  const [checked, setChecked] = useState(false);
  const onPressHandleSave = () => {
    setSavedPeople({...person, checked: true })
    setChecked(true)
  }
  const onPressHandleRemove = () => {
    removePeople(person)
    setChecked(false)
  }

  useEffect(() => {
    setChecked(Boolean(getSavedPeople().filter(el => el.id === person.id).length))
  }, [getSavedPeople, checked, route.name])

  return (
    <>
        <SafeAreaView style={styles.topSafeArea} />
        <View style={styles.header}>
        <GoBackHeader navigation={navigation} route={route} />
        </View>
        <ScrollView style={{ flex: 1 }}>
        <View style={styles.content}>
          <Text style={styles.title}>{person.name}</Text>
          <View  style={styles.imageContainer}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <Text>$26 /</Text>
                <Text style={{color: '#EC2761'}}> hour</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text>$100 /</Text>
                <Text style={{color: '#EC2761'}}> per work</Text>
              </View>
            </View>
            <Image
              style={styles.image}
              source={{ uri: person.img}}
              placeholderStyle={{ backgroundColor: 'transparent' }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={{paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 18 }}> Dates </Text>
            <Text style={{color: '#EC2761', fontSize: 18}}> Apr 4 - 10 </Text>
          </View>
          <View style={{paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 18 }}> Hours </Text>
            <Text style={{color: '#EC2761', fontSize: 18}}> 4 </Text>
          </View>
          <View style={{paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 18 }}> Work </Text>
            {person.tags.map( (tag: string, key: number) => 
                        <View key={key} style={{flexDirection: 'column'}}>
                          <Text style={{ fontSize: 18 }}>{tag}</Text>
                        </View>)}
          </View>
        </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() =>navigation.navigate('Chat')}
        >
          <View
            style={styles.button}
          >
            <Text style={styles.buttonText}>Message</Text>
          </View>
        </TouchableOpacity>
    </>
  );
});

export default Hire;

const styles = StyleSheet.create({
    topSafeArea: {
        backgroundColor: '#f9f9f9',
    },
    button: {
      marginTop: 20,
      backgroundColor: '#f9f9f9',
      padding: 15,
      borderWidth: 2,
      borderColor: '#050038',
    },
    buttonText: {
      color: '#050038',
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
    },
    postInput: {
      fontSize: 24,
      borderColor:'#42435b',
      borderWidth:1,
      margin:10,
      },
    content: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
        minHeight: 500,
        marginVertical:  2,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    height: 44,
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  description: {
    color: '#4f4f4f',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 15,
    marginBottom: 35,
  },
});
