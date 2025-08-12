// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar um amigo
function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    // Valida se o nome está vazio
    if (nome === "") {
        alert("Digite um nome válido!");
        return;
    }

    // Valida se o nome já existe na lista (ignora a diferenciação de maiúsculas/minúsculas)
    if (amigos.some(amigo => amigo.toLowerCase() === nome.toLowerCase())) {
        alert("Este nome já foi adicionado!");
        return;
    }

    // Adiciona o nome à lista e atualiza a interface
    amigos.push(nome);
    input.value = "";
    atualizarLista();
}

// Atualiza a lista na tela
function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = "";

    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

// Sorteia um amigo
function sortearAmigo() {
    // Valida se há pelo menos 2 amigos para o sorteio
    if (amigos.length < 2) {
        alert("Adicione pelo menos dois amigos para sortear!");
        return;
    }

    // Cria uma cópia da lista original para embaralhar
    let amigosSorteados = [...amigos];
    
    // Embaralha o array (algoritmo de Fisher-Yates)
    for (let i = amigosSorteados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosSorteados[i], amigosSorteados[j]] = [amigosSorteados[j], amigosSorteados[i]];
    }

    // Exibe o resultado do sorteio
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = "";

    for (let i = 0; i < amigos.length; i++) {
        const amigo = amigos[i];
        const amigoSecreto = amigosSorteados[i];

        // Certifica que ninguém sorteie a si mesmo
        if (amigo === amigoSecreto) {
            // Se alguém sortear a si mesmo, o último da lista sorteia o primeiro
            // (isso garante que ninguém sorteie a si mesmo, mesmo que a lista seja embaralhada novamente)
            const ultimoIndice = amigosSorteados.length - 1;
            const temp = amigosSorteados[i];
            amigosSorteados[i] = amigosSorteados[ultimoIndice];
            amigosSorteados[ultimoIndice] = temp;
        }
        
        // Cria um elemento para exibir o resultado
        const p = document.createElement('p');
        p.textContent = `${amigo}  -->  ${amigosSorteados[i]}`;
        resultado.appendChild(p);
    }
}