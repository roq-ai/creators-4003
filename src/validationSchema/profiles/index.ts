import * as yup from 'yup';

export const profileValidationSchema = yup.object().shape({
  bio: yup.string(),
  image: yup.string(),
  contact_info: yup.string(),
  website: yup.string(),
  social_links: yup.string(),
  user_id: yup.string().nullable(),
});
