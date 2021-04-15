import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionRepository } from './service/option.repository';
import { OptionResolver } from './resolver/option.resolver';
import { OptionService } from './service/option.service';

@Module({
  imports: [TypeOrmModule.forFeature([OptionRepository])],
  providers: [OptionResolver, OptionService],
})
export class OptionsModule {}
