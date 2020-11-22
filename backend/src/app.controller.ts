import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('upload')
  uploadVideo(@Req() req: any, @Res() res: any) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    this.appService.writeData(req.files);
    return 200;
  }

  @Get('video/:fileName')
  streamVideo(@Param('fileName') fileName: string, @Res() res: any) {
    this.appService.streamData(fileName, res);
  }
}
