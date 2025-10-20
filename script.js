// 1. O "Banco de Dados" de Pets e suas pontuações
const petScores = [
    { 
        name: "Cachorro (Ex: Golden Retriever)", 
        description: "Você é leal, energético e adora a companhia! Seu ideal é um amigo que te acompanhe em todas as aventuras e te dê carinho constante.",
        img: "images/cachorro.jpg", // Certifique-se de ter esta imagem
        scoreMap: {
            energia_alta: 2, sociabilidade_muito: 2, atencao_alta: 2, 
            vida_movimentada: 2, curioso_sim: 1 
        }
    },
    { 
        name: "Gato (Ex: Persa)", 
        description: "Você é calmo, independente e aprecia a paz e o silêncio. Você valoriza o conforto e tem um charme reservado.",
        img: "images/gato.jpg", // Certifique-se de ter esta imagem
        scoreMap: {
            energia_baixa: 2, sociavel_pouco: 2, atencao_baixa: 2, 
            vida_calma: 2, curioso_nao: 1 
        }
    },
    { 
        name: "Papagaio (ou Calopsita)", 
        description: "Você é inteligente, comunicativo e precisa de estímulo constante. Você prospera na interação social e em aprender coisas novas.",
        img: "images/papagaio.jpg", // Certifique-se de ter esta imagem
        scoreMap: {
            energia_media: 1, sociavel_medio: 2, atencao_alta: 1, 
            vida_movimentada: 1, curioso_sim: 2 
        }
    },
    { 
        name: "Coelho", 
        description: "Você é gentil, quieto e um pouco tímido. Você se sente melhor em ambientes previsíveis e com rotinas estáveis.",
        img: "images/coelho.jpg", // Certifique-se de ter esta imagem
        scoreMap: {
            energia_baixa: 1, sociavel_pouco: 1, atencao_baixa: 1, 
            vida_calma: 1, curioso_nao: 2 
        }
    },
    { 
        name: "Peixe (Ex: Betta)", 
        description: "Você é contemplativo, sereno e ama a tranquilidade. Você é discreto e aprecia a beleza em ambientes minimalistas e pacíficos.",
        img: "images/peixe.jpg", // Certifique-se de ter esta imagem
        scoreMap: {
            energia_baixa: 2, sociavel_pouco: 2, atencao_baixa: 2, 
            vida_calma: 2, curioso_nao: 2 
        }
    }
];

// 2. Lógica para processar o formulário
document.getElementById('personality-quiz').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const form = event.target;
    let results = {}; // Objeto para armazenar as respostas (valor do radio button selecionado)
    
    // 3. Coleta as respostas
    const questions = ['q1', 'q2', 'q3', 'q4', 'q5'];
    let allAnswered = true;
    questions.forEach(qName => {
        const selected = form.querySelector(`input[name="${qName}"]:checked`);
        if (selected) {
            results[qName] = selected.value;
        } else {
            allAnswered = false; // Se alguma pergunta não for respondida
        }
    });

    if (!allAnswered) {
        alert("Por favor, responda a todas as perguntas para descobrir seu pet!");
        return;
    }

    // 4. Calcula a pontuação para cada Pet
    const finalScores = petScores.map(pet => {
        let score = 0;
        // Percorre as respostas do usuário e soma os pontos do mapa de pontuação do pet
        for (const qName in results) {
            const answerValue = results[qName];
            // Verifica se a resposta do usuário está no mapa de pontos do pet
            if (pet.scoreMap[answerValue]) {
                score += pet.scoreMap[answerValue];
            }
        }
        return { 
            name: pet.name, 
            description: pet.description, 
            img: pet.img, 
            score: score 
        };
    });

    // 5. Determina o Pet com a maior pontuação
    // Reduz o array de scores para encontrar o objeto com a maior pontuação
    const bestMatch = finalScores.reduce((prev, current) => {
        return (prev.score > current.score) ? prev : current;
    });

    // 6. Mostra o resultado na tela
    displayResult(bestMatch);
});

// 7. Função para exibir o resultado
function displayResult(pet) {
    const resultArea = document.getElementById('pet-result');
    
    // Conteúdo HTML do resultado
    resultArea.innerHTML = `
        <h3>${pet.name}</h3>
        <p>Parabéns! Sua personalidade se assemelha mais a um:</p>
        <img src="${pet.img}" alt="Imagem de um ${pet.name}">
        <p class="description">${pet.description}</p>
        <p class="score-info">(Pontuação de Afinidade: ${pet.score})</p>
    `;

    // Esconde o Quiz e mostra a área de Resultado
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result-area').classList.remove('hidden');
    window.scrollTo(0, 0); // Volta ao topo da página
}3