import { Injectable } from '@nestjs/common';
import fs from 'fs';
import fsExtra from 'fs-extra';
import jimp from 'jimp';
import ffmpeg from 'fluent-ffmpeg';
import util from 'util';
import childProcess from 'child_process';
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
    stream.close();
  }

  streamData(fileName: string, res: any) {
    console.log(`reading ${fileName}`);
    const stream = fs.createReadStream(`${fileName}`);
    stream.on('open', () => {
      stream.pipe(res);
    });

    stream.on('error', err => {
      console.log(err);
      res.sendStatus(404);
    });
  }

  async convertVideo(fileName: string, res: any) {
    const tempDir = `temp_${fileName}`;
    const newFileName = `${fileName.replace('.mp4', '')}_processed.mp4`;
    try {
      await fsExtra.mkdir(`${tempDir}`);
      await fsExtra.mkdir(`${tempDir}/raw-frames`);
      await fsExtra.mkdir(`${tempDir}/edited-frames`);

      console.log('Decoding');
      const exec = util.promisify(childProcess.exec);
      await exec(`ffmpeg -i ${fileName} ${tempDir}/raw-frames/%d.png`);

      console.log('Rendering');
      const frames = fsExtra.readdirSync(`${tempDir}/raw-frames`);

      for (let index = 1; index < frames.length; index++) {
        let frame = await jimp.read(`${tempDir}/raw-frames/${index}.png`);

        frame = await this.onFrame(frame, index);

        await frame.writeAsync(`${tempDir}/edited-frames/${index}.png`);
      }

      console.log('Encoding');
      await exec(
        `ffmpeg -start_number 1 -i ${tempDir}/edited-frames/%d.png -vcodec h264 -filter:v "setpts=0.5*PTS" ${newFileName}`,
      );

      // console.log('Adding audio');
      // await exec(
      //   `ffmpeg -i ${tempDir}/no-audio.mp4 -i ${fileName} -c copy -map 0:v:0 -map 1:a:0? ${newFileName}`,
      // );

      console.log('Cleaning up');
      await fsExtra.remove(tempDir);
      this.streamData(newFileName, res);
    } catch (error) {
      console.error(error);
      res.sendStatus(404);
      await fsExtra.remove(tempDir);
    }
  }

  async onFrame(frame: jimp, frameCount: number): Promise<jimp> {
    if (frameCount < 5) {
      frame = new jimp(
        frame.bitmap.width,
        frame.bitmap.height,
        0xff0000ff,
        (err, image) => {},
      );
    } else {
      // Add text
      const font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
      frame.print(font, 0, 0, `Frame Count: ${frameCount}`);

      // Manual manipulation
      frame.scan(0, 0, frame.bitmap.width, frame.bitmap.height, function(
        x,
        y,
        idx,
      ) {
        // Get the colors
        const red = this.bitmap.data[idx + 0];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];
        const alpha = this.bitmap.data[idx + 3];

        // If x is less than y
        if (x < y) {
          // Set the blue channel to 255
          this.bitmap.data[idx + 2] = 255;
        }
      });
    }

    return frame;
  }
}
