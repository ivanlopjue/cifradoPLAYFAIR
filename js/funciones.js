// funcion para generar el array adecuado segun el texto del usuario
function generarArray(array){

    let resultArray = [];
    //Comprobacion de que no hay letras iguales seguidas
    //en ese caso se pone una x entre ellas
    for (let i = 0; i < array.length; i++) {
        resultArray.push(array[i]); 
        if (i < array.length - 1 && array[i] == array[i + 1]) {
            resultArray.push('X'); 
        }
    }
    //Quitar espacios del array
    resultArraySinEspacios = resultArray.filter(elemento => elemento.trim() != "");

    //Comprobar que el array es de numero par, 
    //en caso contrario se añade una x al final
    if ((resultArraySinEspacios.length % 2) != 0){
        resultArraySinEspacios.push('X');
    } 

    return resultArraySinEspacios;

}

//funcion para dividir el array en array de pares 
function dividirArrayEnPares(array){

    const nuevosArrays = [];

    for (let i = 0; i < array.length; i+=2) {
        nuevosArrays.push(array.slice(i, i + 2));
    }

    return nuevosArrays;

}

// funcion para generar el array con el que cifrar si se ha introducido una clave
function generarArrayConClave(clave){

    var arrayEntero = [];
    var arraySinRepetidas = [];
    var abecedario = ['a','b','c','d','e','f','g','h','i','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    //Se reemplazan todos los espacios y se crea el array 
    //con el texto que introduce el usuario
    clave = clave.replaceAll(" ", "");
    arrayEntero = clave.split("");

    //Se quitan las letras repetidas de la clave
    for (let i = 0; i < arrayEntero.length; i++) {
        if (arraySinRepetidas.indexOf(arrayEntero[i]) == -1) {
          arraySinRepetidas.push(arrayEntero[i]);
        }
      }

    //Se quitan las letras de la clave del array abecedario
    var abecedarioSinClave = abecedario.filter(function (char) {
        return !arraySinRepetidas.includes(char);
    });

    //juntamos ambos arrays
    var arrayBueno = arraySinRepetidas.concat(abecedarioSinClave);
    var arrayAComparar = [];

    //creamos el array bidimensional con el que cifrar
    for (let i = 0; i < 5; i++) {
        var fila = [];
        for (let j = 0; j < 5; j++) {
            fila[j] = arrayBueno[i * 5 + j].toUpperCase();
        }
        arrayAComparar.push(fila);
    }

    return arrayAComparar;

}

//funcion principal para cifrar o descifrar con o sin clave, pares de caracteres
function principal(opcion, conClave, clave, caracterUno, caracterDos){

    //Se comprueba si hay clave o no
    if(!conClave){
        var arrayAComparar = [
            ["A", "B", "C", "D", "E"],
            ["F", "G", "H", "I", "K"],
            ["L", "M", "N", "O", "P"],
            ["Q", "R", "S", "T", "U"],
            ["V", "W", "X", "Y", "Z"]
        ];
    } else {
        var arrayAComparar = generarArrayConClave(clave);
        console.log(arrayAComparar);
    }

    var filaUno = -1;
    var columnaUno = -1;
    var filaDos = -1;
    var columnaDos = -1;
    arrayADevolver = [];
   
    //Se recorre el array con el que cifrar y se mira en que fila y columna
    //coincide cada caracter a cifrar
    for (let i = 0; i < arrayAComparar.length; i++) {
        for (let j = 0; j < arrayAComparar[i].length; j++) {
            
            if(arrayAComparar[i][j] == caracterUno){
                filaUno = i;
                columnaUno = j; 
            }

            if(arrayAComparar[i][j] == caracterDos){
                filaDos = i;
                columnaDos = j; 
            }

        }
    }

    //opcion si es para cifrar
    if(opcion == "code"){
        //comprobacion de que los caracteres se encuentran en la misma fila
        //si es correcto su columna aumenta en uno
        if(filaUno == filaDos){ 
            columnaUno++;
            columnaDos++; 
            //comprobacion de que estan dentro del array
            if(columnaUno > 4){
                columnaUno = 0;
            }
    
            if(columnaDos > 4){
                columnaDos = 0;
            }
    
            caracterUno = arrayAComparar[filaUno][columnaUno];
            caracterDos = arrayAComparar[filaDos][columnaDos];


        //comprobacion de que los caracteres se encuentran en la misma columna
        //si es correcto su fila aumenta en uno
        } else if (columnaUno == columnaDos){
            filaUno++;
            filaDos++;
    
            if(filaUno > 4){
                filaUno = 0;
            }
    
            if(filaDos > 4){
                filaDos = 0;
            }
    
            caracterUno = arrayAComparar[filaUno][columnaUno];
            caracterDos = arrayAComparar[filaDos][columnaDos];
    
        //Si no coincide columna ni fila
        } else if(filaUno != filaDos && columnaUno != columnaDos){
            //comprobacion de que tanto la columna como la fila esta dentro del array
            if(filaUno > 4){
                filaUno = 0;
            }
    
            if(filaDos > 4){
                filaDos = 0;
            }

            if(filaUno < 0){
                filaUno = 4;
            }
    
            if(filaDos < 0){
                filaDos = 4;
            }

            if(columnaUno > 4){
                columnaUno = 0;
            }
    
            if(columnaDos > 4){
                columnaDos = 0;
            }

            if(columnaUno < 0){
                columnaUno = 4;
            }
    
            if(columnaDos < 0){
                columnaDos = 4;
            }
    
            caracterUno = arrayAComparar[filaUno][columnaDos];
            caracterDos = arrayAComparar[filaDos][columnaUno];
            
        }

    //opcion para descifrar, el funcionamiento a seguir el similar al de cifrar
    } else if (opcion == "decode") {

        if(filaUno == filaDos){ 
            columnaUno--;
            columnaDos--; 
            
            if(columnaUno < 0){
                columnaUno = 4;
            }
    
            if(columnaDos < 0){
                columnaDos = 4;
            }
    
            caracterUno = arrayAComparar[filaUno][columnaUno];
            caracterDos = arrayAComparar[filaDos][columnaDos];
    
        } else if (columnaUno == columnaDos){
            filaUno--;
            filaDos--;
    
            if(filaUno < 0){
                filaUno = 4;
            }
    
            if(filaDos < 0){
                filaDos = 4;
            }
    
            caracterUno = arrayAComparar[filaUno][columnaUno];
            caracterDos = arrayAComparar[filaDos][columnaDos];
    
        } else if(filaUno != filaDos && columnaUno != columnaDos){
            
            if(filaUno > 4){
                filaUno = 0;
            }
    
            if(filaDos > 4){
                filaDos = 0;
            }

            if(filaUno < 0){
                filaUno = 4;
            }
    
            if(filaDos < 0){
                filaDos = 4;
            }

            if(columnaUno > 4){
                columnaUno = 0;
            }
    
            if(columnaDos > 4){
                columnaDos = 0;
            }

            if(columnaUno < 0){
                columnaUno = 4;
            }
    
            if(columnaDos < 0){
                columnaDos = 4;
            }
    
            caracterUno = arrayAComparar[filaUno][columnaDos];
            caracterDos = arrayAComparar[filaDos][columnaUno];
            
        }

    }

    //se devuelve un array con dos caracteres ya cifrados o descifrados
    arrayADevolver = [caracterUno, caracterDos];

    return arrayADevolver;
}
