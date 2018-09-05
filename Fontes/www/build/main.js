webpackJsonp([0],{

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConferenceData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_data__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ConferenceData = (function () {
    function ConferenceData(http, user) {
        this.http = http;
        this.user = user;
    }
    ConferenceData.prototype.load = function () {
        if (this.data) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(this.data);
        }
        else {
            return this.http.get('assets/data/data.json')
                .map(this.processData, this);
        }
    };
    ConferenceData.prototype.processData = function (data) {
        var _this = this;
        // just some good 'ol JS fun with objects and arrays
        // build up the data by linking speakers to sessions
        this.data = data.json();
        this.data.tracks = [];
        // loop through each day in the schedule
        this.data.schedule.forEach(function (day) {
            // loop through each timeline group in the day
            day.groups.forEach(function (group) {
                // loop through each session in the timeline group
                group.sessions.forEach(function (session) {
                    session.speakers = [];
                    if (session.speakerNames) {
                        session.speakerNames.forEach(function (speakerName) {
                            var speaker = _this.data.speakers.find(function (s) { return s.name === speakerName; });
                            if (speaker) {
                                session.speakers.push(speaker);
                                speaker.sessions = speaker.sessions || [];
                                speaker.sessions.push(session);
                            }
                        });
                    }
                    if (session.tracks) {
                        session.tracks.forEach(function (track) {
                            if (_this.data.tracks.indexOf(track) < 0) {
                                _this.data.tracks.push(track);
                            }
                        });
                    }
                });
            });
        });
        return this.data;
    };
    ConferenceData.prototype.getTimeline = function (dayIndex, queryText, excludeTracks, segment) {
        var _this = this;
        if (queryText === void 0) { queryText = ''; }
        if (excludeTracks === void 0) { excludeTracks = []; }
        if (segment === void 0) { segment = 'all'; }
        return this.load().map(function (data) {
            var day = data.schedule[dayIndex];
            day.shownSessions = 0;
            queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
            var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
            day.groups.forEach(function (group) {
                group.hide = true;
                group.sessions.forEach(function (session) {
                    // check if this session should show or not
                    _this.filterSession(session, queryWords, excludeTracks, segment);
                    if (!session.hide) {
                        // if this session is not hidden then this group should show
                        group.hide = false;
                        day.shownSessions++;
                    }
                });
            });
            return day;
        });
    };
    ConferenceData.prototype.filterSession = function (session, queryWords, excludeTracks, segment) {
        var matchesQueryText = false;
        if (queryWords.length) {
            // of any query word is in the session name than it passes the query test
            queryWords.forEach(function (queryWord) {
                if (session.name.toLowerCase().indexOf(queryWord) > -1) {
                    matchesQueryText = true;
                }
            });
        }
        else {
            // if there are no query words then this session passes the query test
            matchesQueryText = true;
        }
        // if any of the sessions tracks are not in the
        // exclude tracks then this session passes the track test
        var matchesTracks = false;
        session.tracks.forEach(function (trackName) {
            if (excludeTracks.indexOf(trackName) === -1) {
                matchesTracks = true;
            }
        });
        // if the segement is 'favorites', but session is not a user favorite
        // then this session does not pass the segment test
        var matchesSegment = false;
        if (segment === 'favorites') {
            if (this.user.hasFavorite(session.name)) {
                matchesSegment = true;
            }
        }
        else {
            matchesSegment = true;
        }
        // all tests must be true if it should not be hidden
        session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
    };
    ConferenceData.prototype.getSpeakers = function () {
        return this.load().map(function (data) {
            return data.speakers.sort(function (a, b) {
                var aName = a.name.split(' ').pop();
                var bName = b.name.split(' ').pop();
                return aName.localeCompare(bName);
            });
        });
    };
    ConferenceData.prototype.getTracks = function () {
        return this.load().map(function (data) {
            return data.tracks.sort();
        });
    };
    ConferenceData.prototype.getMap = function () {
        return this.load().map(function (data) {
            return data.map;
        });
    };
    ConferenceData = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__user_data__["a" /* UserData */]])
    ], ConferenceData);
    return ConferenceData;
}());

