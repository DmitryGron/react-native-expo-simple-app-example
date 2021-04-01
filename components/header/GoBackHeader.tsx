import React from 'react';
import { Header, Icon } from 'react-native-elements';
import { useDataStore } from '../../store/context';

const GoBackHeader: React.FC<any> = ({ navigation, isMain, title }) => {
  const onClick = () => {
    navigation.goBack();
  }
    return (
          <Icon
            name="keyboard-arrow-left"
            color="#080808"
            size={40}
            onPress={onClick}
          />
    );
  };

export default GoBackHeader;