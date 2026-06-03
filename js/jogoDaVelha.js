let tabuleiro
let board
let aviso
let jogador

function iniciar() {
    tabuleiro = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    board = document.getElementById('board')
    aviso = document.getElementById('aviso')
    jogador = 1

    exibir()
}

function exibir() {
    let tabela = '<table cellpadding="10" border="1">'

    for (let i = 0; i < 3; i++) {
        tabela += '<tr>'

        for (let j = 0; j < 3; j++) {
            let marcador

            switch (tabuleiro[i][j]) {
                case -1: marcador = 'X'; break
                case 1: marcador = 'O'; break
                default: marcador = ' '
            }

            tabela += '<td>' + marcador + '</td>'
        }

        tabela += '</tr>'
    }

    tabela += '</table>'

    board.innerHTML = tabela
}

function jogar() {
    let linha = document.getElementById('linha').value - 1
    let coluna = document.getElementById('coluna').value - 1

    if (tabuleiro[linha][coluna] == 0) {
        tabuleiro[linha][coluna] = numerojogadas() == 1 ? 1 : -1

        if (checar()) {
            aviso.innerHTML = 'Jogador ' + numerojogadas() + ' venceu!'
            return
        }

        jogador++
        aviso.innerHTML = 'Vez do jogador: ' + numerojogadas()

    } else {
        aviso.innerHTML = 'Posição ocupada, tente novamente'
    }

    exibir()
}

function checar() {

    // linhas
    for (let i = 0; i < 3; i++) {
        let soma = tabuleiro[i][0] + tabuleiro[i][1] + tabuleiro[i][2]
        if (soma == 3 || soma == -3) return true
    }

    // colunas
    for (let i = 0; i < 3; i++) {
        let soma = tabuleiro[0][i] + tabuleiro[1][i] + tabuleiro[2][i]
        if (soma == 3 || soma == -3) return true
    }

    // diagonais
    let d1 = tabuleiro[0][0] + tabuleiro[1][1] + tabuleiro[2][2]
    let d2 = tabuleiro[0][2] + tabuleiro[1][1] + tabuleiro[2][0]

    if (d1 == 3 || d1 == -3 || d2 == 3 || d2 == -3) return true

    return false
}

function numerojogadas() {
    return jogador % 2 + 1
}