//# sourceMappingURL=conference-data.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return palavraBraille; });
var palavraBraille = (function () {
    function palavraBraille() {
    }
    palavraBraille.exemplosImagem = [
        { palavra: 'abelha', imagem: './assets/img/palavras-braille/abelha.png', texto: '' },
        { palavra: 'bau', imagem: './assets/img/palavras-braille/bau.png', texto: '' },
        { palavra: 'cachorro', imagem: './assets/img/palavras-braille/cachorro.png', texto: '' },
        { palavra: 'dado', imagem: './assets/img/palavras-braille/dado.png', texto: '' },
        { palavra: 'elefante', imagem: './assets/img/palavras-braille/elefante.png', texto: '' },
        { palavra: 'folha', imagem: './assets/img/palavras-braille/folha.png', texto: '' },
        { palavra: 'gato', imagem: './assets/img/palavras-braille/gato.png', texto: '' },
        ////////// 
        { palavra: 'helicóptero', imagem: './assets/img/palavras-braille/helicoptero.png', texto: '' },
        { palavra: 'ilha', imagem: './assets/img/palavras-braille/ilha.png', texto: '' },
        { palavra: 'joaninha', imagem: './assets/img/palavras-braille/joaninha.png', texto: '' },
        { palavra: 'kiwi', imagem: './assets/img/palavras-braille/kiwi.png', texto: '' },
        { palavra: 'livro', imagem: './assets/img/palavras-braille/livro.png', texto: '' },
        { palavra: 'morango', imagem: './assets/img/palavras-braille/morango.png', texto: '' },
        { palavra: 'ninho', imagem: './assets/img/palavras-braille/ninho.png', texto: '' },
        ///////////////
        { palavra: 'olho', imagem: './assets/img/palavras-braille/olho.png', texto: '' },
        { palavra: 'pato', imagem: './assets/img/palavras-braille/pato.png', texto: '' },
        { palavra: 'queijo', imagem: './assets/img/palavras-braille/queijo.png', texto: '' },
        { palavra: 'rato', imagem: './assets/img/palavras-braille/rato.png', texto: '' },
        { palavra: 'sapo', imagem: './assets/img/palavras-braille/sapo.png', texto: '' },
        { palavra: 'tigre', imagem: './assets/img/palavras-braille/tigre.png', texto: '' },
        { palavra: 'uva', imagem: './assets/img/palavras-braille/uva.png', texto: '' },
        ////////////////////
        { palavra: 'vassoura', imagem: './assets/img/palavras-braille/vassoura.png', texto: '' },
        { palavra: 'xícara', imagem: './assets/img/palavras-braille/xicara.png', texto: '' },
        { palavra: 'youtube', imagem: './assets/img/palavras-braille/youtube.png', texto: '' },
        { palavra: 'zebra', imagem: './assets/img/palavras-braille/zebra.png', texto: '' },
        { palavra: 'maça', imagem: './assets/img/palavras-braille/maca.png', texto: '' },
        { palavra: 'jacaré', imagem: './assets/img/palavras-braille/jacare.png', texto: '' },
        { palavra: 'máscara', imagem: './assets/img/palavras-braille/mascara.png', texto: '' },
        /////////////////////////////////////
        { palavra: '', imagem: ' ', texto: 'Símbolo não utilizado na grafia braille para a língua portuguesa' },
        { palavra: 'baú', imagem: './assets/img/palavras-braille/bau.png', texto: '' },
        { palavra: 'triângulo', imagem: './assets/img/palavras-braille/triangulo.png', texto: '' },
        { palavra: 'gênio', imagem: './assets/img/palavras-braille/genio.png', texto: '' },
        { palavra: '', imagem: ' ', texto: 'Símbolo não utilizado na grafia braille para a língua portuguesa' },
        { palavra: 'ônibus', imagem: './assets/img/palavras-braille/onibus.png', texto: '' },
        { palavra: 'furb@ furb.com', imagem: './assets/img/sinais-braille/arroba-braille.png', texto: '' },
        { palavra: 'amanhã  vamos  à  praia.', imagem: './assets/img/palavras-braille/letra.png', texto: '' },
        { palavra: '', imagem: ' ', texto: 'Símbolo não utilizado na grafia braille para a língua portuguesa' },
        { palavra: '', imagem: ' ', texto: 'Símbolo não utilizado na grafia braille para a língua portuguesa' },
        { palavra: 'caminhões', imagem: './assets/img/palavras-braille/caminhoes.png', texto: '' },
        { palavra: 'Wallace', imagem: ' ', texto: 'Letra utilizada geralmente em substantivos próprios.' },
        { palavra: 'escola, trabalho e casa.', imagem: './assets/img/palavras-braille/virgula.png', texto: '' },
        { palavra: 'livros; caderno; canetas; lápis.', imagem: './assets/img/palavras-braille/pontovirgula.png', texto: '' },
        { palavra: 'brincar de: amarelinha e pega-pega.', imagem: './assets/img/palavras-braille/dois-pontos.png', texto: '' },
        { palavra: '2 ÷ 1', imagem: './assets/img/palavras-braille/divisao.png', texto: '' },
        { palavra: 'qual seu nome?', imagem: './assets/img/palavras-braille/interrogacao.png', texto: '' },
        { palavra: 'eu amo você!', imagem: './assets/img/palavras-braille/exclamacao.png', texto: '' },
        { palavra: '34 + 56', imagem: './assets/img/palavras-braille/adicao.png', texto: '' },
        { palavra: '78 = 78', imagem: './assets/img/palavras-braille/igual.png', texto: '' },
        { palavra: '9 × 10', imagem: './assets/img/palavras-braille/multiplicacao.png', texto: '' },
        { palavra: '"melhor do mundo"', imagem: './assets/img/palavras-braille/aspas.png', texto: '' },
        { palavra: '*exemplo', imagem: './assets/img/palavras-braille/asterisco.png', texto: '' },
        { palavra: 'hoje a máxima foi de 35º c.', imagem: './assets/img/palavras-braille/grau.png', texto: '' },
        { palavra: 'ímã', imagem: './assets/img/palavras-braille/ima.png', texto: '' },
        { palavra: 'avião', imagem: './assets/img/palavras-braille/aviao.png', texto: '' },
        { palavra: 'óculos', imagem: './assets/img/palavras-braille/oculos.png', texto: '' },
        { palavra: '1 2 3 4 5 6 7 8 9 10', imagem: './assets/img/palavras-braille/sinal-numerico.png', texto: '' },
        { palavra: 'hoje terminei de ler um livro.', imagem: './assets/img/palavras-braille/ponto-final.png', texto: '' },
        { palavra: 'minha verdura preferida é couve-flor.', imagem: './assets/img/palavras-braille/hifen.png', texto: '' },
        { palavra: ' ', imagem: ' ', texto: 'Este sinal só possui valor representativo na grafia braille para a língua portuguesa combinado com outro sinal. Ex: Pi' },
        { palavra: ' ', imagem: ' ', texto: 'Este sinal só possui valor representativo na grafia braille para a língua portuguesa combinado com outro sinal. Ex: Alfa' },
        { palavra: ' ', imagem: ' ', texto: 'Este sinal só possui valor representativo na grafia braille para a língua portuguesa combinado com outro sinal. Ex: 5%' },
        { palavra: 'google.com', imagem: ' ', texto: 'Este sinal não possui representação em tinta e é utilizado em questões específicas da grafia braille para a língua portuguesa. Deve ser escrito imediatamente antes e após endereços de sites e e-mails, sem espaços.' },
        { palavra: 'Braille', imagem: ' ', texto: '' },
        { palavra: 'R$ 10,00', imagem: './assets/img/palavras-braille/cifrao.png', texto: '' },
        { palavra: ' ', imagem: ' ', texto: 'Este sinal só possui valor representativo na grafia braille para a língua portuguesa combinado com outro sinal.' },
    ];
    palavraBraille.letrasSmall = [
        { letra: 'a', img: './assets/img/sinais-braille-small/a.png', imgMarcado: './assets/img/sinais-braille-small/a-d.png' },
        { letra: 'b', img: './assets/img/sinais-braille-small/b.png', imgMarcado: './assets/img/sinais-braille-small/b-d.png' },
        { letra: 'c', img: './assets/img/sinais-braille-small/c.png', imgMarcado: './assets/img/sinais-braille-small/c-d.png' },
        { letra: 'd', img: './assets/img/sinais-braille-small/d.png', imgMarcado: './assets/img/sinais-braille-small/d-d.png' },
        { letra: 'e', img: './assets/img/sinais-braille-small/e.png', imgMarcado: './assets/img/sinais-braille-small/e-d.png' },
        { letra: 'f', img: './assets/img/sinais-braille-small/f.png', imgMarcado: './assets/img/sinais-braille-small/f-d.png' },
        { letra: 'g', img: './assets/img/sinais-braille-small/g.png', imgMarcado: './assets/img/sinais-braille-small/g-d.png' },
        { letra: 'h', img: './assets/img/sinais-braille-small/h.png', imgMarcado: './assets/img/sinais-braille-small/h-d.png' },
        { letra: 'i', img: './assets/img/sinais-braille-small/i.png', imgMarcado: './assets/img/sinais-braille-small/i-d.png' },
        { letra: 'j', img: './assets/img/sinais-braille-small/j.png', imgMarcado: './assets/img/sinais-braille-small/j-d.png' },
        { letra: 'k', img: './assets/img/sinais-braille-small/k.png', imgMarcado: './assets/img/sinais-braille-small/k-d.png' },
        { letra: 'l', img: './assets/img/sinais-braille-small/l.png', imgMarcado: './assets/img/sinais-braille-small/l-d.png' },
        { letra: 'm', img: './assets/img/sinais-braille-small/m.png', imgMarcado: './assets/img/sinais-braille-small/m-d.png' },
        { letra: 'n', img: './assets/img/sinais-braille-small/n.png', imgMarcado: './assets/img/sinais-braille-small/n-d.png' },
        { letra: 'o', img: './assets/img/sinais-braille-small/o.png', imgMarcado: './assets/img/sinais-braille-small/o-d.png' },
        { letra: 'p', img: './assets/img/sinais-braille-small/p.png', imgMarcado: './assets/img/sinais-braille-small/p-d.png' },
        { letra: 'q', img: './assets/img/sinais-braille-small/q.png', imgMarcado: './assets/img/sinais-braille-small/q-d.png' },
        { letra: 'r', img: './assets/img/sinais-braille-small/r.png', imgMarcado: './assets/img/sinais-braille-small/r-d.png' },
        { letra: 's', img: './assets/img/sinais-braille-small/s.png', imgMarcado: './assets/img/sinais-braille-small/s-d.png' },
        { letra: 't', img: './assets/img/sinais-braille-small/t.png', imgMarcado: './assets/img/sinais-braille-small/t-d.png' },
        { letra: 'u', img: './assets/img/sinais-braille-small/u.png', imgMarcado: './assets/img/sinais-braille-small/u-d.png' },
        { letra: 'v', img: './assets/img/sinais-braille-small/v.png', imgMarcado: './assets/img/sinais-braille-small/v-d.png' },
        { letra: 'x', img: './assets/img/sinais-braille-small/x.png', imgMarcado: './assets/img/sinais-braille-small/x-d.png' },
        { letra: 'y', img: './assets/img/sinais-braille-small/y.png', imgMarcado: './assets/img/sinais-braille-small/y-d.png' },
        { letra: 'z', img: './assets/img/sinais-braille-small/z.png', imgMarcado: './assets/img/sinais-braille-small/z-d.png' },
        { letra: 'ç', img: './assets/img/sinais-braille-small/cedilha.png', imgMarcado: './assets/img/sinais-braille-small/cedilha-d.png' },
        { letra: 'é', img: './assets/img/sinais-braille-small/e-agudo.png', imgMarcado: './assets/img/sinais-braille-small/e-agudo-d.png' },
        { letra: 'á', img: './assets/img/sinais-braille-small/a-agudo.png', imgMarcado: './assets/img/sinais-braille-small/a-agudo-d.png' },
        { letra: 'è', img: ' ', imgMarcado: ' ' },
        { letra: 'ú', img: './assets/img/sinais-braille-small/u-agudo.png', imgMarcado: './assets/img/sinais-braille-small/u-agudo-d.png' },
        { letra: 'â', img: './assets/img/sinais-braille-small/a-circunflexo.png', imgMarcado: './assets/img/sinais-braille-small/a-circunflexo-d.png' },
        { letra: 'ê', img: './assets/img/sinais-braille-small/e-circunflexo.png', imgMarcado: './assets/img/sinais-braille-small/e-circunflexo-d.png' },
        { letra: ' ', img: ' ', imgMarcado: '' },
        { letra: 'ô', img: './assets/img/sinais-braille-small/o-circunflexo.png', imgMarcado: './assets/img/sinais-braille-small/o-circunflexo-d.png' },
        { letra: '@', img: './assets/img/sinais-braille-small/arroba.png', imgMarcado: './assets/img/sinais-braille-small/arroba-d.png' },
        { letra: 'à', img: './assets/img/sinais-braille-small/a-crase.png', imgMarcado: './assets/img/sinais-braille-small/a-crase-d.png' },
        { letra: 'ï', img: './assets/img/sinais-braille-small/i-trema.png', imgMarcado: './assets/img/sinais-braille-small/i-trema-d.png' },
        { letra: 'ü', img: './assets/img/sinais-braille-small/u-trema.png', imgMarcado: './assets/img/sinais-braille-small/u-trema-d.png' },
        { letra: 'õ', img: './assets/img/sinais-braille-small/o-til.png', imgMarcado: './assets/img/sinais-braille-small/o-til-d.png' },
        { letra: 'w', img: './assets/img/sinais-braille-small/w.png', imgMarcado: './assets/img/sinais-braille-small/w-d.png' },
        { letra: ',', img: './assets/img/sinais-braille-small/virgula.png', imgMarcado: './assets/img/sinais-braille-small/virgula-d.png' },
        { letra: ';', img: './assets/img/sinais-braille-small/ponto-e-virgula.png', imgMarcado: './assets/img/sinais-braille-small/ponto-e-virgula-d.png' },
        { letra: ':', img: './assets/img/sinais-braille-small/doispontos.png', imgMarcado: './assets/img/sinais-braille-small/doispontos-d.png' },
        { letra: '÷', img: './assets/img/sinais-braille-small/divisao.png', imgMarcado: './assets/img/sinais-braille-small/divisao-d.png' },
        { letra: '?', img: './assets/img/sinais-braille-small/interrogacao.png', imgMarcado: './assets/img/sinais-braille-small/interrogacao-d.png' },
        { letra: '!', img: './assets/img/sinais-braille-small/exclamacao_adicao.png', imgMarcado: './assets/img/sinais-braille-small/exclamacao_adicao-d.png' },
        { letra: '+', img: './assets/img/sinais-braille-small/exclamacao_adicao.png', imgMarcado: './assets/img/sinais-braille-small/exclamacao_adicao-d.png' },
        { letra: '=', img: './assets/img/sinais-braille-small/igual.png', imgMarcado: './assets/img/sinais-braille-small/igual-d.png' },
        { letra: '×', img: './assets/img/sinais-braille-small/multiplicacao_aspa.png', imgMarcado: './assets/img/sinais-braille-small/multiplicacao_aspa-d.png' },
        { letra: '"', img: './assets/img/sinais-braille-small/multiplicacao_aspa.png', imgMarcado: './assets/img/sinais-braille-small/multiplicacao_aspa-d.png' },
        { letra: '*', img: './assets/img/sinais-braille-small/asterisco.png', imgMarcado: './assets/img/sinais-braille-small/asterisco-d.png' },
        { letra: 'º', img: './assets/img/sinais-braille-small/grau.png', imgMarcado: './assets/img/sinais-braille-small/grau-d.png' },
        { letra: 'í', img: './assets/img/sinais-braille-small/i-agudo.png', imgMarcado: './assets/img/sinais-braille-small/i-agudo-d.png' },
        { letra: 'ã', img: './assets/img/sinais-braille-small/a-til.png', imgMarcado: './assets/img/sinais-braille-small/a-til-d.png' },
        { letra: 'ó', img: './assets/img/sinais-braille-small/o-agudo.png', imgMarcado: './assets/img/sinais-braille-small/o-agudo-d.png' },
        /*55*/ { letra: 'nº', img: './assets/img/sinais-braille-small/shift-n.png', imgMarcado: './assets/img/sinais-braille-small/shift-n.png' },
        { letra: '.', img: './assets/img/sinais-braille-small/ponto.png', imgMarcado: './assets/img/sinais-braille-small/ponto-d.png' },
        { letra: '-', img: './assets/img/sinais-braille-small/hifen.png', imgMarcado: './assets/img/sinais-braille-small/hifen-d.png' },
        { letra: 'SE4', img: './assets/img/sinais-braille-small/SE4.png', imgMarcado: './assets/img/sinais-braille-small/SE4-d.png' },
        { letra: 'SE45', img: './assets/img/sinais-braille-small/SE45.png', imgMarcado: './assets/img/sinais-braille-small/SE45-d.png' },
        { letra: 'SE456', img: './assets/img/sinais-braille-small/SE456.png', imgMarcado: './assets/img/sinais-braille-small/SE456-d.png' },
        { letra: 'SE5', img: './assets/img/sinais-braille-small/SE5-d.png', imgMarcado: './assets/img/sinais-braille-small/SE5-d.png' },
        { letra: 'maiúscula', img: '', imgMarcado: '' },
        { letra: '$', img: './assets/img/sinais-braille-small/cifrao.png', imgMarcado: './assets/img/sinais-braille-small/cifrao-d.png' },
        { letra: 'SE6', img: ' ', imgMarcado: '' },
        { letra: ' ', img: './assets/img/sinais-braille-small/espaco.png', imgMarcado: './assets/img/sinais-braille-small/espaco.png' },
        { letra: '1', img: './assets/img/sinais-braille-small/a.png', imgMarcado: './assets/img/sinais-braille-small/a-d.png' },
        { letra: '2', img: './assets/img/sinais-braille-small/b.png', imgMarcado: './assets/img/sinais-braille-small/b-d.png' },
        { letra: '3', img: './assets/img/sinais-braille-small/c.png', imgMarcado: './assets/img/sinais-braille-small/c-d.png' },
        { letra: '4', img: './assets/img/sinais-braille-small/d.png', imgMarcado: './assets/img/sinais-braille-small/d-d.png' },
        { letra: '5', img: './assets/img/sinais-braille-small/e.png', imgMarcado: './assets/img/sinais-braille-small/e-d.png' },
        { letra: '6', img: './assets/img/sinais-braille-small/f.png', imgMarcado: './assets/img/sinais-braille-small/f-d.png' },
        { letra: '7', img: './assets/img/sinais-braille-small/g.png', imgMarcado: './assets/img/sinais-braille-small/g-d.png' },
        { letra: '8', img: './assets/img/sinais-braille-small/h.png', imgMarcado: './assets/img/sinais-braille-small/h-d.png' },
        { letra: '9', img: './assets/img/sinais-braille-small/i.png', imgMarcado: './assets/img/sinais-braille-small/i-d.png' },
        { letra: '0', img: './assets/img/sinais-braille-small/j.png', imgMarcado: './assets/img/sinais-braille-small/j-d.png' },
    ];
    palavraBraille.brailleSimples = ['100000', '110000', '100100', '100110', '100010', '110100', '110110', '110010', '010100', '010110',
        '101000', '111000', '101100', '101110', '101010', '111100', '111110', '111010', '011100', '011110',
        '101001', '111001', '101101', '101111', '101011', '111101', '111111', '111011', '011101', '011111',
        '100001', '110001', '100111', '100011', '110101', '110111', '110011', '010101', '010111',
        '010000', '011000', '010010', '010011', '010001', '011010', '011011', '011001', '001010', '001011',
        '001100', '001110', '001101', '001111', '001000', '001001',
        '000111', '000011'];
    palavraBraille.correspondenteS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'x', 'y', 'z', 'ç', 'é', 'á', 'è', 'ú',
        'â', 'ê', 'ô', '@', 'à', 'ï', 'ü', 'õ', 'w',
        ',', ';', ':', '/', '?', '! (Exclamação) ou + (Adição)', '=', '" (aspas duplas) ou x (multiplicação)', '*', 'º',
        'í', 'ã', 'ó', 'número', '.', '-',
        '|', '$'];
    palavraBraille.brailleComposto = ['000101', '001111', '110001001000', '000001001110', '001001001001', '010101101010', '111011001000', '000001011111',
        '000010111000', '000111010000', '110101100011', '000010010011', '000111001011'];
    palavraBraille.correspontenteC = ['Maiúscula', 'Número', '(', ')', '_ (Travessão)', 'Círculo', '[', ']', '{', '}', 'Raiz quadrada', 'Traço de fração', '%'];
    palavraBraille.brailleNumero = ['100000', '110000', '100100', '100110', '100010', '110100', '110110', '110010', '010100', '010110'];
    palavraBraille.correspondenteN = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    return palavraBraille;
}());

