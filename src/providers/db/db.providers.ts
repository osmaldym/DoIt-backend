import * as mongoose from 'mongoose';
import { DBConnection } from 'src/config/enums/dbconnection.enum';
import DB_URL from 'src/config/environments';

export const DBProviders: any = [
    {
        provide: DBConnection.DATABASE_CONNECTION,
        useFactory: (): Promise<typeof mongoose> => mongoose.connect(DB_URL)
    }
]