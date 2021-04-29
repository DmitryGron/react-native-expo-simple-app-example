import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Card, Icon, Image, Button, AirbnbRating } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome, MaterialIcons, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import Constants from 'expo-constants';
import FormField from '../components/search/FormField';
import { validationLoginSchema } from '../components/search/validation';
import { useDataStore } from '../store/context';
import { Divider } from 'react-native-elements';
import GoBackHeader from '../components/header/GoBackHeader';

const  Profile: React.FC<any> = observer(({navigation}: any) => {
  const store = useDataStore();
  if (!store) throw Error('Store shouldn\'t be null');
  const { setData } = store;

  function onSubmitHandler(values: any) {
    setData('SearchList', values);
    navigation.navigate('SearchList');
  }

  function isFormValid(isValid: any, touched: any) {
    return isValid && Object.keys(touched).length !== 0;
  }

  return (
      <>
        <SafeAreaView style={styles.topSafeArea} />
        <StatusBar style="dark" />
        <View style={styles.header}>
        <GoBackHeader navigation={navigation} />
        </View>
        <ScrollView style={{ flex: 1, backgroundColor: CONTENT_BACKGROUND }}>

        <View  style={styles.imageContainer}>
          <Image
                style={styles.image}
                source={{ uri: 'https://images.unsplash.com/photo-1558499932-9609acb6f443?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTg5fHxwb3J0cmFpdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}}
                placeholderStyle={{ backgroundColor: 'transparent' }}
                PlaceholderContent={<ActivityIndicator />}
              />
        </View>
          <View style={styles.textWrapper}>
          <Text style={styles.hiText}>Kristin Hennessy</Text>
        </View>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: CONTENT_BACKGROUND,
            marginBottom: 10,
        }}>
            <View style={{ marginRight: 20, flexDirection: 'row' }}>
            <FontAwesome name="star" size={24} color="black" />
            <Text style={{ fontSize: 20 }}>4</Text>
            </View>
            <View style={{ marginRight: 20, flexDirection: 'row' }}>
            <MaterialIcons name="location-pin" size={24} color="black" />
            <Text style={{ fontSize: 20 }}>Riga</Text>
            </View>
            <View style={{ marginRight: 20, flexDirection: 'row' }}>
            <FontAwesome name="dollar" size={24} color="black" />
            <Text style={{ fontSize: 20 }}>25</Text>
            </View>
        </View>
        <Divider style={{ backgroundColor: 'black', marginBottom: 10, marginTop: 10 }} />
        <TouchableOpacity
        onPress={() => console.log('')}
         style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 60,
        }}>
            <Ionicons name="person" size={40} color="black" />
            <Text style={{ fontSize: 20 }}> Personal Information </Text>
        </TouchableOpacity>
        <Divider style={{ backgroundColor: 'black', marginBottom: 10, marginTop: 10 }} />
        <TouchableOpacity
        onPress={() => console.log('')}
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 60,
        }}>
            <MaterialIcons name="payments" size={40} color="black" />
            <Text style={{ fontSize: 20 }}> Payments and payouts </Text>
        </TouchableOpacity>
        <Divider style={{ backgroundColor: 'black', marginBottom: 10, marginTop: 10 }} />
        <TouchableOpacity
        onPress={() => console.log('')}
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 60,
        }}>
            <FontAwesome name="bell" size={40} color="black" />
            <Text style={{ fontSize: 20 }}> Reviews </Text>
        </TouchableOpacity>
        <Divider style={{ backgroundColor: 'black', marginBottom: 10, marginTop: 10 }} />
        <TouchableOpacity
        onPress={() => console.log('')}
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 60,
        }}>
            <SimpleLineIcons name="globe" size={40} color="black" />
            <Text style={{ fontSize: 20 }}> History </Text>
        </TouchableOpacity>
        <Divider style={{ backgroundColor: 'black', marginBottom: 10, marginTop: 10 }} />
        <TouchableOpacity
        onPress={() => console.log('')}
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 60,
        }}>
            <Ionicons name="md-heart" size={40} color="black" />
            <Text style={{ fontSize: 20 }}> Saved </Text>
        </TouchableOpacity>
        <Divider style={{ backgroundColor: 'black', marginBottom: 10, marginTop: 10 }} />
        <TouchableOpacity
        onPress={() => console.log('')}
        style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 60,
            }}>
            <MaterialIcons name="settings" size={40} color="black" />
            <Text style={{ fontSize: 20 }}> Settings </Text>
        </TouchableOpacity>
        <Divider style={{ backgroundColor: 'black', marginBottom: 10, marginTop: 10 }} />
        <TouchableOpacity
        onPress={() => console.log('')}
        style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 60,
            }}>
            <MaterialIcons name="logout" size={40} color="black" />
            <Text style={{ fontSize: 20 }}> Log out </Text>
        </TouchableOpacity>
        <Divider style={{ backgroundColor: 'black', marginBottom: 10, marginTop: 10 }} />
        </ScrollView>
      </>
    );
  });

export default Profile;


const HEADER_BACKGROUND = '#3498db';
const CONTENT_BACKGROUND = '#f9f9f9';

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: CONTENT_BACKGROUND,
  },
  textWrapper: {
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: CONTENT_BACKGROUND,
  },
  hiText: {
    color: '#050038',
    textAlign: 'center',
    fontSize: 40,
    lineHeight: 50,
    fontWeight: 'bold',
  },
  userText: {
    color: '#050038',
    textAlign: 'center',
    fontSize: 30,
    lineHeight: 30,
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor:
      Platform.OS === 'ios' ? CONTENT_BACKGROUND : HEADER_BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 44,
    backgroundColor: CONTENT_BACKGROUND,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
  },
  content: {
    padding: 20,
    backgroundColor: CONTENT_BACKGROUND,
  },
  formGroup: {
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  label: {
    color: '#7d7e79',
    fontSize: 16,
    lineHeight: 30,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#e3e3e3',
    backgroundColor: '#fff',
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: '#ff7675',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200,
    alignSelf: 'center',
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
  date: {
    color: '#050038',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },
});