//# sourceMappingURL=palavrasBraille.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutenticacaoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(366);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the AutenticacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AutenticacaoProvider = (function () {
    function AutenticacaoProvider(AngularFireAuth) {
        this.AngularFireAuth = AngularFireAuth;
        console.log('Hello AutenticacaoProvider Provider');
    }
    AutenticacaoProvider.prototype.criarUsuario = function (usuario) {
        return this.AngularFireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password);
    };
    AutenticacaoProvider.prototype.logar = function (usuario) {
        return this.AngularFireAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.password);
    };
    AutenticacaoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AutenticacaoProvider);
    return AutenticacaoProvider;
}());

//# sourceMappingURL=autenticacao.js.map

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 173;

/***/ }),

/***/ 219:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 219;

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = (function () {
    function AboutPage(popoverCtrl) {
        this.popoverCtrl = popoverCtrl;
        this.conferenceDate = '2047-05-17';
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\about\about.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Sobre</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="about-header">\n\n    <img src="assets/img/ica-slidebox-img-1.png" alt="ionic logo">\n\n  </div>\n\n  <div padding class="about-info" style="text-align:center;">\n\n    <h4><b>BRAILLE</b> App</h4>\n\n  \n\n    <p style="text-align: center;">\n\n      Aplicativo desenvolvido pelo grupo TecEDU da Universidade Regional de Blumenau (FURB).\n\n    </p>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* PopoverController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrincipalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_conference_data__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_data__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sinais_braille_sinais_braille__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__consulta_braille_consulta_braille__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pratica_braille_pratica_braille__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(359);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PrincipalPage = (function () {
    function PrincipalPage(alertCtrl, app, loadingCtrl, modalCtrl, navCtrl, toastCtrl, confData, user, menu, fire) {
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.confData = confData;
        this.user = user;
        this.menu = menu;
        this.fire = fire;
    }
    PrincipalPage.prototype.ionViewDidLoad = function () {
        this.app.setTitle('Principal');
        this.menu.enable(true, 'loggedOutMenu');
    };
    PrincipalPage.prototype.paginaSinais = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__sinais_braille_sinais_braille__["a" /* SinaisBraillePage */]);
    };
    PrincipalPage.prototype.paginaConsulta = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__consulta_braille_consulta_braille__["a" /* ConsultaBraillePage */]);
    };
    PrincipalPage.prototype.paginaPratica = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pratica_braille_pratica_braille__["a" /* PraticaBraillePage */]);
    };
    PrincipalPage.prototype.testeFire = function () {
        /* this.fire.list('teste/').valueChanges({
           nome: 'LEO',
           teste: 'ok'
         })
           .then(function () {
             console.log("Gravdo com sucesso!");
           })
           .catch(function (error) {
             console.error("Error ao gravar:", error);
           })*/
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('scheduleList', { read: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* List */] }),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* List */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* List */]) === "function" && _a || Object)
    ], PrincipalPage.prototype, "scheduleList", void 0);
    PrincipalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-schedule',template:/*ion-inline-start:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\Principal\Principal.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Braille app</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n  <div style="text-align: center;">\n\n    <br>\n\n    <div>\n\n      <h1>Tagarela:\n\n        <b>BRAILLE</b>\n\n      </h1>\n\n      <img src="./assets/img/ica-slidebox-img-1.png" style="height:20%;width:20%">\n\n    </div>\n\n    \n\n    <button (click)=\'paginaSinais()\' ion-button full>\n\n      Sinais\n\n    </button>\n\n    <button (click)=\'paginaConsulta()\' ion-button full>\n\n      Consulta\n\n    </button>\n\n    <button (click)=\'paginaPratica()\' ion-button full>\n\n      Prática\n\n    </button>\n\n    <button ion-button full>\n\n      Máquina Braille\n\n    </button>\n\n\n\n  <!--  <button (click)=\'testeFire()\' ion-button full>\n\n      TESTE FIREBASE\n\n    </button>-->\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\Principal\Principal.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ToastController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2__providers_conference_data__["a" /* ConferenceData */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_conference_data__["a" /* ConferenceData */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_3__providers_user_data__["a" /* UserData */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_user_data__["a" /* UserData */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _l || Object])
    ], PrincipalPage);
    return PrincipalPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
}());

