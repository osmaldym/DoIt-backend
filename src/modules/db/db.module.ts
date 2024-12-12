import { Module } from '@nestjs/common';
import { DBProviders } from 'src/providers/db/db.providers';

@Module({
    providers: [...DBProviders],
    exports: [...DBProviders]
})
export class DbModule {}
