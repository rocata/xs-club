window.onload = function () {

    var util = new Util();
    var gameSpace = document.getElementById("game_area");
    $(gameSpace).css("height", window.innerHeight - 25);
    $(gameSpace).css("width", window.innerWidth - 25);

    $(gameSpace).css("height", 300);
    $(gameSpace).css("width", 600);


    var snake = new Snake(gameSpace);
    snake.start();

    window.onkeydown = function (evt) {
        var code = evt.keyCode;
        var directions = {
            "37": "left",
            "38": "up",
            "39": "right",
            "40": "down"
        }
        var direction = directions[code];
        if (direction) {
            snake.changeDirection(direction);
        } else {
            //console.log(code);
            switch (code) {
                case 80:   //  'P'
                    snake.pause();
                    break;
                case 83:  //  'S'
                    snake.start();
                    break;
                case 32:    //  SpaceBar
                    snake.toggleState();
                    break;
            }
        }

    }



    //var test = $; 
    //alert(test);

};

