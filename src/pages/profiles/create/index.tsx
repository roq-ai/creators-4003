import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createProfile } from 'apiSdk/profiles';
import { Error } from 'components/error';
import { profileValidationSchema } from 'validationSchema/profiles';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { ProfileInterface } from 'interfaces/profile';

function ProfileCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProfileInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProfile(values);
      resetForm();
      router.push('/profiles');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProfileInterface>({
    initialValues: {
      bio: '',
      image: '',
      contact_info: '',
      website: '',
      social_links: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: profileValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Profile
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="bio" mb="4" isInvalid={!!formik.errors?.bio}>
            <FormLabel>Bio</FormLabel>
            <Input type="text" name="bio" value={formik.values?.bio} onChange={formik.handleChange} />
            {formik.errors.bio && <FormErrorMessage>{formik.errors?.bio}</FormErrorMessage>}
          </FormControl>
          <FormControl id="image" mb="4" isInvalid={!!formik.errors?.image}>
            <FormLabel>Image</FormLabel>
            <Input type="text" name="image" value={formik.values?.image} onChange={formik.handleChange} />
            {formik.errors.image && <FormErrorMessage>{formik.errors?.image}</FormErrorMessage>}
          </FormControl>
          <FormControl id="contact_info" mb="4" isInvalid={!!formik.errors?.contact_info}>
            <FormLabel>Contact Info</FormLabel>
            <Input type="text" name="contact_info" value={formik.values?.contact_info} onChange={formik.handleChange} />
            {formik.errors.contact_info && <FormErrorMessage>{formik.errors?.contact_info}</FormErrorMessage>}
          </FormControl>
          <FormControl id="website" mb="4" isInvalid={!!formik.errors?.website}>
            <FormLabel>Website</FormLabel>
            <Input type="text" name="website" value={formik.values?.website} onChange={formik.handleChange} />
            {formik.errors.website && <FormErrorMessage>{formik.errors?.website}</FormErrorMessage>}
          </FormControl>
          <FormControl id="social_links" mb="4" isInvalid={!!formik.errors?.social_links}>
            <FormLabel>Social Links</FormLabel>
            <Input type="text" name="social_links" value={formik.values?.social_links} onChange={formik.handleChange} />
            {formik.errors.social_links && <FormErrorMessage>{formik.errors?.social_links}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'profile',
    operation: AccessOperationEnum.CREATE,
  }),
)(ProfileCreatePage);
