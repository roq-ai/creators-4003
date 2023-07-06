import axios from 'axios';
import queryString from 'query-string';
import { DirectoryInterface, DirectoryGetQueryInterface } from 'interfaces/directory';
import { GetQueryInterface } from '../../interfaces';

export const getDirectories = async (query?: DirectoryGetQueryInterface) => {
  const response = await axios.get(`/api/directories${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDirectory = async (directory: DirectoryInterface) => {
  const response = await axios.post('/api/directories', directory);
  return response.data;
};

export const updateDirectoryById = async (id: string, directory: DirectoryInterface) => {
  const response = await axios.put(`/api/directories/${id}`, directory);
  return response.data;
};

export const getDirectoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/directories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDirectoryById = async (id: string) => {
  const response = await axios.delete(`/api/directories/${id}`);
  return response.data;
};
