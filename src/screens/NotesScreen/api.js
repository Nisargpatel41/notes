import coreApi from '../../lib/coreApi';

export const getNotesApi = () => {
  let url = '/getNotes';
  let result = coreApi.GET(url);
  return result;
};

export const addNoteApi = data => {
  let url = '/addNote';
  let result = coreApi.POST(url, data);
  return result;
};

export const updateNoteApi = data => {
  let url = '/updateNote';
  let result = coreApi.PUT(url, data);
  return result;
};

export const archiveNoteApi = data => {
  let url = '/archiveNote';
  let result = coreApi.PUT(url, data);
  return result;
};

export const deleteNoteApi = data => {
  let url = '/deleteNote';
  let result = coreApi.PUT(url, data);
  return result;
};
