async function fazerLogin() {
  const login = document.getElementById("login").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const erro = document.getElementById("erro");

  if (!login || !senha) {
    erro.textContent = "Preencha usuário e senha.";
    erro.classList.remove("hidden");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, senha })
    });

    if (!res.ok) {
      erro.textContent = "Usuário ou senha inválidos.";
      erro.classList.remove("hidden");
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
  } catch (e) {
    erro.textContent = "Erro ao conectar com a API. Verifique se o servidor está rodando.";
    erro.classList.remove("hidden");
  }
}

// Permitir Enter no campo senha
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("senha")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") fazerLogin();
  });
});