//# sourceMappingURL=Principal.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SinaisBraillePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exemplo_braille_exemplo_braille__ = __webpack_require__(371);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SinaisBraillePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SinaisBraillePage = (function () {
    function SinaisBraillePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serieDeSinais = 0;
        this.series = [this.simbolo];
        this.serie(1);
    }
    SinaisBraillePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SinaisBraillePage');
    };
    SinaisBraillePage.prototype.showExemplo = function (simbolo) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__exemplo_braille_exemplo_braille__["a" /* ExemploBraillePage */], { letra: simbolo });
    };
    SinaisBraillePage.prototype.serie = function (serieAtual) {
        if (serieAtual == 1) {
            this.series = [
                { sinal: 'a', imagem: './assets/img/sinais-braille/a-braille.png' },
                { sinal: 'b', imagem: './assets/img/sinais-braille/b-braille.png' },
                { sinal: 'c', imagem: './assets/img/sinais-braille/c-braille.png' },
                { sinal: 'd', imagem: './assets/img/sinais-braille/d-braille.png' },
                { sinal: 'e', imagem: './assets/img/sinais-braille/e-braille.png' },
                { sinal: 'f', imagem: './assets/img/sinais-braille/f-braille.png' },
                { sinal: 'g', imagem: './assets/img/sinais-braille/g-braille.png' },
                { sinal: 'h', imagem: './assets/img/sinais-braille/h-braille.png' },
                { sinal: 'i', imagem: './assets/img/sinais-braille/i-braille.png' },
                { sinal: 'j', imagem: './assets/img/sinais-braille/j-braille.png' },
            ];
            this.serieDeSinais = serieAtual;
        }
        else if (serieAtual == 2) {
            this.series = [
                { sinal: 'k', imagem: './assets/img/sinais-braille/k-braille.png' },
                { sinal: 'l', imagem: './assets/img/sinais-braille/l-braille.png' },
                { sinal: 'm', imagem: './assets/img/sinais-braille/m-braille.png' },
                { sinal: 'n', imagem: './assets/img/sinais-braille/n-braille.png' },
                { sinal: 'o', imagem: './assets/img/sinais-braille/o-braille.png' },
                { sinal: 'p', imagem: './assets/img/sinais-braille/p-braille.png' },
                { sinal: 'q', imagem: './assets/img/sinais-braille/q-braille.png' },
                { sinal: 'r', imagem: './assets/img/sinais-braille/r-braille.png' },
                { sinal: 's', imagem: './assets/img/sinais-braille/s-braille.png' },
                { sinal: 't', imagem: './assets/img/sinais-braille/t-braille.png' }
            ];
            this.serieDeSinais = serieAtual;
        }
        else if (serieAtual == 3) {
            this.series = [
                { sinal: 'u', imagem: './assets/img/sinais-braille/u-braille.png' },
                { sinal: 'v', imagem: './assets/img/sinais-braille/v-braille.png' },
                { sinal: 'x', imagem: './assets/img/sinais-braille/x-braille.png' },
                { sinal: 'y', imagem: './assets/img/sinais-braille/y-braille.png' },
                { sinal: 'z', imagem: './assets/img/sinais-braille/z-braille.png' },
                { sinal: 'ç', imagem: './assets/img/sinais-braille/cedilha-braille.png' },
                { sinal: 'é', imagem: './assets/img/sinais-braille/e-agudo-braille.png' },
                { sinal: 'á', imagem: './assets/img/sinais-braille/a-agudo-braille.png' },
                { sinal: 'è', imagem: './assets/img/sinais-braille/e-crase-braille.png' },
                { sinal: 'ú', imagem: './assets/img/sinais-braille/u-agudo-braille.png' }
            ];
            this.serieDeSinais = serieAtual;
        }
        else if (serieAtual == 4) {
            this.series = [
                { sinal: 'â', imagem: './assets/img/sinais-braille/a-circunflexo-braille.png' },
                { sinal: 'ê', imagem: './assets/img/sinais-braille/e-circunflexo-braille.png' },
                { sinal: ' ', imagem: './assets/img/sinais-braille/SE146-braille.png' },
                { sinal: 'ô', imagem: './assets/img/sinais-braille/o-circunflexo-braille.png' },
                { sinal: '@', imagem: './assets/img/sinais-braille/arroba-braille.png' },
                { sinal: 'à', imagem: './assets/img/sinais-braille/a-crase-braille.png' },
                { sinal: 'ï', imagem: './assets/img/sinais-braille/i-trema-braille.png' },
                { sinal: 'ü', imagem: './assets/img/sinais-braille/u-trema-braille.png' },
                { sinal: 'õ', imagem: './assets/img/sinais-braille/o-til-braille.png' },
                { sinal: 'w', imagem: './assets/img/sinais-braille/w-braille.png' }
            ];
            this.serieDeSinais = serieAtual;
        }
        else if (serieAtual == 5) {
            this.series = [
                { sinal: ',', imagem: './assets/img/sinais-braille/virgula-braille.png' },
                { sinal: ';', imagem: './assets/img/sinais-braille/ponto-e-virgula-braille.png' },
                { sinal: ':', imagem: './assets/img/sinais-braille/dois-pontos-braille.png' },
                { sinal: '÷', imagem: './assets/img/sinais-braille/divisao-braille.png' },
                { sinal: '?', imagem: './assets/img/sinais-braille/interrogacao-braille.png' },
                { sinal: '!', imagem: './assets/img/sinais-braille/exclamacao-braille.png' },
                { sinal: '+', imagem: './assets/img/sinais-braille/adicao-braille.png' },
                { sinal: '=', imagem: './assets/img/sinais-braille/igual-braille.png' },
                { sinal: '×', imagem: './assets/img/sinais-braille/multiplicacao-braille.png' },
                { sinal: '"', imagem: './assets/img/sinais-braille/aspas-braille.png' },
                { sinal: '*', imagem: './assets/img/sinais-braille/asterisco-braille.png' },
                { sinal: 'º', imagem: './assets/img/sinais-braille/grau-braille.png' }
            ];
            this.serieDeSinais = serieAtual;
        }
        else if (serieAtual == 6) {
            this.series = [
                { sinal: 'í', imagem: './assets/img/sinais-braille/i-agudo-braille.png' },
                { sinal: 'ã', imagem: './assets/img/sinais-braille/a-til-braille.png' },
                { sinal: 'ó', imagem: './assets/img/sinais-braille/o-agudo-braille.png' },
                { sinal: 'nº', imagem: './assets/img/sinais-braille/sinal-numerico-braille.png' },
                { sinal: '.', imagem: './assets/img/sinais-braille/ponto-final-braille.png' },
                { sinal: '-', imagem: './assets/img/sinais-braille/hifen-braille.png' }
            ];
            this.serieDeSinais = serieAtual;
        }
        else if (serieAtual == 7) {
            this.series = [
                { sinal: 'SE4', imagem: './assets/img/sinais-braille/SE4-braille.png' },
                { sinal: 'SE45', imagem: './assets/img/sinais-braille/SE45-braille.png' },
                { sinal: 'SE456', imagem: './assets/img/sinais-braille/SE456-braille.png' },
                { sinal: 'SE5', imagem: './assets/img/sinais-braille/SE5-braille.png' },
                { sinal: 'maiúscula', imagem: './assets/img/sinais-braille/sinal-maiusculo-braille.png' },
                { sinal: '$', imagem: './assets/img/sinais-braille/cifrao-braille.png' },
                { sinal: 'SE6', imagem: './assets/img/sinais-braille/SE6-braille.png' }
            ];
            this.serieDeSinais = 7;
        }
    };
    SinaisBraillePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sinais-braille',template:/*ion-inline-start:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\sinais-braille\sinais-braille.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Sinais Braille</ion-title>\n  </ion-navbar> \n\n</ion-header>\n\n\n<ion-content padding> \n\n  <h1 style="text-align: center;">{{serieDeSinais}}º Série de sinais</h1>\n\n <div style="padding: 10px; margin: 20px auto; text-align: center;">\n    <div>\n      <button class="imagem-btn" (click)="showExemplo(simbolo.sinal)" *ngFor="let simbolo of series"><img src={{simbolo.imagem}}></button>\n    </div>\n  </div>\n <button ion-button style="float: left;" (click)="serie(serieDeSinais-1)">Anterior</button> \n <button ion-button style="float: right;" (click)="serie(serieDeSinais+1)">Próximo</button>\n</ion-content>\n'/*ion-inline-end:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\sinais-braille\sinais-braille.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], SinaisBraillePage);
    return SinaisBraillePage;
}());

//# sourceMappingURL=sinais-braille.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExemploBraillePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ExemploBraillePage = (function () {
    function ExemploBraillePage(navCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.simbolos = new Array();
        this.letra = navParams.get('letra');
        this.mostrarExemplo(__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].letrasSmall.findIndex(function (obj) { return obj.letra === _this.letra; }));
        this.simbolosBraille();
        ;
    }
    ExemploBraillePage.prototype.ionViewDidLoad = function () {
    };
    ExemploBraillePage.prototype.mostrarExemplo = function (posicao) {
        this.palavra = __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].exemplosImagem[posicao].palavra;
        this.imagem = __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].exemplosImagem[posicao].imagem;
        this.texto = __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].exemplosImagem[posicao].texto;
    };
    ExemploBraillePage.prototype.simbolosBraille = function () {
        var _this = this;
        var i;
        var qtdMai = 0;
        for (i = 0; i < this.palavra.length; i++) {
            //Se for numero então jogar o simbolo de numero antes...
            if (!isNaN(Number(this.palavra[i])) && (this.palavra[i] != ' ')) {
                if (i == 0) {
                    ///Se a letra for nº então mostrar destacada
                    if (this.letra == 'nº')
                        this.simbolos.push('./assets/img/sinais-braille-small/shift-n-d.png');
                    else
                        this.simbolos.push('./assets/img/sinais-braille-small/shift-n.png');
                }
                else {
                    if (this.palavra[i - 1] == ' ') {
                        ///Se a letra for nº então mostrar destacada
                        if (this.letra == 'nº')
                            this.simbolos.push('./assets/img/sinais-braille-small/shift-n-d.png');
                        else
                            this.simbolos.push('./assets/img/sinais-braille-small/shift-n.png');
                    }
                }
            }
            if (this.letra == 'SE4') {
                this.letra = 'Simbolo especial';
                this.simbolos.push('./assets/img/sinais-braille-small/SE4.png');
                this.simbolos.push('./assets/img/sinais-braille-small/p.png');
            }
            if (this.letra == 'SE45') {
                this.letra = 'Simbolo especial';
                this.simbolos.push('./assets/img/sinais-braille-small/SE45-d.png');
                this.simbolos.push('./assets/img/sinais-braille-small/a.png');
            }
            if (this.letra == 'SE5') {
                this.letra = 'Simbolo especial';
                this.simbolos.push('./assets/img/sinais-braille-small/SE5-d.png');
            }
            if (this.letra == 'SE6') {
                this.letra = 'Simbolo especial';
            }
            if (this.letra == 'SE456') {
                this.letra = 'Simbolo especial';
                this.simbolos.push('./assets/img/sinais-braille-small/shift-n.png');
                this.simbolos.push('./assets/img/sinais-braille-small/e.png');
                this.simbolos.push('./assets/img/sinais-braille-small/SE456-d.png');
                this.simbolos.push('./assets/img/sinais-braille-small/grau.png');
            }
            // if (this.imagem != ' ') {  
            if (this.isMaiuscula(this.palavra[i]) && qtdMai < 2) {
                if (this.letra == 'maiúscula')
                    this.simbolos.splice(0, 0, './assets/img/sinais-braille-small/shift-d.png');
                else
                    this.simbolos.splice(0, 0, './assets/img/sinais-braille-small/shift.png');
                qtdMai++;
            }
            if (this.letra.toLowerCase() == this.palavra[i].toLowerCase()) {
                console.log(this.palavra[i].toLowerCase());
                this.simbolos.push(__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].letrasSmall.find(function (obj) { return obj.letra === _this.palavra[i].toLowerCase(); }).imgMarcado);
            }
            else {
                this.simbolos.push(__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].letrasSmall.find(function (obj) { return obj.letra === _this.palavra[i].toLowerCase(); }).img);
                //   }
            }
        }
    };
    ExemploBraillePage.prototype.isMaiuscula = function (letra) {
        return (letra.charCodeAt(0) >= 65 && letra.charCodeAt(0) <= 90);
    };
    ExemploBraillePage.prototype.apenasMaiuscula = function (palavra) {
        var retorno = true;
        var i;
        for (i = 0; i < this.palavra.length; i++) {
            if (palavra.charCodeAt(i) >= 65 && palavra.charCodeAt(i) <= 90) {
                return false;
            }
        }
        return retorno;
    };
    ExemploBraillePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-exemplo-braille',template:/*ion-inline-start:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\exemplo-braille\exemplo-braille.html"*/'<!--\n  Generated template for the ExemploBraillePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title style="text-align: center;">Exemplo "{{letra}}"</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding> \n<div style="text-align: -webkit-center;"><h1 class="texto" >{{letra}}</h1></div>\n<div style="text-align: center;"><img style="max-width: 150; max-height: 150px"  src={{imagem}}></div>\n<div style="display: flex; align-items: flex-end; justify-content: center;  font-weight: 900"><h1 class="texto">{{texto}}</h1></div>\n<div style="display: flex; align-items: flex-end; justify-content: center;" ><h1 class="palavra">{{palavra}}</h1></div>\n<div style="text-align: center;"><img class="simboloBraille" *ngFor="let braille of simbolos" src={{braille}}></div>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\exemplo-braille\exemplo-braille.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], ExemploBraillePage);
    return ExemploBraillePage;
}());

