const JSON_SERVER_URL_EMPREGADORES = 'https://uaijobs-json-server-fvyr.onrender.com/empregadores';
const JSON_SERVER_URL_FREELANCERS = 'https://uaijobs-json-server-fvyr.onrender.com/freelancers';
const JSON_SERVER_URL_ADMIN = 'https://uaijobs-json-server-fvyr.onrender.com/admin';

// Função que lê o usuário logado no momento
function lerUsuarioCorrenteLS() {
    let strUsuarios = localStorage.getItem('UsuarioCorrente');
    let usuarioLogado = JSON.parse(strUsuarios);

    return usuarioLogado;
}

// Função que salva o usuário logado no momento
function salvarUsuarioCorrenteLS(usuario) {
    localStorage.setItem('UsuarioCorrente', JSON.stringify(usuario));
}

// Função que atualiza os interesses do usuário no Local Storage e no JSON server
async function atualizarInteressesLS(usuarioLogado) {

    if(usuarioLogado.tipo === "freelancer"){
        try {
            // Atualiza os interesses no JSON server usando PATCH
            const response = await axios.patch(`${JSON_SERVER_URL_FREELANCERS}/${usuarioLogado.id}`, { interesses: usuarioLogado.interesses });
            console.log('Resposta do servidor:', response.data);
        } catch (error) {
            console.error('Erro ao atualizar os interesses no JSON server:', error);
        }
    }
    else if(usuarioLogado.tipo === "empregador"){
        try {
            // Atualiza os interesses no JSON server usando PATCH
            const response = await axios.patch(`${JSON_SERVER_URL_EMPREGADORES}/${usuarioLogado.id}`, { interesses: usuarioLogado.interesses });
            console.log('Resposta do servidor:', response.data);
        } catch (error) {
            console.error('Erro ao atualizar os interesses no JSON server:', error);
        }
    }
    else if(usuarioLogado.tipo === "admin"){
        try {
            // Atualiza os interesses no JSON server usando PATCH
            const response = await axios.patch(`${JSON_SERVER_URL_ADMIN}/${usuarioLogado.id}`, { interesses: usuarioLogado.interesses });
            console.log('Resposta do servidor:', response.data);
        } catch (error) {
            console.error('Erro ao atualizar os interesses no JSON server:', error);
        }
    }

    window.location.href = '../Home/Home.html'; // Redireciona para a home    
}

// Função para salvar as seleções no Local Storage e no JSON server
function salvarSelecoes() {
    const interessesSelecionados = []; // Array para armazenar os interesses selecionados
    document.querySelectorAll('.card-interesse.selecionado').forEach(card => { // Para cada card selecionado
        interessesSelecionados.push(card.textContent.trim()); // Adiciona o texto do card (interesse) ao array
    });
    const usuarioLogado = lerUsuarioCorrenteLS();
    usuarioLogado.interesses = interessesSelecionados; // Adiciona os interesses selecionados aos interesses do usuário fictício
    atualizarInteressesLS(usuarioLogado); // Atualiza os interesses no Local Storage e no JSON server
    salvarUsuarioCorrenteLS(usuarioLogado); // Salva os dados do usuário fictício no Local Storage
     
}

