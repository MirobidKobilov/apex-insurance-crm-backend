import {Injectable} from "@nestjs/common";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {DB_ENTITY_PATH, DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_TYPE, DB_USER, NODE_ENV} from "@environments";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: DB_TYPE,
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USER,
            password: DB_PASS,
            database: DB_NAME,
            entities: [__dirname + DB_ENTITY_PATH],
            autoLoadEntities: true,
            synchronize: NODE_ENV === 'dev',
        } as any;
    }
}