//# sourceMappingURL=exemplo-braille.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConsultaBraillePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ConsultaBraillePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ConsultaBraillePage = (function () {
    function ConsultaBraillePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ConsultaBraillePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConsultaBraillePage');
    };
    ConsultaBraillePage.prototype.marcar = function (posicao) {
        if (document.getElementById(posicao).style.backgroundColor === "black") {
            document.getElementById(posicao).style.backgroundColor = "transparent";
        }
        else {
            document.getElementById(posicao).style.backgroundColor = "black";
        }
        var pAtualC1 = '';
        if (document.getElementById('c1p1').style.backgroundColor === "black") {
            pAtualC1 = pAtualC1 + '1';
        }
        else {
            pAtualC1 = pAtualC1 + '0';
        }
        if (document.getElementById('c1p2').style.backgroundColor === "black") {
            pAtualC1 = pAtualC1 + '1';
        }
        else {
            pAtualC1 = pAtualC1 + '0';
        }
        if (document.getElementById('c1p3').style.backgroundColor === "black") {
            pAtualC1 = pAtualC1 + '1';
        }
        else {
            pAtualC1 = pAtualC1 + '0';
        }
        if (document.getElementById('c1p4').style.backgroundColor === "black") {
            pAtualC1 = pAtualC1 + '1';
        }
        else {
            pAtualC1 = pAtualC1 + '0';
        }
        if (document.getElementById('c1p5').style.backgroundColor === "black") {
            pAtualC1 = pAtualC1 + '1';
        }
        else {
            pAtualC1 = pAtualC1 + '0';
        }
        if (document.getElementById('c1p6').style.backgroundColor === "black") {
            pAtualC1 = pAtualC1 + '1';
        }
        else {
            pAtualC1 = pAtualC1 + '0';
        }
        var pAtualC2 = '';
        if (document.getElementById('c2p1').style.backgroundColor === "black") {
            pAtualC2 = pAtualC2 + '1';
        }
        else {
            pAtualC2 = pAtualC2 + '0';
        }
        if (document.getElementById('c2p2').style.backgroundColor === "black") {
            pAtualC2 = pAtualC2 + '1';
        }
        else {
            pAtualC2 = pAtualC2 + '0';
        }
        if (document.getElementById('c2p3').style.backgroundColor === "black") {
            pAtualC2 = pAtualC2 + '1';
        }
        else {
            pAtualC2 = pAtualC2 + '0';
        }
        if (document.getElementById('c2p4').style.backgroundColor === "black") {
            pAtualC2 = pAtualC2 + '1';
        }
        else {
            pAtualC2 = pAtualC2 + '0';
        }
        if (document.getElementById('c2p5').style.backgroundColor === "black") {
            pAtualC2 = pAtualC2 + '1';
        }
        else {
            pAtualC2 = pAtualC2 + '0';
        }
        if (document.getElementById('c2p6').style.backgroundColor === "black") {
            pAtualC2 = pAtualC2 + '1';
        }
        else {
            pAtualC2 = pAtualC2 + '0';
        }
        this.txt2 = pAtualC1 + ' - ' + pAtualC2;
        // Identificando pontos braille.    
        if ((pAtualC1 === '000000') && (pAtualC2 === '000000')) {
            this.texto = 'Espaço';
        }
        else if (__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleComposto.indexOf(pAtualC1) >= 0) {
            if ((__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleSimples.indexOf(pAtualC2) < 0) && (pAtualC2 === '000000')) {
                this.texto = __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].correspontenteC[__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleComposto.indexOf(pAtualC1)];
            }
            else if (__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleSimples.indexOf(pAtualC2) >= 0) {
                // Tratamento dos sinais compostos.
                if (pAtualC1 === '000101') {
                    this.texto = __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].correspondenteS[__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleSimples.indexOf(pAtualC2)].toUpperCase();
                }
                else if (pAtualC1 === '001111') {
                    if (__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleNumero.indexOf(pAtualC2) >= 0) {
                        this.texto = __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].correspondenteN[__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleNumero.indexOf(pAtualC2)];
                    }
                    else {
                        this.texto = 'Sinal sem correspondência';
                    }
                }
                else {
                    this.texto = 'Sinal composto sem tratamento';
                }
            }
            else {
                this.texto = 'Sinal sem correspondência';
            }
        }
        else if (__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleComposto.indexOf(pAtualC1 + pAtualC2) >= 0) {
            this.texto = __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].correspontenteC[__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleComposto.indexOf(pAtualC1 + pAtualC2)];
        }
        else if (((__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleSimples.indexOf(pAtualC1) >= 0) && (__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleSimples.indexOf(pAtualC2) < 0) && (pAtualC2 === '000000')) ||
            ((__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleSimples.indexOf(pAtualC2) >= 0) && (__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleSimples.indexOf(pAtualC1) < 0) && (pAtualC1 === '000000'))) {
            if (__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleSimples.indexOf(pAtualC1) >= 0) {
                this.texto = __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].correspondenteS[__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleSimples.indexOf(pAtualC1)];
            }
            else {
                this.texto = __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].correspondenteS[__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleSimples.indexOf(pAtualC2)];
            }
        }
        else {
            this.texto = 'Sinal sem correspondência';
        }
    };
    ConsultaBraillePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-consulta-braille',template:/*ion-inline-start:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\consulta-braille\consulta-braille.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Consulta sinais braille</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div>\n    <div class="cell-braille">\n      <a id="c1p1" (click)="marcar(\'c1p1\')" class="btn-large point-braille"></a>\n      <a id="c1p4" (click)="marcar(\'c1p4\')" class="btn-large point-braille"></a>\n      <a id="c1p2" (click)="marcar(\'c1p2\')" class="btn-large point-braille"></a>\n      <a id="c1p5" (click)="marcar(\'c1p5\')" class="btn-large point-braille"></a>\n      <a id="c1p3" (click)="marcar(\'c1p3\')" class="btn-large point-braille"></a>\n      <a id="c1p6" (click)="marcar(\'c1p6\')" class="btn-large point-braille"></a>\n    </div>\n    <div class="cell-braille">\n      <a id="c2p1" (click)="marcar(\'c2p1\')" class="btn-large point-braille"></a>\n      <a id="c2p4" (click)="marcar(\'c2p4\')" class="btn-large point-braille"></a>\n      <a id="c2p2" (click)="marcar(\'c2p2\')" class="btn-large point-braille"></a>\n      <a id="c2p5" (click)="marcar(\'c2p5\')" class="btn-large point-braille"></a>\n      <a id="c2p3" (click)="marcar(\'c2p3\')" class="btn-large point-braille"></a>\n      <a id="c2p6" (click)="marcar(\'c2p6\')" class="btn-large point-braille"></a>\n    </div>\n  </div>\n  <div class="textoPalavra">\n    <h1 style="font-weight: bold; font-size: 40px;">{{texto}}</h1>\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\consulta-braille\consulta-braille.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], ConsultaBraillePage);
    return ConsultaBraillePage;
}());

