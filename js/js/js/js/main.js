import { initRouter } from './router.js';
import { setYear } from './ui.js';

setYear();
initRouter();

// progressive enhancement: if no hash provided, set to home
if(!location.hash) location.hash = '#home';
