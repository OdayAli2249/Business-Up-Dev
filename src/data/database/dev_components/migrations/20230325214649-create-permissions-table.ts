'use strict';

import { TablesName } from "../../helpers/constants";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(TablesName.PERMISSIONS, {
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
            permissionGroupId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: TablesName.PERMISSION_GROUPS,
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: TablesName.USERS,
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            postId: {
                type: Sequelize.INTEGER,
                references: {
                    model: TablesName.POSTS,
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            serviceId: {
                type: Sequelize.INTEGER,
                references: {
                    model: TablesName.SERVICES,
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            productId: {
                type: Sequelize.INTEGER,
                references: {
                    model: TablesName.PRODUCTS,
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable(TablesName.PERMISSIONS);
    }
};