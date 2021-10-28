import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcome(): any {
    return {
      name: 'Crm Project Management Service',
      docs: '/docs'
    };
  }
}
