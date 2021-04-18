import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
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
import If from '../../components/If';
import Login from '../../components/auth/AuthLogin';

const  Search: React.FC<any> = observer(({navigation}: any) => {
  const store = useDataStore();
  const [wrong, setWrong] = useState(false);
  if (!store) throw Error('Store shouldn\'t be null');
  const { setData, setLoggedIn, getLoggedIn } = store;

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
        <TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity>
        <Octicons name="three-bars" size={24} color="black" />
      </TouchableOpacity>
        </View>
          <View style={styles.textWrapper}>
          <Text style={styles.hiText}>Hello dear friend,</Text>
          <Text style={styles.userText}>how can we help?</Text>
        </View>

       <SafeAreaView style={styles.container}>

          <KeyboardAwareScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={50}
          >
            <Formik
              initialValues={{
                search: '',
                where: '',
                when: undefined,
              }}
              onSubmit={onSubmitHandler}
              validationSchema={validationSchema}
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
                <>
                  <FormField
                    field="search"
                    label="What should be done?"
                    autoCapitalize="words"
                    values={values}
                    touched={touched}
                    errors={errors}
                    placeholder="architecture, nanny, cleaner, etc...?"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />

                <FormField
                    field="where"
                    label="Where?"
                    autoCapitalize="words"
                    values={values}
                    touched={touched}
                    placeholder="location"
                    errors={errors}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />

                <DateField
                    field="when"
                    label="when?"
                    errors={errors}
                    touched={touched}
                    values={values}
                    setFieldValue={setFieldValue}
                   />
                <FormField
                  field="hours"
                  label="How many hours?"
                  autoCapitalize="words"
                  values={values}
                  touched={touched}
                  keyboardType={'numeric'}
                  placeholder="hours"
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />

                  <TouchableOpacity
                    disabled={!isFormValid(isValid, touched)}
                    onPress={() => handleSubmit()}
                  >
                    <View
                      style={[
                        styles.button,
                        {
                          opacity: isFormValid(isValid, touched) ? 1 : 0.5,
                        },
                      ]}
                    >
                      <Text style={styles.buttonText}>SUBMIT</Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  });

export default Search;


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
