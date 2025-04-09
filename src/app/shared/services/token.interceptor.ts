import {HttpInterceptorFn} from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = sessionStorage.getItem('token');

  if (!token) {
    return next(req);
  }

  return next(req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }));
};
