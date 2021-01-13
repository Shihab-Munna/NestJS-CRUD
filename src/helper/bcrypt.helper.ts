import { ENV } from 'src/ENV';
import { hash, compare } from 'bcrypt';
const SALT_ROUNDS: number = ENV.SALT_ROUNDS || 10;

export class BcryptHelper {
  public async hashString(
    plainText: string,
    saltRound: number = SALT_ROUNDS,
  ): Promise<string> {
    return hash(plainText, saltRound);
  }

  public async compareHash(
    plainText: string,
    hashString: string,
  ): Promise<boolean> {
    return compare(plainText, hashString);
  }
}
