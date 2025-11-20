import { mount } from './ui.js';
import { homeTpl, projetosTpl, cadastroTpl } from './templates.js';
import { attachForm } from './forms.js';
import { storage } from './storage.js';

const routes = {
  '': async ()=>mount('#app', homeTpl()),
  '#home': async ()=>mount('#app', homeTpl()),
  '#projetos': async ()=>{
    const items = storage.getAll();
    mount('#app', projetosTpl(items));
  },
  '#cadastro': async ()=>{
    mount('#app', cadastroTpl());
    attachForm();
  }
}

export function initRouter(){
  function resolve(){
    const hash = location.hash || '#home';
    const route = routes[hash] || routes['#home'];
    route();
  }
  window.addEventListener('hashchange', resolve);
  window.addEventListener('storage:updated', ()=>{ if(location.hash==='#projetos') routes['#projetos'](); });
  resolve();
}
