'use strict';

import { ModelsName, TablesName } from "../../helpers/constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(TablesName.PERMISSION_GROUPS, {
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
            branchId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: TablesName.BRANCHES,
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(TablesName.PERMISSION_GROUPS);
    }
};