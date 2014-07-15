window.onload = function () {

    var util = new Util();
    var gameSpace = document.getElementById("game_area");
    $(gameSpace).css("height", window.innerHeight - 25);
    $(gameSpace).css("width", window.innerWidth - 25);

    var Snake = function () {
        var that = this;
        that.timerSpeed = 1;
        that.verticalSpeed = 0;
        that.horizontalSpeed = 0;
        that.snakeSpeed = 2;

        that.containerWidth = parseFloat($(gameSpace).css("width"), 10);
        that.containerHeight = parseFloat($(gameSpace).css("height"), 10);
        that.snakeSize = 15;

        that.currentLeft = undefined;
        that.currentTop = undefined;

        that.timer = undefined;
        that.snakeHead = null;
        that.snakeTail = null;
        that.food = undefined;

        that.spawnFood = function () {
            if ($("div#food").length === 0) {
                var foodElement = document.createElement("div");

                $(foodElement).attr("id", "food");
                $(foodElement).css("position", "absolute");
                $(foodElement).css("background-color", "orange");
                $(foodElement).css("width", 16);
                $(foodElement).css("height", 16);

                $(foodElement).css("top", parseInt(Math.random() * (that.containerHeight - that.snakeSize)));
                $(foodElement).css("left", parseInt(Math.random() * (that.containerWidth - that.snakeSize)));

                that.food = foodElement;
                gameSpace.appendChild(foodElement);
            }

            else {
                $(that.food).css("top", parseInt(Math.random() * (that.containerHeight - that.snakeSize)));
                $(that.food).css("left", parseInt(Math.random() * (that.containerWidth - that.snakeSize)));

            }
        }


        that.moveIt = function () {

            if (typeof that.horizontalSpeed === "number" && that.horizontalSpeced !== 0) {
                var newLeft = that.currentLeft + (that.horizontalSpeed * that.snakeSpeed);
                if (newLeft >= 0 && newLeft < (that.containerWidth - that.snakeSize + 1)) {
                    $(that.snakeHead).css("left", newLeft);
                    that.currentLeft = newLeft;

                    that.snakeTail.queueMotion({
                        "x": that.horizontalSpeed * that.snakeSpeed
                    });
                    
                }
            }
            that.snakeTail.performMotions(that.snakeHead);
            if (typeof that.verticalSpeed === "number" && that.verticalSpeed !== 0) {
                var newTop = that.currentTop + (that.verticalSpeed * that.snakeSpeed);
                if (that.verticalSpeed !== 0 && newTop >= 0 && newTop < (that.containerHeight - that.snakeSize + 1)) {
                    $(that.snakeHead).css("top", newTop);
                    that.currentTop = newTop;

                    that.snakeTail.queueMotion({
                        "y": that.verticalSpeed * that.snakeSpeed
                    });
                    that.snakeTail.performMotions(that.snakeHead);
                }
            }
            if (util.checkCollision(util.getRect(that.snakeHead), util.getRect(that.food))) {
                that.spawnFood();
                that.snakeTail.addTailItem(that.snakeHead);
            }


        };
        that.pause = function () {
            if (that.timer) {
                console.log("Snake paused");
                clearInterval(that.timer);
                that.timer = undefined;
                $(that.snakeHead).css("background-color", "red");
                return true;
            }
            return false;
        }
        that.start = function () {
            if (!that.timer) {
                //  Add snakeHead
                var snakeHead = document.createElement("div");


                $(snakeHead).attr("id", "snake_head");

                $(snakeHead).css("top", parseInt(Math.random() * (that.containerHeight - that.snakeSize)));
                $(snakeHead).css("left", parseInt(Math.random() * (that.containerWidth - that.snakeSize)));
                that.currentLeft = util.getLeft(snakeHead);
                that.currentTop = util.getTop(snakeHead);

                $(snakeHead).css("width", that.snakeSize);
                $(snakeHead).css("height", that.snakeSize);
                $(snakeHead).css("background-color", "yellow");
                that.snakeHead = snakeHead;

                //  Add tail
                that.snakeTail = new SnakeTail(snakeHead, gameSpace, 5);

                gameSpace.appendChild(snakeHead);


                console.log("Snake started");
                that.timer = setInterval(that.moveIt, that.timerSpeed);
                return true;
            }
            return false;
        }
        that.resume = function () {
            if (!that.timer) {
                console.log("Snake resumed");
                $(that.snakeHead).css("background-color", "green");
                that.timer = setInterval(that.moveIt, that.timerSpeed);
                return true;
            }
            return false;
        }
        that.processAction = function (direction) {
            if (!that.timer)
                return;
            switch (direction) {
                case "up":
                    if (that.verticalSpeed === 0) {
                        that.verticalSpeed = -1;
                        that.horizontalSpeed = 0;
                    }
                    break;
                case "down":
                    if (that.verticalSpeed === 0) {
                        that.verticalSpeed = 1;
                        that.horizontalSpeed = 0;
                    }
                    break;
                case "left":
                    if (that.horizontalSpeed === 0) {
                        that.horizontalSpeed = -1;
                        that.verticalSpeed = 0;
                    }
                    break;
                case "right":
                    if (that.horizontalSpeed === 0) {
                        that.horizontalSpeed = 1;
                        that.verticalSpeed = 0;
                    }
                    break;
            }
        }
        that.switchState = function () {
            return that.resume() || that.pause();
        }

    }
    var snake = new Snake();
    snake.start();
    //snake.spawnFood();

    window.onkeydown = function (evt) {
        var code = evt.keyCode;
        var directions = {
            "37": "left",
            "38": "up",
            "39": "right",
            "40": "down"
        }
        var action = directions[code];
        if (action) {
            snake.processAction(action);
        } else {
            //console.log(code);
            switch (code) {
                case 80:   //  'P'
                    snake.pause();
                    break;
                case 83:  //  'S'
                    snake.resume();
                    break;
                case 32:    //  SpaceBar
                    snake.switchState();
                    break;
            }
        }

    }



    //var test = $; 
    //alert(test);

};

