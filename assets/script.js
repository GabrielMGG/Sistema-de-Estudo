let listaDisciplina = [];
let disciplinaAtual = null;

function salvarDisciplinas(){
    localStorage.setItem('disciplinas', JSON.stringify(listaDisciplina));
}

/*============================================
   CONFIGURAÇÃO DAS CORES E ICONES DO TEMPLATE
==============================================*/
const coresPorArea = {
    "Exata": "#ff6900",      // Laranja
    "Tecnologia": "#155dfc", // Azul
    "Humanas": "#9616fa",    // Roxo
    "Biológicas": "#00a640"  // Verde
    };

const configAreas = {
    "Tecnologia": {
        cor: "#155dfc", // Azul
        icone: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-icon lucide-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'
    },
    "Exata": {
        cor: "#ff6900", // Laranja
        icone: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>'
    },
    "Humanas": {
        cor: "#9616fa", // Roxo
        icone: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"/><path d="M16 12h2"/><path d="M16 8h2"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M6 12h2"/><path d="M6 8h2"/></svg>'
    },
    "Biológicas": {
        cor: "#00a640", // Verde
        icone: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="11.9" r="2"/><path d="M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6"/><path d="m8.9 10.1 1.4.8"/><path d="M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5"/><path d="m15.1 10.1-1.4.8"/><path d="M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2"/><path d="M12 13.9v1.6"/><path d="M13.5 5.4c-1-.2-2-.2-3 0"/><path d="M17 16.4c.7-.7 1.2-1.6 1.5-2.5"/><path d="M5.5 13.9c.3.9.8 1.8 1.5 2.5"/></svg>'
    }
};



/*==============================================
COMEÇO DA FUNÇAO DO ENVIO DO BOTAO DA DISCIPLINA
================================================*/
const formDisciplina = document.getElementById('form-disciplina');

formDisciplina.addEventListener('submit', function(event){
    event.preventDefault();

    //pegando os valores do input
    const nomeDisciplina = document.getElementById('nome-disciplina').value;
    const nomeProfessor = document.getElementById('professor').value;
    const cargaHoraria = Number(document.getElementById('carga-horaria').value);
    const areaConhecimento = document.getElementById('area-conhecimento').value;

    //vai editar se tiver uma disciplina , se nao tiver vai pro else e cria uma nova.
    if(disciplinaAtual){

        disciplinaAtual.nome = nomeDisciplina;
        disciplinaAtual.professor = nomeProfessor;
        disciplinaAtual.CargaHoraria = cargaHoraria;
        disciplinaAtual.areaEstudo = areaConhecimento;

        disciplinaAtual = null;

    }   
    else{
    
    const novaDisciplina = {
        id: Date.now(), // é um método  do JavaScript que retorna o número de milissegundos decorridos desde o Unix Epoch, assim vai criar um id unico pra cada disciplina criada
        nome: nomeDisciplina,
        professor: nomeProfessor,
        CargaHoraria: cargaHoraria,
        areaEstudo: areaConhecimento,
        horasEstudadas: 0
    };

    //mandando cada nova disciplina pra lista pra armazenar os dados
    listaDisciplina.push(novaDisciplina);

    }
    
    //funçao do salvamento do localStorage, vai ser chamada cada vez que eu usar o modal-1
    salvarDisciplinas();

    location.reload();

   
});



const formHorario = document.getElementById('form-horario');

