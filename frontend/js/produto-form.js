verificarLogin();

const params = new URLSearchParams(window.location.search);
const id     = params.get("id");
const modo   = params.get("modo") || "novo";

document.addEventListener("DOMContentLoaded", async () => {
  const titulo   = document.getElementById("titulo-form");
  const btnSalvar = document.getElementById("btn-salvar");
  const campos   = ["codigo","descricao","codigoBarras","valorVenda","pesoBruto","pesoLiquido"];

  if (modo === "visualizar") {
    titulo.textContent = "Visualizar Produto";
    btnSalvar.classList.add("hidden");
    campos.forEach(c => { const el = document.getElementById(c); if(el) el.disabled = true; });
  } else if (modo === "editar") {
    titulo.textContent = "Editar Produto";
  }

  if (id) {
    const res = await fetch(`${API_URL}/Produto/${id}`, { headers: headers() });
    if (res.status === 401) { window.location.href = "login.html"; return; }
    if (!res.ok) { alert("Produto não encontrado."); voltar(); return; }
    const p = await res.json();
    document.getElementById("codigo").value       = p.codigo;
    document.getElementById("descricao").value    = p.descricao;
    document.getElementById("codigoBarras").value = p.codigoBarras;
    document.getElementById("valorVenda").value   = p.valorVenda;
    document.getElementById("pesoBruto").value    = p.pesoBruto;
    document.getElementById("pesoLiquido").value  = p.pesoLiquido;
  }
});

async function salvar() {
  const body = {
    codigo:      parseInt(document.getElementById("codigo").value) || 0,
    descricao:   document.getElementById("descricao").value.trim(),
    codigoBarras:document.getElementById("codigoBarras").value.trim(),
    valorVenda:  parseFloat(document.getElementById("valorVenda").value) || 0,
    pesoBruto:   parseFloat(document.getElementById("pesoBruto").value)  || 0,
    pesoLiquido: parseFloat(document.getElementById("pesoLiquido").value)|| 0
  };

  if (!body.descricao) { alert("Preencha a descrição."); return; }

  const url    = id ? `${API_URL}/Produto/${id}` : `${API_URL}/Produto`;
  const method = id ? "PUT" : "POST";

  const res = await fetch(url, { method, headers: headers(), body: JSON.stringify(body) });
  if (res.status === 401) { window.location.href = "login.html"; return; }
  if (!res.ok) { alert("Erro ao salvar produto."); return; }

  window.location.href = "produtos.html";
}

function voltar() { window.location.href = "produtos.html"; }