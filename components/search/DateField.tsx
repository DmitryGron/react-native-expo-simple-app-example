import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { View, Text, TextInput, NativeSyntheticEvent, TextInputFocusEventData, Button, Platform } from 'react-native';
import { styles } from './searchStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import If from '../If';

interface FormFieldProps {
  field: any;
  label: any;
  secureTextEntry: any;
  autoCapitalize: any;
  values: any;
  touched: any;
  errors: any;
  placeholder?: string;
  handleChange: any;
  setFieldValue?: () => void;
  handleBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

type Mode = 'date' | 'time';

const DateField: React.FC<any & FormikProps<FormFieldProps>> = ({
  field,
  label,
  secureTextEntry,
  placeholder,
  autoCapitalize,
  values,
  touched,
  errors,
  setFieldValue,
}) => {
  const [mode, setMode] = useState<Mode>('date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showPicker = (pickerMode: Mode) => {
    setDatePickerVisibility(true);
    setMode(pickerMode);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setFieldValue('when', date);
    hideDatePicker();
  };

  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
        <View>
          <Button onPress={() => showPicker('date')} title="Set date" />
        </View>
        {/* <View>
          <Button onPress={() => showPicker('time')} title="Set time" />
        </View> */}
        <Text style={styles.date}>{values[field] ? values[field].toDateString() : ''}</Text>

        <DateTimePickerModal
        date={values[field]}
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {touched[field] && errors[field] ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errors[field]}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default DateField;