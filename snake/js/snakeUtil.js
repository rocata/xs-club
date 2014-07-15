var SnakeUtil = function (gameSpace) {
    if (!gameSpace) {
        console.error("Cannot create SnakeUtil without gameSpace");
        return false;
    }

    var snakeUtil = this;
    snakeUtil.getRandomCoordinates = function (elementSize) {
        elementSize = elementSize || 0;
        return {
            "x": parseInt(Math.random() * (parseFloat($(gameSpace).css("width"), 10) - elementSize), 10),
            "y": parseInt(Math.random() * (parseFloat($(gameSpace).css("height"), 10) - elementSize), 10)
        };
    }

    var itemCounter = 0;
    snakeUtil.createItem = function (id, size, left, top, cssProps) {
        var size = size || 20;
        var left = left || snakeUtil.getRandomCoordinates(size).x;
        var top = top || snakeUtil.getRandomCoordinates(size).y;
        cssProps = cssProps || {};
        id = id || "auto_generated_id\t" + itemCounter++;


        var itemElement = document.createElement("div");
        Object.keys(cssProps).forEach(function (elem) {
            $(itemElement).css(elem, cssProps[elem]);
        })

        $(itemElement).attr("id", id);
        $(itemElement).css("width", size);
        $(itemElement).css("height", size);
        $(itemElement).css("position", "absolute");
        $(itemElement).css("left", left);
        $(itemElement).css("top", top);

        gameSpace.appendChild(itemElement);


        return {
            "getRect": function () {
                return {
                    "left": this.getLeft(),
                    "top": this.getTop(),
                    "bottom": this.getTop() + this.getSize(),
                    "right": this.getLeft() + this.getSize()
                };
            },
            "remove": function () { $(itemElement).remove(); },
            "getLeft": function () { return left; },
            "getTop": function () { return top; },
            "getSize": function () { return size; },
            "getPosition": function () { return { "x": left, "y": top} },
            "moveByOffset": function (offset) {
                if (offset.x) {
                    left = left + offset.x;
                    $(itemElement).css("left", left);
                    return { "x": left, "y": top };
                } else if (offset.y) {
                    top = top + offset.y;
                    $(itemElement).css("top", top);
                    return { "x": left, "y": top };
                }
                return false
            },
            "moveToPosition": function (position) {
                if (!position.hasOwnProperty("x") && !position.hasOwnProperty("y")) {
                    console.error("Invalid position in moveToPosition!");
                    return false;
                }
                left = position.x;
                top = position.y;
                $(itemElement).css("left", position.x);
                $(itemElement).css("top", position.y);
                return true;
            },
            "moveOnDirection": function (direction, speed) {
                speed = speed || 1;
                switch (direction) {
                    case "left":
                        return this.moveByOffset({ "x": -1 * speed });
                        break;
                    case "right":
                        return this.moveByOffset({ "x": 1 * speed });
                        break;
                    case "up":
                        return this.moveByOffset({ "y": -1 * speed });
                        break;
                    case "down":
                        return this.moveByOffset({ "y": 1 * speed });
                        break;
                    default:
                        console.error("Invalid direction in moveOnDirection");
                        break;
                }
            }
        };



    };

    snakeUtil.createMovingItem = function (id, size, left, top, cssProps) {
        var item = new snakeUtil.createItem(id, size, left, top, cssProps);

        var queue = [];
        item.queue = function (direction) {
            if (direction != "left" &&
                direction != "right" &&
                direction != "up" &&
                direction != "down") {

                console.error("Cannot queue up a direction! Reason: invalid direction");
                return false;
            }
            queue.push(direction);
            return false;
        };
        item.dequeue = function (speed) {
            var dir = queue.shift();
            if (dir) {
                item.moveOnDirection(dir, speed);
                return dir;
            }
            return false;
        }
        return item;
    }

    snakeUtil.makeRect = function (point, size) { 
        return {
            "left": point.x,
            "top": point.y,
            "right": point.x + size,
            "bottom": point.y + size
        }
    };
    return snakeUtil;
}