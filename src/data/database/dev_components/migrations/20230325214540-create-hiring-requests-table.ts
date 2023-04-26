'use strict';

import { TablesName } from "../../helpers/constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(TablesName.HIRING_REQUESTS, {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            serviceProviderId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: TablesName.SERVICE_PROVIDERS,
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: TablesName.USERS,
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(TablesName.HIRING_REQUESTS);
    }
};