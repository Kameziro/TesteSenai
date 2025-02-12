const { validate } = require("uuid");

module.exports = (sequelize, DataTypes) => {
    const Registros = sequelize.define('registros', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cpfVoluntario: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'CPF é obrigatório'
                }
            }
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Nome é obrigatório'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Email é obrigatório'
                }
            }
        },
        especializacao: { 
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Especialização é obrigatória'
                }
            }
        },
        telefone: { 
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Telefone é obrigatório'
                }
            }
        },
        casa: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                msg: 'Casa é obrigatório'
            }
        }
    },
});

    return Registros;
};