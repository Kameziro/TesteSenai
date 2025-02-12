const slides = document.querySelectorAll('.slides img');
let indexSlide = 0;

document.addEventListener('DOMContentLoaded', async () => {
    inicializarSlider();
    await populateFilters();
    await populateTable();
});

inicializarSlider();

function inicializarSlider() {
    if (slides.length > 0) {
        slides[indexSlide].classList.add('mostraSlide');
    }
}

function mostraSlide(index) {
    if (index >= slides.length) {
        indexSlide = 0;
    } else if (index < 0) {
        indexSlide = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove('mostraSlide');
    });
    slides[indexSlide].classList.add('mostraSlide');
}

function proxSlide() {
    indexSlide++;
    mostraSlide(indexSlide);
}

function slideAnt() {
    indexSlide--;
    mostraSlide(indexSlide);
}

async function populateFilters() {
    try {
        const response = await fetch('http://localhost:3001/selectRegistros');
        const registros = await response.json();

        const filterCpf = document.getElementById('filterCpf');

        const uniqueValues = (key) => [...new Set(registros.map(registro => registro[key]))];

        uniqueValues('cpfVoluntario').forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            filterCpf.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating filters:', error);
    }
}

async function populateTable() {
    try {
        const response = await fetch('http://localhost:3001/selectRegistros');
        const registros = await response.json();
        const tableBody = document.getElementById('tableBody');

        registros.forEach(registro => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(registro.createdAt).toLocaleDateString()}</td>
                <td>${registro.cpfVoluntario}</td>
                <td>${registro.nome}</td>
                <td>${registro.email}</td>
                <td>${registro.telefone}</td>
                <td>${registro.casa.toUpperCase()}</td>
                <td>${registro.especializacao}</td>
                <td>
                    <button onclick="editRegistro(${registro.id})">Editar</button>
                    <button onclick="deleteRegistro(${registro.id})">Excluir</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error populating table:', error);
    }
}

async function editRegistro(id) {
    window.location.href = `/src/pages/editorVoluntario.html?id=${id}`;
}

async function deleteRegistro(id) {
    try {
        await fetch(`http://localhost:3001/delete?id=${id}`);
        await populateTable(); 
    } catch (error) {
        console.error('Error deleting registro:', error);
    }
}