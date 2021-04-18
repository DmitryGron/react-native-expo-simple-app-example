import * as Yup from 'yup';

// https://github.com/jquense/yup
export const validationSchema = Yup.object().shape({
  // search: Yup.string().required('Field is required'),
  where: Yup.string().required('Field is required'),
  when: Yup.string().required('Field is required'),
  hours: Yup.number().required('Field is required'),

});

export const validationLoginSchema = Yup.object().shape({
  email: Yup.string().required('Field is required'),
  password: Yup.string().required('Field is required'),
});