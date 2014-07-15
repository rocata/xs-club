var util = new Util();
var SnakeTail = function (snakeHead, parentContainer, initialTailSize) {
    var that = this;
    if (!snakeHead) {
        console.error("Cannot initialize tail without snakeHead");
        return false;
    }
    parentContainer = parentContainer || $(snakeHead).parent();
    initialTailSize = initialTailSize || 3;

    that.tail = [];
    that.generateTailElement = TailElementGenerator(snakeHead, parentContainer);
    that.addTailItem = function (food) {
        that.tail.push(that.generateTailElement(food, 10));
    };
    for (var i = 0; i < initialTailSize; i++) {
        //that.addTailItem(null);
        that.tail.push(that.generateTailElement(null, 10));
    }

    that.queueMotion = function (motion) {
        that.tail[0].queueMotion(motion);
    }
    that.performMotions = function (prevElement) {
        that.tail.forEach(function (elem, index, array) {
            //  Fiecare miscare efectuata pe un element se propaga la urmatorul de dupa
            var motionDone = elem.performMotion(prevElement);
            (index + 1 < array.length) && array[index + 1].queueMotion(motionDone);
            prevElement = elem.element;

        });
    }



    return that;
}
var TailElementGenerator = function (snakeHead, parentContainer) {
    var idCount = 0;
    if (!snakeHead) {
        console.error("Cannot initialize tailElement without snakeHead");
        return false;
    }
    parentContainer = parentContainer || $(snakeHead).parent();

    return function (centeredPositon, tailElementSize) {

        centeredPositon = centeredPositon || util.getCenter(snakeHead);
        tailElementSize = (typeof tailElementSize === "number" ) ? tailElementSize : 16;

        var tailElement = document.createElement("div");
        parentContainer.appendChild(tailElement)
        $(tailElement).attr("id", "snake_tail " + idCount++);
        $(tailElement).css("position", "absolute");
        $(tailElement).css("background-color", "blue");

        var motionQueue = [];

        var left = centeredPositon.x - (tailElementSize / 2);
        var top = centeredPositon.y - (tailElementSize / 2);

        $(tailElement).css("top", top);
        $(tailElement).css("left", left);
        $(tailElement).css("width", tailElementSize);
        $(tailElement).css("height", tailElementSize);

        return {
            "top": top,
            "left": left,
            "element": tailElement,
            "performMotion": function (prevElement) {
                var motion = motionQueue.shift();
                //  Check if there is a motion to perform 
                if (!motion)
                    return false;

                //  Check collision with previous element before movement
                if (prevElement && this.collisionTestOn) {
                    if (this.collidesWith(prevElement)) {
                        motionQueue.unshift(motion);
                        return false;
                    } else {
                        //  No more collision
                        this.collisionTestOn = false;

                    }
                }
                util.moveElement(this, motion);
                return {
                    "x": motion.x,
                    "y": motion.y
                };
            },
            "queueMotion": function (motion) {
                motion && motionQueue.push(motion);
            },
            "getQueueSize": function () {
                return motionQueue.length;
            },
            "collidesWith": function (thatElement) {
                var thisRect = util.getRect(tailElement);
                var thatRect = util.getRect(thatElement);
                return util.checkCollision(thisRect, thatRect);
            },
            "collisionTestOn": true
        };
    };
};