var Util = function () {
    that = this;

    that.getCSSValue = function (element, cssValue) {
        return parseFloat($(element).css(cssValue), 10);
    };
    that.getWidth = function (element) {
        return that.getCSSValue(element, "width");
    };
    that.getHeight = function (element) {
        return that.getCSSValue(element, "height");
    };
    that.getTop = function (element) {
        return that.getCSSValue(element, "top");
    };
    that.getLeft = function (element) {
        return that.getCSSValue(element, "left");
    };
    that.getCenter = function (element) {
        return {
            x: that.getLeft(element) + (that.getWidth(element) / 2),
            y: that.getTop(element) + (that.getHeight(element) / 2)
        };
    };

    that.getBottom = function (element) {
        return that.getTop(element) + that.getHeight(element);
    }
    that.getRight = function (element) {
        return that.getLeft(element) + that.getWidth(element);
    }

    that.moveElement = function (tailElement, distance) {

        if (distance.x) {
            var newLeft = tailElement.left + distance.x;
            tailElement.left = newLeft;
            $(tailElement.element).css("left", newLeft);
        }
        else if (distance.y) {
            var newTop = tailElement.top + distance.y;
            tailElement.top = newTop;
            $(tailElement.element).css("top", newTop);
        }
    };


    that.getRect = function (element) {
        return {
            "left": util.getLeft(element),
            "top": util.getTop(element),
            "right": util.getRight(element),
            "bottom": util.getBottom(element)
        };
    }
    that.checkCollision = function (thisRect, thatRect) {
        return (
            !(thisRect.left >= thatRect.right) &&
            !(thisRect.bottom <= thatRect.top) &&
            !(thisRect.right <= thatRect.left) &&
            !(thisRect.top >= thatRect.bottom)
        );
    }

    return that;
}