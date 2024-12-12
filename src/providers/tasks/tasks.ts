import { Connection } from "mongoose"
import { DBConnection } from "src/config/enums/dbconnection.enum"
import { DBModel, MagicStrings } from "src/config/enums/dbmodels.enum"
import { TaskSchema } from "src/schemas/task.schema"

export const tasksProviders = [
    {
        provide: MagicStrings.TASK,
        useFactory: (connection: Connection) => connection.model(DBModel.task, TaskSchema),
        inject: [DBConnection.DATABASE_CONNECTION],
    },
]