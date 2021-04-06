import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, ScrollView, SafeAreaView, ActivityIndicator, TextInput, TouchableOpacity  } from 'react-native';
import { Card, Icon, Image, Button, AirbnbRating } from 'react-native-elements';
import GoBackHeader from '../../components/header/GoBackHeader';
import MapView from '../../components/map/MapView';
import { AntDesign } from '@expo/vector-icons';
import { useDataStore } from '../../store/context';
import { observer } from 'mobx-react-lite';

const SearchDetail: React.FC<any> = observer(({ navigation, route }) => {
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
          <Image
                style={styles.image}
                source={{ uri: person.img}}
                placeholderStyle={{ backgroundColor: 'transparent' }}
                PlaceholderContent={<ActivityIndicator />}
              />
              <AntDesign
              onPress={!checked ? onPressHandleSave : onPressHandleRemove}
              name={ checked ?  'heart' : 'hearto'}
              size={40}
              color="red"
              style={{
                position: 'absolute',
                right: 10,
                top: 10,
          }}/>
          { person.tags.map( (tag: string) => <Text>{tag}</Text>)}
          <Text style={{fontSize: 15, marginBottom: 5, marginTop: 10, alignItems: 'center'}}>Available</Text>
          <Text style={{fontSize: 15, marginBottom: 5,  alignItems: 'center'}}>from: 01.04.2021 to: 29.07.2021</Text>
          </View>

          <TouchableOpacity
                    onPress={() =>navigation.navigate('Hire')}
                  >
                    <View
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Offer Work</Text>
                    </View>
          </TouchableOpacity>
          <TouchableOpacity
                    onPress={() =>navigation.navigate('Messages')}
                  >
                    <View
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Message</Text>
                    </View>
          </TouchableOpacity>
          <AirbnbRating
                count={11}
                reviews={['Terrible', 'Bad', 'Meh', 'OK', 'Good', 'Hmm...', 'Very Good', 'Wow', 'Amazing', 'Unbelievable', 'Jesus']}
                defaultRating={person.rating}
                size={20}
            />
            
          <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <MapView latitude={person.location.latitude} longitude={person.location.longitude}/>
            <View style={styles.description}>
            <Text style={{fontSize: 30, marginBottom: 30}}>Reviews</Text>
            <TextInput
            style={styles.postInput}
            onChangeText={text=> onChangeText(text)}
            multiline={true}
            numberOfLines={3}
            placeholder="Write some comment"
            underlineColorAndroid='transparent'
            value={value}
            />
            </View>
        </View>
        
        </ScrollView>
    </>
  );
});

export default SearchDetail;

const styles = StyleSheet.create({
    topSafeArea: {
        backgroundColor: '#f9f9f9',
    },
    button: {
      marginTop: 20,
      backgroundColor: '#fff',
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
        backgroundColor: '#fff',
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
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 400,
    borderRadius: 20,
    alignSelf: 'center',
  },
  description: {
    color: '#4f4f4f',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 15,
    marginBottom: 35,
  },
});
