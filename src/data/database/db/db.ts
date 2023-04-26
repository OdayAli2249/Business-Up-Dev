import { Injectable } from '@nestjs/common';
import { Model, Sequelize } from 'sequelize';
import process from 'process';
import config from 'src/app-config.json';
import { modelClasses, ModelsName } from '../helpers/constants';

const env = process.env.NODE_ENV || 'development';
const dbconfig = config.database[env];
const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, { dialect: dbconfig.username, host: dbconfig.host });
@Injectable()
class Db {
    private modelClasses: Map<string, Model>;
    private sequelize: Sequelize;

    private static instance: Db;

    constructor() {
        this.sequelize = sequelize;
        this.modelClasses = modelClasses;
        for (let modelName of ModelsName.MODELS_LIST)
            this.modelClasses[modelName].initialize(this.sequelize)

        for (let modelName of ModelsName.MODELS_LIST)
            this.modelClasses[modelName].associate(this.modelClasses)

    }

    public getSequelizeInstance() {
        return this.sequelize;
    }

    public get models() { return this.modelClasses }

    public static getInstance() {
        if (this.instance != null)

            return this.instance;

        return new Db();
    }
}

const databaseProvider = {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
        const database = Db.getInstance()
        database.getSequelizeInstance().sync()
        return database;
    },
}

export { Db, databaseProvider }