//# sourceMappingURL=consulta-braille.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PraticaBraillePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilBraille_utilBraille__ = __webpack_require__(374);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PraticaBraillePage = (function () {
    function PraticaBraillePage(navCtrl, navParams, toastCtrl, util) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.util = util;
        this.simbolos = [];
        this.elegivel = [];
        this.letrasEsc = [];
        this.pAtualC1 = '000000';
    }
    PraticaBraillePage.prototype.ionViewDidLoad = function () {
        this.palavra = "";
        this.elegivel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 33, 38, 52, 53, 54];
        this.nivel = 1;
        this.sortearPalavra();
    };
    PraticaBraillePage.prototype.selecionarPalavra = function () {
        return Math.floor(Math.random() * this.elegivel.length);
    };
    PraticaBraillePage.prototype.sortearPalavra = function () {
        var num = this.selecionarPalavra();
        this.posi = this.elegivel[num];
        console.log(this.elegivel.splice(num, 1));
        console.log(this.elegivel);
        console.log(num);
        this.palavra = __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].exemplosImagem[this.posi].palavra;
        this.imagem = __WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].exemplosImagem[this.posi].imagem;
        this.letrasEsc = this.sortearletrasEsconder();
        this.montarSimbolos();
    };
    PraticaBraillePage.prototype.sortearletrasEsconder = function () {
        var sorteados = new Array();
        var arrayLetras = [];
        for (var j = 0; j < this.palavra.length; j++) {
            if (arrayLetras.indexOf(this.palavra[j]) == -1)
                arrayLetras.push(this.palavra[j]);
        }
        for (var i = 0; i < this.nivel; i++) {
            var numSort = Math.floor(Math.random() * arrayLetras.length);
            if (sorteados.indexOf(arrayLetras[numSort]) == -1)
                sorteados.push(arrayLetras[numSort]);
            else if (sorteados.length == arrayLetras.length)
                return sorteados;
            else
                i--;
        }
        return sorteados;
    };
    PraticaBraillePage.prototype.montarSimbolos = function () {
        var _this = this;
        this.simbolos.length = 0;
        var _loop_1 = function (i) {
            if (this_1.letrasEsc.indexOf(this_1.palavra[i]) == -1) {
                this_1.simbolos.push(__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].letrasSmall.find(function (obj) { return obj.letra === _this.palavra[i].toLowerCase(); }).img);
            }
            else {
                this_1.simbolos.push("./assets/img/sinais-braille-small/interrogacao-p.png");
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.palavra.length; i++) {
            _loop_1(i);
        }
    };
    PraticaBraillePage.prototype.marcar = function (posicao) {
        if (document.getElementById(posicao).style.backgroundColor === "black") {
            document.getElementById(posicao).style.backgroundColor = "transparent";
        }
        else {
            document.getElementById(posicao).style.backgroundColor = "black";
        }
        this.pAtualC1 = "";
        if (document.getElementById('c1p1').style.backgroundColor === "black") {
            this.pAtualC1 = this.pAtualC1 + '1';
        }
        else {
            this.pAtualC1 = this.pAtualC1 + '0';
        }
        if (document.getElementById('c1p2').style.backgroundColor === "black") {
            this.pAtualC1 = this.pAtualC1 + '1';
        }
        else {
            this.pAtualC1 = this.pAtualC1 + '0';
        }
        if (document.getElementById('c1p3').style.backgroundColor === "black") {
            this.pAtualC1 = this.pAtualC1 + '1';
        }
        else {
            this.pAtualC1 = this.pAtualC1 + '0';
        }
        if (document.getElementById('c1p4').style.backgroundColor === "black") {
            this.pAtualC1 = this.pAtualC1 + '1';
        }
        else {
            this.pAtualC1 = this.pAtualC1 + '0';
        }
        if (document.getElementById('c1p5').style.backgroundColor === "black") {
            this.pAtualC1 = this.pAtualC1 + '1';
        }
        else {
            this.pAtualC1 = this.pAtualC1 + '0';
        }
        if (document.getElementById('c1p6').style.backgroundColor === "black") {
            this.pAtualC1 = this.pAtualC1 + '1';
        }
        else {
            this.pAtualC1 = this.pAtualC1 + '0';
        }
    };
    PraticaBraillePage.prototype.limpaMarcacao = function () {
        document.getElementById('c1p1').style.backgroundColor = "transparent";
        document.getElementById('c1p2').style.backgroundColor = "transparent";
        document.getElementById('c1p3').style.backgroundColor = "transparent";
        document.getElementById('c1p4').style.backgroundColor = "transparent";
        document.getElementById('c1p5').style.backgroundColor = "transparent";
        document.getElementById('c1p6').style.backgroundColor = "transparent";
        this.pAtualC1 = "";
    };
    PraticaBraillePage.prototype.validar = function () {
        var posicaoLetra = this.letrasEsc.indexOf(__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].correspondenteS[(__WEBPACK_IMPORTED_MODULE_2__palavrasBraille__["a" /* palavraBraille */].brailleSimples.indexOf(this.pAtualC1))]);
        if (posicaoLetra >= 0) {
            this.letrasEsc.splice(posicaoLetra, 1);
            ////Só a ideia não sei se vai ficar assim!
            if (this.letrasEsc.length == 1) {
                this.util.LoadingMensagem('http://gifimage.net/wp-content/uploads/2018/04/positivo-gif.gif', '', 1000);
            }
            else if (this.letrasEsc.length == 2) {
                this.util.LoadingMensagem('https://img.ibxk.com.br/2013/8/materias/1501820617114822.gif', '', 1000);
            }
            else if (this.letrasEsc.length == 3) {
                this.util.LoadingMensagem('https://img.ibxk.com.br/2013/8/materias/1501820617114745.gif', '', 1000);
            }
            else {
                this.util.LoadingMensagem('https://img.ibxk.com.br/2013/8/materias/1501820617115234.gif', '', 1000);
            }
            this.montarSimbolos();
        }
        else {
            this.util.LoadingMensagem('https://media.tenor.com/images/0c73a1e663523b22f1b90a46c2eb514a/tenor.gif', 'Sinbolo errado tente novamente', 1000);
        }
        if (this.letrasEsc.length == 0) {
            if (this.nivel == 10) {
                this.nivel = 1;
            }
            else {
                this.nivel++;
            }
            this.sortearPalavra();
        }
        this.limpaMarcacao();
    };
    PraticaBraillePage.prototype.pular = function () {
        this.sortearPalavra();
        this.limpaMarcacao();
    };
    PraticaBraillePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-pratica-braille',template:/*ion-inline-start:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\pratica-braille\pratica-braille.html"*/'<!--\n  Generated template for the PraticaBraillePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Prática Braille</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div>\n    <div style="float: left; width: 45%;margin-left: 3%;height: 50%;">\n      <img src={{imagem}}>\n    </div>\n    <div class="cell-braille" style="height: 50%;">\n      <a id="c1p1" (click)="marcar(\'c1p1\')" class="btn-large point-braille"></a>\n      <a id="c1p4" (click)="marcar(\'c1p4\')" class="btn-large point-braille"></a>\n      <a id="c1p2" (click)="marcar(\'c1p2\')" class="btn-large point-braille"></a>\n      <a id="c1p5" (click)="marcar(\'c1p5\')" class="btn-large point-braille"></a>\n      <a id="c1p3" (click)="marcar(\'c1p3\')" class="btn-large point-braille"></a>\n      <a id="c1p6" (click)="marcar(\'c1p6\')" class="btn-large point-braille"></a>\n    </div>\n    <div style="display: -webkit-inline-box; width: 100%; justify-content: center; display: flex;">\n      <h1 style="text-align: center; font-size: 50px; font-family: \'Courier New\';">{{palavra}}</h1>\n    </div>\n    <div style="text-align: center;">\n      <img *ngFor="let imgBraille of simbolos" style="max-width: 30px;" src={{imgBraille}}>\n    </div>\n    <button (click)=\'validar()\' ion-button full>OK</button>\n    <button (click)=\'pular()\' ion-button full>Pular</button>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\pratica-braille\pratica-braille.html"*/,
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__utilBraille_utilBraille__["a" /* Utils */]
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__utilBraille_utilBraille__["a" /* Utils */]])
    ], PraticaBraillePage);
    return PraticaBraillePage;
}());

//# sourceMappingURL=pratica-braille.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Utils = (function () {
    function Utils(toastCtrl, loadingCtrl) {
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    Utils.prototype.showMensagem = function (message, pos, tempo) {
        if (pos === void 0) { pos = "button"; }
        if (tempo === void 0) { tempo = 3000; }
        var toast = this.toastCtrl.create({
            message: message,
            duration: tempo,
            position: pos
        });
        toast.present();
    };
    Utils.prototype.LoadingMensagem = function (imagem, texto, tempo) {
        if (imagem === void 0) { imagem = ''; }
        if (texto === void 0) { texto = 'Loading'; }
        if (tempo === void 0) { tempo = 3000; }
        var loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: "\n            <div class=\"custom-spinner-container\">\n              <img border=\"0\" src=\"" + imagem + "\"> \n              " + texto + "\n            </div>",
            duration: tempo
        });
        loading.present();
    };
    Utils = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* LoadingController */]])
    ], Utils);
    return Utils;
}());

//# sourceMappingURL=utilBraille.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_page_tabs_page__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TutorialPage = (function () {
    function TutorialPage(navCtrl, menu, storage) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.storage = storage;
        this.showSkip = true;
    }
    TutorialPage.prototype.startApp = function () {
        var _this = this;
        this.storage.get('hasLoggedIn').then(function (hasLoggedIn) {
            if (hasLoggedIn) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_page_tabs_page__["a" /* TabsPage */]).then(function () {
                    _this.storage.set('hasSeenTutorial', 'true');
                });
            }
            else {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                _this.storage.set('hasSeenTutorial', 'true');
            }
        });
    };
    TutorialPage.prototype.onSlideChangeStart = function (slider) {
        this.showSkip = !slider.isEnd();
    };
    TutorialPage.prototype.ionViewWillEnter = function () {
        this.slides.update();
    };
    TutorialPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    };
    TutorialPage.prototype.ionViewDidLeave = function () {
        // enable the root left menu when leaving the tutorial page
        //this.menu.enable(true);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('slides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Slides */])
    ], TutorialPage.prototype, "slides", void 0);
    TutorialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tutorial',template:/*ion-inline-start:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\tutorial\tutorial.html"*/'<ion-header no-border>\n\n  <ion-navbar>\n\n    <ion-buttons end *ngIf="showSkip">\n\n      <button ion-button (click)="startApp()" color="primary">Pular</button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content no-bounce>\n\n  <ion-slides #slides (ionSlideWillChange)="onSlideChangeStart($event)" pager>\n\n\n\n    <ion-slide>\n\n      <img src="assets/img/ica-slidebox-img-1.png" class="slide-image"/>\n\n      <h2 class="slide-title">\n\n        Bem-vindo ao <b>BRAILLE</b>\n\n      </h2>\n\n      <p>\n\n        <b>Toque ou deslize</b> para continuar.\n\n      </p>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img src="assets/img/ica-slidebox-img-2.png" class="slide-image"/>\n\n      <h2 class="slide-title" >Aprenda</h2>\n\n      <p><b>Construa</b> palavras e frases com o simulador de Máquina Braille.</p>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img src="assets/img/ica-slidebox-img-3.png" class="slide-image"/>\n\n      <h2 class="slide-title">Pratique</h2>\n\n      <p>Faça exercícios e meça o seu progresso.</p>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img src="assets/img/ica-slidebox-img-4.png" class="slide-image"/>\n\n      <h2 class="slide-title">Vamos começar?</h2>\n\n      <button ion-button icon-end large clear (click)="startApp()">\n\n        Continuar\n\n        <ion-icon name="arrow-forward"></ion-icon>\n\n      </button>\n\n    </ion-slide>\n\n\n\n  </ion-slides>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\tutorial\tutorial.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], TutorialPage);
    return TutorialPage;
}());

