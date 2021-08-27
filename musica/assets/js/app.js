const btnReaccion =document.getElementById('reaccion');
const contenedorListaMusic=document.getElementById('lista-music');
const controles=document.getElementById('controles');

const menuMusic=document.getElementById('menuMusic');
const titlePlaylist=document.getElementById('titlePlaylist');
const playDescription=document.getElementById('playDescription');
const imgAlbum=document.getElementById('imgAlbum');
const album=document.getElementById('album');

//eventos
btnReaccion.addEventListener('click',likear);
menuMusic.addEventListener('click',cargarInfo);
contenedorListaMusic.addEventListener('click',reproducirMusica);
controles.addEventListener('click',controlar);
//funciones
function likear(){
    let estado=0
    if (estado ===0) {
        btnReaccion.classList.add('reaccion-activa')
        estado = 1;
    }else if (estado ===1){
     btnReaccion.classList.remove('reaccion-activa')
    }
}
function cargarInfo(e){
    let jsonurl='';
    let titlePlay ='';
    let descripcionPlay='';
    let srcimg = '';

    if(e.target.classList.contains('playEstudiar')){
        jsonurl ='assets/musicJson/estudiando.json';
       titlePlay ='Playlist para estudiar';
       descripcionPlay =' la mejor para estudiar';
       srcimg ='assets/img/estudiar.jpg';
       album.style.background=" linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/estudiar.jpg);"
    }else if (e.target.classList.contains('playRock')) {
        jsonurl ='assets/musicJson/rock.json';
       titlePlay ='Playlist para Rockear';
       descripcionPlay =' lo mejores del Rock';
       srcimg ='assets/img/rock.jpg';
       album.style.background=" linear-gradient(to right, rgba(2, 2, 2, 0.726) 15%, rgba(8, 8, 8, 0.829)), url(assets/img/rock.jpg);"
    }else if (e.target.classList.contains('playDeporte')) {
        jsonurl ='assets/musicJson/deporte.json';
       titlePlay ='Playlist para entrenar';
       descripcionPlay =' lo mejor musica para entrenar';
       srcimg ='assets/img/entrenando.jpg';
       album.style.background=" url(assets/img/entrenando2.jpg);"
    }
    titlePlaylist.innerHTML=titlePlay;
    playDescription.innerHTML=descripcionPlay;
    imgAlbum.src=srcimg;
   cargarMusica(jsonurl);
}
// console.log(music.artista);  .then(res => res.json())
function cargarMusica(url){
    fetch(url)
     .then(function(res) {
         return res.json();
     })
  .then(function(data) {
      let html= '';
       data.forEach(music => {
          html+=`
          <li class="music">
            <input type="text" value="${music.url}" style="display:none;">
            <a href="#"  id="${music.id}" class="btn play-music"><i class="far fa-play-circle"></i></a>
            <h3>${music.artista}</h3> 
            <h3 class="name" id="name">${music.nombre}</h3> 
            <h3 class="time">--</h3>
          </li> 
          ` 
          contenedorListaMusic.innerHTML=html;

       });   
  } );
}

function reproducirMusica(e) {
 if ( e.target.parentElement.classList.contains('play-music')) {
     let urlM=e.target.parentElement.previousElementSibling.value;
     controles.innerHTML=`<a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>
    <audio src="${urlM}" controls autoplay style="width:50vw; border-radius:80px;background:#FFE9D6;box-shadow: 5px 5px 10px #65D6CE;">
    <input type="text" value="${urlM}" style="display: none;"></audio>
    <a href="#" style="color:#111;" class="btn control siguiente"><i class="fas fa-forward" ></i></a>  
     `;
    e.target.parentElement.classList.add('reaccion-activa-reproducida');
    siguienteAutomatico();

 }

}

function controlar(e) {
    let audio =e.target.parentElement.parentElement.children[1].children[0];
    let audioUrl= audio.value;
    let musicArray=Array.from(contenedorListaMusic.children);
    
    if (e.target.parentElement.classList.contains('siguiente')) {
       musicArray.forEach(limusic => {
           if (limusic.children[0].value===audioUrl) {
            let siguienteMusica=limusic.nextElementSibling.children[0].value;
            let elementoParaReproducido=limusic.nextElementSibling.children[1];
           siguienteAtras(siguienteMusica,elementoParaReproducido)
           }
       });
    }
    if (e.target.parentElement.classList.contains('atras')) {
        musicArray.forEach(limusic => {
            if (limusic.children[0].value===audioUrl) {
             let musicaAtras=limusic.previousElementSibling.children[0]
             .value;
             let elementoParaReproducido=limusic.previousElementSibling.children[1];
             siguienteAtras(musicaAtras,elementoParaReproducido)

            }
        });
        
    }
 }

 function siguienteAtras(musica,reproducida) {
    controles.innerHTML=`<a href="#" class="btn control atras"><i class="fas fa-backward"></i></a>
    <audio src="${musica}" controls autoplay style="width:50vw; border-radius:80px;background:#FFE9D6;box-shadow: 5px 5px 10px #65D6CE;">
    <input type="text" value="${musica}" style="display: none;"></audio>
    <a href="#" style="color:#111;" class="btn control siguiente"><i class="fas fa-forward" ></i></a>  
     `;   
     reproducida.classList.add('reaccion-activa-reproducida');
     siguienteAutomatico();
 }

 function siguienteAutomatico() {
     let audioEtiqueta= controles.children[1];
    audioEtiqueta.addEventListener('ended',()=>{
        let audioUrl= audioEtiqueta.children[0].value;
        let musicArray=Array.from(contenedorListaMusic.children);

        musicArray.forEach(limusic => {
            if (limusic.children[0].value===audioUrl) {
             let siguienteMusica=limusic.nextElementSibling.children[0].value;
             let elementoParaReproducido=limusic.nextElementSibling.children[1];
            siguienteAtras(siguienteMusica,elementoParaReproducido)
            }
        });
    })

 }