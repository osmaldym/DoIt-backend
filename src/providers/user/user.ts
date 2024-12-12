import { Connection } from "mongoose"
import { DBConnection } from "src/config/enums/dbconnection.enum"
import { DBModel, MagicStrings } from "src/config/enums/dbmodels.enum"
import { UserSchema } from "src/schemas/user.schema"

export const userProviders = [
    {
        provide: MagicStrings.USER,
        useFactory: (connection: Connection) => connection.model(DBModel.user, UserSchema),
        inject: [DBConnection.DATABASE_CONNECTION],
    },
]