import { SetMetadata } from "@nestjs/common";
import { AuthGuard } from "src/common/guards/auth.guard";
import { Guard } from "src/config/enums/guard.enum";

export const authProviders = [
    {
        provide: Guard.GUARD_MAGIC_STRING,
        useClass: AuthGuard,
    }
]

export const IS_PUBLIC_KEY = Guard.GUARD_PUBLIC_KEY;
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);