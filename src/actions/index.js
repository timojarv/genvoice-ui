export * from './invoice';
export * from './user';
export * from './loader';
export * from './auth';
export * from './contact';

export const ROOT_URL = process.env.NODE_ENV === 'production' ? "https://genvoice.timojarv.com" : "http://localhost";




