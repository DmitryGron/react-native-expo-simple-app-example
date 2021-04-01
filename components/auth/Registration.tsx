import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Platform,
  } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useDataStore } from '../../store/context';

const GoBackHeader: React.FC<any> = ({ navigation, isMain, title }) => {
  const onClick = () => {
    navigation.goBack();
  };
  return (
<><Text> sdfsdfsdf</Text></>
    );
  };

export default GoBackHeader;