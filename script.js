
let cardContainer = document.querySelector("#card-container");
let searchInput = document.querySelector("#search-input");
let searchButton = document.querySelector("#botao-busca");
let viewControls = null;
let dados = [];

// Chama a função para carregar os dados assim que o script for lido
window.addEventListener('DOMContentLoaded', iniciarBusca);

function criarControlesDeVisualizacao() {
    const header = document.querySelector('header');
    viewControls = document.createElement('div');
    viewControls.classList.add('view-controls');
    viewControls.innerHTML = `
    <button id="list-view-btn" class="view-btn active" title="Visualização em Lista"><i class="fas fa-list"></i></button>  
    <button id="grid-view-btn" class="view-btn" title="Visualização em Grade"><i class="fas fa-th-large"></i></button>
    `;
    header.appendChild(viewControls);
    
    document.getElementById('list-view-btn').addEventListener('click', () => alternarVisualizacao('list'));
    document.getElementById('grid-view-btn').addEventListener('click', () => alternarVisualizacao('grid'));

    // Adicione o link para o Font Awesome no head do seu HTML
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(fontAwesomeLink);
}

async function iniciarBusca() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);

    // Adiciona o "ouvinte" de evento para o clique no botão de busca
    searchButton.addEventListener("click", filtrarDados);

    // Opcional: Adiciona busca em tempo real ao digitar
    searchInput.addEventListener("input", filtrarDados);

    criarControlesDeVisualizacao();
}

function alternarVisualizacao(view) {
    const listViewBtn = document.getElementById('list-view-btn');
    const gridViewBtn = document.getElementById('grid-view-btn');
    if (view === 'grid') {
        cardContainer.classList.add('grid-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    } else { // 'list'
        cardContainer.classList.remove('grid-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    }
}

function filtrarDados() {
    const termoBuscado = searchInput.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => {
        return dado.nome.toLowerCase().includes(termoBuscado) || 
               dado.descrição.toLowerCase().includes(termoBuscado);
    });
    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados){
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <img class="card-image" src="${dado.imagem}" alt="Capa da série ${dado.nome}">
        <div class="card-content">
            <h2>${dado.nome}</h2>
            <p>${dado.descrição}</p>
            <p><strong>Categoria:</strong> ${dado.categoria}</p>
            <p><strong>Ano:</strong> ${dado.ano}</p>
            <a href="${dado.link}" target="_blank">Leia mais...</a>
        </div>
        `;
        cardContainer.appendChild(article);

    }
}
