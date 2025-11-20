export function setYear(){document.getElementById('year').textContent=new Date().getFullYear()}
export function mount(selector, html){
  const el = document.querySelector(selector);
  if(!el) return;
  el.innerHTML = html;
}

export function notify(message, type='info'){
  const div = document.createElement('div');
  div.className = 'card';
  div.style.borderLeft = type==='error' ? '4px solid #c53030' : '4px solid #38a169';
  div.textContent = message;
  document.body.insertBefore(div, document.body.firstChild);
  setTimeout(()=>div.remove(), 3000);
}
