import { FormikProps } from "formik";
import React from "react";
import { View, Text, TextInput, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { styles } from "./searchStyles";

interface FormFieldProps {
  field: any,
  label: any,
  secureTextEntry: any,
  autoCapitalize: any,
  values: any,
  touched: any,
  errors: any,
  placeholder?: string,
  handleChange: any,
  handleBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
}

const FormField: React.FC<any & FormikProps<FormFieldProps>> =({
  field,
  label,
  secureTextEntry,
  autoCapitalize,
  values,
  touched,
  errors,
  placeholder,
  handleChange,
  handleBlur,
}) => {


  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={values[field]}
        placeholder={placeholder}
        onChangeText={handleChange(field)}
        onBlur={handleBlur(field)}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize || "none"}
      />

      {touched[field] && errors[field] ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errors[field]}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default FormField;