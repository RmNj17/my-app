import api from './axios';

export const signupTourist = (data: any) =>
  api.post('/auth/signup/tourist', data);

export const signupGuide = (data: any) =>
  api.post('/auth/signup/guide', data);

export const login = (data: { email: string; password: string }) =>
  api.post('/auth/login', data);
