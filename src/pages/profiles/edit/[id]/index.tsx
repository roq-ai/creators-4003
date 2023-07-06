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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getProfileById, updateProfileById } from 'apiSdk/profiles';
import { Error } from 'components/error';
import { profileValidationSchema } from 'validationSchema/profiles';
import { ProfileInterface } from 'interfaces/profile';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function ProfileEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ProfileInterface>(
    () => (id ? `/profiles/${id}` : null),
    () => getProfileById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ProfileInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateProfileById(id, values);
      mutate(updated);
      resetForm();
      router.push('/profiles');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ProfileInterface>({
    initialValues: data,
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
            Edit Profile
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
              <Input
                type="text"
                name="contact_info"
                value={formik.values?.contact_info}
                onChange={formik.handleChange}
              />
              {formik.errors.contact_info && <FormErrorMessage>{formik.errors?.contact_info}</FormErrorMessage>}
            </FormControl>
            <FormControl id="website" mb="4" isInvalid={!!formik.errors?.website}>
              <FormLabel>Website</FormLabel>
              <Input type="text" name="website" value={formik.values?.website} onChange={formik.handleChange} />
              {formik.errors.website && <FormErrorMessage>{formik.errors?.website}</FormErrorMessage>}
            </FormControl>
            <FormControl id="social_links" mb="4" isInvalid={!!formik.errors?.social_links}>
              <FormLabel>Social Links</FormLabel>
              <Input
                type="text"
                name="social_links"
                value={formik.values?.social_links}
                onChange={formik.handleChange}
              />
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(ProfileEditPage);
