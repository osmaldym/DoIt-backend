import { Connection } from "mongoose"
import { DBConnection } from "src/config/enums/dbconnection.enum"
import { DBModel, MagicStrings } from "src/config/enums/dbmodels.enum"
import { CategorySchema } from "src/schemas/category.schema"

export const categoryProviders = [
    {
        provide: MagicStrings.CATEGORY,
        useFactory: (connection: Connection) => connection.model(DBModel.category, CategorySchema),
        inject: [DBConnection.DATABASE_CONNECTION],
    },
]