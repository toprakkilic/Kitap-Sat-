// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { Not, IsNull } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı!');
    }

    // Demo projesi olduğu için token yerine direkt user nesnesini dönüyoruz
    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    
  }

  // Admin Reset için başlangıç kullanıcılarını oluşturma (Seed)
  async createDefaultUsers() {
    await this.userRepo.delete({ username: Not(IsNull()) });
    const admin = this.userRepo.create({ username: 'admin', password: '123', role: UserRole.ADMIN });
    const user = this.userRepo.create({ username: 'user', password: '123', role: UserRole.USER });
    await this.userRepo.save([admin, user]);
  }

  // backend/src/auth/auth.service.ts içine eklenebilir
async onModuleInit() {
  const adminExists = await this.userRepo.findOne({ where: { username: 'admin' } });
  if (!adminExists) {
    await this.createDefaultUsers();
    console.log('İlk kurulum: Default kullanıcılar oluşturuldu.');
  }
}
}