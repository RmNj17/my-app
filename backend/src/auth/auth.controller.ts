import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../users/entities/user.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/tourist')
  signupTourist(@Body() body: any) {
    return this.authService.signup({
      ...body,
      role: UserRole.TOURIST,
    });
  }

  @Post('signup/guide')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'guideLicense', maxCount: 1 },
        { name: 'profilePicture', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const filename = `${uuidv4()}${ext}`;
            cb(null, filename);
          },
        }),
      },
    ),
  )
  signupGuide(
    @Body() body: any,
    @UploadedFiles()
    files: {
      guideLicense?: Express.Multer.File[];
      profilePicture?: Express.Multer.File[];
    },
  ) {
    return this.authService.signup({
      ...body,
      role: UserRole.GUIDE,
      guideLicense: files?.guideLicense?.[0]?.filename,
      profilePicture: files?.profilePicture?.[0]?.filename,
    });
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
