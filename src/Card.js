"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card = /** @class */ (function () {
    function Card(value, suite) {
        this.value = value;
        this.suite = suite;
    }
    Card.prototype.compareTo = function (card) {
        return this.value - card.value;
    };
    return Card;
}());
exports.default = Card;
//# sourceMappingURL=Card.js.map