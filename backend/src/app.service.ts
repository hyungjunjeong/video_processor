import { Injectable } from '@nestjs/common';
import fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  writeData(file: File) {
    const stream = fs.createWriteStream(`${Object.keys(file)[0]}`);
    stream.write(file[Object.keys(file)[0]].data, () => {
      console.error('done');
    });
  }

  streamData(fileName: string, res: any) {
    const stream = fs.createReadStream(`${fileName}`);
    stream.on('open', () => {
      stream.pipe(res);
    });

    stream.on('error', err => {
      res.sendStatus(404);
    });
  }
}
