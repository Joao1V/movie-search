import {toast} from "react-toastify";

function tt(tipo) {
    // Selecione a tabela pelo ID
    const table = document.getElementById('manage_streams');

    // Verifique se a tabela existe
    if (!table) {
        console.error('Tabela não encontrada com o ID "manage_streams".');
        return;
    }

    // Selecione todas as linhas (tr) da tabela
    const rows = table.querySelectorAll('tr');

    // Estrutura para armazenar os filmes por tipo como strings
    const filmesOrganizados = {
        dublado: '',
        legendado: ''
    };

    // Função para remover o ano do nome do filme
    const removerAno = (nome) => nome.replace(/\s*-\s*\d{4}(\s*\(\s*L\s*\))?$/, '').trim();

    // Itere sobre cada linha
    rows.forEach(row => {
        const categoryTd = row.querySelector('td[data-title="Category Name"]');
        const movieTd = row.querySelector('td[data-title="VOD Name"]');

        // Valide se ambos categoryTd e movieTd existem
        if (categoryTd && movieTd) {
            const categoryText = categoryTd.textContent.trim();
            const link = movieTd.querySelector('a');

            // Certifique-se de que há um link disponível
            if (link) {
                let movieName = link.textContent.trim();

                // Remova o ano do nome do filme, se houver
                movieName = removerAno(movieName);

                // Classifique os filmes com base na categoria
                if (categoryText === "LANÇAMENTOS LEGENDADOS") {
                    filmesOrganizados.legendado += movieName + '\n';
                } else {
                    filmesOrganizados.dublado += movieName + '\n';
                }
            }
        }
    });

    // Remova a última quebra de linha extra no final de cada string
    filmesOrganizados.dublado = filmesOrganizados.dublado.trim();
    filmesOrganizados.legendado = filmesOrganizados.legendado.trim();

    // Converter obj para string JSON para copiar
    const filmesTexto = JSON.stringify(filmesOrganizados, null, 2);

    // Tenta copiar para o clipboard usando a API Clipboard
    if (tipo === true) {
        copy(filmesOrganizados.dublado.trim());

    } else if (tipo === false) {
        copy(filmesOrganizados.legendado.trim());
    }

    // Retorna a estrutura organizada dos filmes como strings
    return filmesOrganizados;
}


export const copyToClipboard = (text) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success('Link copiado', { autoClose: 2000, pauseOnFocusLoss: false})
            })
            .catch(err => {
                console.error('Erro ao copiar para a área de transferência: ', err);
            });
    } else {
        let textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();

        try {
            toast.success('Link copiado', { autoClose: 500})
        } catch (err) {
            console.error('Erro ao copiar para a área de transferência: ', err);
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

export const generateObjectListTable = (text) => {
    return text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '')
        .map(movieName => ({title: movieName, checked: false, updated_at: null}))
};