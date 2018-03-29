/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Game_1 = __webpack_require__(/*! ./engine/Game */ "./engine/Game.ts");
var IBouncyOptions_1 = __webpack_require__(/*! ./game/IBouncyOptions */ "./game/IBouncyOptions.ts");
var IntroScene_1 = __webpack_require__(/*! ./game/IntroScene */ "./game/IntroScene.ts");
window.startBouncyAnything = function (options) {
    var canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    canvas.style.width = "640px";
    canvas.style.height = "480px";
    canvas.style.border = "solid 1px black";
    options.container.appendChild(canvas);
    var context = canvas.getContext("2d");
    var game = new Game_1["default"](new IntroScene_1["default"](IBouncyOptions_1.applyDefaults(options)), context);
    game.width = 640;
    game.height = 480;
    game.start();
    window.stopBouncyAnything = function () {
        game.stop();
    };
};


/***/ }),

/***/ "./engine/Acceleration.ts":
/*!********************************!*\
  !*** ./engine/Acceleration.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Acceleration = (function () {
    function Acceleration(speed) {
        this.speed = speed;
        this.x = 0;
        this.y = 0;
    }
    Acceleration.prototype.update = function (elapsedTime) {
        var dX = (elapsedTime * this.x) / 1000;
        var dY = (elapsedTime * this.y) / 1000;
        this.speed.x += dX;
        this.speed.y += dY;
    };
    return Acceleration;
}());
exports["default"] = Acceleration;


/***/ }),

/***/ "./engine/AttachedToGameEvent.ts":
/*!***************************************!*\
  !*** ./engine/AttachedToGameEvent.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var AttachedToGameEvent = (function () {
    function AttachedToGameEvent(game) {
        this.game = game;
    }
    return AttachedToGameEvent;
}());
exports["default"] = AttachedToGameEvent;


/***/ }),

/***/ "./engine/CollisionDetector.ts":
/*!*************************************!*\
  !*** ./engine/CollisionDetector.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var CollisionDetector = (function () {
    function CollisionDetector() {
    }
    CollisionDetector.prototype.collidesWithAny = function (o1, others) {
        for (var _i = 0, others_1 = others; _i < others_1.length; _i++) {
            var o = others_1[_i];
            if (this.collides(o1, o)) {
                return true;
            }
        }
        return false;
    };
    CollisionDetector.prototype.collides = function (o1, o2) {
        var c1 = o1.getCoordinates();
        var c2 = o2.getCoordinates();
        var minX = c2.x;
        var maxX = c2.x + c2.width;
        var minY = c2.y;
        var maxY = c2.y + c2.height;
        if (this.isInside(c1.x, c1.y, minX, maxX, minY, maxY)) {
            return true;
        }
        if (this.isInside(c1.x + c1.width, c1.y, minX, maxX, minY, maxY)) {
            return true;
        }
        if (this.isInside(c1.x, c1.y + c1.height, minX, maxX, minY, maxY)) {
            return true;
        }
        if (this.isInside(c1.x + c1.width, c1.y + c1.height, minX, maxX, minY, maxY)) {
            return true;
        }
        return false;
    };
    CollisionDetector.prototype.isInside = function (x, y, minX, maxX, minY, maxY) {
        var isXinside = this.isBetween(x, minX, maxX);
        var isYinside = this.isBetween(y, minY, maxY);
        return isXinside && isYinside;
    };
    CollisionDetector.prototype.isBetween = function (x, min, max) {
        return min < x && max > x;
    };
    return CollisionDetector;
}());
exports["default"] = CollisionDetector;


/***/ }),

/***/ "./engine/DetachedFromGameEvent.ts":
/*!*****************************************!*\
  !*** ./engine/DetachedFromGameEvent.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var DetachedFromGameEvent = (function () {
    function DetachedFromGameEvent(game) {
        this.game = game;
    }
    return DetachedFromGameEvent;
}());
exports["default"] = DetachedFromGameEvent;


/***/ }),

/***/ "./engine/Game.ts":
/*!************************!*\
  !*** ./engine/Game.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var AttachedToGameEvent_1 = __webpack_require__(/*! ./AttachedToGameEvent */ "./engine/AttachedToGameEvent.ts");
var DetachedFromGameEvent_1 = __webpack_require__(/*! ./DetachedFromGameEvent */ "./engine/DetachedFromGameEvent.ts");
var MouseDownEvent_1 = __webpack_require__(/*! ./MouseDownEvent */ "./engine/MouseDownEvent.ts");
var Game = (function () {
    function Game(initialScene, context) {
        var _this = this;
        this.context = context;
        this.width = 800;
        this.height = 600;
        this.isStarted = false;
        this.onMouseDown = function () {
            _this.currentScene.onEvent(new MouseDownEvent_1["default"]());
        };
        this.requestNextFrame = function () {
            window.requestAnimationFrame(_this.onLoop);
        };
        this.onLoop = function () {
            if (!_this.isStarted) {
                return;
            }
            var currentTime = +new Date();
            var elapsedTime = currentTime - _this.lastUpdateTime;
            _this.lastUpdateTime = currentTime;
            _this.currentScene.update(elapsedTime);
            _this.currentScene.render(_this.context);
            var nextScene = _this.currentScene.getNextScene();
            if (nextScene && nextScene !== _this.currentScene) {
                _this.currentScene.onEvent(new DetachedFromGameEvent_1["default"](_this));
                nextScene.onEvent(new AttachedToGameEvent_1["default"](_this));
                _this.currentScene = nextScene;
            }
            _this.requestNextFrame();
        };
        this.currentScene = initialScene;
    }
    Game.prototype.start = function () {
        this.isStarted = true;
        this.lastUpdateTime = +new Date();
        this.currentScene.onEvent(new AttachedToGameEvent_1["default"](this));
        this.requestNextFrame();
        this.context.canvas.addEventListener("mousedown", this.onMouseDown);
    };
    Game.prototype.stop = function () {
        this.context.canvas.removeEventListener("mousedown", this.onMouseDown);
        this.currentScene.onEvent(new DetachedFromGameEvent_1["default"](this));
        this.isStarted = false;
    };
    Game.prototype.publishEvent = function (event) {
        this.currentScene.onEvent(event);
    };
    return Game;
}());
exports["default"] = Game;


/***/ }),

/***/ "./engine/GameObject.ts":
/*!******************************!*\
  !*** ./engine/GameObject.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var AttachedToGameEvent_1 = __webpack_require__(/*! ./AttachedToGameEvent */ "./engine/AttachedToGameEvent.ts");
var DetachedFromGameEvent_1 = __webpack_require__(/*! ./DetachedFromGameEvent */ "./engine/DetachedFromGameEvent.ts");
var GameObjectCoordinates_1 = __webpack_require__(/*! ./GameObjectCoordinates */ "./engine/GameObjectCoordinates.ts");
var QueryObjectsByTagEvent_1 = __webpack_require__(/*! ./QueryObjectsByTagEvent */ "./engine/QueryObjectsByTagEvent.ts");
var GameObject = (function () {
    function GameObject() {
        this.tags = [];
        this.childObjects = [];
    }
    GameObject.prototype.update = function (elapsedTime) {
        for (var _i = 0, _a = this.childObjects; _i < _a.length; _i++) {
            var child = _a[_i];
            child.update(elapsedTime);
        }
    };
    GameObject.prototype.render = function (context) {
        for (var _i = 0, _a = this.childObjects; _i < _a.length; _i++) {
            var child = _a[_i];
            child.render(context);
        }
    };
    GameObject.prototype.onEvent = function (event) {
        if (event instanceof AttachedToGameEvent_1["default"]) {
            this.game = event.game;
        }
        else if (event instanceof DetachedFromGameEvent_1["default"]) {
            this.game = null;
        }
        else if (event instanceof QueryObjectsByTagEvent_1["default"]) {
            if (this.tags.indexOf(event.tag) !== -1) {
                event.objects.push(this);
            }
        }
        for (var _i = 0, _a = this.childObjects; _i < _a.length; _i++) {
            var child = _a[_i];
            child.onEvent(event);
        }
    };
    GameObject.prototype.addChild = function (gameObject) {
        this.childObjects.push(gameObject);
        if (this.game) {
            gameObject.onEvent(new AttachedToGameEvent_1["default"](this.game));
        }
    };
    GameObject.prototype.removeChild = function (gameObject) {
        var index = this.childObjects.indexOf(gameObject);
        if (index !== -1) {
            this.childObjects.splice(index, 1);
            if (this.game) {
                gameObject.onEvent(new DetachedFromGameEvent_1["default"](this.game));
            }
        }
    };
    GameObject.prototype.getCoordinates = function () {
        return new GameObjectCoordinates_1["default"]();
    };
    return GameObject;
}());
exports["default"] = GameObject;


/***/ }),

/***/ "./engine/GameObjectCoordinates.ts":
/*!*****************************************!*\
  !*** ./engine/GameObjectCoordinates.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var GameObjectCoordinates = (function () {
    function GameObjectCoordinates() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }
    return GameObjectCoordinates;
}());
exports["default"] = GameObjectCoordinates;


/***/ }),

/***/ "./engine/ImageGameObject.ts":
/*!***********************************!*\
  !*** ./engine/ImageGameObject.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var GameObject_1 = __webpack_require__(/*! ./GameObject */ "./engine/GameObject.ts");
var Placement_1 = __webpack_require__(/*! ./Placement */ "./engine/Placement.ts");
var ImageGameObject = (function (_super) {
    __extends(ImageGameObject, _super);
    function ImageGameObject(image, placement) {
        if (placement === void 0) { placement = new Placement_1["default"](); }
        var _this = _super.call(this) || this;
        _this.image = image;
        _this.placement = placement;
        return _this;
    }
    ImageGameObject.prototype.render = function (context) {
        if (this.width || this.height) {
            context.drawImage(this.image, this.placement.x, this.placement.y, this.width, this.height);
        }
        else {
            context.drawImage(this.image, this.placement.x, this.placement.y);
        }
        _super.prototype.render.call(this, context);
    };
    ImageGameObject.prototype.getCoordinates = function () {
        var coords = _super.prototype.getCoordinates.call(this);
        coords.x = this.placement.x;
        coords.y = this.placement.y;
        coords.width = this.width;
        coords.height = this.height;
        return coords;
    };
    return ImageGameObject;
}(GameObject_1["default"]));
exports["default"] = ImageGameObject;


/***/ }),

/***/ "./engine/MouseDownEvent.ts":
/*!**********************************!*\
  !*** ./engine/MouseDownEvent.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var MouseDownEvent = (function () {
    function MouseDownEvent() {
    }
    return MouseDownEvent;
}());
exports["default"] = MouseDownEvent;


/***/ }),

/***/ "./engine/Placement.ts":
/*!*****************************!*\
  !*** ./engine/Placement.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Placement = (function () {
    function Placement() {
        this.x = 0;
        this.y = 0;
    }
    return Placement;
}());
exports["default"] = Placement;


/***/ }),

/***/ "./engine/QueryObjectsByTagEvent.ts":
/*!******************************************!*\
  !*** ./engine/QueryObjectsByTagEvent.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var QueryObjectsByTagEvent = (function () {
    function QueryObjectsByTagEvent(tag) {
        this.tag = tag;
        this.objects = [];
    }
    return QueryObjectsByTagEvent;
}());
exports["default"] = QueryObjectsByTagEvent;


/***/ }),

/***/ "./engine/Scene.ts":
/*!*************************!*\
  !*** ./engine/Scene.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var GameObject_1 = __webpack_require__(/*! ./GameObject */ "./engine/GameObject.ts");
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scene.prototype.render = function (context) {
        context.clearRect(0, 0, this.game.width, this.game.height);
        _super.prototype.render.call(this, context);
    };
    return Scene;
}(GameObject_1["default"]));
exports["default"] = Scene;


/***/ }),

/***/ "./engine/Speed.ts":
/*!*************************!*\
  !*** ./engine/Speed.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Speed = (function () {
    function Speed(placement) {
        this.placement = placement;
        this.x = 0;
        this.y = 0;
    }
    Speed.prototype.update = function (elapsedTime) {
        var dX = (elapsedTime * this.x) / 1000;
        var dY = (elapsedTime * this.y) / 1000;
        this.placement.x += dX;
        this.placement.y += dY;
    };
    return Speed;
}());
exports["default"] = Speed;


/***/ }),

/***/ "./engine/TemporaryAcceleration.ts":
/*!*****************************************!*\
  !*** ./engine/TemporaryAcceleration.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Acceleration_1 = __webpack_require__(/*! ./Acceleration */ "./engine/Acceleration.ts");
