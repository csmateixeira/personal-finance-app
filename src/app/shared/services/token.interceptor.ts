import {HttpInterceptorFn} from '@angular/common/http';
import {VERCEL_TOKEN} from '../utils/values';
import {produce} from 'immer';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string = process.env[VERCEL_TOKEN];

  if (!token) {
    return next(req);
  }

  return next(produce(req, draft => {
    draft.headers.set('Authorization', `Bearer ${token}`);
    draft.headers.set('Accept', 'application/json');
    draft.headers.set('Content-Type', 'application/json');
  }));
};
