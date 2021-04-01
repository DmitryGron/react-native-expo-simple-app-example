import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const HEADER_BACKGROUND = '#3498db';
const CONTENT_BACKGROUND = '#f9f9f9';


export const styles = StyleSheet.create({
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
