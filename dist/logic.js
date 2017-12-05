
$(function () {
    //Sliders
    $('#ex1').bootstrapSlider({
	formatter: function(value) {
		return 'Current value: ' + value;
	}});

    $("#ex1").on("slide", function(slideEvt) {
        updateValues();
	$("#ex6SliderVal").html('<h1>'+slideEvt.value+ ' cm' + '</h1>');
});

//I knob
$(".knob").knob({
                    change : function (value) {
                        updateValues();
                        //console.log("change : " + value);
                    },
                    release : function (value) {
                    },
                    cancel : function () {
                        console.log("cancel : ", this);
                    }
                });
$(".knob").on('wheel', function(value) {updateValues();} );
//Detect changes
$('input[name=medziaga]').change(function(){
    updateValues();
});
});

function updateValues() {
    var savitasisTankis = $( 'input[name=medziaga]:checked' ).val();
    var srovesStipris = $('.knob').val();
    var laidoIlgis = $("#ex1").val();
    var laidoSpindulys = cicrleRadius /1000;
    var laidoPlotas = laidoSpindulys * laidoSpindulys * Math.PI;
    console.log("Laido spindulys: " + laidoSpindulys);
    console.log("Savitasis tankis: " + savitasisTankis);
    console.log("Srovės stipris: " + srovesStipris);
    console.log("Laido ilgis: " + laidoIlgis);
    console.log("Laido plotas: " + laidoPlotas);

    var varza =parseFloat((savitasisTankis * (laidoIlgis/100)) / laidoPlotas);
    console.log("Varža: " + varza + " Ω");
    var mVarza = Math.round(varza*1000);
    if(mVarza > 1000) {
        $("#varza").text( varza.toFixed(3) + " Ω");
    } else {
        $("#varza").text( mVarza + " mΩ");
    }


    var itampa = srovesStipris * varza;
    var mItampa = Math.round(itampa*1000);
    console.log("Įtampa: " + itampa + " V");
    if(mItampa > 1000) {
        $("#itampa").text( itampa.toFixed(3) + " V");
    }
    else {
        $("#itampa").text( mItampa + " mV");
    }



    drawGraphStipris(varza);
    drawGraphVarzaNuoIlgio(laidoPlotas,savitasisTankis);
}

function drawGraphStipris(varza) {
    var data = [ [0,varza * 0],[1,varza * 1], [5, 5 * varza], [10, 10 * varza],[20, 20 * varza], [30, 30 * varza], [40, 40 * varza], [50, 50 * varza] ];
    $.plot($("#chart1"), [{
        data : data,
    }], {
        yaxis : {
            show : true,
            axisLabel : 'Įtampa, V',
            position: 'left',
        },
        xaxis : {
            show : true,
            axisLabel : 'Srovės stipris, A',
            min:0, max: 50,  tickSize: 5
        }
    });

}

function drawGraphVarzaNuoIlgio(laidoPlotas, savitasisTankis) {

    var data = [ [0.0,(savitasisTankis * 0.0 / laidoPlotas)], [0.1,(savitasisTankis * 0.1 / laidoPlotas)], [0.2, (savitasisTankis * 0.2 / laidoPlotas)], [0.3, (savitasisTankis * 0.3 / laidoPlotas)],[0.4, (savitasisTankis * 0.4 / laidoPlotas)], [0.5, (savitasisTankis * 0.5 / laidoPlotas)] ];
    $.plot($("#chart2"), [{
        data : data,
    }], {
        yaxis : {
            show : true,
            axisLabel : 'Varža, Ω',
            position: 'left',
        },
        xaxis : {
            show : true,
            axisLabel : 'Laido ilgis, m',
        }
    });

}
