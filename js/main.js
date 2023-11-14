$(function(){

    var opcion;

    //en caso de cifrar
    $("#code").click(function(){

        $("#resultado").html("");

        var texto = $("#textoUser").val();
        var clave = $("#palabraUser").val();
        opcion = "encode";

        //se genera el array con caracteres pares
        var arrayAComparar = generarArray(texto);

        //se divide el array en arrays de caracteres pares
        var paresDeArray = dividirArrayEnPares(arrayAComparar);

        //se comprueba si hay o no palabra clave
        if($("#palabraUser").val() == ""){

            for(i = 0; i < paresDeArray.length; i++){

                var arrayResultado = principal(opcion, false, clave, paresDeArray[i][0], paresDeArray[i][1]);
                
                $("#resultado").append(arrayResultado);

            }

        } else {

            for(i = 0; i < paresDeArray.length; i++){

                var arrayResultado = principal(opcion, true, clave, paresDeArray[i][0], paresDeArray[i][1]);

                $("#resultado").append(arrayResultado);

            }

        }
    });

    //en caso de descifrar, funcionamiento similar a cifrar
    $("#decode").click(function(){

        $("#resultado").html("");

        var texto = $("#textoUser").val();
        var clave = $("#palabraUser").val();
        opcion = "decode";

        arrayInicialTexto = texto.toUpperCase().split("");
        paresDeArray = dividirArrayEnPares(arrayInicialTexto);

        //se comprueba si hay o no palabra clave
        if($("#palabraUser").val() == ""){

            for(i = 0; i < paresDeArray.length; i++){

                var arrayResultado = principal(opcion,false, clave, paresDeArray[i][0], paresDeArray[i][1]);

                //se comprueba si hay alguna x al final de cada par y se sustituye
                if(arrayResultado[arrayResultado.length - 1] == "X"){
                    arrayResultado[arrayResultado.length - 1] = "";
                }

                $("#resultado").append(arrayResultado);

            }

        } else {
            
            for(i = 0; i < paresDeArray.length; i++){

                var arrayResultado = principal(opcion, true, clave, paresDeArray[i][0], paresDeArray[i][1]);

                if(arrayResultado[arrayResultado.length - 1] == "X"){
                    arrayResultado[arrayResultado.length - 1] = "";
                }

                $("#resultado").append(arrayResultado);

            }
        }
        
    });

})