//# sourceMappingURL=tutorial.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CriarContaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_autenticacao_autenticacao__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_data__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_page_tabs_page__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CriarContaPage = (function () {
    function CriarContaPage(navCtrl, toastCtrl, authService, formBuilder, menuCtrl, userData) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.menuCtrl = menuCtrl;
        this.userData = userData;
        this.form = this.formBuilder.group({
            email: [null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].email]],
            password: [null, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)]]
        });
    }
    //Habilita e desabilita menu lateral, deixar comentado para não rpecisar criar usuario sempre
    CriarContaPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(false, 'loggedOutMenu');
    };
    CriarContaPage.prototype.ionViewWillLeave = function () {
        this.menuCtrl.enable(true, 'loggedOutMenu');
    };
    CriarContaPage.prototype.criarConta = function () {
        var _this = this;
        var usuario = this.form.value;
        if (this.form.valid) {
            var toast_1 = this.toastCtrl.create({ duration: 3000, position: 'buttom' });
            this.authService.criarUsuario(usuario)
                .then(function (usuario) {
                toast_1.setMessage('Usuário criado com sucesso.');
                toast_1.present();
                _this.userData.login(usuario.email);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_page_tabs_page__["a" /* TabsPage */]);
            })
                .catch(function (error) {
                if (error.code == 'auth/email-already-in-use') {
                    toast_1.setMessage('O e-mail digitado já está em uso.');
                }
                else if (error.code == 'auth/invalid-email') {
                    toast_1.setMessage('O e-mail digitado não é valido.');
                }
                else if (error.code == 'auth/operation-not-allowed') {
                    toast_1.setMessage('Não está habilitado criar usuários.');
                }
                else if (error.code == 'auth/weak-password') {
                    toast_1.setMessage('A senha digitada é muito fraca.');
                }
                else {
                    toast_1.setMessage(error.code);
                }
                toast_1.present();
            });
        }
    };
    CriarContaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-criar-conta',template:/*ion-inline-start:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\criar-conta\criar-conta.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Criar nova conta\n    </ion-title>\n  </ion-navbar>\n</ion-header> \n\n\n<ion-content padding>\n  <form [formGroup]="form" novalidate>\n    <ion-list>\n			 \n      <ion-item>\n        <ion-label stacked>E-mail</ion-label>\n        <ion-input type="text" name="email" formControlName="email" required></ion-input>\n			</ion-item>\n     \n\n      <ion-item>\n        <ion-label stacked>Senha</ion-label>\n        <ion-input type="password" name="password" formControlName="password" required></ion-input> 	\n			</ion-item> \n\n    </ion-list>\n\n    <button ion-button block color="primary" [disabled]="form.invalid" (click)="criarConta()">\n      Criar conta\n    </button>\n  </form>\n\n</ion-content>\n\n '/*ion-inline-end:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\criar-conta\criar-conta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_autenticacao_autenticacao__["a" /* AutenticacaoProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_data__["a" /* UserData */]])
    ], CriarContaPage);
    return CriarContaPage;
}());

//# sourceMappingURL=criar-conta.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(382);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_about_about__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_tabs_page_tabs_page__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_tutorial_tutorial__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_conference_data__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_user_data__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_login_login_module__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_autenticacao_autenticacao__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_criar_conta_criar_conta_module__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_sinais_braille_sinais_braille_module__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_exemplo_braille_exemplo_braille_module__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_consulta_braille_consulta_braille_module__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_pratica_braille_pratica_braille_module__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_login_login__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_Principal_Principal__ = __webpack_require__(369);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























var autenticacaoFirebase = {
    apiKey: "AIzaSyC_ZnM2X7xmXzONJMlpJhVaWg3mxFDGPs4",
    authDomain: "tagarela-braille.firebaseapp.com",
    databaseURL: "https://tagarela-braille.firebaseio.com",
    projectId: "tagarela-braille",
    storageBucket: "tagarela-braille.appspot.com",
    messagingSenderId: "1019835797721"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* ConferenceApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_Principal_Principal__["a" /* PrincipalPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_tabs_page_tabs_page__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_tutorial_tutorial__["a" /* TutorialPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* ConferenceApp */], {}, {
                    links: [
                        { component: __WEBPACK_IMPORTED_MODULE_12__pages_tabs_page_tabs_page__["a" /* TabsPage */], name: 'TabsPage', segment: 'tabs-page' },
                        { component: __WEBPACK_IMPORTED_MODULE_24__pages_Principal_Principal__["a" /* PrincipalPage */], name: 'Principal', segment: 'principal' },
                        { component: __WEBPACK_IMPORTED_MODULE_23__pages_login_login__["a" /* LoginPage */], name: 'Login', segment: 'LoginPage' },
                        { component: __WEBPACK_IMPORTED_MODULE_11__pages_about_about__["a" /* AboutPage */], name: 'AboutPage', segment: 'about' },
                        { component: __WEBPACK_IMPORTED_MODULE_13__pages_tutorial_tutorial__["a" /* TutorialPage */], name: 'Tutorial', segment: 'tutorial' }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */].initializeApp(autenticacaoFirebase),
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_16__pages_login_login_module__["a" /* LoginPageModule */],
                __WEBPACK_IMPORTED_MODULE_18__pages_criar_conta_criar_conta_module__["a" /* CriarContaPageModule */],
                __WEBPACK_IMPORTED_MODULE_19__pages_sinais_braille_sinais_braille_module__["a" /* SinaisBraillePageModule */],
                __WEBPACK_IMPORTED_MODULE_20__pages_exemplo_braille_exemplo_braille_module__["a" /* ExemploBraillePageModule */],
                __WEBPACK_IMPORTED_MODULE_21__pages_consulta_braille_consulta_braille_module__["a" /* ConsultaBraillePageModule */],
                __WEBPACK_IMPORTED_MODULE_22__pages_pratica_braille_pratica_braille_module__["a" /* PraticaBraillePageModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* ConferenceApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_Principal_Principal__["a" /* PrincipalPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_tabs_page_tabs_page__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_tutorial_tutorial__["a" /* TutorialPage */]
            ],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_14__providers_conference_data__["a" /* ConferenceData */],
                __WEBPACK_IMPORTED_MODULE_15__providers_user_data__["a" /* UserData */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_17__providers_autenticacao_autenticacao__["a" /* AutenticacaoProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserData = (function () {
    function UserData(events, storage) {
        this.events = events;
        this.storage = storage;
        this._favorites = [];
        this.HAS_LOGGED_IN = 'hasLoggedIn';
        this.HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
    }
    UserData.prototype.hasFavorite = function (sessionName) {
        return (this._favorites.indexOf(sessionName) > -1);
    };
    ;
    UserData.prototype.addFavorite = function (sessionName) {
        this._favorites.push(sessionName);
    };
    ;
    UserData.prototype.removeFavorite = function (sessionName) {
        var index = this._favorites.indexOf(sessionName);
        if (index > -1) {
            this._favorites.splice(index, 1);
        }
    };
    ;
    UserData.prototype.login = function (username) {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.setUsername(username);
        this.events.publish('user:login');
    };
    ;
    UserData.prototype.signup = function (username) {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.setUsername(username);
        this.events.publish('user:signup');
    };
    ;
    UserData.prototype.logout = function () {
        this.storage.remove(this.HAS_LOGGED_IN);
        this.storage.remove('username');
        this.events.publish('user:logout');
    };
    ;
    UserData.prototype.setUsername = function (username) {
        this.storage.set('username', username);
    };
    ;
    UserData.prototype.getUsername = function () {
        return this.storage.get('username').then(function (value) {
            return value;
        });
    };
    ;
    UserData.prototype.hasLoggedIn = function () {
        return this.storage.get(this.HAS_LOGGED_IN).then(function (value) {
            return value === true;
        });
    };
    ;
    UserData.prototype.checkHasSeenTutorial = function () {
        return this.storage.get(this.HAS_SEEN_TUTORIAL).then(function (value) {
            return value;
        });
    };
    ;
    UserData = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], UserData);
    return UserData;
}());

//# sourceMappingURL=user-data.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__about_about__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Principal_Principal__ = __webpack_require__(369);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage(navParams) {
        // set the root pages for each tab
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__Principal_Principal__["a" /* PrincipalPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__about_about__["a" /* AboutPage */];
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }
    TabsPage.prototype.mostrarInformacoes = function () {
        this.Util.LoadingMensagem('', 'Aplicativo desenvolvido pelo grupo TecEDU da Universidade Regional de Blumenau (FURB).', 1000);
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\tabs-page\tabs-page.html"*/'<ion-tabs [selectedIndex]="mySelectedIndex" name="conference">\n\n  <ion-tab [root]="tab1Root" tabTitle="Principal" tabIcon="home"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabTitle="Sobre" tabIcon="information-circle"></ion-tab>\n\n</ion-tabs>'/*ion-inline-end:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\tabs-page\tabs-page.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs-page.js.map

/***/ }),

