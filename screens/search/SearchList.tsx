import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
  } from 'react-native';
import Constants from 'expo-constants';
import { Image } from 'react-native-elements';
import GoBackHeader from '../../components/header/GoBackHeader';
import { Feather, Entypo, MaterialIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { useDataStore } from '../../store/context';
import { Rating } from 'react-native-elements';
import If from '../../components/If';
import MapView, { Callout, Marker } from 'react-native-maps';

const image = '../../assets/avatars/1.jpeg'

const formatData = (data: any[], numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };

const PeopleList: React.FC<any> = observer(({navigation}) => {
    const store = useDataStore();
    const { getData, filteredPeople } = store;
    const [dataSource, setDataSource] = useState<any>([]);
    const [displayPeople, setDisplayPeople] = useState<any>([]);
    const [keyword, setKeyword] = useState('');
    const [mapView, setMapView] = useState(true)
    const [searchParams, setSearchParams] = useState(getData('SearchList'));
    if (!store) throw Error('Store shouldn\'t be null');

    const numColumns = 2;

    const ChangeView = () => {
      setMapView(!mapView);
    }
    useEffect(() => {
      if (searchParams.search === '') {
        setDisplayPeople(filteredPeople);
      } else {
        const people = filteredPeople.filter((item: any) => {
          // filter(array => myFilter.some(filter => filter.userid === array.userid && filter.projectid === array.projectid));
          return item.tags.find((tag: string) => tag.toLowerCase().includes(`#${searchParams.search.toLowerCase()}`))
          // tags.toLowerCase().includes(`#${keyword.toLowerCase()}`);
        });
        setDisplayPeople(people);
      }
    }, [ getData, store]);
// console.log(`displayPeople`, displayPeople)
    return (
      <>
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <GoBackHeader navigation={navigation} />
      <If condition={mapView===false}>
      <Entypo style={styles.view} name="map" size={24} color="black" onPress={ChangeView} />
      </If>
      <If condition={mapView===true}>
      <MaterialIcons style={styles.view} name="grid-view" size={24} color="black" onPress={ChangeView}/>
      </If>
      </View>
      <View style={styles.subHeader}>
      <Text
        style={styles.itemText}>
          <Feather name="search" size={24} color="black" /> To {searchParams.search} at {searchParams.where} on {searchParams.when.toDateString()}
      </Text>
      </View>
      {mapView === false ? (
        <FlatList
          style={styles.content}
          data={formatData(displayPeople, numColumns)}
          renderItem={({ item, index }: any) => {
            if (item.empty === true) {
              return <View style={[styles.item, styles.itemInvisible]} />;
            }
            return (
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('SearchDetail', {
                  person: displayPeople[index],
                });
              }}
              style={styles.item}>
              <Image
                style={styles.imageThumbnail}
                source={{ uri: item.img}}
                placeholderStyle={{ backgroundColor: 'transparent' }}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Rating imageSize={20} readonly startingValue={item.rating}  style={styles.rating} />
              <Text style={styles.itemText}>{item.name}</Text>
              <View>
              {item.tags.map( (tag: string, key: number) => <Text key={key} style={styles.itemText}>{tag}</Text>)}
              </View>
            </TouchableOpacity>
            );
          }}
          // Setting the number of column
          numColumns={numColumns}
          keyExtractor={(item) => item.name}
        />
      ) : (        
      <View style={styles.mapContainer}>
        <MapView
        style={styles.map}
        initialRegion={{
            latitude: 56.94778566400857,
            longitude: 24.10911719475517,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }}
        >
          {
            displayPeople.map( (person: { img?: any; name?: any; tags?: any; location?: any; }, index: number) => {
              const { location} = person;
              if (location) {
                return (
                <Marker
                  key={index}
                  coordinate={{ latitude : Number(location.latitude), longitude : Number(location.longitude) }}
                >
                  <Callout style={{ height: 200, width:150 }} onPress={() => {
                    navigation.navigate('SearchDetail', {
                      person: displayPeople.length > 0 && displayPeople[index],
                    });
                  }}>
                  <Image
                    style={styles.smallImage}
                    source={{ uri: person.img}}
                    placeholderStyle={{ backgroundColor: 'transparent' }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                    <Text>{person.name}</Text>
                    {person.tags.map( (tag: string, key: number) => <Text key={key}> {tag},</Text>)}
                  </Callout>
                </Marker>
              )
              }
              })
          }
          
        
        </MapView>
    </View>
    )}
      </SafeAreaView>
      </>
    );
  });

export default PeopleList;

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f9f9f9',
},
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#f9f9f9',
    },
    view: {
      paddingRight: 10,
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
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 250,
    },
    smallImage: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 150,
      width: 150,
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
      marginBottom: 20,
      color: '#000000',
      fontSize: 18,
    },
    rating: {
      paddingVertical: 10,
    },
    mapContainer: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - 200,
    },
  });