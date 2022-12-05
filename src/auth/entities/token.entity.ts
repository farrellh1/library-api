import { Tokens } from '../types';

export class TokenEntity implements Tokens {
  access_token: string;
  refresh_token: string;
}