// Nomes dos interesses e caminhos das imagens
const interesses = [
    { name: 'Jurídico', imageUrl: 'https://res.cloudinary.com/df7rlfmhg/image/upload/v1720130707/ImgCardsPesquisaInteresse/dn2u1pojyucor5tlaefv.png' },
    { name: 'Culinária', imageUrl: 'https://res.cloudinary.com/df7rlfmhg/image/upload/v1720130707/ImgCardsPesquisaInteresse/i3vc2atnkuzb14rejlxk.png' },
    { name: 'Design', imageUrl: 'https://res.cloudinary.com/df7rlfmhg/image/upload/v1720130707/ImgCardsPesquisaInteresse/ae3io5wh8a5n42wiwkbp.png' },
    { name: 'Finanças', imageUrl: 'https://res.cloudinary.com/df7rlfmhg/image/upload/v1720130707/ImgCardsPesquisaInteresse/b5dgzxq8wlugydzewar1.png' },
    { name: 'Fotografia', imageUrl: 'https://res.cloudinary.com/df7rlfmhg/image/upload/v1720130707/ImgCardsPesquisaInteresse/avwdvvymobcubgadjvdg.png' },
    { name: 'Marketing', imageUrl: 'https://res.cloudinary.com/df7rlfmhg/image/upload/v1720130708/ImgCardsPesquisaInteresse/ymmofwdifsfammoql5rx.png' },
    { name: 'Redação', imageUrl: 'https://res.cloudinary.com/df7rlfmhg/image/upload/v1720130708/ImgCardsPesquisaInteresse/kcv2zodeancl34shug4d.png' },
    { name: 'Construção', imageUrl: 'https://res.cloudinary.com/df7rlfmhg/image/upload/v1720130708/ImgCardsPesquisaInteresse/bugvprtllewm8fccy3jl.png' },
    { name: 'Tradução', imageUrl: 'https://res.cloudinary.com/df7rlfmhg/image/upload/v1720130708/ImgCardsPesquisaInteresse/og6k2zcglxc8ypfu1afs.png' },
    { name: 'Videoclipes', imageUrl: 'https://res.cloudinary.com/df7rlfmhg/image/upload/v1720130708/ImgCardsPesquisaInteresse/g4h6t03ci8dagfpslmew.png' },
    { name: 'Computação', imageUrl: 'https://res.cloudinary.com/df7rlfmhg/image/upload/v1720130707/ImgCardsPesquisaInteresse/uiz46mnsnu5e81qfzjb2.png' },
    { name: 'Mídias Sociais', imageUrl: 'https://res.cloudinary.com/df7rlfmhg/image/upload/v1720130708/ImgCardsPesquisaInteresse/ulovzsicotbncjpf3iha.png' }
];

// Função para criar um card com uma imagem específica e nome do interesse
function criarCard(interesse) {
    const card = document.createElement('div'); // Cria uma div
    card.classList.add('card-interesse'); // Adiciona a classe 'card-interesse' na div
    card.innerHTML = '<img src="' + interesse.imageUrl + '" alt="' + interesse.name + '">' + // Adiciona uma imagem ao card
        '<div>' + interesse.name + '</div>'; // Adiciona o nome do interesse no card
    card.onclick = function () { // Quando o usuario clicar no card:
        card.classList.toggle('selecionado'); // Alterna a classe 'selecionado' do card (seleciona ou desseleciona)
        atualizarEstadoBotaoConfirmar(); // Atualiza o estado do botão Confirmar (habilita ou desabilita)
    };
    return card;
}

// Inicializa os cards
const gradeInteresses = document.getElementById('grade-interesses');
interesses.forEach(interesse => { // Para cada interesse
    gradeInteresses.appendChild(criarCard(interesse)); // Adiciona um card ao grid
});
atualizarEstadoBotaoConfirmar();

// Função para limpar a seleção dos cards
function limparSelecao() {
    document.querySelectorAll('.card-interesse.selecionado').forEach(card => { // Para cada card selecionado
        card.classList.remove('selecionado'); // Remove a classe 'selecionado' do card
    });
    atualizarEstadoBotaoConfirmar();
}

// Função para atualizar o estado do botão Confirmar baseado na seleção dos cards
function atualizarEstadoBotaoConfirmar() {
    const selectedCards = document.querySelectorAll('.card-interesse.selecionado').length; // Conta o número de cards selecionados
    const botaoConfirmar = document.getElementById('botao-confirmar');
    botaoConfirmar.disabled = selectedCards === 0; // Desativa o botão Confirmar se nenhum card estiver selecionado
}

// Função para confirmar a seleção e salvar as seleções de interesses antes de redirecionar para a home
async function confirmarSelecao() {
    const confirmacao = confirm('Você deseja confirmar suas escolhas?'); // Pergunta ao usuário se ele deseja confirmar as escolhas
    if (confirmacao) { // Se o usuário confirmar
        salvarSelecoes(); // Salva as seleções no Local Storage e no JSON server
    }
}

// Adiciona função de clique ao botão Pular
document.getElementById('botao-pular').addEventListener('click', function () {
    const confirmacao = confirm('Você tem certeza que deseja pular a pesquisa de interesses?'); // Pergunta ao usuário se ele deseja pular a pesquisa
     if (confirmacao) { // Se o usuário confirmar
        window.location.href = '../Home/Home.html'; // Redireciona para a página inicial
    }
});
