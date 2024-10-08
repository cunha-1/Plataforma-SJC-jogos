const questions = [
    {
        question: "Em que cidade nasceu João Calábria?",
        answers: {
            a: "Roma",
            b: "Verona",
            c: "Milão",
            d: "Florença"
        },
        correct: "b"
    },
    {
        question: "Qual era a profissão de seu pai, Luís Calábria?",
        answers: {
            a: "Ferreiro",
            b: "Sapateiro",
            c: "Carpinteiro",
            d: "Agricultor"
        },
        correct: "b"
    },
    {
        question: "Qual foi a principal dificuldade enfrentada por João na infância?",
        answers: {
            a: "Doença",
            b: "Pobreza",
            c: "Mudança de cidade",
            d: "Falta de amigos"
        },
        correct: "b"
    },
    {
        question: "Quem ajudou João a se preparar para os exames de admissão ao Seminário?",
        answers: {
            a: "Seu pai",
            b: "Pe. Pedro Scapini",
            c: "Pe. Natal de Jesus",
            d: "Sua mãe"
        },
        correct: "b"
    },
    {
        question: "Qual foi a primeira obra fundada por João Calábria?",
        answers: {
            a: "Casa Buoni Fanciulli",
            b: "Casa dos Pobres",
            c: "Casa de Acolhida",
            d: "Casa de Caridade"
        },
        correct: "a"
    },
    {
        question: "Em que ano João Calábria foi ordenado presbítero?",
        answers: {
            a: "1900",
            b: "1901",
            c: "1905",
            d: "1907"
        },
        correct: "b"
    },
    {
        question: "Qual foi a data da canonização de São João Calábria?",
        answers: {
            a: "1980",
            b: "1988",
            c: "1999",
            d: "2005"
        },
        correct: "c"
    },
    {
        question: "O que o Papa Pio XII disse sobre João Calábria após sua morte?",
        answers: {
            a: "Homem de grande sabedoria",
            b: "Campeão de evangélica caridade",
            c: "Fundador de grandes obras",
            d: "Apostolo dos pobres"
        },
        correct: "b"
    },
    {
        question: "Qual era a devoção especial de sua mãe, Ângela Foschio?",
        answers: {
            a: "Nossa Senhora da Graça",
            b: "Nossa Senhora das Dores",
            c: "São Miguel Arcanjo",
            d: "Santo Antônio"
        },
        correct: "b"
    },
    {
        question: "Qual era o objetivo da Congregação fundada por João Calábria?",
        answers: {
            a: "Ensinar o Evangelho",
            b: "Cuidar dos doentes",
            c: "Servir os pobres e marginalizados",
            d: "Proclamar a paz"
        },
        correct: "c"
    },
    {
        question: "Qual a data de nascimento de João Calábria?",
        answers: {
            a: "8 de outubro de 1870",
            b: "8 de outubro de 1873",
            c: "8 de outubro de 1880",
            d: "8 de outubro de 1885"
        },
        correct: "b"
    },
    {
        question: "Quantos anos João tinha quando perdeu seu pai?",
        answers: {
            a: "10",
            b: "12",
            c: "14",
            d: "16"
        },
        correct: "b"
    },
    {
        question: "Em que ano foi fundada a Congregação Pobres Servos da Divina Providência?",
        answers: {
            a: "1901",
            b: "1907",
            c: "1910",
            d: "1915"
        },
        correct: "b"
    }
];

function loadQuiz() {
    const quizContainer = document.getElementById('quiz');
    questions.forEach((question, index) => {
        const questionEl = document.createElement('div');
        questionEl.classList.add('question');
        questionEl.innerHTML = `<h3>${index + 1}. ${question.question}</h3>`;
        
        for (const letter in question.answers) {
            questionEl.innerHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${letter}">
                    ${letter}: ${question.answers[letter]}
                </label>
            `;
        }
        quizContainer.appendChild(questionEl);
    });
}

function getResults() {
    let score = 0;
    questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === question.correct) {
            score++;
        }
    });
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `Você acertou ${score} de ${questions.length} perguntas.`;
    document.getElementById('submit').style.display = 'none';
    document.getElementById('restart').style.display = 'block';
}

function restartQuiz() {
    document.getElementById('quiz').innerHTML = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('submit').style.display = 'block';
    document.getElementById('restart').style.display = 'none';
    loadQuiz();
}

document.getElementById('submit').addEventListener('click', getResults);
document.getElementById('restart').addEventListener('click', restartQuiz);

loadQuiz();
