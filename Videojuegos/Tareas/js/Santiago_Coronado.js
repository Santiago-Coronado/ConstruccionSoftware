// Primer Ejercicio de Java (Funciones)
// Santiago Coronado A01785558
//2025-02-12

"use strict";

// Devuelve la primera letra que no se repite en una oracion
function firstNonRepeating(oracion) {
    let contador=[];
    for(let i=0; i<oracion.length; i++){
        let letra= oracion[i];
        if(contador[letra]){
            contador[letra]++;
        }else{
            contador[letra]= 1;
        }
    }
    for(let i= 0; i<oracion.length; i++) {
        let letra= oracion[i];
        if(contador[letra]== 1) {
            return letra;
        }
    }
    
    return null;
}

// ordena un arreglo
function bubbleSort(arreglo,tamaño){
    let temp;                                          
    for (let i = 0; i < tamaño - 1; i++) {              
        for (let j = 0; j < tamaño - i - 1; j++) {      
            if (arreglo[j] > arreglo[j + 1]) {                  
                temp = arreglo[j];                         
                arreglo[j] = arreglo[j + 1];                      
                arreglo[j + 1] = temp;                     
            }
        }                 
    }
    return arreglo;
}


// invierte un arreglo creando otro
function invertArray(arreglo){
    let resultado = [];
    for(let i = arreglo.length-1; i>=0; i--){
        resultado.push(arreglo[i]);
    }
    return resultado;
}


// invierte un arreglo sin crear otro
function invertArrayInplace(arreglo) {
    let temp;
    for (let i = 0, j = arreglo.length - 1; i < j; i++, j--) {
        temp = arreglo[i];
        arreglo[i] = arreglo[j];
        arreglo[j] = temp;
    }
} 

// hace que la primera letra de cada palabra se ponga en mayuscula 
function capitalize(palabra){
    let palabraseparada = palabra.split(" ");
    for (let i = 0; i<palabraseparada.length;i++){
        palabraseparada[i] = palabraseparada[i][0].toUpperCase() + palabraseparada[i].slice(1);
    }
    let resultado = palabraseparada.join(" ");
    return resultado;
}

// saca el maximo comun divisor de dos numeros
function mcd(primero,segundo){
    let divisor1 = [];
    let divisor2 = [];
    for(let i= 1; i<primero; i++){
        if (primero%i ==0){
            divisor1.push(i);
        }
    }
    for(let j= 1; j<segundo; j++){
        if (segundo%j == 0){
            divisor2.push(j);
        }
    }

    let resultado = [];
    for(let x of divisor1){
        for (let y of divisor2){
            if (x == y){
                resultado.push(x);
                break;
            }
        }
    }
    return resultado[resultado.length-1];
}

// cambia un string a hackerspeak
function hackerSpeak(string){
    let resultado = "";
    let letras = ["a","e","i","o","s"];
    let cambios = ["4","3","1","0","5"];
    for (let i of string){
       let cambiado = false;
       for (let j = 0; j < letras.length; j++) {
            if (i == letras[j]) {
                resultado += cambios[j]; 
                cambiado = true;
                break; 
            }
        }
        if (!cambiado) {
            resultado += i; 
        }
    }
    return resultado;
}

// da los factores de un numero
function factorize(numero){
    let resultado = [];
    for (let i = 1; i<= numero+1; i++){
        if (numero%i == 0){
            resultado.push(i);
        }
        else{
            continue;
        }
    }
    return resultado;
}

//quita duplicados de un arreglo usando sets (que son arreglos que permiten solo elementos unicos)
function deduplicate(arreglo){
    let resultado = new Set;
    for (let x of arreglo){
        resultado.add(x)
    }
    return resultado;
}

/*
// quita duplicados sin usar sets
function deduplicate(arreglo) {
    let resultado = [];
    for (let i = 0; i < arreglo.length; i++) {
        let duplicado = false;
        for (let j = 0; j < resultado.length; j++) {
            if (arreglo[i] === resultado[j]) {
                duplicado = true; 
                break; 
            }
        }
        if (!duplicado) {
            resultado.push(arreglo[i]); 
        }
    }
    return resultado;
}
*/

// da la longitud del texto mas corto
function shortestString(listadestrings){
    let tamañoprimerstring = listadestrings[0].length;

    for(let x of listadestrings){
        if (x.length < tamañoprimerstring){
            tamañoprimerstring = x.length;
        }
    }
    return tamañoprimerstring;
}

// dice si la palabra es palindromo o no
function isPalindrome(palabra){
    let normal = 0;
    let inverso = palabra.length-1;
    while (normal < inverso){
        if (palabra[normal] != palabra[inverso]){
            return false;
        }
        normal++;
        inverso--;
    }
    return true;
}

