// Wrapper simples para localStorage
export const storage = {
  key: 'ong:runs',
  save(item){
    const arr = this.getAll();
    arr.push(item);
    localStorage.setItem(this.key, JSON.stringify(arr));
  },
  getAll(){
    try{
      const raw = localStorage.getItem(this.key);
      return raw? JSON.parse(raw) : [];
    }catch(e){return []}
  },
  clear(){ localStorage.removeItem(this.key) }
}
