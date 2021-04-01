import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
import Constants from 'expo-constants';
import { Image } from 'react-native-elements';
import GoBackHeader from '../../components/header/GoBackHeader';
import { Feather } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { useDataStore } from '../../store/context';
import { Rating } from 'react-native-elements';

const formatData = (data: any[], numColumns: number) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };

const SavedPeopleList: React.FC<any> = observer(({navigation}) => {
    const [dataSource, setDataSource] = useState<any>([]);
    const store = useDataStore();
    if (!store) throw Error('Store shouldn\'t be null');
    const { getData, getSavedPeople, setSavedPeople} = store;

    const numColumns = 2;

    return (
      <>
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <GoBackHeader navigation={navigation} />
      </View>

      <Text style={styles.hiText}>Saved</Text>
      <Text style={styles.userText}>You saved {getSavedPeople().length} contact(s)</Text>

        <FlatList
          style={styles.content}
          data={formatData(getSavedPeople(), numColumns)}
          renderItem={({ item, index }: any) => {
            if (item.empty === true) {
              return <View style={[styles.item, styles.itemInvisible]} />;
            }
            return (
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('SearchDetail', {
                  person: getSavedPeople()[index],
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
              <Text style={styles.itemText}>{item.tags}</Text>

            </TouchableOpacity>
            );
          }}
          // Setting the number of column
          numColumns={numColumns}
          keyExtractor={(item) => item.name}
        />
      </SafeAreaView>
      </>
    );
  });

export default SavedPeopleList;

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