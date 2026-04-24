import { Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin') // <-- 'admin' yazdığından emin ol
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('reset') // <-- 'reset' yazdığından emin ol
  async reset() {
    return this.adminService.resetSystem();
  }

  @Post('seed-bulk')
  async seedBulk() {
    return this.adminService.seedLargeData();
  }
}