// Ordena textos en orden alfabetico basado en la primera letra
function sortStrings(listadestrings) {
    let n = listadestrings.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (listadestrings[j] > listadestrings[j + 1]) {
                let temp = listadestrings[j];
                listadestrings[j] = listadestrings[j + 1];
                listadestrings[j + 1] = temp;
            }
        }
    }
    return listadestrings;
}

// te da la mediana y la moda de un arreglo de numeros
function stats(numeros){
    let mediana;
    let moda;
    let frec = {};
    let contador = 0;
    let resultado = [];

    let ordenado = bubbleSort(numeros);
    if (ordenado.length%2 == 0){
        mediana = (ordenado[(ordenado.length/2)-1] + ordenado[((ordenado.length)/2)])/2;
    }
    else {
        mediana = ordenado[(ordenado.length-1)/2];
    }

    for (let i = 0; i< numeros.length; i++){
        if (frec[numeros[i]]){
            frec[numeros[i]]++
        }
        else {
            frec[numeros[i]] = 1;
        }
        if (frec[numeros[i]] > contador){
            contador = frec[numeros[i]];
            moda = numeros[i];
        }
    }
    resultado.push(mediana);
    resultado.push(moda);
    return resultado;
}

// regresa el string que mas se repita
function popularString(listadetextos){
    let frecuencia = {};
    let contador = 0;
    let popular;
    for (let i = 0; i< listadetextos.length; i++){
        if (frecuencia[listadetextos[i]]){
            frecuencia[listadetextos[i]]++;
        }
        else {
            frecuencia[listadetextos[i]] = 1;
        }
        if (frecuencia[listadetextos[i]] > contador){
            contador = frecuencia[listadetextos[i]];
            popular = listadetextos[i];
        }
    }
    return popular;
}

// checa si el numero es una potencia de 2 o no
function isPowerOf2(numero){
    if (numero < 1){
        return false;
    }
    let contador = 0;
    let resultado = 1;

    while (resultado <= numero){
        if (resultado == numero){
            return true;
        }
        resultado = 2**contador;
        contador++;
    }
    return false
}

// ordenar arreglo de numeros de manera descendente
function sortDescending(numeros){
    let ordenado = bubbleSort(numeros,numeros.length-1);
    let resultado = invertArray(ordenado);
    return resultado;
}

console.log("La letra que se repita mas es: ",firstNonRepeating("abacddbec"))
var arreglo = [5,9,8,3];
console.log("Arreglo ordenado: ",bubbleSort(arreglo,4));

var arr = [1, 2, 3, 4, 5];
console.log("Arreglo invertido creando otro arreglo: ",invertArray(arr));
invertArrayInplace(arr); 
console.log("Arreglo invertido sin crear otro arreglo: ",arr); 

console.log("Palabra con letra mayuscula: ",capitalize("soy santiago"));

var num1 = 30;
var num2 = 20;
console.log("El mcd de",num1,"y de",num2, "es: ",mcd(num1,num2));

var frase = "Javascript es divertido";
console.log("La frase",frase,"en hackerspeak es: ",hackerSpeak(frase));

console.log("Los factores de",num1,"son:",factorize(num1));

var duplicados = [1,1,1,1,0,0,0,0,2,2,2];
console.log("Este arreglo:",duplicados,"queda asi sin duplicados:",deduplicate(duplicados));

var strings = ["hola como estas","pepe","alkdsjfñalskdjfñasd"];
console.log("La cadena de texto mas corta es:",shortestString(strings));

var palindromo = "radar";
if (isPalindrome(palindromo)){
    console.log("La palabra",palindromo,"si es un palindromo.")
}
else {
    console.log("La palabra",palindromo,"no es un palindromo.")
}

var listastrings = ["Hola","Soy Santiago","No se que mas decir"]
console.log("Lista de cadenas de texto ordenada: ",sortStrings(listastrings));

var modamedia = [1,1,1,1,2,4,5,6,8,7];
console.log("La mediana y la moda son:",stats(modamedia));

var popularstrings = ["hola","Roguelites son complicados","hola","Santiago"];
console.log("El string mas popular es:",popularString(popularstrings));

var poder2 = 64;
if (isPowerOf2(poder2)){
    console.log("El número",poder2,"si es una potencia de dos.")
}
else {
    console.log("El número",poder2,"no es una potencia de dos.")
}

var numerosaordenar = [5,6,7,2,1,3,8,9];
console.log("Lista ordenada de manera descendente:",sortDescending(numerosaordenar));