verificarLogin();

const params = new URLSearchParams(window.location.search);
const id     = params.get("id");
const modo   = params.get("modo") || "novo";

// Máscara CPF/CNPJ
document.addEventListener("DOMContentLoaded", async () => {
  const titulo    = document.getElementById("titulo-form");
  const btnSalvar = document.getElementById("btn-salvar");
  const campos    = ["codigo","nome","fantasia","documento","endereco"];

  if (modo === "visualizar") {
    titulo.textContent = "Visualizar Cliente";
    btnSalvar.classList.add("hidden");
    campos.forEach(c => { const el = document.getElementById(c); if(el) el.disabled = true; });
  } else if (modo === "editar") {
    titulo.textContent = "Editar Cliente";
  }

  // Aplica máscara CPF/CNPJ ao digitar
  const docInput = document.getElementById("documento");
  if (docInput) {
    docInput.addEventListener("input", () => {
      let v = docInput.value.replace(/\D/g, "");
      if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, "$1.$2")
             .replace(/(\d{3})(\d)/, "$1.$2")
             .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      } else {
        v = v.replace(/^(\d{2})(\d)/, "$1.$2")
             .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
             .replace(/\.(\d{3})(\d)/, ".$1/$2")
             .replace(/(\d{4})(\d)/, "$1-$2");
      }
      docInput.value = v;
    });
  }

  if (id) {
    const res = await fetch(`${API_URL}/Cliente/${id}`, { headers: headers() });
    if (res.status === 401) { window.location.href = "login.html"; return; }
    if (!res.ok) { alert("Cliente não encontrado."); voltar(); return; }
    const c = await res.json();
    document.getElementById("codigo").value    = c.codigo;
    document.getElementById("nome").value      = c.nome;
    document.getElementById("fantasia").value  = c.fantasia;
    document.getElementById("documento").value = c.documento;
    document.getElementById("endereco").value  = c.endereco;
  }
});

async function salvar() {
  const body = {
    codigo:   parseInt(document.getElementById("codigo").value) || 0,
    nome:     document.getElementById("nome").value.trim(),
    fantasia: document.getElementById("fantasia").value.trim(),
    documento:document.getElementById("documento").value.trim(),
    endereco: document.getElementById("endereco").value.trim()
  };

  if (!body.nome) { alert("Preencha o nome."); return; }

  const url    = id ? `${API_URL}/Cliente/${id}` : `${API_URL}/Cliente`;
  const method = id ? "PUT" : "POST";

  const res = await fetch(url, { method, headers: headers(), body: JSON.stringify(body) });
  if (res.status === 401) { window.location.href = "login.html"; return; }
  if (!res.ok) { alert("Erro ao salvar cliente."); return; }

  window.location.href = "clientes.html";
}

function voltar() { window.location.href = "clientes.html"; }