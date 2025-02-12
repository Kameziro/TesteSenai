document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
        await loadVoluntarioData(id);
    }

    const form = document.getElementById('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (id) {
            await updateVoluntario(id);
        } else {
            console.error('No ID provided for update.');
        }
    });
});

async function loadVoluntarioData(id) {
    try {
        const response = await fetch(`http://localhost:3001/getVoluntario?id=${id}`);
        const voluntario = await response.json();

        document.getElementById('cpf').value = voluntario.cpfVoluntario;
        document.getElementById('nomeCompleto').value = voluntario.nome;
        document.getElementById('email').value = voluntario.email;
        document.getElementById('celular').value = voluntario.telefone;
        document.getElementById('especializacao').value = voluntario.especializacao;
        document.getElementById('casa').value = voluntario.casa.toLowerCase();
    } catch (error) {
        console.error('Error loading voluntario data:', error);
    }
}

async function updateVoluntario(id) {
    const cpf = document.getElementById('cpf').value;
    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const especializacao = document.getElementById('especializacao').value;
    const casa = document.getElementById('casa').value;

    try {
        const response = await fetch(`http://localhost:3001/updateVoluntario?id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cpf,
                nomeCompleto,
                email,
                celular,
                especializacao,
                casa
            })
        });
        const data = await response.json();
        if (data.success) {
            window.location.replace("/index.html");
        } else {
            console.error('Error updating voluntario:', data.message);
        }
    } catch (error) {
        console.error('Error updating voluntario:', error);
    }
}
