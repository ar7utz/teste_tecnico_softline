verificarLogin();

async function carregarProdutos() {
  const res = await fetch(`${API_URL}/Produto`, { headers: headers() });
  if (res.status === 401) { window.location.href = "login.html"; return; }

  const produtos = await res.json();
  const tbody = document.getElementById("tabela-produtos");
  tbody.innerHTML = "";

  if (produtos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-gray-400">Nenhum produto cadastrado.</td></tr>`;
    return;
  }

  produtos.forEach(p => {
    tbody.innerHTML += `
      <tr class="border-b hover:bg-gray-50">
        <td class="px-4 py-2">${p.codigo}</td>
        <td class="px-4 py-2">${p.descricao}</td>
        <td class="px-4 py-2">${p.codigoBarras || "-"}</td>
        <td class="px-4 py-2">R$ ${Number(p.valorVenda).toFixed(2)}</td>
        <td class="px-4 py-2">${Number(p.pesoBruto).toFixed(3)}</td>
        <td class="px-4 py-2">${Number(p.pesoLiquido).toFixed(3)}</td>
        <td class="px-4 py-2 flex gap-2">
          <button onclick="visualizarProduto(${p.id})" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Ver</button>
          <button onclick="editarProduto(${p.id})" class="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">Editar</button>
          <button onclick="deletarProduto(${p.id})" class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">Deletar</button>
        </td>
      </tr>
    `;
  });
}

async function deletarProduto(id) {
  if (!confirm("Tem certeza que deseja deletar este produto?")) return;
  const res = await fetch(`${API_URL}/Produto/${id}`, { method: "DELETE", headers: headers() });
  if (res.ok) { carregarProdutos(); } else { alert("Erro ao deletar produto."); }
}

function visualizarProduto(id) { window.location.href = `cadastroProduto.html?id=${id}&modo=visualizar`; }
function editarProduto(id)     { window.location.href = `cadastroProduto.html?id=${id}&modo=editar`; }
function novoProduto()         { window.location.href = "cadastroProduto.html?modo=novo"; }

carregarProdutos();