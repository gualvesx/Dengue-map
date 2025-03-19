async function listarLocalizacoes() {
    const tbLocalizacoes = document.getElementById("tb-localizacao");

    try {
        const res = await fetch("http://localhost:8443/localizacoes");
        if (!res.ok) throw new Error("Erro ao buscar dados");

        const json = await res.json();
        tbLocalizacoes.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

        json.localizacoes.forEach((local) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${local.id}</td>
                <td>${local.nome}</td>
                <td>${local.email}</td>
                <td>***</td> <!-- Senha oculta por segurança -->
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removerUsuario(${local.id}, this)">Remover</button>
                </td>
            `;

            tbLocalizacoes.appendChild(row);
        });
    } catch (error) {
        console.error(error);
        tbLocalizacoes.innerHTML = "<tr><td colspan='5' class='text-center text-danger'>Erro ao carregar usuários</td></tr>";
    }
}

async function removerUsuario(id, button) {
    console.log("Remover usuário chamado com ID:", id); // Verifica se a função é chamada
    if (!confirm("Tem certeza que deseja remover este usuário?")) return;

    try {
        const res = await fetch(`http://localhost:8443/localizacoes/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) throw new Error("Erro ao remover usuário!");

        button.closest("tr").remove();
    } catch (error) {
        alert(error.message);
    }
}


listarLocalizacoes();