var TemporaryAcceleration = (function () {
    function TemporaryAcceleration(speed) {
        this.speed = speed;
        this.duration = 0;
        this.durationLeft = 0;
        this.acceleration = new Acceleration_1["default"](this.speed);
    }
    TemporaryAcceleration.prototype.update = function (elapsedTime) {
        if (this.durationLeft <= 0) {
            return;
        }
        var timeToUpdateWith = elapsedTime;
        var left = Math.max(0, this.durationLeft - elapsedTime);
        if (left === 0) {
            timeToUpdateWith = this.durationLeft;
        }
        this.acceleration.update(timeToUpdateWith);
        this.durationLeft = left;
    };
    TemporaryAcceleration.prototype.push = function (x, y, duration) {
        this.acceleration.x = x;
        this.acceleration.y = y;
        this.durationLeft = duration;
    };
    return TemporaryAcceleration;
}());
exports["default"] = TemporaryAcceleration;


/***/ }),

/***/ "./game/Bouncy.ts":
/*!************************!*\
  !*** ./game/Bouncy.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Acceleration_1 = __webpack_require__(/*! ../engine/Acceleration */ "./engine/Acceleration.ts");
var AttachedToGameEvent_1 = __webpack_require__(/*! ../engine/AttachedToGameEvent */ "./engine/AttachedToGameEvent.ts");
var GameObject_1 = __webpack_require__(/*! ../engine/GameObject */ "./engine/GameObject.ts");
var MouseDownEvent_1 = __webpack_require__(/*! ../engine/MouseDownEvent */ "./engine/MouseDownEvent.ts");
var Placement_1 = __webpack_require__(/*! ../engine/Placement */ "./engine/Placement.ts");
var Speed_1 = __webpack_require__(/*! ../engine/Speed */ "./engine/Speed.ts");
var TemporaryAcceleration_1 = __webpack_require__(/*! ../engine/TemporaryAcceleration */ "./engine/TemporaryAcceleration.ts");
var Bouncy = (function (_super) {
    __extends(Bouncy, _super);
    function Bouncy(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.cycleTimeLeft = 0;
        _this.imageIndex = 0;
        _this.placement = new Placement_1["default"]();
        _this.speed = new Speed_1["default"](_this.placement);
        _this.acc = new Acceleration_1["default"](_this.speed);
        _this.tempAcc = new TemporaryAcceleration_1["default"](_this.speed);
        _this.acc.y = options.bouncyAcceleration;
        return _this;
    }
    Bouncy.prototype.update = function (elapsedTime) {
        this.updateCycledImages(elapsedTime);
        this.acc.update(elapsedTime);
        this.tempAcc.update(elapsedTime);
        this.speed.update(elapsedTime);
        _super.prototype.update.call(this, elapsedTime);
    };
    Bouncy.prototype.render = function (context) {
        var image = this.options.bouncyImages[this.imageIndex];
        context.drawImage(image, this.placement.x, this.placement.y, Bouncy.width, Bouncy.height);
        _super.prototype.render.call(this, context);
    };
    Bouncy.prototype.onEvent = function (event) {
        _super.prototype.onEvent.call(this, event);
        if (event instanceof MouseDownEvent_1["default"]) {
            this.speed.y = this.options.bouncyClickSpeed;
        }
        if (event instanceof AttachedToGameEvent_1["default"]) {
            this.placement.x = event.game.width * 0.25;
        }
    };
    Bouncy.prototype.getCoordinates = function () {
        var coords = _super.prototype.getCoordinates.call(this);
        coords.x = this.placement.x;
        coords.y = this.placement.y;
        coords.width = Bouncy.width;
        coords.height = Bouncy.height;
        return coords;
    };
    Bouncy.prototype.updateCycledImages = function (elapsedTime) {
        this.cycleTimeLeft -= elapsedTime;
        if (this.cycleTimeLeft < 0) {
            this.cycleTimeLeft += this.options.bouncyImageCycleTime;
            this.imageIndex++;
            if (!this.options.bouncyImages[this.imageIndex]) {
                this.imageIndex = 0;
            }
        }
    };
    Bouncy.width = 32;
    Bouncy.height = 32;
    return Bouncy;
}(GameObject_1["default"]));
exports["default"] = Bouncy;


/***/ }),

/***/ "./game/BouncyDeadScene.ts":
/*!*********************************!*\
  !*** ./game/BouncyDeadScene.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ImageGameObject_1 = __webpack_require__(/*! ../engine/ImageGameObject */ "./engine/ImageGameObject.ts");
var MouseDownEvent_1 = __webpack_require__(/*! ../engine/MouseDownEvent */ "./engine/MouseDownEvent.ts");
var Scene_1 = __webpack_require__(/*! ../engine/Scene */ "./engine/Scene.ts");
var IntroScene_1 = __webpack_require__(/*! ./IntroScene */ "./game/IntroScene.ts");
var BouncyDeadScene = (function (_super) {
    __extends(BouncyDeadScene, _super);
    function BouncyDeadScene(options, score) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.score = score;
        _this.isOver = false;
        _this.isDelayPassed = false;
        _this.delay = 500;
        if (options.backgroundImage) {
            _this.addChild(new ImageGameObject_1["default"](options.backgroundImage));
        }
        return _this;
    }
    BouncyDeadScene.prototype.update = function (elapsedTime) {
        _super.prototype.update.call(this, elapsedTime);
        this.delay -= elapsedTime;
        if (this.delay < 0) {
            this.isDelayPassed = true;
        }
    };
    BouncyDeadScene.prototype.getNextScene = function () {
        if (this.isOver && this.isDelayPassed) {
            return new IntroScene_1["default"](this.options);
        }
    };
    BouncyDeadScene.prototype.render = function (context) {
        _super.prototype.render.call(this, context);
        context.save();
        context.shadowBlur = 4;
        context.shadowColor = "black";
        context.fillStyle = this.options.introTextFillStyle;
        context.textBaseline = "center";
        context.textAlign = "center";
        context.font = "48px cursive";
        context.strokeStyle = "2px blue";
        context.fillText(this.options.bouncyDeadTextTitle.replace("{score}", this.score.toString()), this.game.width / 2, this.game.height * 0.3, this.game.width * 0.6);
        context.font = "24px sans-serif";
        context.fillText(this.options.bouncyDeadTextMessage, this.game.width / 2, this.game.height * 0.7, this.game.width * 0.6);
        context.restore();
    };
    BouncyDeadScene.prototype.onEvent = function (event) {
        _super.prototype.onEvent.call(this, event);
        if (event instanceof MouseDownEvent_1["default"]) {
            this.isOver = true;
        }
    };
    return BouncyDeadScene;
}(Scene_1["default"]));
exports["default"] = BouncyDeadScene;


/***/ }),

/***/ "./game/BouncyScene.ts":
/*!*****************************!*\
  !*** ./game/BouncyScene.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var CollisionDetector_1 = __webpack_require__(/*! ../engine/CollisionDetector */ "./engine/CollisionDetector.ts");
var ImageGameObject_1 = __webpack_require__(/*! ../engine/ImageGameObject */ "./engine/ImageGameObject.ts");
var QueryObjectsByTagEvent_1 = __webpack_require__(/*! ../engine/QueryObjectsByTagEvent */ "./engine/QueryObjectsByTagEvent.ts");
var Scene_1 = __webpack_require__(/*! ../engine/Scene */ "./engine/Scene.ts");
var Bouncy_1 = __webpack_require__(/*! ./Bouncy */ "./game/Bouncy.ts");
var BouncyDeadScene_1 = __webpack_require__(/*! ./BouncyDeadScene */ "./game/BouncyDeadScene.ts");
var PairOfPipes_1 = __webpack_require__(/*! ./PairOfPipes */ "./game/PairOfPipes.ts");
var PipeController_1 = __webpack_require__(/*! ./PipeController */ "./game/PipeController.ts");
var PipePassedEvent_1 = __webpack_require__(/*! ./PipePassedEvent */ "./game/PipePassedEvent.ts");
var BouncyScene = (function (_super) {
    __extends(BouncyScene, _super);
    function BouncyScene(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.isBouncyDead = false;
        _this.score = 0;
        _this.collisionDetector = new CollisionDetector_1["default"]();
        if (options.backgroundImage) {
            _this.addChild(new ImageGameObject_1["default"](options.backgroundImage));
        }
        _this.bouncy = new Bouncy_1["default"](options);
        _this.addChild(_this.bouncy);
        _this.addChild(new PipeController_1["default"](options));
        return _this;
    }
    BouncyScene.prototype.update = function (elapsedTime) {
        _super.prototype.update.call(this, elapsedTime);
        var queryPipes = new QueryObjectsByTagEvent_1["default"](PairOfPipes_1["default"].pipeTag);
        this.game.publishEvent(queryPipes);
        if (this.collisionDetector.collidesWithAny(this.bouncy, queryPipes.objects)) {
            this.isBouncyDead = true;
        }
        var bouncyY = this.bouncy.getCoordinates().y;
        if (bouncyY < -30 || bouncyY > this.game.height + 30) {
            this.isBouncyDead = true;
        }
    };
    BouncyScene.prototype.render = function (context) {
        _super.prototype.render.call(this, context);
        this.renderScore(context);
    };
    BouncyScene.prototype.getNextScene = function () {
        if (this.isBouncyDead) {
            return new BouncyDeadScene_1["default"](this.options, this.score);
        }
        return this;
    };
    BouncyScene.prototype.onEvent = function (event) {
        _super.prototype.onEvent.call(this, event);
        if (event instanceof PipePassedEvent_1["default"]) {
            this.score++;
        }
    };
    BouncyScene.prototype.renderScore = function (context) {
        context.save();
        context.textAlign = "left";
        context.textBaseline = "top";
        context.font = "bold 16px sans-serif";
        context.shadowColor = "black";
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 1;
        context.fillStyle = "white";
        context.fillText("Score: " + this.score, 10, 10);
        context.restore();
    };
    return BouncyScene;
}(Scene_1["default"]));
exports["default"] = BouncyScene;


/***/ }),

/***/ "./game/IBouncyOptions.ts":
/*!********************************!*\
  !*** ./game/IBouncyOptions.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function applyDefaults(options) {
    return {
        backgroundImage: options.backgroundImage,
        bottomPipeImage: options.bottomPipeImage,
        bouncyAcceleration: options.bouncyAcceleration || 300,
        bouncyClickSpeed: options.bouncyClickSpeed || -250,
        bouncyDeadTextMessage: options.bouncyDeadTextMessage || "Click to go back to the main screen",
        bouncyDeadTextTitle: options.bouncyDeadTextTitle || "You died. Score: {score}",
        bouncyImageCycleTime: options.bouncyImageCycleTime || 200,
        bouncyImages: options.bouncyImages,
        container: options.container,
        introTextFillStyle: options.introTextFillStyle || "white",
        introTextMessage: options.introTextMessage || "Click to play",
        introTextTitle: options.introTextTitle || "Bouncy anything",
        pipeOptions: options.pipeSpeed || {
            addPipeFrequency: 2000,
            gapSize: 150,
            pipeSpeed: 200,
            speed: 20
        },
        topPipeImage: options.topPipeImage
    };
}
exports.applyDefaults = applyDefaults;


/***/ }),

/***/ "./game/IntroScene.ts":
/*!****************************!*\
  !*** ./game/IntroScene.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ImageGameObject_1 = __webpack_require__(/*! ../engine/ImageGameObject */ "./engine/ImageGameObject.ts");
var MouseDownEvent_1 = __webpack_require__(/*! ../engine/MouseDownEvent */ "./engine/MouseDownEvent.ts");
var Scene_1 = __webpack_require__(/*! ../engine/Scene */ "./engine/Scene.ts");
var BouncyScene_1 = __webpack_require__(/*! ./BouncyScene */ "./game/BouncyScene.ts");
var IntroScene = (function (_super) {
    __extends(IntroScene, _super);
    function IntroScene(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.isOver = false;
        if (options.backgroundImage) {
            _this.addChild(new ImageGameObject_1["default"](options.backgroundImage));
        }
        return _this;
    }
    IntroScene.prototype.getNextScene = function () {
        if (this.isOver) {
            return new BouncyScene_1["default"](this.options);
        }
    };
    IntroScene.prototype.render = function (context) {
        _super.prototype.render.call(this, context);
        context.save();
        context.shadowBlur = 4;
        context.shadowColor = "black";
        context.fillStyle = this.options.introTextFillStyle;
        context.textBaseline = "center";
        context.textAlign = "center";
        context.font = "48px cursive";
        context.strokeStyle = "2px blue";
        context.fillText(this.options.introTextTitle, this.game.width / 2, this.game.height * 0.3, this.game.width * 0.6);
        context.font = "24px sans-serif";
        context.fillText(this.options.introTextMessage, this.game.width / 2, this.game.height * 0.7, this.game.width * 0.6);
        context.restore();
    };
    IntroScene.prototype.onEvent = function (event) {
        _super.prototype.onEvent.call(this, event);
        if (event instanceof MouseDownEvent_1["default"]) {
            this.isOver = true;
        }
    };
    return IntroScene;
}(Scene_1["default"]));
exports["default"] = IntroScene;


