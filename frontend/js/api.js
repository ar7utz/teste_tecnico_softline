const API_URL = "http://localhost:5270";

function getToken() {
  return localStorage.getItem("token");
}

function headers() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
  };
}

function verificarLogin() {
  if (!getToken()) {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

function carregarNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  navbar.innerHTML = `
    <nav class="bg-blue-700 text-white px-6 py-3 flex justify-between items-center shadow">
      <span class="font-bold text-lg">Softline</span>
      <div class="flex gap-4">
        <a href="produtos.html" class="hover:underline">Produtos</a>
        <a href="clientes.html" class="hover:underline">Clientes</a>
        <button onclick="logout()" class="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm">Sair</button>
      </div>
    </nav>
  `;
}