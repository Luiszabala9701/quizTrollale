'use strict'

const pregunta_quiz = document.querySelector(".pregunta");
const btn = document.getElementById("btn");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const contador = document.getElementById("contador");
const record = document.getElementById("record");
const rAzul = document.querySelector(".r-azul");
const rRojo = document.querySelector(".r-rojo");

// audio 

const kingCrying1 = document.getElementById("king_crying_01")
const kingCrying2 = document.getElementById("king_crying_02")
const kingCrying3 = document.getElementById("king_crying_03")
const kingCrying4 = document.getElementById("king_crying_04")
const kingHappy1 = document.getElementById("king_happy_01")
const kingHappy2 = document.getElementById("king_happy_02")
const kingHappy3 = document.getElementById("king_happy_03")
const kingHappy4 = document.getElementById("king_happy_04")

const audioWin = n=>{
    if(n == 1){
        kingHappy1.play()
    }
    else if(n == 2){
        kingHappy2.play()
    }
    else if(n == 3){
        kingHappy3.play()
    }
    else if(n == 4){
        kingHappy4.play()
    }
    else if(n == 5){
        kingHappy1.play()
    }
    else if(n == 6){
        kingHappy2.play()
    }
    else if(n == 7){
        kingHappy3.play()
    }
    else if(n == 8){
        kingHappy4.play()
    }
    else if(n == 9){
        kingHappy1.play()
    }
    else{kingHappy2.play()}
}

const audioLose = n=>{
    if(n == 1){
        kingCrying1.play()
    }
    else if(n == 2){
        kingCrying2.play()
    }
    else if(n == 3){
        kingCrying3.play()
    }
    else if(n == 4){
        kingCrying4.play()
    }
    else if(n == 5){
        kingCrying1.play()
    }
    else if(n == 6){
        kingCrying2.play()
    }
    else if(n == 7){
        kingCrying3.play()
    }
    else if(n == 8){
        kingCrying4.play()
    }
    else if(n == 9){
        kingCrying1.play()
    }
    else{kingCrying2.play()}
}


let pregunta;
let posibles_respuestas=[];

let btns=[
    btn1,
    btn2,
    btn3,
    btn4
]

// funciones

const readText= ruta_local=>{
    let texto = null;
    let xmlhttp = new XMLHttpRequest()
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if(xmlhttp.status == 200){
        texto= xmlhttp.responseText;
    }
    return texto
}

const elegirPregunta= n=>{
    pregunta = interprete_db[n]
    pregunta_quiz.innerHTML = pregunta.pregunta;
    desordenarRespuestas(pregunta)
}

const elegirPreguntaRandom = ()=>{
    elegirPregunta(Math.floor(Math.random()*interprete_db.length))
}

const desordenarRespuestas = pregunta=>{
    posibles_respuestas = [
        pregunta.respuesta,
        pregunta.incorrecta1,
        pregunta.incorrecta2,
        pregunta.incorrecta3
    ]
    posibles_respuestas.sort(()=>Math.random()-0.5)
    btn1.innerHTML = posibles_respuestas[0];
    btn2.innerHTML = posibles_respuestas[1];
    btn3.innerHTML = posibles_respuestas[2];
    btn4.innerHTML  = posibles_respuestas[3];
}

function oprimirBtn(i){
    if(posibles_respuestas[i]==pregunta.respuesta){
        btns[i].style.color = "#0a0";
        contador.innerHTML++
        setTimeout(()=>{
            siguientePregunta()
        },1000)

        audioWin(Math.round(Math.random()*10))
    }
    else{
        btns[i].style.color = "#a00";
        rAzul.style.display="none";
        rRojo.style.display="block";
        btn.style.display="block"
        for(let boton of btns){
            boton.style.display="none"
        }
        pregunta_quiz.style.display="none";
        record.style.display="block";
        contador.style.color="#900"
        audioLose(Math.round(Math.random()*10))

    }

}

const siguientePregunta=()=>{
    elegirPreguntaRandom();
    for(let boton of btns){
        boton.style.color="#000"
    }
}

// Eventos

btn1.addEventListener("click", ()=>{oprimirBtn(0)});
btn2.addEventListener("click", ()=>{oprimirBtn(1)});
btn3.addEventListener("click", ()=>{oprimirBtn(2)});
btn4.addEventListener("click", ()=>{oprimirBtn(3)});

btn.addEventListener("click",e=>{
    e.preventDefault();
    btn.style.display="none";
    siguientePregunta();
    rRojo.style.display="none";
    rAzul.style.display="block";
    pregunta_quiz.style.display="block";
    for(let boton of btns){
        boton.style.display="block"
    }
    contador.innerHTML= 0;
    record.style.display="none";
    contador.style.color="#d16b05"
})

// variables

let base_preguntas = readText("js/base-preguntas.json");
let interprete_db= JSON.parse(base_preguntas);

elegirPreguntaRandom();
