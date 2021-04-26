import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptTool } from 'src/tools/bcrypt.tool';
import { JwtStrategy } from 'src/auth/strategies/jwt.stragety';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { Film, FilmSchema } from './film.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]), AuthModule],
	controllers: [FilmController],
	providers: [JwtStrategy, FilmService],
	exports: [FilmService],
})
export class FilmModule {}
