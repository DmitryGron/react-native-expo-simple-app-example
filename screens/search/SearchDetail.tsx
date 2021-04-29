import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, ScrollView, SafeAreaView, ActivityIndicator, TextInput, TouchableOpacity  } from 'react-native';
import { Card, Icon, Image, Button, AirbnbRating } from 'react-native-elements';
import GoBackHeader from '../../components/header/GoBackHeader';
import MapView from '../../components/map/MapView';
import { AntDesign } from '@expo/vector-icons';
import { useDataStore } from '../../store/context';
import { observer } from 'mobx-react-lite';
import { FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';

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
            </View>
            <View style={{ marginRight: 0, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.title}>{person.name}</Text>
              <Ionicons name="md-shield-checkmark" size={24} color="black" />
              <Text style={styles.sub}>Verified</Text>
            </View>
            <AirbnbRating
              count={11}
              reviews={['Terrible', 'Bad', 'Meh', 'OK', 'Good', 'Hmm...', 'Very Good', 'Wow', 'Amazing', 'Unbelievable', 'Jesus']}
              defaultRating={person.rating}
              size={20}
            />
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <View style={{ marginRight: 0, flexDirection: 'column', alignItems:'flex-start'}}>
            <Text style={{fontSize: 25, marginBottom: 5, color: '#EC2761',  alignItems: 'center'}}>General Info</Text>
            <Text>Education: XXXXXX</Text>
            <Text>Languages: Latvian, English, Russian</Text>
            <Text>Location: Riga, Latvia</Text>
            <Text>Availability: Weekend</Text>
            </View>
            <View style={{ marginTop: 10, marginRight: 0, flexDirection: 'column', alignItems:'flex-start'}}>
            <Text style={{fontSize: 25, marginBottom: 5, color: '#EC2761',  alignItems: 'center'}}>Skills</Text>
            {person.tags.map( (tag: string, key: number) => <Text key={key}>{tag}</Text>)}
            </View>
            <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('Hire', {
                              person: person,
                            });
                          }}
                  >
                    <View
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>Offer Work</Text>
                    </View>
          </TouchableOpacity>
          <View style={{ marginTop: 20}}>
            <Text style={{textAlign: 'center', fontSize: 30}}>Located</Text>
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
                editable = {false}
                />
              </View>
          </View>
              
          </View>
        
        </ScrollView>
    </>
  );
});

export default SearchDetail;

const styles = StyleSheet.create({
    sub: {
      fontSize: 15,
    },
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
      height: 150,
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
      marginRight: 20,
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
