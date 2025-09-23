(function(){
  function mountOne(el){
    if(!el) return;
    if(el.dataset.islmReady === '1') return; // evitar duplicados
    const size = el.getAttribute('data-size') || '28';

    const wrapper = document.createElement('div');
    wrapper.className = 'islm-logo';
    wrapper.setAttribute('data-size', size);
    wrapper.setAttribute('aria-label','IslaMarket');

    const word = 'IslaMarket';
    for(let i=0;i<word.length;i++){
      const s = document.createElement('span');
      s.style.setProperty('--i', i);
      s.textContent = word[i];
      wrapper.appendChild(s);
    }

    // Si el contenedor es <a>, respetamos el href existente
    if(el.tagName && el.tagName.toLowerCase() === 'a'){
      try{ el.style.textDecoration='none'; }catch(e){}
      el.innerHTML = '';
      el.appendChild(wrapper);
    }else{
      // Si NO es <a>, lo envolvemos con uno a "/"
      el.innerHTML = '';
      const a = document.createElement('a');
      a.href = '/';
      a.setAttribute('aria-label','Inicio');
      a.style.textDecoration = 'none';
      a.appendChild(wrapper);
      el.appendChild(a);
    }
    el.dataset.islmReady = '1';
  }

  function init(){
    document.querySelectorAll('[data-islm-logo]').forEach(mountOne);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }

  // Por si el header se inyecta dinámicamente
  const obs = new MutationObserver(()=>init());
  obs.observe(document.documentElement, {childList:true, subtree:true});
})();