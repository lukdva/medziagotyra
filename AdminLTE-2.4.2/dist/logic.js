
$(function () {
    //Sliders
    $('#ex1').bootstrapSlider({
	formatter: function(value) {
		return 'Current value: ' + value;
	}});

    $("#ex1").on("slide", function(slideEvt) {
        updateValues();
	$("#ex6SliderVal").html('<h1>'+slideEvt.value+'</h1>');
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

//Detect changes
$('input[name=medziaga]').change(function(){
    updateValues();
});
});

function updateValues() {
    var savitasisTankis = $( 'input[name=medziaga]:checked' ).val();
    var srovesStipris = $('.knob').val();
    var laidoIlgis = $("#ex1").val();
    var laidoSpindulys = 0.00018;
    var laidoPlotas = laidoSpindulys * laidoSpindulys * Math.PI;
    console.log("Savitasis tankis: " + savitasisTankis);
    console.log("Srovės stipris: " + srovesStipris);
    console.log("Laido ilgis: " + laidoIlgis);
    console.log("Laido plotas: " + laidoPlotas);

    var varza =parseFloat((savitasisTankis * (laidoIlgis/100)) / laidoPlotas);
    console.log("Varža: " + varza + " Ω");
    $("#varza").text(varza + " Ω");

    var itampa = srovesStipris * varza;
    console.log("Įtampa: " + itampa + " V");
    $("#itampa").text(itampa + " V");
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

// window.onload = function() {
//     var R = Raphael("canvas", 500, 500);
//     var c = R.circle(100, 100, 50).attr({
//         fill: "hsb(.8, 1, 1)",
//         stroke: "none",
//         opacity: .5
//     });
//     var start = function () {
//         // storing original coordinates
//         this.r = this.attr("r");
//         this.attr({opacity: 1});
//     },
//     move = function (dx, dy) {
//         // move will be called with dx and dy
//         this.attr({r: this.r + dy});
//     },
//     up = function () {
//         // restoring state
//         this.attr({opacity: .5});
//     };
//     c.drag(move, start, up);
//     };

}
