verificarLogin();

const params = new URLSearchParams(window.location.search);
const id     = params.get("id");
const modo   = params.get("modo") || "novo";

// ─── Máscara numérica ─────────────────────────────────────────────────────────
//
// Estratégia: cada campo mascarado mantém um estado próprio de "dígitos puros"
// (string só com números, sem formatação). Isso evita o bug de re-parsear o
// valor já formatado com separadores de milhar, que causava saltos ao digitar.
//
// Ao receber um evento "input":
//   1. Extrai apenas os dígitos do que foi digitado (tecla a tecla via inputType).
//   2. Acumula/remove no estado interno de dígitos.
//   3. Calcula o número real: dígitos / 10^casas.
//   4. Atualiza o campo visível (formatado pt-BR) e o hidden (ponto decimal).

function criarMascara(inputEl, hiddenEl, casas) {
  let digitos = ""; // estado interno: somente dígitos, sem formatação

  function atualizar() {
    const divisor = Math.pow(10, casas);
    const numero  = parseInt(digitos || "0", 10) / divisor;
    hiddenEl.value = numero.toFixed(casas);
    inputEl.value  = numero.toLocaleString("pt-BR", {
      minimumFractionDigits: casas,
      maximumFractionDigits: casas
    });
  }

  inputEl.addEventListener("keydown", function (e) {
    // Backspace: remove o último dígito do estado interno
    if (e.key === "Backspace") {
      e.preventDefault();
      digitos = digitos.slice(0, -1);
      atualizar();
      return;
    }
    // Delete: limpa tudo
    if (e.key === "Delete") {
      e.preventDefault();
      digitos = "";
      atualizar();
      return;
    }
    // Aceita apenas dígitos 0-9; bloqueia o resto (vírgulas, letras, etc.)
    if (!/^\d$/.test(e.key)) {
      // Permite teclas de navegação e atalhos (Ctrl+C, Tab…)
      if (!["Tab","ArrowLeft","ArrowRight","ArrowUp","ArrowDown",
            "Home","End"].includes(e.key) && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
      }
      return;
    }
    // Limita a 13 dígitos (evita overflow de decimal)
    if (digitos.length >= 13) { e.preventDefault(); return; }
    e.preventDefault();
    digitos += e.key;
    atualizar();
  });

  // Impede colar conteúdo não numérico e trata a colagem de números
  inputEl.addEventListener("paste", function (e) {
    e.preventDefault();
    const texto = (e.clipboardData || window.clipboardData).getData("text");
    const novosDigitos = texto.replace(/\D/g, "");
    digitos = (digitos + novosDigitos).slice(0, 13);
    atualizar();
  });

  // Sempre posiciona cursor no fim (campo se comporta como caixa registradora)
  inputEl.addEventListener("focus", function () {
    setTimeout(() => this.setSelectionRange(this.value.length, this.value.length), 0);
  });
  inputEl.addEventListener("click", function () {
    setTimeout(() => this.setSelectionRange(this.value.length, this.value.length), 0);
  });

  // Preenche o campo com um valor numérico vindo da API (edição/visualização)
  function preencher(valor) {
    const num = parseFloat(valor) || 0;
    // Reconstrói os dígitos puros a partir do valor (ex: 12.34 → "1234")
    digitos = Math.round(num * Math.pow(10, casas)).toString();
    atualizar();
  }

  return { preencher };
}

// ─── Inicialização ────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", async () => {
  const titulo    = document.getElementById("titulo-form");
  const btnSalvar = document.getElementById("btn-salvar");
  const campos    = ["codigo","descricao","codigoBarras","valorVenda","pesoBruto","pesoLiquido"];

  // Cria as máscaras e guarda referência para preencher depois
  const mascaraValor  = criarMascara(
    document.getElementById("valorVenda"),
    document.getElementById("valorVenda_raw"),
    2
  );
  const mascaraBruto  = criarMascara(
    document.getElementById("pesoBruto"),
    document.getElementById("pesoBruto_raw"),
    3
  );
  const mascaraLiquido = criarMascara(
    document.getElementById("pesoLiquido"),
    document.getElementById("pesoLiquido_raw"),
    3
  );

  if (modo === "visualizar") {
    titulo.textContent = "Visualizar Produto";
    btnSalvar.classList.add("hidden");
    campos.forEach(c => {
      const el = document.getElementById(c);
      if (el) el.disabled = true;
    });
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

    // Preenche os campos mascarados com os valores da API
    mascaraValor.preencher(p.valorVenda);
    mascaraBruto.preencher(p.pesoBruto);
    mascaraLiquido.preencher(p.pesoLiquido);
  }
});

// ─── Salvar ───────────────────────────────────────────────────────────────────

async function salvar() {
  const body = {
    codigo:       parseInt(document.getElementById("codigo").value) || 0,
    descricao:    document.getElementById("descricao").value.trim(),
    codigoBarras: document.getElementById("codigoBarras").value.trim(),
    // Os hidden sempre têm ponto como separador decimal — válido para JSON/C#
    valorVenda:   parseFloat(document.getElementById("valorVenda_raw").value)  || 0,
    pesoBruto:    parseFloat(document.getElementById("pesoBruto_raw").value)   || 0,
    pesoLiquido:  parseFloat(document.getElementById("pesoLiquido_raw").value) || 0
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