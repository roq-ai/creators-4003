import * as yup from 'yup';

export const postValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  image: yup.string(),
  video: yup.string(),
  user_id: yup.string().nullable(),
});