/***/ }),

/***/ "./game/PairOfPipes.ts":
/*!*****************************!*\
  !*** ./game/PairOfPipes.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var AttachedToGameEvent_1 = __webpack_require__(/*! ../engine/AttachedToGameEvent */ "./engine/AttachedToGameEvent.ts");
var GameObject_1 = __webpack_require__(/*! ../engine/GameObject */ "./engine/GameObject.ts");
var ImageGameObject_1 = __webpack_require__(/*! ../engine/ImageGameObject */ "./engine/ImageGameObject.ts");
var Placement_1 = __webpack_require__(/*! ../engine/Placement */ "./engine/Placement.ts");
var Speed_1 = __webpack_require__(/*! ../engine/Speed */ "./engine/Speed.ts");
var PairOfPipes = (function (_super) {
    __extends(PairOfPipes, _super);
    function PairOfPipes(options, gapPosition) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.gapPosition = gapPosition;
        _this.placement = new Placement_1["default"]();
        _this.speed = new Speed_1["default"](_this.placement);
        _this.topPipe = new ImageGameObject_1["default"](options.topPipeImage);
        _this.bottomPipe = new ImageGameObject_1["default"](options.bottomPipeImage);
        _this.topPipe.width = PairOfPipes.pipeWidth;
        _this.bottomPipe.width = PairOfPipes.pipeWidth;
        _this.topPipe.tags.push(PairOfPipes.pipeTag);
        _this.bottomPipe.tags.push(PairOfPipes.pipeTag);
        _this.addChild(_this.topPipe);
        _this.addChild(_this.bottomPipe);
        _this.speed.x = -_this.options.pipeOptions.speed;
        return _this;
    }
    PairOfPipes.prototype.update = function (elapsedTime) {
        this.speed.x = -this.options.pipeOptions.pipeSpeed;
        this.speed.update(elapsedTime);
        this.topPipe.placement.x = this.placement.x;
        this.bottomPipe.placement.x = this.placement.x;
        _super.prototype.update.call(this, elapsedTime);
    };
    PairOfPipes.prototype.isOutsideOfScreen = function () {
        return this.placement.x < -PairOfPipes.pipeWidth;
    };
    PairOfPipes.prototype.onEvent = function (event) {
        _super.prototype.onEvent.call(this, event);
        if (event instanceof AttachedToGameEvent_1["default"]) {
            this.placement.x = this.game.width;
            this.topPipe.placement.y = -this.game.height + this.gapPosition;
            this.bottomPipe.placement.y = this.gapPosition + this.options.pipeOptions.gapSize;
            this.topPipe.height = this.game.height;
            this.bottomPipe.height = this.game.height;
        }
    };
    PairOfPipes.pipeTag = "pipe";
    PairOfPipes.pipeWidth = 80;
    return PairOfPipes;
}(GameObject_1["default"]));
exports["default"] = PairOfPipes;


/***/ }),

/***/ "./game/PipeController.ts":
/*!********************************!*\
  !*** ./game/PipeController.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var GameObject_1 = __webpack_require__(/*! ../engine/GameObject */ "./engine/GameObject.ts");
var PairOfPipes_1 = __webpack_require__(/*! ./PairOfPipes */ "./game/PairOfPipes.ts");
var PipePassedEvent_1 = __webpack_require__(/*! ./PipePassedEvent */ "./game/PipePassedEvent.ts");
var PipeController = (function (_super) {
    __extends(PipeController, _super);
    function PipeController(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.pipes = [];
        _this.timeLeftToAddPipe = options.pipeOptions.addPipeFrequency;
        return _this;
    }
    PipeController.prototype.update = function (elapsedTime) {
        var timeLeft = this.timeLeftToAddPipe - elapsedTime;
        if (timeLeft < 0) {
            timeLeft += this.options.pipeOptions.addPipeFrequency;
            var minGapPosition = 10;
            var randomOffset = Math.random() *
                (this.game.height - 2 * minGapPosition - this.options.pipeOptions.gapSize);
            var gapPosition = minGapPosition + randomOffset;
            var pipe = new PairOfPipes_1["default"](this.options, gapPosition);
            this.addChild(pipe);
            this.pipes.push(pipe);
        }
        while (this.pipes.length > 0 && this.pipes[0].isOutsideOfScreen()) {
            this.removeChild(this.pipes[0]);
            this.pipes.splice(0, 1);
            this.game.publishEvent(new PipePassedEvent_1["default"]());
        }
        this.timeLeftToAddPipe = timeLeft;
        _super.prototype.update.call(this, elapsedTime);
    };
    return PipeController;
}(GameObject_1["default"]));
exports["default"] = PipeController;


/***/ }),

