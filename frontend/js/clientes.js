async function carregarClientes() {
  verificarLogin();

  const res = await fetch(`${API_URL}/Cliente`, { headers: headers() });
  if (res.status === 401) { window.location.href = "login.html"; return; }

  const clientes = await res.json();
  const tbody = document.getElementById("tabela-clientes");
  tbody.innerHTML = "";

  if (clientes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-gray-400">Nenhum cliente cadastrado.</td></tr>`;
    return;
  }

  clientes.forEach(c => {
    tbody.innerHTML += `
      <tr class="border-b hover:bg-gray-50">
        <td class="px-4 py-2">${c.codigo}</td>
        <td class="px-4 py-2">${c.nome}</td>
        <td class="px-4 py-2">${c.fantasia}</td>
        <td class="px-4 py-2">${c.documento || "-"}</td>
        <td class="px-4 py-2 flex gap-2">
          <button onclick="visualizarCliente(${c.id})" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Ver</button>
          <button onclick="editarCliente(${c.id})" class="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">Editar</button>
          <button onclick="deletarCliente(${c.id})" class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Deletar</button>
        </td>
      </tr>
    `;
  });
}

async function deletarCliente(id) {
  if (!confirm("Tem certeza que deseja deletar este cliente?")) return;
  const res = await fetch(`${API_URL}/Cliente/${id}`, { method: "DELETE", headers: headers() });
  if (res.ok) { carregarClientes(); } else { alert("Erro ao deletar cliente."); }
}

function visualizarCliente(id) { window.location.href = `cadastroCliente.html?id=${id}&modo=visualizar`; }
function editarCliente(id) { window.location.href = `cadastroCliente.html?id=${id}&modo=editar`; }
function novoCliente() { window.location.href = "cadastroCliente.html?modo=novo"; }

carregarClientes();