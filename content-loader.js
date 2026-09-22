/* 관리자 화면에서 편집한 문구(content/*.json)를 불러와 화면에 반영합니다.
   파일을 불러오지 못하면 HTML·i18n.js 에 들어 있는 기본 문구가 그대로 쓰입니다. */
(function(){
  if (typeof I18N === 'undefined') return;
  var page = document.body.getAttribute('data-page') || 'index';
  function load(name){
    return fetch('content/' + name + '.json?v=' + Date.now())
      .then(function(r){ return r.ok ? r.json() : { items: [] }; })
      .catch(function(){ return { items: [] }; });
  }
  Promise.all([load('common'), load(page)]).then(function(parts){
    parts.forEach(function(d){
      (d.items || []).forEach(function(it){
        ['ko','hu','en'].forEach(function(l){
          if (it[l] !== undefined && it[l] !== null && String(it[l]).trim() !== '') I18N[l][it.key] = it[l];
        });
      });
    });
    var cur = document.documentElement.lang;
    if (!I18N[cur]) cur = 'ko';
    if (typeof setLang === 'function') setLang(cur);
  });
})();
