export function homeTpl(){
  return `
  <section class="card">
    <h2>Bem-vindo à ONG RAGRID</h2>
    <p class="small">Esta é uma aplicação SPA de exemplo para a entrega — navegue em Projetos e Cadastro.</p>
  </section>`;
}

export function projetosTpl(items=[]){
  if(!items.length) return `<section class="card empty"><p>Nenhum projeto cadastrado.</p></section>`;
  return `
  <section class="card">
    <h2>Projetos</h2>
    <ul class="list">
      ${items.map((it,i)=>`<li><strong>${escape(it.nome)}</strong> — ${escape(it.resumo || '')}</li>`).join('')}
    </ul>
  </section>`;
}

export function cadastroTpl(){
  return `
  <section class="card">
    <h2>Cadastro de Projeto / Voluntário</h2>
    <form id="formCadastro" novalidate>
      <div class="input"><label for="nome">Nome*</label><input id="nome" name="nome" required minlength="3"></div>
      <div class="input"><label for="email">Email*</label><input id="email" name="email" type="email" required></div>
      <div class="input"><label for="resumo">Resumo</label><textarea id="resumo" name="resumo" rows="4"></textarea></div>
      <div style="display:flex;gap:8px"><button class="btn" type="submit">Salvar</button><button class="btn secondary" type="button" id="limpar">Limpar</button></div>
    </form>
  </section>`;
}

// helper escape
function escape(s=''){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;') }