/***/ 718:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConferenceApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_page_tabs_page__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tutorial_tutorial__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_conference_data__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_user_data__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(90);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ConferenceApp = (function () {
    function ConferenceApp(events, userData, menu, platform, confData, storage, splashScreen) {
        var _this = this;
        this.events = events;
        this.userData = userData;
        this.menu = menu;
        this.platform = platform;
        this.confData = confData;
        this.storage = storage;
        this.splashScreen = splashScreen;
        // List of pages that can be navigated to from the left menu
        // the left menu only works after login
        // the login page disables the left menu
        this.appPages = [
            { title: 'Principal', name: 'TabsPage', component: __WEBPACK_IMPORTED_MODULE_4__pages_tabs_page_tabs_page__["a" /* TabsPage */], tabComponent: __WEBPACK_IMPORTED_MODULE_4__pages_tabs_page_tabs_page__["a" /* TabsPage */], index: 0, icon: 'calendar' },
            { title: 'Sobre', name: 'TabsPage', component: __WEBPACK_IMPORTED_MODULE_4__pages_tabs_page_tabs_page__["a" /* TabsPage */], tabComponent: __WEBPACK_IMPORTED_MODULE_4__pages_tabs_page_tabs_page__["a" /* TabsPage */], index: 1, icon: 'information-circle' },
            { title: 'Sair', name: 'Login', component: __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */], logsOut: true, icon: 'log-in' },
        ];
        // Check if the user has already seen the tutorial
        this.storage.get('hasSeenTutorial')
            .then(function (hasSeenTutorial) {
            if (hasSeenTutorial) {
                _this.storage.get('hasLoggedIn').then(function (hasLoggedIn) {
                    if (hasLoggedIn) {
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_page_tabs_page__["a" /* TabsPage */];
                    }
                    else {
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
                    }
                });
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_tutorial_tutorial__["a" /* TutorialPage */];
            }
            _this.platformReady();
        });
        // load the conference data
        confData.load();
        // decide which menu items should be hidden by current login status stored in local storage
        this.userData.hasLoggedIn().then(function (hasLoggedIn) {
            _this.enableMenu(hasLoggedIn === true);
        });
        this.enableMenu(true);
        this.listenToLoginEvents();
    }
    ConferenceApp.prototype.openPage = function (page) {
        var params = {};
        // the nav component was found using @ViewChild(Nav)
        // setRoot on the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            params = { tabIndex: page.index };
        }
        // If we are already on tabs just change the selected tab
        // don't setRoot again, this maintains the history stack of the
        // tabs even if changing them from the menu
        if (this.nav.getActiveChildNavs().length && page.index != undefined) {
            this.nav.getActiveChildNavs()[0].select(page.index);
        }
        else {
            // Set the root of the nav with params if it's a tab index
            this.nav.setRoot(page.name, params).catch(function (err) {
                console.log("Didn't set nav root: " + err);
            });
        }
        if (page.logsOut === true) {
            // Give the menu time to close before changing to logged out
            this.userData.logout();
        }
    };
    ConferenceApp.prototype.openTutorial = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_tutorial_tutorial__["a" /* TutorialPage */]);
    };
    ConferenceApp.prototype.listenToLoginEvents = function () {
        var _this = this;
        this.events.subscribe('user:login', function () {
            _this.enableMenu(true);
        });
        this.events.subscribe('user:signup', function () {
            _this.enableMenu(true);
        });
        this.events.subscribe('user:logout', function () {
            _this.enableMenu(false);
        });
    };
    ConferenceApp.prototype.enableMenu = function (loggedIn) {
        this.menu.enable(loggedIn, 'loggedInMenu');
        this.menu.enable(!loggedIn, 'loggedOutMenu');
    };
    ConferenceApp.prototype.platformReady = function () {
        var _this = this;
        // Call any initial plugins when ready
        this.platform.ready().then(function () {
            _this.splashScreen.hide();
        });
    };
    ConferenceApp.prototype.isActive = function (page) {
        var childNav = this.nav.getActiveChildNavs()[0];
        // Tabs are a special case because they have their own navigation
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
                return 'primary';
            }
            return;
        }
        if (this.nav.getActive() && this.nav.getActive().name === page.name) {
            return 'primary';
        }
        return;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
    ], ConferenceApp.prototype, "nav", void 0);
    ConferenceApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\app\app.template.html"*/'<ion-split-pane>\n\n\n\n  <ion-menu id="loggedOutMenu" [content]="content">\n\n\n\n    <ion-header>\n\n      <ion-toolbar>\n\n        <ion-title>Menu</ion-title>\n\n      </ion-toolbar>\n\n    </ion-header>\n\n\n\n    <ion-content class="outer-content">\n\n\n\n      <ion-list>\n\n        <ion-list-header>\n\n          Navegue\n\n        </ion-list-header>\n\n        <button ion-item menuClose *ngFor="let p of appPages" (click)="openPage(p)">\n\n          <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n\n          {{p.title}}\n\n        </button>\n\n      </ion-list>\n\n\n\n      <ion-list>\n\n        <ion-list-header>\n\n          Tutorial\n\n        </ion-list-header>\n\n        <button ion-item menuClose (click)="openTutorial()">\n\n          <ion-icon item-start name="help-circle"></ion-icon>\n\n          Abrir Tutorial\n\n        </button>\n\n      </ion-list>\n\n    </ion-content>\n\n\n\n  </ion-menu>\n\n  <!-- main navigation -->\n\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false" main name="app"></ion-nav>\n\n\n\n</ion-split-pane>\n\n'/*ion-inline-end:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\app\app.template.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_7__providers_user_data__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_6__providers_conference_data__["a" /* ConferenceData */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], ConferenceApp);
    return ConferenceApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(90);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CriarContaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__criar_conta__ = __webpack_require__(376);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CriarContaPageModule = (function () {
    function CriarContaPageModule() {
    }
    CriarContaPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__criar_conta__["a" /* CriarContaPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__criar_conta__["a" /* CriarContaPage */]),
            ],
        })
    ], CriarContaPageModule);
    return CriarContaPageModule;
}());

//# sourceMappingURL=criar-conta.module.js.map

/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SinaisBraillePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sinais_braille__ = __webpack_require__(370);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SinaisBraillePageModule = (function () {
    function SinaisBraillePageModule() {
    }
    SinaisBraillePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__sinais_braille__["a" /* SinaisBraillePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__sinais_braille__["a" /* SinaisBraillePage */]),
            ],
        })
    ], SinaisBraillePageModule);
    return SinaisBraillePageModule;
}());

//# sourceMappingURL=sinais-braille.module.js.map

/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExemploBraillePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exemplo_braille__ = __webpack_require__(371);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ExemploBraillePageModule = (function () {
    function ExemploBraillePageModule() {
    }
    ExemploBraillePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__exemplo_braille__["a" /* ExemploBraillePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__exemplo_braille__["a" /* ExemploBraillePage */]),
            ],
        })
    ], ExemploBraillePageModule);
    return ExemploBraillePageModule;
}());

//# sourceMappingURL=exemplo-braille.module.js.map

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConsultaBraillePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__consulta_braille__ = __webpack_require__(372);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ConsultaBraillePageModule = (function () {
    function ConsultaBraillePageModule() {
    }
    ConsultaBraillePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__consulta_braille__["a" /* ConsultaBraillePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__consulta_braille__["a" /* ConsultaBraillePage */]),
            ],
        })
    ], ConsultaBraillePageModule);
    return ConsultaBraillePageModule;
}());

//# sourceMappingURL=consulta-braille.module.js.map

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PraticaBraillePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pratica_braille__ = __webpack_require__(373);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PraticaBraillePageModule = (function () {
    function PraticaBraillePageModule() {
    }
    PraticaBraillePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__pratica_braille__["a" /* PraticaBraillePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__pratica_braille__["a" /* PraticaBraillePage */]),
            ],
        })
    ], PraticaBraillePageModule);
    return PraticaBraillePageModule;
}());

//# sourceMappingURL=pratica-braille.module.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_data__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__criar_conta_criar_conta__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_autenticacao_autenticacao__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utilBraille_utilBraille__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tabs_page_tabs_page__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginPage = (function () {
    function LoginPage(navCtrl, userData, menu, formBuilder, authService, util) {
        this.navCtrl = navCtrl;
        this.userData = userData;
        this.menu = menu;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.util = util;
        this.form = this.formBuilder.group({
            email: [null, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].email]],
            password: [null, [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(6)]]
        });
    }
    //Habilita e desabilita menu lateral, deixar comentado para não rpecisar criar usuario sempre
    LoginPage.prototype.ionViewWillEnter = function () {
        this.menu.enable(false, 'loggedOutMenu');
    };
    LoginPage.prototype.onLogin = function () {
        var _this = this;
        if (this.form.valid) {
            this.usuario = this.form.value;
            this.authService.logar(this.usuario).then(function () {
                _this.userData.login(_this.usuario.email);
                _this.util.showMensagem('Login realizado com sucesso...', "button");
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__tabs_page_tabs_page__["a" /* TabsPage */]);
            }).catch(function (error) {
                if (error.code == "auth/invalid-email") {
                    _this.util.showMensagem("Email inválido");
                }
                else if (error.code == "auth/user-disabled") {
                    _this.util.showMensagem("Usuário desativado");
                }
                else if (error.code == "auth/user-not-found") {
                    _this.util.showMensagem("Email não cadastrado");
                }
                else if (error.code == "auth/wrong-password") {
                    _this.util.showMensagem("Senha inválida");
                }
                else {
                    _this.util.showMensagem("Erro ao fazer login");
                }
            });
        }
    };
    LoginPage.prototype.criarContaUsuario = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__criar_conta_criar_conta__["a" /* CriarContaPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user',template:/*ion-inline-start:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\login\login.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>Login</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<div class="logo">\n		<img src="assets/img/ica-slidebox-img-1.png" alt="Ionic logo">\n	</div>\n\n	<form [formGroup]="form" novalidate>\n		<ion-list>\n\n			<ion-item>\n				<ion-label stacked>E-mail</ion-label>\n				<ion-input type="text" name="email" formControlName="email" required></ion-input>\n			</ion-item>  \n\n\n			<ion-item>\n				<ion-label stacked>Senha</ion-label>\n				<ion-input type="password" name="password" formControlName="password" required></ion-input>\n			</ion-item>\n \n		</ion-list>\n\n		<ion-row responsive-sm>\n			<ion-col>\n				<button ion-button (click)="onLogin()" type="submit" block>Login</button>\n				<button (click)="criarContaUsuario()" ion-button block>Criar conta</button>\n			</ion-col>\n		</ion-row>\n	</form>\n\n</ion-content>'/*ion-inline-end:"C:\Users\leona\OneDrive\Documentos\GitHub\ionic\braille\fontes\src\pages\login\login.html"*/,
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__utilBraille_utilBraille__["a" /* Utils */]
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_data__["a" /* UserData */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__providers_autenticacao_autenticacao__["a" /* AutenticacaoProvider */],
            __WEBPACK_IMPORTED_MODULE_6__utilBraille_utilBraille__["a" /* Utils */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[377]);
//# sourceMappingURL=main.js.map