/***/ "./game/PipePassedEvent.ts":
/*!*********************************!*\
  !*** ./game/PipePassedEvent.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var PipePassedEvent = (function () {
    function PipePassedEvent() {
    }
    return PipePassedEvent;
}());
exports["default"] = PipePassedEvent;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL2VuZ2luZS9BY2NlbGVyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL0F0dGFjaGVkVG9HYW1lRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL0NvbGxpc2lvbkRldGVjdG9yLnRzIiwid2VicGFjazovLy8uL2VuZ2luZS9EZXRhY2hlZEZyb21HYW1lRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL0dhbWVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL0dhbWVPYmplY3RDb29yZGluYXRlcy50cyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvSW1hZ2VHYW1lT2JqZWN0LnRzIiwid2VicGFjazovLy8uL2VuZ2luZS9Nb3VzZURvd25FdmVudC50cyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvUGxhY2VtZW50LnRzIiwid2VicGFjazovLy8uL2VuZ2luZS9RdWVyeU9iamVjdHNCeVRhZ0V2ZW50LnRzIiwid2VicGFjazovLy8uL2VuZ2luZS9TY2VuZS50cyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvU3BlZWQudHMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL1RlbXBvcmFyeUFjY2VsZXJhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9nYW1lL0JvdW5jeS50cyIsIndlYnBhY2s6Ly8vLi9nYW1lL0JvdW5jeURlYWRTY2VuZS50cyIsIndlYnBhY2s6Ly8vLi9nYW1lL0JvdW5jeVNjZW5lLnRzIiwid2VicGFjazovLy8uL2dhbWUvSUJvdW5jeU9wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vZ2FtZS9JbnRyb1NjZW5lLnRzIiwid2VicGFjazovLy8uL2dhbWUvUGFpck9mUGlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vZ2FtZS9QaXBlQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9nYW1lL1BpcGVQYXNzZWRFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBLDBFQUFpQztBQUdqQyxvR0FBc0U7QUFDdEUsd0ZBQTJDO0FBRTFDLE1BQWMsQ0FBQyxtQkFBbUIsR0FBRyxVQUFDLE9BQXVCO0lBQzFELElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDbkIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO0lBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztJQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQztJQUN4QyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLElBQU0sSUFBSSxHQUFHLElBQUksaUJBQUksQ0FBQyxJQUFJLHVCQUFVLENBQUMsOEJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZFLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNaLE1BQWMsQ0FBQyxrQkFBa0IsR0FBRztRQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNoQkY7SUFJSSxzQkFDWSxLQUFZO1FBQVosVUFBSyxHQUFMLEtBQUssQ0FBTztRQUpqQixNQUFDLEdBQVcsQ0FBQyxDQUFDO1FBQ2QsTUFBQyxHQUFXLENBQUMsQ0FBQztJQUlqQixDQUFDO0lBRUUsNkJBQU0sR0FBYixVQUFjLFdBQW1CO1FBQzdCLElBQU0sRUFBRSxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDekMsSUFBTSxFQUFFLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkQ7SUFDSSw2QkFDVyxJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUNqQixDQUFDO0lBQ1QsMEJBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDSkQ7SUFBQTtJQTZDQSxDQUFDO0lBNUNVLDJDQUFlLEdBQXRCLFVBQXVCLEVBQWMsRUFBRSxNQUFvQjtRQUN2RCxHQUFHLENBQUMsQ0FBWSxVQUFNLEVBQU4saUJBQU0sRUFBTixvQkFBTSxFQUFOLElBQU07WUFBakIsSUFBTSxDQUFDO1lBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7U0FDSjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVNLG9DQUFRLEdBQWYsVUFBZ0IsRUFBYyxFQUFFLEVBQWM7UUFDMUMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQy9CLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMvQixJQUFNLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUM3QixJQUFNLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUU5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTyxvQ0FBUSxHQUFoQixVQUFpQixDQUFTLEVBQUUsQ0FBUyxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLElBQVk7UUFDekYsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQztJQUNsQyxDQUFDO0lBRU8scUNBQVMsR0FBakIsVUFBa0IsQ0FBUyxFQUFFLEdBQVcsRUFBRSxHQUFXO1FBQ2pELE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzdDRDtJQUNJLCtCQUNXLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQ2pCLENBQUM7SUFDVCw0QkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNORCxnSEFBd0Q7QUFDeEQsc0hBQTREO0FBQzVELGlHQUE4QztBQUc5QztJQU9JLGNBQ0ksWUFBbUIsRUFDWCxPQUFpQztRQUY3QyxpQkFLQztRQUhXLFlBQU8sR0FBUCxPQUFPLENBQTBCO1FBUnRDLFVBQUssR0FBRyxHQUFHLENBQUM7UUFDWixXQUFNLEdBQUcsR0FBRyxDQUFDO1FBRVosY0FBUyxHQUFHLEtBQUssQ0FBQztRQTRCbEIsZ0JBQVcsR0FBRztZQUNsQixLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLDJCQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFFTyxxQkFBZ0IsR0FBRztZQUN2QixNQUFNLENBQUMscUJBQXFCLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFFTyxXQUFNLEdBQUc7WUFDYixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixNQUFNLENBQUM7WUFDWCxDQUFDO1lBQ0QsSUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2hDLElBQU0sV0FBVyxHQUFHLFdBQVcsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3RELEtBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ25ELEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLEtBQUssS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksa0NBQXFCLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0QsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdDQUFtQixDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELEtBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1lBQ2xDLENBQUM7WUFDRCxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBN0NHLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxvQkFBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxnQ0FBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVNLG1CQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksa0NBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRU0sMkJBQVksR0FBbkIsVUFBb0IsS0FBVTtRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBMkJMLFdBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDOURELGdIQUF3RDtBQUN4RCxzSEFBNEQ7QUFFNUQsc0hBQTREO0FBQzVELHlIQUE4RDtBQUU5RDtJQUFBO1FBQ1csU0FBSSxHQUFhLEVBQUUsQ0FBQztRQUNqQixpQkFBWSxHQUFpQixFQUFFLENBQUM7SUE0RTlDLENBQUM7SUFwRVUsMkJBQU0sR0FBYixVQUFjLFdBQW1CO1FBQzdCLEdBQUcsQ0FBQyxDQUFnQixVQUFpQixFQUFqQixTQUFJLENBQUMsWUFBWSxFQUFqQixjQUFpQixFQUFqQixJQUFpQjtZQUFoQyxJQUFNLEtBQUs7WUFDWixLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzdCO0lBQ0wsQ0FBQztJQU9NLDJCQUFNLEdBQWIsVUFBYyxPQUFpQztRQUMzQyxHQUFHLENBQUMsQ0FBZ0IsVUFBaUIsRUFBakIsU0FBSSxDQUFDLFlBQVksRUFBakIsY0FBaUIsRUFBakIsSUFBaUI7WUFBaEMsSUFBTSxLQUFLO1lBQ1osS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFNTSw0QkFBTyxHQUFkLFVBQWUsS0FBVTtRQUNyQixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksZ0NBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUMzQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxrQ0FBcUIsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksbUNBQXNCLENBQUMsQ0FBQyxDQUFDO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLENBQUM7UUFDTCxDQUFDO1FBQ0QsR0FBRyxDQUFDLENBQWdCLFVBQWlCLEVBQWpCLFNBQUksQ0FBQyxZQUFZLEVBQWpCLGNBQWlCLEVBQWpCLElBQWlCO1lBQWhDLElBQU0sS0FBSztZQUNaLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBTU0sNkJBQVEsR0FBZixVQUFnQixVQUFzQjtRQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNaLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxnQ0FBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDO0lBQ0wsQ0FBQztJQU1NLGdDQUFXLEdBQWxCLFVBQW1CLFVBQXNCO1FBQ3JDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1osVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGtDQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdELENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQU1NLG1DQUFjLEdBQXJCO1FBQ0ksTUFBTSxDQUFDLElBQUksa0NBQXFCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDcEZEO0lBQUE7UUFDVyxNQUFDLEdBQVcsQ0FBQyxDQUFDO1FBQ2QsTUFBQyxHQUFXLENBQUMsQ0FBQztRQUNkLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsV0FBTSxHQUFXLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUQsNEJBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xELHFGQUFzQztBQUV0QyxrRkFBb0M7QUFFcEM7SUFBNkMsbUNBQVU7SUFJbkQseUJBQ1ksS0FBdUIsRUFDeEIsU0FBc0M7UUFBdEMsNENBQTJCLHNCQUFTLEVBQUU7UUFGakQsWUFJSSxpQkFBTyxTQUNWO1FBSlcsV0FBSyxHQUFMLEtBQUssQ0FBa0I7UUFDeEIsZUFBUyxHQUFULFNBQVMsQ0FBNkI7O0lBR2pELENBQUM7SUFFTSxnQ0FBTSxHQUFiLFVBQWMsT0FBaUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLENBQUMsU0FBUyxDQUNiLElBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUNoQixJQUFJLENBQUMsS0FBSyxFQUNWLElBQUksQ0FBQyxNQUFNLENBQ2QsQ0FBQztRQUNOLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFDRCxpQkFBTSxNQUFNLFlBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLHdDQUFjLEdBQXJCO1FBQ0ksSUFBTSxNQUFNLEdBQUcsaUJBQU0sY0FBYyxXQUFFLENBQUM7UUFDdEMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMxQixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLENBbEM0Qyx1QkFBVSxHQWtDdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0Q7SUFBQTtJQUVBLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGRDtJQUFBO1FBQ1csTUFBQyxHQUFXLENBQUMsQ0FBQztRQUNkLE1BQUMsR0FBVyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0REO0lBR0ksZ0NBQW1CLEdBQVc7UUFBWCxRQUFHLEdBQUgsR0FBRyxDQUFRO1FBRnZCLFlBQU8sR0FBaUIsRUFBRSxDQUFDO0lBRUEsQ0FBQztJQUN2Qyw2QkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkQscUZBQXNDO0FBRXRDO0lBQTRDLHlCQUFVO0lBQXREOztJQU9BLENBQUM7SUFKVSxzQkFBTSxHQUFiLFVBQWMsT0FBaUM7UUFDM0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsaUJBQU0sTUFBTSxZQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxDQVAyQyx1QkFBVSxHQU9yRDs7Ozs7Ozs7Ozs7Ozs7OztBQ0hEO0lBSUksZUFDWSxTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBSnpCLE1BQUMsR0FBVyxDQUFDLENBQUM7UUFDZCxNQUFDLEdBQVcsQ0FBQyxDQUFDO0lBSWpCLENBQUM7SUFFRSxzQkFBTSxHQUFiLFVBQWMsV0FBbUI7UUFDN0IsSUFBTSxFQUFFLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN6QyxJQUFNLEVBQUUsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDcEJELDJGQUEwQztBQUcxQztJQUtJLCtCQUFvQixLQUFZO1FBQVosVUFBSyxHQUFMLEtBQUssQ0FBTztRQUp4QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGlCQUFZLEdBQWlCLElBQUkseUJBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFHbEUsQ0FBQztJQUVNLHNDQUFNLEdBQWIsVUFBYyxXQUFtQjtRQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELElBQUksZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1FBQ25DLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLENBQUM7UUFDMUQsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3pDLENBQUM7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFTSxvQ0FBSSxHQUFYLFVBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxRQUFnQjtRQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO0lBQ2pDLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JELG1HQUFrRDtBQUNsRCx3SEFBZ0U7QUFDaEUsNkZBQThDO0FBRTlDLHlHQUFzRDtBQUN0RCwwRkFBNEM7QUFDNUMsOEVBQW9DO0FBQ3BDLDhIQUFvRTtBQUdwRTtJQUFvQywwQkFBVTtJQVUxQyxnQkFDWSxPQUF1QjtRQURuQyxZQUdJLGlCQUFPLFNBRVY7UUFKVyxhQUFPLEdBQVAsT0FBTyxDQUFnQjtRQVIzQixtQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixnQkFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGVBQVMsR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQztRQUM1QixXQUFLLEdBQUcsSUFBSSxrQkFBSyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxTQUFHLEdBQUcsSUFBSSx5QkFBWSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxhQUFPLEdBQUcsSUFBSSxrQ0FBcUIsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFNcEQsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDOztJQUM1QyxDQUFDO0lBRU0sdUJBQU0sR0FBYixVQUFjLFdBQW1CO1FBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixpQkFBTSxNQUFNLFlBQUMsV0FBVyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLHVCQUFNLEdBQWIsVUFBYyxPQUFpQztRQUMzQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUYsaUJBQU0sTUFBTSxZQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSx3QkFBTyxHQUFkLFVBQWUsS0FBVTtRQUNyQixpQkFBTSxPQUFPLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLDJCQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxnQ0FBbUIsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQy9DLENBQUM7SUFDTCxDQUFDO0lBRU0sK0JBQWMsR0FBckI7UUFDSSxJQUFNLE1BQU0sR0FBRyxpQkFBTSxjQUFjLFdBQUUsQ0FBQztRQUN0QyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxtQ0FBa0IsR0FBMUIsVUFBMkIsV0FBbUI7UUFDMUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxXQUFXLENBQUM7UUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztZQUN4RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUN4QixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUExRGEsWUFBSyxHQUFHLEVBQUUsQ0FBQztJQUNYLGFBQU0sR0FBRyxFQUFFLENBQUM7SUEwRDlCLGFBQUM7Q0FBQSxDQTVEbUMsdUJBQVUsR0E0RDdDO3FCQTVEb0IsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1YzQiw0R0FBd0Q7QUFDeEQseUdBQXNEO0FBQ3RELDhFQUFvQztBQUlwQyxtRkFBc0M7QUFFdEM7SUFBNkMsbUNBQUs7SUFLOUMseUJBQ1ksT0FBdUIsRUFDdkIsS0FBYTtRQUZ6QixZQUlJLGlCQUFPLFNBSVY7UUFQVyxhQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixXQUFLLEdBQUwsS0FBSyxDQUFRO1FBTmpCLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsV0FBSyxHQUFHLEdBQUcsQ0FBQztRQU9oQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMxQixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksNEJBQWUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDOztJQUNMLENBQUM7SUFFTSxnQ0FBTSxHQUFiLFVBQWMsV0FBbUI7UUFDN0IsaUJBQU0sTUFBTSxZQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQUVNLHNDQUFZLEdBQW5CO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxDQUFDO0lBQ0wsQ0FBQztJQUVNLGdDQUFNLEdBQWIsVUFBYyxPQUFpQztRQUMzQyxpQkFBTSxNQUFNLFlBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDdkIsT0FBTyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDOUIsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1FBQ3BELE9BQU8sQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxRQUFRLENBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsRUFDMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7UUFDakMsT0FBTyxDQUFDLFFBQVEsQ0FDWixJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDM0IsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxpQ0FBTyxHQUFkLFVBQWUsS0FBVTtRQUNyQixpQkFBTSxPQUFPLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLDJCQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7SUFDTCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLENBM0Q0QyxrQkFBSyxHQTJEakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkVELGtIQUE0RDtBQUM1RCw0R0FBd0Q7QUFDeEQsaUlBQXNFO0FBQ3RFLDhFQUFvQztBQUNwQyx1RUFBOEI7QUFDOUIsa0dBQWdEO0FBR2hELHNGQUF3QztBQUN4QywrRkFBOEM7QUFDOUMsa0dBQWdEO0FBRWhEO0lBQXlDLCtCQUFLO0lBTTFDLHFCQUNZLE9BQXVCO1FBRG5DLFlBR0ksaUJBQU8sU0FPVjtRQVRXLGFBQU8sR0FBUCxPQUFPLENBQWdCO1FBTjNCLGtCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLFdBQUssR0FBRyxDQUFDLENBQUM7UUFFVix1QkFBaUIsR0FBRyxJQUFJLDhCQUFpQixFQUFFLENBQUM7UUFNaEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLDRCQUFlLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQztRQUNELEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxtQkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSwyQkFBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O0lBQy9DLENBQUM7SUFFTSw0QkFBTSxHQUFiLFVBQWMsV0FBbUI7UUFDN0IsaUJBQU0sTUFBTSxZQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFCLElBQU0sVUFBVSxHQUFHLElBQUksbUNBQXNCLENBQUMsd0JBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUM3QixDQUFDO1FBQ0QsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzdCLENBQUM7SUFDTCxDQUFDO0lBRU0sNEJBQU0sR0FBYixVQUFjLE9BQWlDO1FBQzNDLGlCQUFNLE1BQU0sWUFBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxrQ0FBWSxHQUFuQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLDRCQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLDZCQUFPLEdBQWQsVUFBZSxLQUFVO1FBQ3JCLGlCQUFNLE9BQU8sWUFBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksNEJBQWUsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBRU8saUNBQVcsR0FBbkIsVUFBb0IsT0FBaUM7UUFDakQsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDM0IsT0FBTyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDN0IsT0FBTyxDQUFDLElBQUksR0FBRyxzQkFBc0IsQ0FBQztRQUN0QyxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUM5QixPQUFPLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUMxQixPQUFPLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUMxQixPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUN2QixPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUM1QixPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxDQS9Ed0Msa0JBQUssR0ErRDdDOzs7Ozs7Ozs7Ozs7Ozs7O0FDakRELHVCQUE4QixPQUFZO0lBQ3RDLE1BQU0sQ0FBQztRQUNILGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZTtRQUN4QyxlQUFlLEVBQUUsT0FBTyxDQUFDLGVBQWU7UUFDeEMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLGtCQUFrQixJQUFJLEdBQUc7UUFDckQsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixJQUFJLENBQUMsR0FBRztRQUNsRCxxQkFBcUIsRUFBRSxPQUFPLENBQUMscUJBQXFCLElBQUkscUNBQXFDO1FBQzdGLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSwwQkFBMEI7UUFDOUUsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixJQUFJLEdBQUc7UUFDekQsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO1FBQ2xDLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztRQUM1QixrQkFBa0IsRUFBRSxPQUFPLENBQUMsa0JBQWtCLElBQUksT0FBTztRQUN6RCxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLElBQUksZUFBZTtRQUM3RCxjQUFjLEVBQUUsT0FBTyxDQUFDLGNBQWMsSUFBSSxpQkFBaUI7UUFDM0QsV0FBVyxFQUFFLE9BQU8sQ0FBQyxTQUFTLElBQUk7WUFDOUIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixPQUFPLEVBQUUsR0FBRztZQUNaLFNBQVMsRUFBRSxHQUFHO1lBQ2QsS0FBSyxFQUFFLEVBQUU7U0FDWjtRQUNELFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtLQUNyQyxDQUFDO0FBQ04sQ0FBQztBQXRCRCxzQ0FzQkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoREQsNEdBQXdEO0FBQ3hELHlHQUFzRDtBQUN0RCw4RUFBb0M7QUFFcEMsc0ZBQXdDO0FBR3hDO0lBQXdDLDhCQUFLO0lBR3pDLG9CQUNZLE9BQXVCO1FBRG5DLFlBR0ksaUJBQU8sU0FJVjtRQU5XLGFBQU8sR0FBUCxPQUFPLENBQWdCO1FBSDNCLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFNNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLDRCQUFlLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQzs7SUFDTCxDQUFDO0lBRU0saUNBQVksR0FBbkI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxJQUFJLHdCQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDTCxDQUFDO0lBRU0sMkJBQU0sR0FBYixVQUFjLE9BQWlDO1FBQzNDLGlCQUFNLE1BQU0sWUFBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUN2QixPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUM5QixPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUM7UUFDcEQsT0FBTyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7UUFDaEMsT0FBTyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDN0IsT0FBTyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUM7UUFDOUIsT0FBTyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDakMsT0FBTyxDQUFDLFFBQVEsQ0FDWixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7UUFDakMsT0FBTyxDQUFDLFFBQVEsQ0FDWixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDM0IsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSw0QkFBTyxHQUFkLFVBQWUsS0FBVTtRQUNyQixpQkFBTSxPQUFPLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLDJCQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7SUFDTCxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLENBaER1QyxrQkFBSyxHQWdENUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkRELHdIQUFnRTtBQUNoRSw2RkFBOEM7QUFDOUMsNEdBQXdEO0FBQ3hELDBGQUE0QztBQUM1Qyw4RUFBb0M7QUFHcEM7SUFBeUMsK0JBQVU7SUFRL0MscUJBQ1ksT0FBdUIsRUFDdkIsV0FBbUI7UUFGL0IsWUFJSSxpQkFBTyxTQVVWO1FBYlcsYUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsaUJBQVcsR0FBWCxXQUFXLENBQVE7UUFQdkIsZUFBUyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDO1FBRzVCLFdBQUssR0FBRyxJQUFJLGtCQUFLLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBT3RDLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSw0QkFBZSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RCxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksNEJBQWUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUMzQyxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQzlDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQzs7SUFDbkQsQ0FBQztJQUVNLDRCQUFNLEdBQWIsVUFBYyxXQUFtQjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQy9DLGlCQUFNLE1BQU0sWUFBQyxXQUFXLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sdUNBQWlCLEdBQXhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sNkJBQU8sR0FBZCxVQUFlLEtBQVU7UUFDckIsaUJBQU0sT0FBTyxZQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxnQ0FBbUIsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7WUFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUMsQ0FBQztJQUNMLENBQUM7SUE1Q2EsbUJBQU8sR0FBRyxNQUFNLENBQUM7SUFDaEIscUJBQVMsR0FBVyxFQUFFLENBQUM7SUE0QzFDLGtCQUFDO0NBQUEsQ0E5Q3dDLHVCQUFVLEdBOENsRDtxQkE5Q29CLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQaEMsNkZBQThDO0FBRTlDLHNGQUF3QztBQUN4QyxrR0FBZ0Q7QUFFaEQ7SUFBNEMsa0NBQVU7SUFJbEQsd0JBQ1ksT0FBdUI7UUFEbkMsWUFHSSxpQkFBTyxTQUVWO1FBSlcsYUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFKM0IsV0FBSyxHQUFrQixFQUFFLENBQUM7UUFPOUIsS0FBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7O0lBQ2xFLENBQUM7SUFFTSwrQkFBTSxHQUFiLFVBQWMsV0FBbUI7UUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFdBQVcsQ0FBQztRQUNwRCxFQUFFLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztZQUN0RCxJQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7WUFDMUIsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDOUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9FLElBQU0sV0FBVyxHQUFHLGNBQWMsR0FBRyxZQUFZLENBQUM7WUFDbEQsSUFBTSxJQUFJLEdBQUcsSUFBSSx3QkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUM7WUFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksNEJBQWUsRUFBRSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7UUFDbEMsaUJBQU0sTUFBTSxZQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQ0EvQjJDLHVCQUFVLEdBK0JyRDs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDRDtJQUFBO0lBRUEsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hcHAudHNcIik7XG4iLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9lbmdpbmUvR2FtZVwiO1xyXG5pbXBvcnQgR2FtZU9iamVjdCBmcm9tIFwiLi9lbmdpbmUvR2FtZU9iamVjdFwiO1xyXG5pbXBvcnQgQm91bmN5IGZyb20gXCIuL2dhbWUvQm91bmN5XCI7XHJcbmltcG9ydCBJQm91bmN5T3B0aW9ucywgeyBhcHBseURlZmF1bHRzIH0gZnJvbSBcIi4vZ2FtZS9JQm91bmN5T3B0aW9uc1wiO1xyXG5pbXBvcnQgSW50cm9TY2VuZSBmcm9tIFwiLi9nYW1lL0ludHJvU2NlbmVcIjtcclxuXHJcbih3aW5kb3cgYXMgYW55KS5zdGFydEJvdW5jeUFueXRoaW5nID0gKG9wdGlvbnM6IElCb3VuY3lPcHRpb25zKSA9PiB7XHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgY2FudmFzLndpZHRoID0gNjQwO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IDQ4MDtcclxuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IFwiNjQwcHhcIjtcclxuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjQ4MHB4XCI7XHJcbiAgICBjYW52YXMuc3R5bGUuYm9yZGVyID0gXCJzb2xpZCAxcHggYmxhY2tcIjtcclxuICAgIG9wdGlvbnMuY29udGFpbmVyLmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShuZXcgSW50cm9TY2VuZShhcHBseURlZmF1bHRzKG9wdGlvbnMpKSwgY29udGV4dCk7XHJcbiAgICBnYW1lLndpZHRoID0gNjQwO1xyXG4gICAgZ2FtZS5oZWlnaHQgPSA0ODA7XHJcbiAgICBnYW1lLnN0YXJ0KCk7XHJcbiAgICAod2luZG93IGFzIGFueSkuc3RvcEJvdW5jeUFueXRoaW5nID0gKCkgPT4ge1xyXG4gICAgICAgIGdhbWUuc3RvcCgpO1xyXG4gICAgfTtcclxufTtcclxuIiwiaW1wb3J0IFNwZWVkIGZyb20gXCIuL1NwZWVkXCI7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBhY2NlbGVyYXRpb25cclxuICogVW5pdHMgYXJlIGluIHBpeGVscy9zXjJcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjY2VsZXJhdGlvbiB7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyB5OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgc3BlZWQ6IFNwZWVkLFxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGVsYXBzZWRUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkWCA9IChlbGFwc2VkVGltZSAqIHRoaXMueCkgLyAxMDAwO1xyXG4gICAgICAgIGNvbnN0IGRZID0gKGVsYXBzZWRUaW1lICogdGhpcy55KSAvIDEwMDA7XHJcbiAgICAgICAgdGhpcy5zcGVlZC54ICs9IGRYO1xyXG4gICAgICAgIHRoaXMuc3BlZWQueSArPSBkWTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRhY2hlZFRvR2FtZUV2ZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBnYW1lOiBHYW1lLFxyXG4gICAgKSB7IH1cclxufVxyXG4iLCJpbXBvcnQgR2FtZU9iamVjdCBmcm9tIFwiLi9HYW1lT2JqZWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaXNpb25EZXRlY3RvciB7XHJcbiAgICBwdWJsaWMgY29sbGlkZXNXaXRoQW55KG8xOiBHYW1lT2JqZWN0LCBvdGhlcnM6IEdhbWVPYmplY3RbXSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgbyBvZiBvdGhlcnMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29sbGlkZXMobzEsIG8pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbGxpZGVzKG8xOiBHYW1lT2JqZWN0LCBvMjogR2FtZU9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGMxID0gbzEuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgICAgICBjb25zdCBjMiA9IG8yLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICAgICAgY29uc3QgbWluWCA9IGMyLng7XHJcbiAgICAgICAgY29uc3QgbWF4WCA9IGMyLnggKyBjMi53aWR0aDtcclxuICAgICAgICBjb25zdCBtaW5ZID0gYzIueTtcclxuICAgICAgICBjb25zdCBtYXhZID0gYzIueSArIGMyLmhlaWdodDtcclxuICAgICAgICAvLyBjaGVjayB1cHBlciBsZWZ0IGNvcm5lclxyXG4gICAgICAgIGlmICh0aGlzLmlzSW5zaWRlKGMxLngsIGMxLnksIG1pblgsIG1heFgsIG1pblksIG1heFkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB1cHBlciByaWdodCBjb3JuZXJcclxuICAgICAgICBpZiAodGhpcy5pc0luc2lkZShjMS54ICsgYzEud2lkdGgsIGMxLnksIG1pblgsIG1heFgsIG1pblksIG1heFkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsb3dlciBsZWZ0IGNvcm5lclxyXG4gICAgICAgIGlmICh0aGlzLmlzSW5zaWRlKGMxLngsIGMxLnkgKyBjMS5oZWlnaHQsIG1pblgsIG1heFgsIG1pblksIG1heFkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsb3dlciByaWdodCBjb3JuZXJcclxuICAgICAgICBpZiAodGhpcy5pc0luc2lkZShjMS54ICsgYzEud2lkdGgsIGMxLnkgKyBjMS5oZWlnaHQsIG1pblgsIG1heFgsIG1pblksIG1heFkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0luc2lkZSh4OiBudW1iZXIsIHk6IG51bWJlciwgbWluWDogbnVtYmVyLCBtYXhYOiBudW1iZXIsIG1pblk6IG51bWJlciwgbWF4WTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgaXNYaW5zaWRlID0gdGhpcy5pc0JldHdlZW4oeCwgbWluWCwgbWF4WCk7XHJcbiAgICAgICAgY29uc3QgaXNZaW5zaWRlID0gdGhpcy5pc0JldHdlZW4oeSwgbWluWSwgbWF4WSk7XHJcbiAgICAgICAgcmV0dXJuIGlzWGluc2lkZSAmJiBpc1lpbnNpZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0JldHdlZW4oeDogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gbWluIDwgeCAmJiBtYXggPiB4O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERldGFjaGVkRnJvbUdhbWVFdmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZ2FtZTogR2FtZSxcclxuICAgICkgeyB9XHJcbn1cclxuIiwiaW1wb3J0IEF0dGFjaGVkVG9HYW1lRXZlbnQgZnJvbSBcIi4vQXR0YWNoZWRUb0dhbWVFdmVudFwiO1xyXG5pbXBvcnQgRGV0YWNoZWRGcm9tR2FtZUV2ZW50IGZyb20gXCIuL0RldGFjaGVkRnJvbUdhbWVFdmVudFwiO1xyXG5pbXBvcnQgTW91c2VEb3duRXZlbnQgZnJvbSBcIi4vTW91c2VEb3duRXZlbnRcIjtcclxuaW1wb3J0IFNjZW5lIGZyb20gXCIuL1NjZW5lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICAgIHB1YmxpYyB3aWR0aCA9IDgwMDtcclxuICAgIHB1YmxpYyBoZWlnaHQgPSA2MDA7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRTY2VuZTogU2NlbmU7XHJcbiAgICBwcml2YXRlIGlzU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBsYXN0VXBkYXRlVGltZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGluaXRpYWxTY2VuZTogU2NlbmUsXHJcbiAgICAgICAgcHJpdmF0ZSBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9IGluaXRpYWxTY2VuZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5pc1N0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGFzdFVwZGF0ZVRpbWUgPSArbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkV2ZW50KG5ldyBBdHRhY2hlZFRvR2FtZUV2ZW50KHRoaXMpKTtcclxuICAgICAgICB0aGlzLnJlcXVlc3ROZXh0RnJhbWUoKTtcclxuICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5vbk1vdXNlRG93bik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3AoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMub25Nb3VzZURvd24pO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uRXZlbnQobmV3IERldGFjaGVkRnJvbUdhbWVFdmVudCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5pc1N0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHVibGlzaEV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkV2ZW50KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTW91c2VEb3duID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uRXZlbnQobmV3IE1vdXNlRG93bkV2ZW50KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVxdWVzdE5leHRGcmFtZSA9ICgpID0+IHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMub25Mb29wKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTG9vcCA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNTdGFydGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSArbmV3IERhdGUoKTtcclxuICAgICAgICBjb25zdCBlbGFwc2VkVGltZSA9IGN1cnJlbnRUaW1lIC0gdGhpcy5sYXN0VXBkYXRlVGltZTtcclxuICAgICAgICB0aGlzLmxhc3RVcGRhdGVUaW1lID0gY3VycmVudFRpbWU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUudXBkYXRlKGVsYXBzZWRUaW1lKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5yZW5kZXIodGhpcy5jb250ZXh0KTtcclxuICAgICAgICBjb25zdCBuZXh0U2NlbmUgPSB0aGlzLmN1cnJlbnRTY2VuZS5nZXROZXh0U2NlbmUoKTtcclxuICAgICAgICBpZiAobmV4dFNjZW5lICYmIG5leHRTY2VuZSAhPT0gdGhpcy5jdXJyZW50U2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUub25FdmVudChuZXcgRGV0YWNoZWRGcm9tR2FtZUV2ZW50KHRoaXMpKTtcclxuICAgICAgICAgICAgbmV4dFNjZW5lLm9uRXZlbnQobmV3IEF0dGFjaGVkVG9HYW1lRXZlbnQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZSA9IG5leHRTY2VuZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0TmV4dEZyYW1lKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEF0dGFjaGVkVG9HYW1lRXZlbnQgZnJvbSBcIi4vQXR0YWNoZWRUb0dhbWVFdmVudFwiO1xyXG5pbXBvcnQgRGV0YWNoZWRGcm9tR2FtZUV2ZW50IGZyb20gXCIuL0RldGFjaGVkRnJvbUdhbWVFdmVudFwiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XHJcbmltcG9ydCBHYW1lT2JqZWN0Q29vcmRpbmF0ZXMgZnJvbSBcIi4vR2FtZU9iamVjdENvb3JkaW5hdGVzXCI7XHJcbmltcG9ydCBRdWVyeU9iamVjdHNCeVRhZ0V2ZW50IGZyb20gXCIuL1F1ZXJ5T2JqZWN0c0J5VGFnRXZlbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEdhbWVPYmplY3Qge1xyXG4gICAgcHVibGljIHRhZ3M6IHN0cmluZ1tdID0gW107XHJcbiAgICBwcm90ZWN0ZWQgY2hpbGRPYmplY3RzOiBHYW1lT2JqZWN0W10gPSBbXTtcclxuICAgIHByb3RlY3RlZCBnYW1lOiBHYW1lO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHRoZSBzdGF0ZSBvZiB0aGUgZ2FtZSBvYmplY3QuXHJcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBjYWxscyB1cGRhdGUgb24gYWxsIGNoaWxkIG9iamVjdHNcclxuICAgICAqIEBwYXJhbSBlbGFwc2VkVGltZSBUaGUgZWxhcHNlZCB0aW1lIGluIG1pbGxpc2Vjb25kcyBzaW5jZSB0aGUgbGFzdCB1cGRhdGUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cGRhdGUoZWxhcHNlZFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdGhpcy5jaGlsZE9iamVjdHMpIHtcclxuICAgICAgICAgICAgY2hpbGQudXBkYXRlKGVsYXBzZWRUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIEdhbWVPYmplY3Qgb24gYSBjYW52YXMuXHJcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBjYWxscyByZW5kZXIgb24gYWxsIGNoaWxkIG9iamVjdHMuXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVuZGVyKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xyXG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdGhpcy5jaGlsZE9iamVjdHMpIHtcclxuICAgICAgICAgICAgY2hpbGQucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBhbiBldmVudCBwcm9kdWNlZCBieSB0aGUgZ2FtZS5cclxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGZvcndhcmRzIHRoZSBldmVudCB0byBhbGwgY2hpbGQgb2JqZWN0cy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRXZlbnQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEF0dGFjaGVkVG9HYW1lRXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lID0gZXZlbnQuZ2FtZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgRGV0YWNoZWRGcm9tR2FtZUV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZSA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIFF1ZXJ5T2JqZWN0c0J5VGFnRXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGFncy5pbmRleE9mKGV2ZW50LnRhZykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5vYmplY3RzLnB1c2godGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB0aGlzLmNoaWxkT2JqZWN0cykge1xyXG4gICAgICAgICAgICBjaGlsZC5vbkV2ZW50KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBjaGlsZCBvYmplY3RcclxuICAgICAqIEBwYXJhbSBnYW1lT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRDaGlsZChnYW1lT2JqZWN0OiBHYW1lT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jaGlsZE9iamVjdHMucHVzaChnYW1lT2JqZWN0KTtcclxuICAgICAgICBpZiAodGhpcy5nYW1lKSB7XHJcbiAgICAgICAgICAgIGdhbWVPYmplY3Qub25FdmVudChuZXcgQXR0YWNoZWRUb0dhbWVFdmVudCh0aGlzLmdhbWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYSBjaGlsZCBvYmplY3RcclxuICAgICAqIEBwYXJhbSBnYW1lT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVDaGlsZChnYW1lT2JqZWN0OiBHYW1lT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNoaWxkT2JqZWN0cy5pbmRleE9mKGdhbWVPYmplY3QpO1xyXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGlsZE9iamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZSkge1xyXG4gICAgICAgICAgICAgICAgZ2FtZU9iamVjdC5vbkV2ZW50KG5ldyBEZXRhY2hlZEZyb21HYW1lRXZlbnQodGhpcy5nYW1lKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBnYW1lIG9iamVjdC5cclxuICAgICAqIFRoZSBjb29yZGluYXRlcyBjYW4gYmUgdXNlZCBmb3IgY29sbGlzaW9uIGRldGVjdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldENvb3JkaW5hdGVzKCk6IEdhbWVPYmplY3RDb29yZGluYXRlcyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHYW1lT2JqZWN0Q29vcmRpbmF0ZXMoKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT2JqZWN0Q29vcmRpbmF0ZXMge1xyXG4gICAgcHVibGljIHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlciA9IDA7XHJcbn1cclxuIiwiaW1wb3J0IEdhbWVPYmplY3QgZnJvbSBcIi4vR2FtZU9iamVjdFwiO1xyXG5pbXBvcnQgR2FtZU9iamVjdENvb3JkaW5hdGVzIGZyb20gXCIuL0dhbWVPYmplY3RDb29yZGluYXRlc1wiO1xyXG5pbXBvcnQgUGxhY2VtZW50IGZyb20gXCIuL1BsYWNlbWVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2VHYW1lT2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxyXG4gICAgICAgIHB1YmxpYyBwbGFjZW1lbnQ6IFBsYWNlbWVudCA9IG5ldyBQbGFjZW1lbnQoKSxcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy53aWR0aCB8fCB0aGlzLmhlaWdodCkge1xyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlbWVudC54LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZW1lbnQueSxcclxuICAgICAgICAgICAgICAgIHRoaXMud2lkdGgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLnBsYWNlbWVudC54LCB0aGlzLnBsYWNlbWVudC55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb29yZGluYXRlcygpOiBHYW1lT2JqZWN0Q29vcmRpbmF0ZXMge1xyXG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IHN1cGVyLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICAgICAgY29vcmRzLnggPSB0aGlzLnBsYWNlbWVudC54O1xyXG4gICAgICAgIGNvb3Jkcy55ID0gdGhpcy5wbGFjZW1lbnQueTtcclxuICAgICAgICBjb29yZHMud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICAgIGNvb3Jkcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgICByZXR1cm4gY29vcmRzO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdXNlRG93bkV2ZW50IHtcclxuXHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhY2VtZW50IHtcclxuICAgIHB1YmxpYyB4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHk6IG51bWJlciA9IDA7XHJcbn1cclxuIiwiaW1wb3J0IEdhbWVPYmplY3QgZnJvbSBcIi4vR2FtZU9iamVjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVlcnlPYmplY3RzQnlUYWdFdmVudCB7XHJcbiAgICBwdWJsaWMgb2JqZWN0czogR2FtZU9iamVjdFtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRhZzogc3RyaW5nKSB7IH1cclxufVxyXG4iLCJpbXBvcnQgR2FtZU9iamVjdCBmcm9tIFwiLi9HYW1lT2JqZWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBTY2VuZSBleHRlbmRzIEdhbWVPYmplY3Qge1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldE5leHRTY2VuZSgpOiBTY2VuZTtcclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLmhlaWdodCk7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBQbGFjZW1lbnQgZnJvbSBcIi4vUGxhY2VtZW50XCI7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBob3Jpem9udGFsIG9yIHZlcnRpY2FsIHNwZWVkXHJcbiAqIGluIHBpeGVscyBwZXIgc2Vjb25kXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGVlZCB7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyB5OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcGxhY2VtZW50OiBQbGFjZW1lbnQsXHJcbiAgICApIHsgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZWxhcHNlZFRpbWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRYID0gKGVsYXBzZWRUaW1lICogdGhpcy54KSAvIDEwMDA7XHJcbiAgICAgICAgY29uc3QgZFkgPSAoZWxhcHNlZFRpbWUgKiB0aGlzLnkpIC8gMTAwMDtcclxuICAgICAgICB0aGlzLnBsYWNlbWVudC54ICs9IGRYO1xyXG4gICAgICAgIHRoaXMucGxhY2VtZW50LnkgKz0gZFk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEFjY2VsZXJhdGlvbiBmcm9tIFwiLi9BY2NlbGVyYXRpb25cIjtcclxuaW1wb3J0IFNwZWVkIGZyb20gXCIuL1NwZWVkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZW1wb3JhcnlBY2NlbGVyYXRpb24ge1xyXG4gICAgcHJpdmF0ZSBkdXJhdGlvbjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgZHVyYXRpb25MZWZ0OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBhY2NlbGVyYXRpb246IEFjY2VsZXJhdGlvbiA9IG5ldyBBY2NlbGVyYXRpb24odGhpcy5zcGVlZCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcGVlZDogU3BlZWQpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGVsYXBzZWRUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5kdXJhdGlvbkxlZnQgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0aW1lVG9VcGRhdGVXaXRoID0gZWxhcHNlZFRpbWU7XHJcbiAgICAgICAgY29uc3QgbGVmdCA9IE1hdGgubWF4KDAsIHRoaXMuZHVyYXRpb25MZWZ0IC0gZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgIGlmIChsZWZ0ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRpbWVUb1VwZGF0ZVdpdGggPSB0aGlzLmR1cmF0aW9uTGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24udXBkYXRlKHRpbWVUb1VwZGF0ZVdpdGgpO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb25MZWZ0ID0gbGVmdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHVzaCh4OiBudW1iZXIsIHk6IG51bWJlciwgZHVyYXRpb246IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uLnggPSB4O1xyXG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb25MZWZ0ID0gZHVyYXRpb247XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEFjY2VsZXJhdGlvbiBmcm9tIFwiLi4vZW5naW5lL0FjY2VsZXJhdGlvblwiO1xyXG5pbXBvcnQgQXR0YWNoZWRUb0dhbWVFdmVudCBmcm9tIFwiLi4vZW5naW5lL0F0dGFjaGVkVG9HYW1lRXZlbnRcIjtcclxuaW1wb3J0IEdhbWVPYmplY3QgZnJvbSBcIi4uL2VuZ2luZS9HYW1lT2JqZWN0XCI7XHJcbmltcG9ydCBHYW1lT2JqZWN0Q29vcmRpbmF0ZXMgZnJvbSBcIi4uL2VuZ2luZS9HYW1lT2JqZWN0Q29vcmRpbmF0ZXNcIjtcclxuaW1wb3J0IE1vdXNlRG93bkV2ZW50IGZyb20gXCIuLi9lbmdpbmUvTW91c2VEb3duRXZlbnRcIjtcclxuaW1wb3J0IFBsYWNlbWVudCBmcm9tIFwiLi4vZW5naW5lL1BsYWNlbWVudFwiO1xyXG5pbXBvcnQgU3BlZWQgZnJvbSBcIi4uL2VuZ2luZS9TcGVlZFwiO1xyXG5pbXBvcnQgVGVtcG9yYXJ5QWNjZWxlcmF0aW9uIGZyb20gXCIuLi9lbmdpbmUvVGVtcG9yYXJ5QWNjZWxlcmF0aW9uXCI7XHJcbmltcG9ydCBJQm91bmN5T3B0aW9ucyBmcm9tIFwiLi9JQm91bmN5T3B0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm91bmN5IGV4dGVuZHMgR2FtZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHdpZHRoID0gMzI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGhlaWdodCA9IDMyO1xyXG4gICAgcHJpdmF0ZSBjeWNsZVRpbWVMZWZ0ID0gMDtcclxuICAgIHByaXZhdGUgaW1hZ2VJbmRleCA9IDA7XHJcbiAgICBwcml2YXRlIHBsYWNlbWVudCA9IG5ldyBQbGFjZW1lbnQoKTtcclxuICAgIHByaXZhdGUgc3BlZWQgPSBuZXcgU3BlZWQodGhpcy5wbGFjZW1lbnQpO1xyXG4gICAgcHJpdmF0ZSBhY2MgPSBuZXcgQWNjZWxlcmF0aW9uKHRoaXMuc3BlZWQpO1xyXG4gICAgcHJpdmF0ZSB0ZW1wQWNjID0gbmV3IFRlbXBvcmFyeUFjY2VsZXJhdGlvbih0aGlzLnNwZWVkKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIG9wdGlvbnM6IElCb3VuY3lPcHRpb25zLFxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmFjYy55ID0gb3B0aW9ucy5ib3VuY3lBY2NlbGVyYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShlbGFwc2VkVGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDeWNsZWRJbWFnZXMoZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgIHRoaXMuYWNjLnVwZGF0ZShlbGFwc2VkVGltZSk7XHJcbiAgICAgICAgdGhpcy50ZW1wQWNjLnVwZGF0ZShlbGFwc2VkVGltZSk7XHJcbiAgICAgICAgdGhpcy5zcGVlZC51cGRhdGUoZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShlbGFwc2VkVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBpbWFnZSA9IHRoaXMub3B0aW9ucy5ib3VuY3lJbWFnZXNbdGhpcy5pbWFnZUluZGV4XTtcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5wbGFjZW1lbnQueCwgdGhpcy5wbGFjZW1lbnQueSwgQm91bmN5LndpZHRoLCBCb3VuY3kuaGVpZ2h0KTtcclxuICAgICAgICBzdXBlci5yZW5kZXIoY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRXZlbnQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE1vdXNlRG93bkV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BlZWQueSA9IHRoaXMub3B0aW9ucy5ib3VuY3lDbGlja1NwZWVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBBdHRhY2hlZFRvR2FtZUV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxhY2VtZW50LnggPSBldmVudC5nYW1lLndpZHRoICogMC4yNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENvb3JkaW5hdGVzKCk6IEdhbWVPYmplY3RDb29yZGluYXRlcyB7XHJcbiAgICAgICAgY29uc3QgY29vcmRzID0gc3VwZXIuZ2V0Q29vcmRpbmF0ZXMoKTtcclxuICAgICAgICBjb29yZHMueCA9IHRoaXMucGxhY2VtZW50Lng7XHJcbiAgICAgICAgY29vcmRzLnkgPSB0aGlzLnBsYWNlbWVudC55O1xyXG4gICAgICAgIGNvb3Jkcy53aWR0aCA9IEJvdW5jeS53aWR0aDtcclxuICAgICAgICBjb29yZHMuaGVpZ2h0ID0gQm91bmN5LmhlaWdodDtcclxuICAgICAgICByZXR1cm4gY29vcmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlQ3ljbGVkSW1hZ2VzKGVsYXBzZWRUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN5Y2xlVGltZUxlZnQgLT0gZWxhcHNlZFRpbWU7XHJcbiAgICAgICAgaWYgKHRoaXMuY3ljbGVUaW1lTGVmdCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jeWNsZVRpbWVMZWZ0ICs9IHRoaXMub3B0aW9ucy5ib3VuY3lJbWFnZUN5Y2xlVGltZTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZUluZGV4Kys7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLmJvdW5jeUltYWdlc1t0aGlzLmltYWdlSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBJbWFnZUdhbWVPYmplY3QgZnJvbSBcIi4uL2VuZ2luZS9JbWFnZUdhbWVPYmplY3RcIjtcclxuaW1wb3J0IE1vdXNlRG93bkV2ZW50IGZyb20gXCIuLi9lbmdpbmUvTW91c2VEb3duRXZlbnRcIjtcclxuaW1wb3J0IFNjZW5lIGZyb20gXCIuLi9lbmdpbmUvU2NlbmVcIjtcclxuaW1wb3J0IEJvdW5jeSBmcm9tIFwiLi9Cb3VuY3lcIjtcclxuaW1wb3J0IEJvdW5jeVNjZW5lIGZyb20gXCIuL0JvdW5jeVNjZW5lXCI7XHJcbmltcG9ydCBJQm91bmN5T3B0aW9ucyBmcm9tIFwiLi9JQm91bmN5T3B0aW9uc1wiO1xyXG5pbXBvcnQgSW50cm9TY2VuZSBmcm9tIFwiLi9JbnRyb1NjZW5lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3VuY3lEZWFkU2NlbmUgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICBwcml2YXRlIGlzT3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc0RlbGF5UGFzc2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGRlbGF5ID0gNTAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgb3B0aW9uczogSUJvdW5jeU9wdGlvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBzY29yZTogbnVtYmVyLFxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAob3B0aW9ucy5iYWNrZ3JvdW5kSW1hZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChuZXcgSW1hZ2VHYW1lT2JqZWN0KG9wdGlvbnMuYmFja2dyb3VuZEltYWdlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZWxhcHNlZFRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShlbGFwc2VkVGltZSk7XHJcbiAgICAgICAgdGhpcy5kZWxheSAtPSBlbGFwc2VkVGltZTtcclxuICAgICAgICBpZiAodGhpcy5kZWxheSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pc0RlbGF5UGFzc2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5leHRTY2VuZSgpOiBTY2VuZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNPdmVyICYmIHRoaXMuaXNEZWxheVBhc3NlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEludHJvU2NlbmUodGhpcy5vcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZW5kZXIoY29udGV4dCk7XHJcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XHJcbiAgICAgICAgY29udGV4dC5zaGFkb3dCbHVyID0gNDtcclxuICAgICAgICBjb250ZXh0LnNoYWRvd0NvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5vcHRpb25zLmludHJvVGV4dEZpbGxTdHlsZTtcclxuICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIGNvbnRleHQuZm9udCA9IFwiNDhweCBjdXJzaXZlXCI7XHJcbiAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFwiMnB4IGJsdWVcIjtcclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KFxyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYm91bmN5RGVhZFRleHRUaXRsZS5yZXBsYWNlKFwie3Njb3JlfVwiLCB0aGlzLnNjb3JlLnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWUud2lkdGggLyAyLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWUuaGVpZ2h0ICogMC4zLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWUud2lkdGggKiAwLjYpO1xyXG4gICAgICAgIGNvbnRleHQuZm9udCA9IFwiMjRweCBzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmJvdW5jeURlYWRUZXh0TWVzc2FnZSxcclxuICAgICAgICAgICAgdGhpcy5nYW1lLndpZHRoIC8gMixcclxuICAgICAgICAgICAgdGhpcy5nYW1lLmhlaWdodCAqIDAuNyxcclxuICAgICAgICAgICAgdGhpcy5nYW1lLndpZHRoICogMC42KTtcclxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25FdmVudChldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25FdmVudChldmVudCk7XHJcbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTW91c2VEb3duRXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc092ZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQ29sbGlzaW9uRGV0ZWN0b3IgZnJvbSBcIi4uL2VuZ2luZS9Db2xsaXNpb25EZXRlY3RvclwiO1xyXG5pbXBvcnQgSW1hZ2VHYW1lT2JqZWN0IGZyb20gXCIuLi9lbmdpbmUvSW1hZ2VHYW1lT2JqZWN0XCI7XHJcbmltcG9ydCBRdWVyeU9iamVjdHNCeVRhZ0V2ZW50IGZyb20gXCIuLi9lbmdpbmUvUXVlcnlPYmplY3RzQnlUYWdFdmVudFwiO1xyXG5pbXBvcnQgU2NlbmUgZnJvbSBcIi4uL2VuZ2luZS9TY2VuZVwiO1xyXG5pbXBvcnQgQm91bmN5IGZyb20gXCIuL0JvdW5jeVwiO1xyXG5pbXBvcnQgQm91bmN5RGVhZFNjZW5lIGZyb20gXCIuL0JvdW5jeURlYWRTY2VuZVwiO1xyXG5pbXBvcnQgSUJvdW5jeU9wdGlvbnMgZnJvbSBcIi4vSUJvdW5jeU9wdGlvbnNcIjtcclxuaW1wb3J0IEludHJvU2NlbmUgZnJvbSBcIi4vSW50cm9TY2VuZVwiO1xyXG5pbXBvcnQgUGFpck9mUGlwZXMgZnJvbSBcIi4vUGFpck9mUGlwZXNcIjtcclxuaW1wb3J0IFBpcGVDb250cm9sbGVyIGZyb20gXCIuL1BpcGVDb250cm9sbGVyXCI7XHJcbmltcG9ydCBQaXBlUGFzc2VkRXZlbnQgZnJvbSBcIi4vUGlwZVBhc3NlZEV2ZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3VuY3lTY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIHByaXZhdGUgaXNCb3VuY3lEZWFkID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHNjb3JlID0gMDtcclxuICAgIHByaXZhdGUgYm91bmN5OiBCb3VuY3k7XHJcbiAgICBwcml2YXRlIGNvbGxpc2lvbkRldGVjdG9yID0gbmV3IENvbGxpc2lvbkRldGVjdG9yKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvcHRpb25zOiBJQm91bmN5T3B0aW9ucyxcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYmFja2dyb3VuZEltYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3IEltYWdlR2FtZU9iamVjdChvcHRpb25zLmJhY2tncm91bmRJbWFnZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJvdW5jeSA9IG5ldyBCb3VuY3kob3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJvdW5jeSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChuZXcgUGlwZUNvbnRyb2xsZXIob3B0aW9ucykpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZWxhcHNlZFRpbWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShlbGFwc2VkVGltZSk7XHJcbiAgICAgICAgY29uc3QgcXVlcnlQaXBlcyA9IG5ldyBRdWVyeU9iamVjdHNCeVRhZ0V2ZW50KFBhaXJPZlBpcGVzLnBpcGVUYWcpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5wdWJsaXNoRXZlbnQocXVlcnlQaXBlcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29sbGlzaW9uRGV0ZWN0b3IuY29sbGlkZXNXaXRoQW55KHRoaXMuYm91bmN5LCBxdWVyeVBpcGVzLm9iamVjdHMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNCb3VuY3lEZWFkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYm91bmN5WSA9IHRoaXMuYm91bmN5LmdldENvb3JkaW5hdGVzKCkueTtcclxuICAgICAgICBpZiAoYm91bmN5WSA8IC0zMCB8fCBib3VuY3lZID4gdGhpcy5nYW1lLmhlaWdodCArIDMwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNCb3VuY3lEZWFkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5yZW5kZXIoY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJTY29yZShjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmV4dFNjZW5lKCk6IFNjZW5lIHtcclxuICAgICAgICBpZiAodGhpcy5pc0JvdW5jeURlYWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCb3VuY3lEZWFkU2NlbmUodGhpcy5vcHRpb25zLCB0aGlzLnNjb3JlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRXZlbnQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIFBpcGVQYXNzZWRFdmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyU2NvcmUoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QWxpZ24gPSBcImxlZnRcIjtcclxuICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XHJcbiAgICAgICAgY29udGV4dC5mb250ID0gXCJib2xkIDE2cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIGNvbnRleHQuc2hhZG93Q29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgY29udGV4dC5zaGFkb3dPZmZzZXRYID0gMDtcclxuICAgICAgICBjb250ZXh0LnNoYWRvd09mZnNldFkgPSAwO1xyXG4gICAgICAgIGNvbnRleHQuc2hhZG93Qmx1ciA9IDE7XHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChcIlNjb3JlOiBcIiArIHRoaXMuc2NvcmUsIDEwLCAxMCk7XHJcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFBhaXJPZlBpcGVzIGZyb20gXCIuL1BhaXJPZlBpcGVzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbnRlcmZhY2UgSUJvdW5jeU9wdGlvbnMge1xyXG4gICAgYmFja2dyb3VuZEltYWdlPzogSFRNTEltYWdlRWxlbWVudDtcclxuICAgIGJvdW5jeUFjY2VsZXJhdGlvbjogbnVtYmVyO1xyXG4gICAgYm91bmN5Q2xpY2tTcGVlZDogbnVtYmVyO1xyXG4gICAgYm91bmN5RGVhZFRleHRNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBib3VuY3lEZWFkVGV4dFRpdGxlOiBzdHJpbmc7XHJcbiAgICBib3VuY3lJbWFnZUN5Y2xlVGltZTogbnVtYmVyO1xyXG4gICAgYm91bmN5SW1hZ2VzOiBIVE1MSW1hZ2VFbGVtZW50W107XHJcbiAgICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gICAgaW50cm9UZXh0RmlsbFN0eWxlOiBzdHJpbmc7XHJcbiAgICBpbnRyb1RleHRNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBpbnRyb1RleHRUaXRsZTogc3RyaW5nO1xyXG4gICAgdG9wUGlwZUltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgYm90dG9tUGlwZUltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgcGlwZU9wdGlvbnM6IElQaXBlT3B0aW9ucztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUGlwZU9wdGlvbnMge1xyXG4gICAgYWRkUGlwZUZyZXF1ZW5jeTogbnVtYmVyO1xyXG4gICAgcGlwZVNwZWVkOiBudW1iZXI7XHJcbiAgICBnYXBTaXplOiBudW1iZXI7XHJcbiAgICBzcGVlZDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlEZWZhdWx0cyhvcHRpb25zOiBhbnkpOiBJQm91bmN5T3B0aW9ucyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogb3B0aW9ucy5iYWNrZ3JvdW5kSW1hZ2UsXHJcbiAgICAgICAgYm90dG9tUGlwZUltYWdlOiBvcHRpb25zLmJvdHRvbVBpcGVJbWFnZSxcclxuICAgICAgICBib3VuY3lBY2NlbGVyYXRpb246IG9wdGlvbnMuYm91bmN5QWNjZWxlcmF0aW9uIHx8IDMwMCxcclxuICAgICAgICBib3VuY3lDbGlja1NwZWVkOiBvcHRpb25zLmJvdW5jeUNsaWNrU3BlZWQgfHwgLTI1MCxcclxuICAgICAgICBib3VuY3lEZWFkVGV4dE1lc3NhZ2U6IG9wdGlvbnMuYm91bmN5RGVhZFRleHRNZXNzYWdlIHx8IFwiQ2xpY2sgdG8gZ28gYmFjayB0byB0aGUgbWFpbiBzY3JlZW5cIixcclxuICAgICAgICBib3VuY3lEZWFkVGV4dFRpdGxlOiBvcHRpb25zLmJvdW5jeURlYWRUZXh0VGl0bGUgfHwgXCJZb3UgZGllZC4gU2NvcmU6IHtzY29yZX1cIixcclxuICAgICAgICBib3VuY3lJbWFnZUN5Y2xlVGltZTogb3B0aW9ucy5ib3VuY3lJbWFnZUN5Y2xlVGltZSB8fCAyMDAsXHJcbiAgICAgICAgYm91bmN5SW1hZ2VzOiBvcHRpb25zLmJvdW5jeUltYWdlcyxcclxuICAgICAgICBjb250YWluZXI6IG9wdGlvbnMuY29udGFpbmVyLFxyXG4gICAgICAgIGludHJvVGV4dEZpbGxTdHlsZTogb3B0aW9ucy5pbnRyb1RleHRGaWxsU3R5bGUgfHwgXCJ3aGl0ZVwiLFxyXG4gICAgICAgIGludHJvVGV4dE1lc3NhZ2U6IG9wdGlvbnMuaW50cm9UZXh0TWVzc2FnZSB8fCBcIkNsaWNrIHRvIHBsYXlcIixcclxuICAgICAgICBpbnRyb1RleHRUaXRsZTogb3B0aW9ucy5pbnRyb1RleHRUaXRsZSB8fCBcIkJvdW5jeSBhbnl0aGluZ1wiLFxyXG4gICAgICAgIHBpcGVPcHRpb25zOiBvcHRpb25zLnBpcGVTcGVlZCB8fCB7XHJcbiAgICAgICAgICAgIGFkZFBpcGVGcmVxdWVuY3k6IDIwMDAsXHJcbiAgICAgICAgICAgIGdhcFNpemU6IDE1MCxcclxuICAgICAgICAgICAgcGlwZVNwZWVkOiAyMDAsXHJcbiAgICAgICAgICAgIHNwZWVkOiAyMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvcFBpcGVJbWFnZTogb3B0aW9ucy50b3BQaXBlSW1hZ2UsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCBJbWFnZUdhbWVPYmplY3QgZnJvbSBcIi4uL2VuZ2luZS9JbWFnZUdhbWVPYmplY3RcIjtcclxuaW1wb3J0IE1vdXNlRG93bkV2ZW50IGZyb20gXCIuLi9lbmdpbmUvTW91c2VEb3duRXZlbnRcIjtcclxuaW1wb3J0IFNjZW5lIGZyb20gXCIuLi9lbmdpbmUvU2NlbmVcIjtcclxuaW1wb3J0IEJvdW5jeSBmcm9tIFwiLi9Cb3VuY3lcIjtcclxuaW1wb3J0IEJvdW5jeVNjZW5lIGZyb20gXCIuL0JvdW5jeVNjZW5lXCI7XHJcbmltcG9ydCBJQm91bmN5T3B0aW9ucyBmcm9tIFwiLi9JQm91bmN5T3B0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50cm9TY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIHByaXZhdGUgaXNPdmVyOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvcHRpb25zOiBJQm91bmN5T3B0aW9ucyxcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYmFja2dyb3VuZEltYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3IEltYWdlR2FtZU9iamVjdChvcHRpb25zLmJhY2tncm91bmRJbWFnZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmV4dFNjZW5lKCk6IFNjZW5lIHtcclxuICAgICAgICBpZiAodGhpcy5pc092ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCb3VuY3lTY2VuZSh0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlbmRlcihjb250ZXh0KTtcclxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgICAgICBjb250ZXh0LnNoYWRvd0JsdXIgPSA0O1xyXG4gICAgICAgIGNvbnRleHQuc2hhZG93Q29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLm9wdGlvbnMuaW50cm9UZXh0RmlsbFN0eWxlO1xyXG4gICAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJjZW50ZXJcIjtcclxuICAgICAgICBjb250ZXh0LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgY29udGV4dC5mb250ID0gXCI0OHB4IGN1cnNpdmVcIjtcclxuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gXCIycHggYmx1ZVwiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbnRyb1RleHRUaXRsZSxcclxuICAgICAgICAgICAgdGhpcy5nYW1lLndpZHRoIC8gMixcclxuICAgICAgICAgICAgdGhpcy5nYW1lLmhlaWdodCAqIDAuMyxcclxuICAgICAgICAgICAgdGhpcy5nYW1lLndpZHRoICogMC42KTtcclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBcIjI0cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbnRyb1RleHRNZXNzYWdlLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWUud2lkdGggLyAyLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWUuaGVpZ2h0ICogMC43LFxyXG4gICAgICAgICAgICB0aGlzLmdhbWUud2lkdGggKiAwLjYpO1xyXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkV2ZW50KGV2ZW50KTtcclxuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZURvd25FdmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzT3ZlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBBdHRhY2hlZFRvR2FtZUV2ZW50IGZyb20gXCIuLi9lbmdpbmUvQXR0YWNoZWRUb0dhbWVFdmVudFwiO1xyXG5pbXBvcnQgR2FtZU9iamVjdCBmcm9tIFwiLi4vZW5naW5lL0dhbWVPYmplY3RcIjtcclxuaW1wb3J0IEltYWdlR2FtZU9iamVjdCBmcm9tIFwiLi4vZW5naW5lL0ltYWdlR2FtZU9iamVjdFwiO1xyXG5pbXBvcnQgUGxhY2VtZW50IGZyb20gXCIuLi9lbmdpbmUvUGxhY2VtZW50XCI7XHJcbmltcG9ydCBTcGVlZCBmcm9tIFwiLi4vZW5naW5lL1NwZWVkXCI7XHJcbmltcG9ydCBJQm91bmN5T3B0aW9ucyBmcm9tIFwiLi9JQm91bmN5T3B0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFpck9mUGlwZXMgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcGlwZVRhZyA9IFwicGlwZVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGlwZVdpZHRoOiBudW1iZXIgPSA4MDtcclxuICAgIHByaXZhdGUgcGxhY2VtZW50ID0gbmV3IFBsYWNlbWVudCgpO1xyXG4gICAgcHJpdmF0ZSB0b3BQaXBlOiBJbWFnZUdhbWVPYmplY3Q7XHJcbiAgICBwcml2YXRlIGJvdHRvbVBpcGU6IEltYWdlR2FtZU9iamVjdDtcclxuICAgIHByaXZhdGUgc3BlZWQgPSBuZXcgU3BlZWQodGhpcy5wbGFjZW1lbnQpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgb3B0aW9uczogSUJvdW5jeU9wdGlvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBnYXBQb3NpdGlvbjogbnVtYmVyLFxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnRvcFBpcGUgPSBuZXcgSW1hZ2VHYW1lT2JqZWN0KG9wdGlvbnMudG9wUGlwZUltYWdlKTtcclxuICAgICAgICB0aGlzLmJvdHRvbVBpcGUgPSBuZXcgSW1hZ2VHYW1lT2JqZWN0KG9wdGlvbnMuYm90dG9tUGlwZUltYWdlKTtcclxuICAgICAgICB0aGlzLnRvcFBpcGUud2lkdGggPSBQYWlyT2ZQaXBlcy5waXBlV2lkdGg7XHJcbiAgICAgICAgdGhpcy5ib3R0b21QaXBlLndpZHRoID0gUGFpck9mUGlwZXMucGlwZVdpZHRoO1xyXG4gICAgICAgIHRoaXMudG9wUGlwZS50YWdzLnB1c2goUGFpck9mUGlwZXMucGlwZVRhZyk7XHJcbiAgICAgICAgdGhpcy5ib3R0b21QaXBlLnRhZ3MucHVzaChQYWlyT2ZQaXBlcy5waXBlVGFnKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMudG9wUGlwZSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJvdHRvbVBpcGUpO1xyXG4gICAgICAgIHRoaXMuc3BlZWQueCA9IC10aGlzLm9wdGlvbnMucGlwZU9wdGlvbnMuc3BlZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShlbGFwc2VkVGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zcGVlZC54ID0gLXRoaXMub3B0aW9ucy5waXBlT3B0aW9ucy5waXBlU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5zcGVlZC51cGRhdGUoZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgIHRoaXMudG9wUGlwZS5wbGFjZW1lbnQueCA9IHRoaXMucGxhY2VtZW50Lng7XHJcbiAgICAgICAgdGhpcy5ib3R0b21QaXBlLnBsYWNlbWVudC54ID0gdGhpcy5wbGFjZW1lbnQueDtcclxuICAgICAgICBzdXBlci51cGRhdGUoZWxhcHNlZFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc091dHNpZGVPZlNjcmVlbigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGFjZW1lbnQueCA8IC1QYWlyT2ZQaXBlcy5waXBlV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRXZlbnQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEF0dGFjaGVkVG9HYW1lRXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGFjZW1lbnQueCA9IHRoaXMuZ2FtZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy50b3BQaXBlLnBsYWNlbWVudC55ID0gLXRoaXMuZ2FtZS5oZWlnaHQgKyB0aGlzLmdhcFBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLmJvdHRvbVBpcGUucGxhY2VtZW50LnkgPSB0aGlzLmdhcFBvc2l0aW9uICsgdGhpcy5vcHRpb25zLnBpcGVPcHRpb25zLmdhcFNpemU7XHJcbiAgICAgICAgICAgIHRoaXMudG9wUGlwZS5oZWlnaHQgPSB0aGlzLmdhbWUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmJvdHRvbVBpcGUuaGVpZ2h0ID0gdGhpcy5nYW1lLmhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdhbWVPYmplY3QgZnJvbSBcIi4uL2VuZ2luZS9HYW1lT2JqZWN0XCI7XHJcbmltcG9ydCBJQm91bmN5T3B0aW9ucyBmcm9tIFwiLi9JQm91bmN5T3B0aW9uc1wiO1xyXG5pbXBvcnQgUGFpck9mUGlwZXMgZnJvbSBcIi4vUGFpck9mUGlwZXNcIjtcclxuaW1wb3J0IFBpcGVQYXNzZWRFdmVudCBmcm9tIFwiLi9QaXBlUGFzc2VkRXZlbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpcGVDb250cm9sbGVyIGV4dGVuZHMgR2FtZU9iamVjdCB7XHJcbiAgICBwcml2YXRlIHBpcGVzOiBQYWlyT2ZQaXBlc1tdID0gW107XHJcbiAgICBwcml2YXRlIHRpbWVMZWZ0VG9BZGRQaXBlOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvcHRpb25zOiBJQm91bmN5T3B0aW9ucyxcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy50aW1lTGVmdFRvQWRkUGlwZSA9IG9wdGlvbnMucGlwZU9wdGlvbnMuYWRkUGlwZUZyZXF1ZW5jeTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGVsYXBzZWRUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdGltZUxlZnQgPSB0aGlzLnRpbWVMZWZ0VG9BZGRQaXBlIC0gZWxhcHNlZFRpbWU7XHJcbiAgICAgICAgaWYgKHRpbWVMZWZ0IDwgMCkge1xyXG4gICAgICAgICAgICB0aW1lTGVmdCArPSB0aGlzLm9wdGlvbnMucGlwZU9wdGlvbnMuYWRkUGlwZUZyZXF1ZW5jeTtcclxuICAgICAgICAgICAgY29uc3QgbWluR2FwUG9zaXRpb24gPSAxMDtcclxuICAgICAgICAgICAgY29uc3QgcmFuZG9tT2Zmc2V0ID0gTWF0aC5yYW5kb20oKSAqXHJcbiAgICAgICAgICAgICAgICAodGhpcy5nYW1lLmhlaWdodCAtIDIgKiBtaW5HYXBQb3NpdGlvbiAtIHRoaXMub3B0aW9ucy5waXBlT3B0aW9ucy5nYXBTaXplKTtcclxuICAgICAgICAgICAgY29uc3QgZ2FwUG9zaXRpb24gPSBtaW5HYXBQb3NpdGlvbiArIHJhbmRvbU9mZnNldDtcclxuICAgICAgICAgICAgY29uc3QgcGlwZSA9IG5ldyBQYWlyT2ZQaXBlcyh0aGlzLm9wdGlvbnMsIGdhcFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChwaXBlKTtcclxuICAgICAgICAgICAgdGhpcy5waXBlcy5wdXNoKHBpcGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAodGhpcy5waXBlcy5sZW5ndGggPiAwICYmIHRoaXMucGlwZXNbMF0uaXNPdXRzaWRlT2ZTY3JlZW4oKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMucGlwZXNbMF0pO1xyXG4gICAgICAgICAgICB0aGlzLnBpcGVzLnNwbGljZSgwLCAxKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnB1Ymxpc2hFdmVudChuZXcgUGlwZVBhc3NlZEV2ZW50KCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVMZWZ0VG9BZGRQaXBlID0gdGltZUxlZnQ7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGVsYXBzZWRUaW1lKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQaXBlUGFzc2VkRXZlbnQge1xyXG5cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9