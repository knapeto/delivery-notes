import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Authorize } from '../core/auth.decorator';
import fs, { createReadStream } from 'fs';
import { HttpService } from '@nestjs/axios';

@Controller()
export class DeliveryNotesController {
  constructor(private readonly httpService: HttpService) {}
  @Authorize()
  @Get('/admin/delivery-note/:deliveryId')
  async downloadAdminDriverlicense(
    @Param('deliveryId') deliveryId: string,
    @Res() res: Response,
  ) {
    const fileName = `./tmp/${deliveryId}-${new Date().getTime()}.pdf`;
    const writer = fs.createWriteStream(fileName);

    const response = await this.httpService.axiosRef({
      url: `http://172.18.1.9:8080/jasperserver/rest_v2/reports/Tiskove_sestavy/EXPET01ST.pdf?PKVENR=585940474000481601`, //${deliveryId}
      method: 'GET',
      auth: {
        username: 'flowForce',
        password: 'abTqHCHL1cXh5iJ8Hyr8HTrsgzXWtUm',
      },
      responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        const file = createReadStream(fileName);
        file.pipe(res);
      });
      writer.on('error', reject);
    });
  }
}