formHorario.addEventListener('submit', function(event){
    event.preventDefault();

    const horarioAdicionado = Number(document.getElementById('adicionar-horario').value);
    disciplinaAtual.horasEstudadas += horarioAdicionado;

    disciplinaAtual.elementoHoras.textContent = `${disciplinaAtual.horasEstudadas} h`;
    disciplinaAtual.elementoRestante.textContent = `${disciplinaAtual.CargaHoraria - disciplinaAtual.horasEstudadas} h`;

    atualizarBarra(disciplinaAtual, disciplinaAtual.horasEstudadas, disciplinaAtual.CargaHoraria);

    salvarDisciplinas();
    atualizarDashboard();

    const modalClose = document.getElementById('modal-2');
    modalClose.close();

    const inputHorario = document.getElementById('adicionar-horario');
    inputHorario.value = "";  

});

 
/*=====================================================
    VAI CRIAR E CLONAR OS CARD E CONECTA OS BOTOES NELA
========================================================*/
function clonarTemplate(disciplina) {
    const template = document.getElementById('template-1'); 
    const clone = template.content.cloneNode(true);

    // vai mudar os dados que estavam no clone pelos que o user envio
    clone.querySelector('.nome-materia').textContent = disciplina.nome;
    clone.querySelector('.nome-professor').textContent = `👨‍🏫${disciplina.professor}`;
    clone.querySelector('.horas-total').textContent = `${disciplina.CargaHoraria}h`;
    clone.querySelector('.area-estudada').textContent = disciplina.areaEstudo;

    

    // Aqui vamos pegar a cor baseada na area da disciplina
    const config = configAreas[disciplina.areaEstudo] || configAreas["Tecnologia"];

    // Atualiza o ícone
    const iconContainer = clone.querySelector('.icon-template');
    iconContainer.innerHTML = config.icone;
    iconContainer.style.color = config.cor; // cor do SVG

    // aqui vai aplicar a cor ao cabeçalho do card com transparencia
    const header = clone.querySelector('.header-disciplina');
    header.style.backgroundColor = config.cor + "15";
    
    // a cor do texto da area de conhecimento que o usuario escolheu
    const etiqueta = clone.querySelector('.grupo');
    etiqueta.style.backgroundColor = config.cor;

    //vai adicionar uma borda que facilita mais pro usuario achar a disciplina que quer
    const card = clone.querySelector('.card-disciplina');
    card.style.border = `1px solid ${config.cor}`;
    card.style.borderLeft = `5px solid ${config.cor}`;
   

    // vai pegar o svg 
    const icone = clone.querySelector('.bi-code'); 
    if(icone) icone.style.fill = corArea;

    const corBotaoRegistrar = clone.querySelector('.registrar-hora');
    if (corBotaoRegistrar) {
        corBotaoRegistrar.style.backgroundColor = config.cor;
    }

    //vai mostrar quanto estudou
    const horasSpan = clone.querySelector('.horas-estudadas');
    horasSpan.textContent = `${disciplina.horasEstudadas} h`;

    //vai calcular o quanto falta pra terminar os estudos
    const horasRemanescentes = clone.querySelector('.horas-restantes');
    horasRemanescentes.textContent = `${disciplina.CargaHoraria - disciplina.horasEstudadas } h `;

    const barra = clone.querySelector('.preenchimento');
    const porcentagem = clone.querySelector('.porcentagem');

    disciplina.barra = barra;
    disciplina.porcentagem = porcentagem;

    //Vai fazer com que o botao depois de clonado funcione
    const btnRegistrar = clone.querySelector('.registrar-hora');

    btnRegistrar.addEventListener('click', function()  {
        const modal = document.getElementById('modal-2');
        disciplinaAtual = disciplina;

        disciplinaAtual.elementoHoras = horasSpan;
        disciplinaAtual.elementoRestante = horasRemanescentes;
        

        document.querySelector('.disciplina-usuario').textContent = disciplina.nome;
        


        modal.showModal();
    });

    const btnEditar = clone.querySelector('.editar');

    btnEditar.addEventListener('click', function(){
        //vai pegar a displina a parti do id, assim nao acaba editando todas disciplinas ou a errada
        disciplinaAtual = disciplina;

        document.getElementById('nome-disciplina').value = disciplina.nome;
        document.getElementById('professor').value = disciplina.professor;
        document.getElementById('carga-horaria').value = disciplina.CargaHoraria;
        document.getElementById('area-conhecimento').value = disciplina.areaEstudo;

        const modal = document.getElementById('modal-1');
        modal.showModal();

});
    //vai deletar a disciplina selecionada
    const btnDeletar = clone.querySelector('.deletar');

        btnDeletar.addEventListener('click', function(){

        listaDisciplina = listaDisciplina.filter(function(item){
        return item.id !== disciplina.id;
    });

    //vai salvar e recarregar a pagina depois da modificação
    salvarDisciplinas();
    location.reload();

    });

    atualizarBarra(disciplina, disciplina.horasEstudadas, disciplina.CargaHoraria);

    return clone;
   
}

