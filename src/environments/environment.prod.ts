import { Environment } from '@delon/theme';

export const environment = {
  production: true,
  useHash: false,
  api: {
    baseUrl: './',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  },
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZjI5NGQ1NS1jMjhiLTQwNjctYTNlZi1lMWY3ZDhlOTAxNzkiLCJpZCI6MTI1ODI1LCJpYXQiOjE2NzcwNTIxNjN9.uGfy28-sApAQMRI_quZvHl0kLBo5q0kaCbeFAIZ7xs0'
} as Environment;
