let listaDisciplina = [];

const formDisciplina = document.getElementById('form-disciplina');

formDisciplina.addEventListener('submit', function(event){
    event.preventDefault();

    const nomeDisciplina = document.getElementById('nome-disciplina').value;
    const nomeProfessor = document.getElementById('professor').value;
    const cargaHoraria = document.getElementById('carga-horaria').value;
    const areaConhecimento = document.getElementById('area-conhecimento').value;

    // Vai criar a lista com todas as informaçoes que preciso pro template e com um id unico//
    const novaDisciplina = {
        id: Date.now(), // é um método  do JavaScript que retorna o número de milissegundos decorridos desde o Unix Epoch, assim vai criar um id unico pra cada disciplina criada//
        nome: nomeDisciplina,
        professor: nomeProfessor,
        horas: cargaHoraria,
        areaEstudo: areaConhecimento
    }
    
    listaDisciplina.push(novaDisciplina);

    renderizarClone();

    const modalClose = document.getElementById('modal-1');
    modalClose.close();
});

 

function clonarTemplate(disciplina) {
    const template = document.getElementById('template-1'); 
    const clone = template.content.cloneNode(true);

    // vai mudar os dados que estavam no clone pelos que o user envio
    clone.querySelector('.nome-materia').textContent = disciplina.nome;
    clone.querySelector('.nome-professor').textContent = disciplina.professor;
    clone.querySelector('.horas-total').textContent = `${disciplina.horas}h`;
    clone.querySelector('.area-estudada').textContent = disciplina.areaEstudo;

    return clone;
   
}

function renderizarClone() {
    const templateGrid = document.getElementById('grid-template');
    console.log('ta rodando1');

    listaDisciplina.forEach(function(itens){
        
        const cardPronto = clonarTemplate(itens);

        templateGrid.appendChild(cardPronto);


    });
    
}








const openButtons = document.querySelectorAll('.open-modal');

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        modal.showModal();
    });
});

const closeButtons = document.querySelectorAll('.close-modal');

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        modal.close();

    });
});