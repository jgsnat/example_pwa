var identificador = 'behappy.sw';
var versao = 1;
var idAtual = identificador + '-' + versao;
var idAnterior = identificador + '-' + (versao - 1);

var urls = [
    '/',
    'bundle.js',
    'style.css',
    'img/avatars.png',
    'img/botoes.png',
    'img/favicon.ico',
    'img/logo.png'
];

function instalarServiceWorker() {
    console.log('ServiceWorker instalado com sucesso!');
}

function ativarServiceWorker() {
    caches.open(idAtual)
        .then(cache => {
            console.log('Cache Storage ' + idAtual + ' foi ativado com sucesso!');

            cache.addAll(urls)
                .then(function() {
                    cache.delete(idAnterior)
                    console.log('Cache Storage ' + idAnterior + ' foi excluído!');
                })
        })
}

function buscarArquivos(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(arquivoCache) {
                return arquivoCache ? arquivoCache : fetch(event.request);
            })
    )
}

self.addEventListener('install', instalarServiceWorker);
self.addEventListener('activate', ativarServiceWorker);
self.addEventListener('fetch', buscarArquivos);