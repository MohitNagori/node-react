import { rword } from 'rword';

export const generateWord = (): Promise<string> => {
  return new Promise<string>(resolve => {
    const word = rword.generate(1, { capitalize: 'all', length: '5-8' });
    resolve('' + word);
  });
};
