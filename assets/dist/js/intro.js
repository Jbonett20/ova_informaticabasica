var Timer;
var Audios = 5;
var AudioActual = 1;
$(document).ready(function(){
    $('#audiointro').on('ended', function() {
        console.log("Audio Finished");
        $('#BtnInstrucciones').click();
    });
    $( "#BtnInstrucciones" ).click(function() {
        clearTimeout(Timer);
        Timer = setTimeout(Paso,1000);
    });
});
function Paso(){
    stopAll();
    $('#audio'+AudioActual)[0].play();
    $('#audio'+AudioActual).on('ended', function() {
        if(AudioActual<=Audios){
            if(AudioActual==Audios-1){
                $('.introjs-donebutton').click();
            }else{
                $('.introjs-nextbutton').click();
            }
            AudioActual=AudioActual+1;
            clearTimeout(Timer);
            Timer = setTimeout(Paso,1000);
        }
    });
}

function stopAll(e){
    $("audio").each(function(){
        var $this=$(this);
        var elementId=$this.attr("id");
        $this[0].pause();
    });
}