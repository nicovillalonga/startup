$(document).ready(function(){

    //1
    $('#btnSave').click(function(){
        localStorage.setItem('text', $('#textArea').val());
    });
    
    //2
    $('#btnClear').click(function(){
        localStorage.removeItem('text');
        $('#textArea').val('');
    });
    
    
    
    //3
    $('#dropZone').on("dragover", function(){
        $('#dropZone').addClass("dragOver");
        return false;
    });
    
    $('#dropZone').on("dragleave", function(){
        $('#dropZone').removeClass("dragOver");
        return false;
    });
    
    $('#dropZone').on("drop", function(e){
        e.preventDefault();
        alert(e.data);
        $('#dropZone').removeClass("dragOver");
    });
    
    
    
    //4
    var socket = new WebSocket('ws://echo.websocket.org');
    
    socket.onopen = function(){
        socket.send('socket testing');
    };
    
    socket.onmessage = function(e){
        console.log(e.data);
    };
    
    
    
    //5
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = getRndColor();
    ctx.fillRect(80, 25, 250, 250);
    
    
    function getRndColor() {
        var r = 255*Math.random()|0,
            g = 255*Math.random()|0,
            b = 255*Math.random()|0;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    
    
    function getRndSize() {
        var x = 255*Math.random()|0,
            y = 255*Math.random()|0,
            w = 255*Math.random()|0,
            h = 255*Math.random()|0;
        return x + ',' + y + ',' + w + ',' + h;
    }
    
    
    
    //6
    var c2 = document.getElementById("canvasAnimate");
    var ctx2 = c2.getContext("2d");    

    function draw() {
        ctx2.clearRect(0, 0, 400, 300);
        
        ctx2.beginPath();    
        var x = getRndNr(),
            y = getRndNr(),
            w = getRndNr();//cambiar por ; para que ande
        ctx2.fillStyle = "orange";
        ctx2.fillRect(x, y, w, w);
        ctx2.closePath();
        
        requestAnimationFrame(draw);
    }
    draw();
    
    function getRndNr(){
        return 255*Math.random()|0;
    };
});