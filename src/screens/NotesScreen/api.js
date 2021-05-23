import coreApi from '../../lib/coreApi';

export const getNotesApi = () => {
  let url = '/getNotes';
  let result = coreApi.GET(url);
  return result;
};

// export const submitPhotoApi = data => {
//   let url = 'owner/photos';
//   let result = coreApi.POST_IMAGE(url, data);
//   return result;
// };
