// Página de publicar vagas
const JSON_SERVER_URL_VAGAS = 'https://uaijobs-json-server-fvyr.onrender.com/vagas';
const JSON_SERVER_URL_EMPREGADORES = 'https://uaijobs-json-server-fvyr.onrender.com/empregadores';
const JSON_SERVER_URL_FREELANCERS = 'https://uaijobs-json-server-fvyr.onrender.com/freelancers';


document.getElementById('btnPublicarVaga').addEventListener('click', async function(event) {
    event.preventDefault();

    // Obtenha os valores dos campos do formulário
    const nomeVaga = document.getElementById('nomeVaga').value;
    const localVaga = document.getElementById('localVaga').value;
    const dataVaga = document.getElementById('dataVaga').value;
    const categoriaVaga = document.getElementById('categoriaVaga').value;
    const turnoVaga = document.getElementById('turnoVaga').value;
    const valorVaga = document.getElementById('valorVaga').value;
    const habilidadesVaga = document.getElementById('habilidadesVaga').value.split(',').map(h => h.trim());
    const descricaoVaga = document.getElementById('descricaoVaga').value;
    const imagemVaga = document.getElementById('imagemVaga').value;

    // Obtenha os dados do usuário corrente do localStorage
    const UsuarioCorrente = JSON.parse(localStorage.getItem('UsuarioCorrente'));

    // Verifique se o usuário corrente existe e é um empregador
    if (!UsuarioCorrente || UsuarioCorrente.tipo !== 'empregador') {
        alert('Erro: Usuário corrente inválido ou não é um empregador.');
        return;
    }

    // Faça o upload da imagem usando UploadCare
    let imagemUrl = '';
    if (imagemVaga) {
        const uploadcareWidget = uploadcare.Widget('[role=uploadcare-uploader]');
        const file = uploadcareWidget.value();
        if (file) {
            const fileInfo = await file.promise();
            imagemUrl = fileInfo.cdnUrl;
        }
    }

    // Construa o objeto vaga
    const vaga = {
        id: generateId(), // Função para gerar ID único
        nome: nomeVaga,
        categoria: categoriaVaga,
        descricao: descricaoVaga,
        imagem: imagemUrl,
        valor: valorVaga,
        turno: turnoVaga,
        local: localVaga,
        data: dataVaga,
        habilidades: habilidadesVaga,
        empregador: UsuarioCorrente.nome,
        email: UsuarioCorrente.email,
        telefone: UsuarioCorrente.telefone,
        cnpj: UsuarioCorrente.cpf, // Usando CPF como CNPJ
        publicado: true,
        publicacao: new Date().toLocaleDateString('pt-BR'),
        candidatos: [],
        online: true,
        IDfreelancerEscolhido: null
    };

    console.log('Objeto vaga a ser enviado:', vaga);

    // Envie a vaga para o servidor JSON
    try {
        const response = await axios.post(JSON_SERVER_URL_VAGAS, vaga);
        console.log('Resposta do servidor:', response);
        if (response.status === 201) {
            alert('Vaga publicada com sucesso!');
        } else {
            alert('Erro ao publicar vaga!');
        }
    } catch (error) {
        console.error('Erro ao publicar vaga:', error.response ? error.response.data : error.message);
        alert('Erro ao publicar vaga!');
    }
});

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
