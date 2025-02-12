module.exports = (sequelize, DataTypes) => {
    const administradores = sequelize.define('administradores', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cpfAdministrador: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'CPF é obrigatório'
                }
            }
        },
        senhaAdministrador: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Senha é obrigatória'
                }
            }
        }
    });

    return administradores;
};