import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { validationLoginSchema, validationSchema } from '../../components/search/validation';
import FormField from '../../components/search/FormField';
import { observer } from 'mobx-react-lite';
import { useDataStore } from '../../store/context';
import DateField from '../../components/search/DateField';
import Constants from 'expo-constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import If from '../If';
import logo from '../../assets/iworkd.png';


const Login: React.FC<any> = ({ wrong, onLoginHandler }) => {

  const isLoginFormValid = (isValid: any, touched: any) => {
    return isValid && Object.keys(touched).length !== 0;
  };
  return (
        <>
        <SafeAreaView style={styles.topSafeArea} />
        <StatusBar style="dark" />
        <SafeAreaView style={styles.container}>
            <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <If condition={wrong === true}>
        <Text style={{
            color: 'red',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        > Wrong email or password! </Text>
        </If>
            </View>

    <Formik
    initialValues={{
      email: 'email',
      password: 'password',
    }}
    onSubmit={onLoginHandler}
    validationSchema={validationLoginSchema}
  >
    {({
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      values,
      errors,
      touched,
      isValid,
    }) => (
      <View style={{ flex:1, justifyContent: 'center', padding: 30}}>
        <Image
            source={logo}
            style={{
              opacity: 1,
              width: 340,
              height: 90,
              marginBottom: 20,
            }}
          />
        <Text style={{
            alignItems: 'center',
            fontSize: 50,
            fontWeight: 'bold',
          }}
        >Sign In</Text>
        <FormField
          field="email"
          label="Email"
          values={values}
          touched={touched}
          errors={errors}
          placeholder="example@google.com"
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

      <FormField
          field="password"
          label="Password"
          values={values}
          touched={touched}
          placeholder="Password"
          errors={errors}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <TouchableOpacity
          disabled={!isLoginFormValid(isValid, touched)}
          onPress={() => handleSubmit()}
        >
          <View
            style={[
              styles.button,
              {
                opacity: isLoginFormValid(isValid, touched) ? 1 : 1,
              },
            ]}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            margin: 10,
            alignSelf: 'center'
    }}
    >or use one of your social profiles </Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',  
  }}>
  <TouchableOpacity
          onPress={() => handleSubmit()}
          >
          <View
            style={[
              styles.linkedin,
            ]}
          >
            <Text style={styles.buttonText}>Linkedin</Text>
          </View>
        </TouchableOpacity><TouchableOpacity
          onPress={() => handleSubmit()}
          >
          <View
            style={
              [
              styles.facebook,
            ]}
          >
            <Text style={styles.buttonText}>Facebook</Text>
          </View>
        </TouchableOpacity>
  </View>
      </View>
    )}
  </Formik>
  
  
</SafeAreaView>
  </>
    );
  };

export default Login;


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
    backgroundColor: '#EC2761',
    padding: 15,
    borderRadius: 5,
    borderColor: '#050038',
  },
  linkedin: {
    marginTop: 20,
    padding: 15,
    borderWidth: 0,
    borderRadius: 5,
    minWidth: 150,
    backgroundColor: '#2A67B2',
  },
  facebook: {
    marginTop: 20,
    padding: 15,
    borderWidth: 0,
    borderRadius: 5,
    minWidth: 150,
    backgroundColor: '#434AB2',
  },
  buttonText: {
    color: '#ffffff',
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