/*====================================================
    FUNÇÃO PRA CONTABILIZAR A QUANTIDADE DE DISCIPLINA
======================================================*/
function qtdDisciplina() {
    const qtdElemento = document.querySelector('.qtn-disciplina');
    const nenhumaDisciplina = document.querySelector('.nenhuma-disciplina');
    
    qtdElemento.textContent = listaDisciplina.length;

    //Condiçoes pra saber quando tem ou nao tem disciplina,
    if(listaDisciplina.length >= 1){
        nenhumaDisciplina.style.display = 'none';
        //tira o conteiner nenhuma disciplina

    }

    else{
        nenhumaDisciplina.style.display = 'flex';
        //volta o conteiner nenhuma disciplina
    }

}

function atualizarDashboard(){

    let totalEstudado = 0;
    let totalPlanejado = 0;
    let completas = 0;

    listaDisciplina.forEach(function(disciplina){

        totalEstudado += disciplina.horasEstudadas;
        totalPlanejado += disciplina.CargaHoraria;

        if(disciplina.horasEstudadas >= disciplina.CargaHoraria){
            completas++;
        }

    });

    let progresso = 0;

    if(listaDisciplina.length > 0){
        progresso = ((completas / listaDisciplina.length) * 100).toFixed(0);
    }

    // atualizar os cards
    document.querySelector('.qtn-disciplina').textContent = listaDisciplina.length;

    document.querySelector('.qtn-horas-estudadas').innerHTML = 
        totalEstudado + '<span class="espaço">h</span>';

    document.querySelector('.qtn-progresso').innerHTML = 
        progresso + '<span class="espaço">%</span>';

    document.querySelector('.qtn-completas').textContent = completas;

}

/*========================================
    função que atualiza barra de progresso
==========================================*/
function atualizarBarra(disciplina, valor, valorTotal) {
    //vai calcular a porcentage,
    let porcentagem = (valor / valorTotal) * 100;

    // vai garantir que o valor fique entre 0 e 100, evitando que a barra saia da tela
    const progresso = Math.min(Math.max(porcentagem, 0), 100).toFixed(1);

    disciplina.barra.style.width = progresso + '%';
    disciplina.porcentagem.innerText = progresso + '%';
}





/*==============================================================
VAI PEGAR AS DISCIPLINAS SALVAS NO LOCAL STORAGE E CARREGAR ELAS
================================================================*/
function carregarDisciplinas(){
    //Pega os dados do local storage
    const disciplinasSalvas = localStorage.getItem('disciplinas');

    //condição pra ver se tem disciplina salva
    if(disciplinasSalvas){
        //vai transforma os dados que estao em strings para um array de objeto novamente
        listaDisciplina = JSON.parse(disciplinasSalvas);

        listaDisciplina.forEach(function(disciplina){
            const card = clonarTemplate(disciplina);

            const templateGrid = document.getElementById('grid-template');
            templateGrid.appendChild(card);

        });
        //atualiza a quantidade de disciplina
        qtdDisciplina();
    }
}



/*================================
COMANDO PRA ABRIR E FECHAR O MODAL
==================================*/
const openButtons = document.querySelectorAll('.open-modal');

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        
        //vai abrir o modal
        modal.showModal();
    });
});

const closeButtons = document.querySelectorAll('.close-modal');

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        //vai fechar o modal
        modal.close();

    });
});

//vai ser ultimo a ser chamado assim da tempo de tudo carregar pra nao dar erro.
carregarDisciplinas();
atualizarDashboard();