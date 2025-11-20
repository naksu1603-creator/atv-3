import { storage } from './storage.js';
import { notify } from './ui.js';

function validateField(field){
  const v = field.value.trim();
  if(field.required && !v) return 'Campo obrigatório';
  if(field.minLength && v.length < field.minLength) return `Mínimo ${field.minLength} caracteres`;
  if(field.type==='email'){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!re.test(v)) return 'Email inválido';
  }
  return '';
}

export function attachForm(){
  const form = document.getElementById('formCadastro');
  if(!form) return;

  const inputs = Array.from(form.querySelectorAll('input,textarea'));
  inputs.forEach(inp=>{
    inp.addEventListener('input', ()=>{
      const err = validateField(inp);
      showError(inp, err);
    })
  });

  form.addEventListener('submit', e=>{
    e.preventDefault();
    let firstInvalid = null;
    const data = {};
    inputs.forEach(inp=>{
      const err = validateField(inp);
      showError(inp, err);
      if(err && !firstInvalid) firstInvalid = inp;
      data[inp.name] = inp.value.trim();
    });
    if(firstInvalid){ firstInvalid.focus(); notify('Corrija os campos marcados', 'error'); return; }
    // consistency check example: if resumo provided, must be >= 10 chars
    if(data.resumo && data.resumo.length>0 && data.resumo.length < 10){ notify('Resumo deve ter ao menos 10 caracteres', 'error'); return; }

    storage.save({nome:data.nome,email:data.email,resumo:data.resumo,created:Date.now()});
    notify('Cadastro salvo com sucesso');
    form.reset();
    // dispatch event so projects list can refresh
    window.dispatchEvent(new CustomEvent('storage:updated'));
  });

  const btLimpar = document.getElementById('limpar');
  if(btLimpar) btLimpar.addEventListener('click', ()=>form.reset());
}

function showError(el,msg){
  let err = el.parentElement.querySelector('.error');
  if(!err && msg){ err = document.createElement('div'); err.className='error'; el.parentElement.appendChild(err); }
  if(err) err.textContent = msg || '';
}
