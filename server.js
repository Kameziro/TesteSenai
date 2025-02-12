const express = require('express');
const app = express();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

const db = require('./models');
var registros = require('./models/registros');
var administradores = require('./models/administradores');
app.use(cors(corsOptions));
app.use(express.json()); // Add this line to handle JSON requests

app.get('/selectRegistros', async (req, res) => {
    registros = await db.registros.findAll();
    res.json(registros);
});

app.get('/selectAdministradores', async (req, res) => {
    administradores = await db.administradores.findAll();
    res.json(registros);
});

app.get('/insertRegistros', async (req, res) => {
    registros = await db.registros.create({
        nome: 'Fulano',
        email: 'fulano@email.com',
        especializacao: 'Desenvolvedor',
        telefone: '999999999'
}).catch((err) => {
    res.json(err);
    });
});

app.get('/insertAdministrador', async (req, res) => {
    administradores = await db.administradores.create({
        cpfAdministrador: '016.681.201-35',
        senhaAdministrador: '102030Cleber@',
}).catch((err) => {
    res.json(err);
    });
});

app.get('/validateAdministrador', async (req, res) => {
    const { cpf, senha } = req.query;
    console.log(`Received CPF: ${cpf}, Senha: ${senha}`); // Log received credentials
    const administrador = await db.administradores.findOne({
        where: {
            cpfAdministrador: cpf,
            senhaAdministrador: senha
        }
    });
    if (administrador) {
        console.log(`Senha salva: ${administrador.senhaAdministrador}`); 
        res.json({ valid: true });
    } else {
        res.json({ valid: false });
    }
});

app.get('/validateVoluntario', async (req, res) => {
    const { cpf, email, celular, nomeCompleto, especializacao, casa } = req.query;
    const data = new Date().toISOString().split('T')[0];
    console.log(`Received CPF: ${cpf}, Email: ${email}, Celular: ${celular}, Nome Completo: ${nomeCompleto}, Especialização: ${especializacao}, Casa: ${casa.toUpperCase()}, Data: ${data}`); 
    try {
        const voluntario = await db.registros.create({
            cpfVoluntario: cpf,
            email: email,
            telefone: celular,
            nome: nomeCompleto,
            especializacao: especializacao,
            casa: casa.toUpperCase(),
            createdAt: data 
        });
        console.log(`Voluntário inserido: ${voluntario.nome}`); 
        res.json({ valid: true });
    } catch (err) {
        console.error(err);
        res.json({ valid: false });
    }
});

app.delete('/delete', async (req, res) => {
    const { id } = req.query;
    try {
        await db.registros.destroy({
            where: {
                id: id
            }
        });
        res.send('Usuário deletado com sucesso');
    } catch (error) {
        console.error('Error deleting registro:', error);
        res.status(500).send('Failed to delete registro');
    }
});

app.get('/getVoluntario', async (req, res) => {
    const { id } = req.query;
    try {
        const voluntario = await db.registros.findOne({ where: { id } });
        res.json(voluntario);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch voluntario' });
    }
});

app.post('/updateVoluntario', async (req, res) => {
    const { id } = req.query;
    const { cpf, nomeCompleto, email, celular, especializacao, casa } = req.body;
    console.log('Request body:', req.body); 
    try {
        await db.registros.update(
            { cpfVoluntario: cpf, nome: nomeCompleto, email, telefone: celular, especializacao, casa: casa.toUpperCase() },
            { where: { id } }
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to update voluntario' });
    }
});

db.sequelize.sync().then((req) => {
    app.listen(3001, () => {
        console.log('Server ta rodando na porta 3001');
    });
});
