import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Authorize } from '../core/auth.decorator';
import fs, { promises, createReadStream } from 'fs';
import { HttpService } from '@nestjs/axios';
import { Client } from 'ssh2';

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

    try {
      const response = await this.httpService.axiosRef({
        url: `http://172.18.1.9:8080/jasperserver/rest_v2/reports/Tiskove_sestavy/DANONE01ST.pdf?APN=${deliveryId}&USR=ELGBORNADP`, //AKAPN
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

          fs.unlinkSync(fileName);
        });
        writer.on('error', (error) => console.log('error', error));
      });
    } catch (error) {
      console.log(error.toJSON());
    }
  }

  @Authorize()
  @Get('/admin/delivery-note-ingres/:deliveryId')
  async downloadIngresDriverlicense(
    @Param('deliveryId') deliveryId: string,
    @Res() res: Response,
  ) {
    return new Promise((resolve, reject) => {
      const fileName = `./tmp/${deliveryId}-${new Date().getTime()}.pdf`;
      const writer = fs.createWriteStream(fileName);

      try {
        // move file to tst server
        const conn = new Client();
        conn
          .on('ready', function () {
            conn.sftp((err, sftp) => {
              if (err) throw err;

              conn.exec(
                `cd /root/perl/db2 && perl ./easn_from_file.pl ${fileName}`,
                (error, stream) => {
                  if (error) console.log(error);

                  stream
                    .on('close', async (code, signal) => {
                      console.log(code, signal);
                      conn.end();

                      await promises.rename(
                        `easn/${fileName}.xml`,
                        `easn/archive/${fileName}.xml`,
                      );
                      await promises.rename(
                        `easn/${fileName}.orig.xml`,
                        `easn/archive/${fileName}.orig.xml`,
                      );

                      return resolve(true);
                    })
                    .on('data', function (data) {
                      console.log(data.toString('utf8'));
                    })
                    .stderr.on('data', function (data) {
                      console.log('stderr', data.toString('utf8'));
                    });
                },
              );
            });
          })
          .connect({
            host: '192.168.1.60',
            passphrase: 'persikka7',
            username: 'root',
            privateKey: require('fs').readFileSync(process.env.ID_RSA_PUB),
          });
      } catch (error) {
        console.log(error.toJSON());
        return reject(false);
      }
    });
  }
}
