import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(data, salt);
  }

  async compare(data: string, hashedData: string): Promise<boolean> {
    return bcrypt.compare(data, hashedData);
  }
}
