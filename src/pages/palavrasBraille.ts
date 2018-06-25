export class palavraBraille { 
  static exemplosImagem = [ 
      {palavra:'abelha', imagem:'../assets/img/palavras-braille/abelha.png'},
      {palavra:'bau', imagem:'../assets/img/palavras-braille/bau.png'},
      {palavra:'cachorro', imagem:'../assets/img/palavras-braille/cachorro.png'},
      {palavra:'dado', imagem:'../assets/img/palavras-braille/dado.png'},
      {palavra:'elefante', imagem:'../assets/img/palavras-braille/elefante.png'},
      {palavra:'folha', imagem:'../assets/img/palavras-braille/folha.png'},
      {palavra:'gato', imagem:'../assets/img/palavras-braille/gato.png'},
      {palavra:'helicóptero', imagem:'../assets/img/palavras-braille/helicoptero.png'},
      {palavra:'ilha', imagem:'../assets/img/palavras-braille/ilha.png'},
      {palavra:'joaninha', imagem:'../assets/img/palavras-braille/joaninha.png'},
      {palavra:'kiwi', imagem:'../assets/img/palavras-braille/kiwi.png'},
      {palavra:'livro', imagem:'../assets/img/palavras-braille/livro.png'},
      {palavra:'morango', imagem:'../assets/img/palavras-braille/morango.png'},
      {palavra:'ninho', imagem:'../assets/img/palavras-braille/ninho.png'},
      {palavra:'olho', imagem:'../assets/img/palavras-braille/olho.png'},
      {palavra:'pato', imagem:'../assets/img/palavras-braille/pato.png'},
      {palavra:'queijo', imagem:'../assets/img/palavras-braille/queijo.png'},
      {palavra:'rato', imagem:'../assets/img/palavras-braille/rato.png'},
      {palavra:'sapo', imagem:'../assets/img/palavras-braille/sapo.png'},
      {palavra:'tigre', imagem:'../assets/img/palavras-braille/tigre.png'},
      {palavra:'uva', imagem:'../assets/img/palavras-braille/uva.png'},
      {palavra:'vassoura', imagem:'../assets/img/palavras-braille/vassoura.png'},
      {palavra:'xícara', imagem:'../assets/img/palavras-braille/xicara.png'},
      {palavra:'youtube', imagem:'../assets/img/palavras-braille/youtube.png'},
      {palavra:'zebra', imagem:'../assets/img/palavras-braille/zebra.png'},
      {palavra:'maça', imagem:'../assets/img/palavras-braille/maca.png'},
      {palavra:'jacaré', imagem:'../assets/img/palavras-braille/jacare.png'},
      {palavra:'máscara', imagem:'../assets/img/palavras-braille/mascara.png'},
      {palavra:'Símbolo não utilizado na Grafia Braille para a Língua Portuguesa', imagem:' '},
      {palavra:'baú', imagem:'../assets/img/palavras-braille/bau.png'},
      {palavra:'triângulo', imagem:'../assets/img/palavras-braille/triangulo.png'},
      {palavra:'gênio', imagem:'../assets/img/palavras-braille/genio.png'},
      {palavra:'Símbolo não utilizado na Grafia Braille para a Língua Portuguesa', imagem:' '},
      {palavra:'ônibus', imagem:'../assets/img/palavras-braille/onibus.png'},
      {palavra:'braille@gmail.com', imagem:'../assets/img/sinais-braille/arroba-braille.png'},
      {palavra:'amanhã  vamos  à  praia.', imagem:'../assets/img/palavras-braille/letra.png'},
      {palavra:'Símbolo não utilizado na Grafia Braille para a Língua Portuguesa', imagem:' '},
      {palavra:'Símbolo não utilizado na Grafia Braille para a Língua Portuguesa', imagem:' '}, 
      {palavra:'caminhões', imagem:'../assets/img/palavras-braille/caminhoes.png'},
      {palavra:'Letra utilizada geralmente em substantivos próprios.', imagem:' '},
      {palavra:'escola, trabalho e casa.', imagem:'../assets/img/palavras-braille/virgula.png'},
      {palavra:'livros; caderno; canetas; lápis.', imagem:'../assets/img/palavras-braille/pontovirgula.png'},                      
      {palavra:'brincar de: amarelinha e pega-pega.', imagem:'../assets/img/palavras-braille/dois-pontos.png'},
      {palavra:'11 ÷ 1', imagem:'../assets/img/palavras-braille/divisao.png'},
      {palavra:'qual seu nome?', imagem:'../assets/img/palavras-braille/interrogacao.png'},
      {palavra:'eu amo você!', imagem:' '},//caso especial ! e +
      {palavra:'11 = 11', imagem:' '},
      {palavra:'**', imagem:' '},//usado pra representar o x
      {palavra:'*', imagem:' '},
      {palavra:'º', imagem:' '},
      {palavra:'ímã', imagem:'../assets/img/palavras-braille/ima.png'},
      {palavra:'avião', imagem:'../assets/img/palavras-braille/aviao.png'},
      {palavra:'óculos', imagem:'../assets/img/palavras-braille/oculos.png'},
      {palavra:'nº', imagem:' '},
      {palavra:'.', imagem:' '},
      {palavra:'-', imagem:' '},
      {palavra:'-', imagem:' '},
      {palavra:'-', imagem:' '},
      {palavra:'-', imagem:' '},
      {palavra:'pipe', imagem:' '},
      {palavra:'maiuscula', imagem:' '},
      {palavra:'$', imagem:' '},
      {palavra:'-', imagem:' '},
    ];
  static letrasSmall = [ 
      {letra:'a', img:'../assets/img/sinais-braille-small/a.png', imgMarcado:'../assets/img/sinais-braille-small/a-d.png'},
      {letra:'b', img:'../assets/img/sinais-braille-small/b.png', imgMarcado:'../assets/img/sinais-braille-small/b-d.png'},
      {letra:'c', img:'../assets/img/sinais-braille-small/c.png', imgMarcado:'../assets/img/sinais-braille-small/c-d.png'},
      {letra:'d', img:'../assets/img/sinais-braille-small/d.png', imgMarcado:'../assets/img/sinais-braille-small/d-d.png'},
      {letra:'e', img:'../assets/img/sinais-braille-small/e.png', imgMarcado:'../assets/img/sinais-braille-small/e-d.png'},
      {letra:'f', img:'../assets/img/sinais-braille-small/f.png', imgMarcado:'../assets/img/sinais-braille-small/f-d.png'},
      {letra:'g', img:'../assets/img/sinais-braille-small/g.png', imgMarcado:'../assets/img/sinais-braille-small/g-d.png'},
      {letra:'h', img:'../assets/img/sinais-braille-small/h.png', imgMarcado:'../assets/img/sinais-braille-small/h-d.png'},
      {letra:'i', img:'../assets/img/sinais-braille-small/i.png', imgMarcado:'../assets/img/sinais-braille-small/i-d.png'},
      {letra:'j', img:'../assets/img/sinais-braille-small/j.png', imgMarcado:'../assets/img/sinais-braille-small/j-d.png'},
      {letra:'k', img:'../assets/img/sinais-braille-small/k.png', imgMarcado:'../assets/img/sinais-braille-small/k-d.png'},
      {letra:'l', img:'../assets/img/sinais-braille-small/l.png', imgMarcado:'../assets/img/sinais-braille-small/l-d.png'},
      {letra:'m', img:'../assets/img/sinais-braille-small/m.png', imgMarcado:'../assets/img/sinais-braille-small/m-d.png'},
      {letra:'n', img:'../assets/img/sinais-braille-small/n.png', imgMarcado:'../assets/img/sinais-braille-small/n-d.png'},
      {letra:'o', img:'../assets/img/sinais-braille-small/o.png', imgMarcado:'../assets/img/sinais-braille-small/o-d.png'},
      {letra:'p', img:'../assets/img/sinais-braille-small/p.png', imgMarcado:'../assets/img/sinais-braille-small/p-d.png'},
      {letra:'q', img:'../assets/img/sinais-braille-small/q.png', imgMarcado:'../assets/img/sinais-braille-small/q-d.png'},
      {letra:'r', img:'../assets/img/sinais-braille-small/r.png', imgMarcado:'../assets/img/sinais-braille-small/r-d.png'},
      {letra:'s', img:'../assets/img/sinais-braille-small/s.png', imgMarcado:'../assets/img/sinais-braille-small/s-d.png'},
      {letra:'t', img:'../assets/img/sinais-braille-small/t.png', imgMarcado:'../assets/img/sinais-braille-small/t-d.png'},
      {letra:'u', img:'../assets/img/sinais-braille-small/u.png', imgMarcado:'../assets/img/sinais-braille-small/u-d.png'},
      {letra:'v', img:'../assets/img/sinais-braille-small/v.png', imgMarcado:'../assets/img/sinais-braille-small/v-d.png'},
      {letra:'x', img:'../assets/img/sinais-braille-small/x.png', imgMarcado:'../assets/img/sinais-braille-small/x-d.png'},
      {letra:'y', img:'../assets/img/sinais-braille-small/y.png', imgMarcado:'../assets/img/sinais-braille-small/y-d.png'},
      {letra:'z', img:'../assets/img/sinais-braille-small/z.png', imgMarcado:'../assets/img/sinais-braille-small/z-d.png'},
      {letra:'ç', img:'../assets/img/sinais-braille-small/cedilha.png', imgMarcado:'../assets/img/sinais-braille-small/cedilha-d.png'},
      {letra:'é', img:'../assets/img/sinais-braille-small/e-agudo.png', imgMarcado:'../assets/img/sinais-braille-small/e-agudo-d.png'},
      {letra:'á', img:'../assets/img/sinais-braille-small/a-agudo.png', imgMarcado:'../assets/img/sinais-braille-small/a-agudo-d.png'},
      {letra:'è', img:' ', imgMarcado:' '},
      {letra:'ú', img:'../assets/img/sinais-braille-small/u-agudo.png', imgMarcado:'../assets/img/sinais-braille-small/u-agudo-d.png'},
      {letra:'â', img:'../assets/img/sinais-braille-small/a-circunflexo.png', imgMarcado:'../assets/img/sinais-braille-small/a-circunflexo-d.png'},
      {letra:'ê', img:'../assets/img/sinais-braille-small/e-circunflexo.png', imgMarcado:'../assets/img/sinais-braille-small/e-circunflexo-d.png'},
      {letra:' ', img:' ', imgMarcado:''},
      {letra:'ô', img:'../assets/img/sinais-braille-small/o-circunflexo.png', imgMarcado:'../assets/img/sinais-braille-small/o-circunflexo-d.png'},
      {letra:'@', img:'../assets/img/sinais-braille-small/arroba.png', imgMarcado:'../assets/img/sinais-braille-small/arroba-d.png'},
      {letra:'à', img:'../assets/img/sinais-braille-small/a-crase.png', imgMarcado:'../assets/img/sinais-braille-small/a-crase-d.png'},
      {letra:'ï', img:'../assets/img/sinais-braille-small/i-trema.png', imgMarcado:'../assets/img/sinais-braille-small/i-trema-d.png'},
      {letra:'ü', img:'../assets/img/sinais-braille-small/u-trema.png', imgMarcado:'../assets/img/sinais-braille-small/u-trema-d.png'},
      {letra:'õ', img:'../assets/img/sinais-braille-small/o-til.png', imgMarcado:'../assets/img/sinais-braille-small/o-til-d.png'},
      {letra:'w', img:' ', imgMarcado:''},
      {letra:',', img:'../assets/img/sinais-braille-small/virgula.png', imgMarcado:'../assets/img/sinais-braille-small/virgula-d.png'},
      {letra:';', img:'../assets/img/sinais-braille-small/ponto-e-virgula.png', imgMarcado:'../assets/img/sinais-braille-small/ponto-e-virgula-d.png'},
      {letra:':', img:'../assets/img/sinais-braille-small/doispontos.png', imgMarcado:'../assets/img/sinais-braille-small/doispontos-d.png'},
      {letra:'÷', img:'../assets/img/sinais-braille-small/divisao.png', imgMarcado:'../assets/img/sinais-braille-small/divisao-d.png'},
      {letra:'?', img:'../assets/img/sinais-braille-small/interrogacao.png', imgMarcado:'../assets/img/sinais-braille-small/interrogacao-d.png'},
      {letra:'!', img:'../assets/img/sinais-braille-small/exclamacao.png', imgMarcado:'../assets/img/sinais-braille-small/exclamacao-d.png'},
      {letra:'=', img:'../assets/img/sinais-braille-small/igual.png', imgMarcado:'../assets/img/sinais-braille-small/igual-d.png'},
      {letra:'*', img:'../assets/img/sinais-braille-small/multiplicacao.png', imgMarcado:'../assets/img/sinais-braille-small/multiplicacao-d.png'},
      {letra:'*', img:'../assets/img/sinais-braille-small/asterisco.png', imgMarcado:'../assets/img/sinais-braille-small/asterisco-d.png'},
      {letra:'º', img:'../assets/img/sinais-braille-small/grau.png', imgMarcado:'../assets/img/sinais-braille-small/grau-d.png'},
      {letra:'í', img:'../assets/img/sinais-braille-small/i-agudo.png', imgMarcado:'../assets/img/sinais-braille-small/i-agudo-d.png'},
      {letra:'ã', img:'../assets/img/sinais-braille-small/a-til.png', imgMarcado:'../assets/img/sinais-braille-small/a-til-d.png'},
      {letra:'ó', img:'../assets/img/sinais-braille-small/o-agudo.png', imgMarcado:'../assets/img/sinais-braille-small/o-agudo-d.png'},
      {letra:'nº', img:'../assets/img/sinais-braille-small/shift-n.png', imgMarcado:'../assets/img/sinais-braille-small/shift-n.png'},
      {letra:'.', img:'../assets/img/sinais-braille-small/ponto.png', imgMarcado:'../assets/img/sinais-braille-small/ponto-d.png'},
      {letra:'-', img:'../assets/img/sinais-braille-small/hifen.png', imgMarcado:'../assets/img/sinais-braille-small/hifen-d.png'},
      {letra:'4', img:'../assets/img/sinais-braille-small/4.png', imgMarcado:'../assets/img/sinais-braille-small/4-d.png'},
      {letra:'45', img:'../assets/img/sinais-braille-small/45.png', imgMarcado:'../assets/img/sinais-braille-small/45-d.png'},
      {letra:'pipe', img:'../assets/img/sinais-braille-small/pipe-braille.png', imgMarcado:'../assets/img/sinais-braille-small/pipe-braille.png'},
      {letra:'5', img:'../assets/img/sinais-braille-small/5-d.png', imgMarcado:'../assets/img/sinais-braille-small/5-d.png'},
      {letra:'maiusculo', img:'../assets/img/sinais-braille-small/45.png', imgMarcado:'../assets/img/sinais-braille-small/45-d.png'},
      {letra:'$', img:'../assets/img/sinais-braille-small/45.png', imgMarcado:'../assets/img/sinais-braille-small/45-d.png'},
      {letra:'ultimo', img:' ', imgMarcado:' '},
      {letra:' ', img:'../assets/img/sinais-braille-small/espaco.png', imgMarcado:'../assets/img/sinais-braille-small/espaco.png'},//espaço
      {letra:'1',img:'../assets/img/sinais-braille-small/a.png', imgMarcado:'../assets/img/sinais-braille-small/a-d.png'}                        
  ]
  
}