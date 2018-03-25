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
        bouncyDeadTextMessage: "Click to go back to the main screen",
        bouncyDeadTextTitle: "You died. Score: {score}",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL2VuZ2luZS9BY2NlbGVyYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL0F0dGFjaGVkVG9HYW1lRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL0NvbGxpc2lvbkRldGVjdG9yLnRzIiwid2VicGFjazovLy8uL2VuZ2luZS9EZXRhY2hlZEZyb21HYW1lRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL0dhbWVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL0dhbWVPYmplY3RDb29yZGluYXRlcy50cyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvSW1hZ2VHYW1lT2JqZWN0LnRzIiwid2VicGFjazovLy8uL2VuZ2luZS9Nb3VzZURvd25FdmVudC50cyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvUGxhY2VtZW50LnRzIiwid2VicGFjazovLy8uL2VuZ2luZS9RdWVyeU9iamVjdHNCeVRhZ0V2ZW50LnRzIiwid2VicGFjazovLy8uL2VuZ2luZS9TY2VuZS50cyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvU3BlZWQudHMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL1RlbXBvcmFyeUFjY2VsZXJhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9nYW1lL0JvdW5jeS50cyIsIndlYnBhY2s6Ly8vLi9nYW1lL0JvdW5jeURlYWRTY2VuZS50cyIsIndlYnBhY2s6Ly8vLi9nYW1lL0JvdW5jeVNjZW5lLnRzIiwid2VicGFjazovLy8uL2dhbWUvSUJvdW5jeU9wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vZ2FtZS9JbnRyb1NjZW5lLnRzIiwid2VicGFjazovLy8uL2dhbWUvUGFpck9mUGlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vZ2FtZS9QaXBlQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9n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LENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLDRCQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO1FBQ2xDLGlCQUFNLE1BQU0sWUFBQyxXQUFXLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLENBL0IyQyx1QkFBVSxHQStCckQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ0Q7SUFBQTtJQUVBLENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwLnRzXCIpO1xuIiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vZW5naW5lL0dhbWVcIjtcclxuaW1wb3J0IEdhbWVPYmplY3QgZnJvbSBcIi4vZW5naW5lL0dhbWVPYmplY3RcIjtcclxuaW1wb3J0IEJvdW5jeSBmcm9tIFwiLi9nYW1lL0JvdW5jeVwiO1xyXG5pbXBvcnQgSUJvdW5jeU9wdGlvbnMsIHsgYXBwbHlEZWZhdWx0cyB9IGZyb20gXCIuL2dhbWUvSUJvdW5jeU9wdGlvbnNcIjtcclxuaW1wb3J0IEludHJvU2NlbmUgZnJvbSBcIi4vZ2FtZS9JbnRyb1NjZW5lXCI7XHJcblxyXG4od2luZG93IGFzIGFueSkuc3RhcnRCb3VuY3lBbnl0aGluZyA9IChvcHRpb25zOiBJQm91bmN5T3B0aW9ucykgPT4ge1xyXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgIGNhbnZhcy53aWR0aCA9IDY0MDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSA0ODA7XHJcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSBcIjY0MHB4XCI7XHJcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCI0ODBweFwiO1xyXG4gICAgY2FudmFzLnN0eWxlLmJvcmRlciA9IFwic29saWQgMXB4IGJsYWNrXCI7XHJcbiAgICBvcHRpb25zLmNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUobmV3IEludHJvU2NlbmUoYXBwbHlEZWZhdWx0cyhvcHRpb25zKSksIGNvbnRleHQpO1xyXG4gICAgZ2FtZS53aWR0aCA9IDY0MDtcclxuICAgIGdhbWUuaGVpZ2h0ID0gNDgwO1xyXG4gICAgZ2FtZS5zdGFydCgpO1xyXG4gICAgKHdpbmRvdyBhcyBhbnkpLnN0b3BCb3VuY3lBbnl0aGluZyA9ICgpID0+IHtcclxuICAgICAgICBnYW1lLnN0b3AoKTtcclxuICAgIH07XHJcbn07XHJcbiIsImltcG9ydCBTcGVlZCBmcm9tIFwiLi9TcGVlZFwiO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgYWNjZWxlcmF0aW9uXHJcbiAqIFVuaXRzIGFyZSBpbiBwaXhlbHMvc14yXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY2NlbGVyYXRpb24ge1xyXG4gICAgcHVibGljIHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHNwZWVkOiBTcGVlZCxcclxuICAgICkgeyB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShlbGFwc2VkVGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZFggPSAoZWxhcHNlZFRpbWUgKiB0aGlzLngpIC8gMTAwMDtcclxuICAgICAgICBjb25zdCBkWSA9IChlbGFwc2VkVGltZSAqIHRoaXMueSkgLyAxMDAwO1xyXG4gICAgICAgIHRoaXMuc3BlZWQueCArPSBkWDtcclxuICAgICAgICB0aGlzLnNwZWVkLnkgKz0gZFk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXR0YWNoZWRUb0dhbWVFdmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwdWJsaWMgZ2FtZTogR2FtZSxcclxuICAgICkgeyB9XHJcbn1cclxuIiwiaW1wb3J0IEdhbWVPYmplY3QgZnJvbSBcIi4vR2FtZU9iamVjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGlzaW9uRGV0ZWN0b3Ige1xyXG4gICAgcHVibGljIGNvbGxpZGVzV2l0aEFueShvMTogR2FtZU9iamVjdCwgb3RoZXJzOiBHYW1lT2JqZWN0W10pOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG8gb2Ygb3RoZXJzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbGxpZGVzKG8xLCBvKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb2xsaWRlcyhvMTogR2FtZU9iamVjdCwgbzI6IEdhbWVPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBjMSA9IG8xLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICAgICAgY29uc3QgYzIgPSBvMi5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgICAgIGNvbnN0IG1pblggPSBjMi54O1xyXG4gICAgICAgIGNvbnN0IG1heFggPSBjMi54ICsgYzIud2lkdGg7XHJcbiAgICAgICAgY29uc3QgbWluWSA9IGMyLnk7XHJcbiAgICAgICAgY29uc3QgbWF4WSA9IGMyLnkgKyBjMi5oZWlnaHQ7XHJcbiAgICAgICAgLy8gY2hlY2sgdXBwZXIgbGVmdCBjb3JuZXJcclxuICAgICAgICBpZiAodGhpcy5pc0luc2lkZShjMS54LCBjMS55LCBtaW5YLCBtYXhYLCBtaW5ZLCBtYXhZKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdXBwZXIgcmlnaHQgY29ybmVyXHJcbiAgICAgICAgaWYgKHRoaXMuaXNJbnNpZGUoYzEueCArIGMxLndpZHRoLCBjMS55LCBtaW5YLCBtYXhYLCBtaW5ZLCBtYXhZKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbG93ZXIgbGVmdCBjb3JuZXJcclxuICAgICAgICBpZiAodGhpcy5pc0luc2lkZShjMS54LCBjMS55ICsgYzEuaGVpZ2h0LCBtaW5YLCBtYXhYLCBtaW5ZLCBtYXhZKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbG93ZXIgcmlnaHQgY29ybmVyXHJcbiAgICAgICAgaWYgKHRoaXMuaXNJbnNpZGUoYzEueCArIGMxLndpZHRoLCBjMS55ICsgYzEuaGVpZ2h0LCBtaW5YLCBtYXhYLCBtaW5ZLCBtYXhZKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNJbnNpZGUoeDogbnVtYmVyLCB5OiBudW1iZXIsIG1pblg6IG51bWJlciwgbWF4WDogbnVtYmVyLCBtaW5ZOiBudW1iZXIsIG1heFk6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGlzWGluc2lkZSA9IHRoaXMuaXNCZXR3ZWVuKHgsIG1pblgsIG1heFgpO1xyXG4gICAgICAgIGNvbnN0IGlzWWluc2lkZSA9IHRoaXMuaXNCZXR3ZWVuKHksIG1pblksIG1heFkpO1xyXG4gICAgICAgIHJldHVybiBpc1hpbnNpZGUgJiYgaXNZaW5zaWRlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNCZXR3ZWVuKHg6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG1pbiA8IHggJiYgbWF4ID4geDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRhY2hlZEZyb21HYW1lRXZlbnQge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGdhbWU6IEdhbWUsXHJcbiAgICApIHsgfVxyXG59XHJcbiIsImltcG9ydCBBdHRhY2hlZFRvR2FtZUV2ZW50IGZyb20gXCIuL0F0dGFjaGVkVG9HYW1lRXZlbnRcIjtcclxuaW1wb3J0IERldGFjaGVkRnJvbUdhbWVFdmVudCBmcm9tIFwiLi9EZXRhY2hlZEZyb21HYW1lRXZlbnRcIjtcclxuaW1wb3J0IE1vdXNlRG93bkV2ZW50IGZyb20gXCIuL01vdXNlRG93bkV2ZW50XCI7XHJcbmltcG9ydCBTY2VuZSBmcm9tIFwiLi9TY2VuZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XHJcbiAgICBwdWJsaWMgd2lkdGggPSA4MDA7XHJcbiAgICBwdWJsaWMgaGVpZ2h0ID0gNjAwO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50U2NlbmU6IFNjZW5lO1xyXG4gICAgcHJpdmF0ZSBpc1N0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgbGFzdFVwZGF0ZVRpbWU6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBpbml0aWFsU2NlbmU6IFNjZW5lLFxyXG4gICAgICAgIHByaXZhdGUgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSBpbml0aWFsU2NlbmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuaXNTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxhc3RVcGRhdGVUaW1lID0gK25ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUub25FdmVudChuZXcgQXR0YWNoZWRUb0dhbWVFdmVudCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0TmV4dEZyYW1lKCk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMub25Nb3VzZURvd24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wKCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLm9uTW91c2VEb3duKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkV2ZW50KG5ldyBEZXRhY2hlZEZyb21HYW1lRXZlbnQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuaXNTdGFydGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHB1Ymxpc2hFdmVudChldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUub25FdmVudChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vdXNlRG93biA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZS5vbkV2ZW50KG5ldyBNb3VzZURvd25FdmVudCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlcXVlc3ROZXh0RnJhbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLm9uTG9vcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkxvb3AgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RhcnRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gK25ldyBEYXRlKCk7XHJcbiAgICAgICAgY29uc3QgZWxhcHNlZFRpbWUgPSBjdXJyZW50VGltZSAtIHRoaXMubGFzdFVwZGF0ZVRpbWU7XHJcbiAgICAgICAgdGhpcy5sYXN0VXBkYXRlVGltZSA9IGN1cnJlbnRUaW1lO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjZW5lLnVwZGF0ZShlbGFwc2VkVGltZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUucmVuZGVyKHRoaXMuY29udGV4dCk7XHJcbiAgICAgICAgY29uc3QgbmV4dFNjZW5lID0gdGhpcy5jdXJyZW50U2NlbmUuZ2V0TmV4dFNjZW5lKCk7XHJcbiAgICAgICAgaWYgKG5leHRTY2VuZSAmJiBuZXh0U2NlbmUgIT09IHRoaXMuY3VycmVudFNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLm9uRXZlbnQobmV3IERldGFjaGVkRnJvbUdhbWVFdmVudCh0aGlzKSk7XHJcbiAgICAgICAgICAgIG5leHRTY2VuZS5vbkV2ZW50KG5ldyBBdHRhY2hlZFRvR2FtZUV2ZW50KHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NlbmUgPSBuZXh0U2NlbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVxdWVzdE5leHRGcmFtZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBBdHRhY2hlZFRvR2FtZUV2ZW50IGZyb20gXCIuL0F0dGFjaGVkVG9HYW1lRXZlbnRcIjtcclxuaW1wb3J0IERldGFjaGVkRnJvbUdhbWVFdmVudCBmcm9tIFwiLi9EZXRhY2hlZEZyb21HYW1lRXZlbnRcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZVwiO1xyXG5pbXBvcnQgR2FtZU9iamVjdENvb3JkaW5hdGVzIGZyb20gXCIuL0dhbWVPYmplY3RDb29yZGluYXRlc1wiO1xyXG5pbXBvcnQgUXVlcnlPYmplY3RzQnlUYWdFdmVudCBmcm9tIFwiLi9RdWVyeU9iamVjdHNCeVRhZ0V2ZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBHYW1lT2JqZWN0IHtcclxuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgcHJvdGVjdGVkIGNoaWxkT2JqZWN0czogR2FtZU9iamVjdFtdID0gW107XHJcbiAgICBwcm90ZWN0ZWQgZ2FtZTogR2FtZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgc3RhdGUgb2YgdGhlIGdhbWUgb2JqZWN0LlxyXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gY2FsbHMgdXBkYXRlIG9uIGFsbCBjaGlsZCBvYmplY3RzXHJcbiAgICAgKiBAcGFyYW0gZWxhcHNlZFRpbWUgVGhlIGVsYXBzZWQgdGltZSBpbiBtaWxsaXNlY29uZHMgc2luY2UgdGhlIGxhc3QgdXBkYXRlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlKGVsYXBzZWRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHRoaXMuY2hpbGRPYmplY3RzKSB7XHJcbiAgICAgICAgICAgIGNoaWxkLnVwZGF0ZShlbGFwc2VkVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBHYW1lT2JqZWN0IG9uIGEgY2FudmFzLlxyXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gY2FsbHMgcmVuZGVyIG9uIGFsbCBjaGlsZCBvYmplY3RzLlxyXG4gICAgICogQHBhcmFtIGNvbnRleHRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHRoaXMuY2hpbGRPYmplY3RzKSB7XHJcbiAgICAgICAgICAgIGNoaWxkLnJlbmRlcihjb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgYW4gZXZlbnQgcHJvZHVjZWQgYnkgdGhlIGdhbWUuXHJcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBmb3J3YXJkcyB0aGUgZXZlbnQgdG8gYWxsIGNoaWxkIG9iamVjdHMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBBdHRhY2hlZFRvR2FtZUV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZSA9IGV2ZW50LmdhbWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIERldGFjaGVkRnJvbUdhbWVFdmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBRdWVyeU9iamVjdHNCeVRhZ0V2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhZ3MuaW5kZXhPZihldmVudC50YWcpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQub2JqZWN0cy5wdXNoKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdGhpcy5jaGlsZE9iamVjdHMpIHtcclxuICAgICAgICAgICAgY2hpbGQub25FdmVudChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgY2hpbGQgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gZ2FtZU9iamVjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkQ2hpbGQoZ2FtZU9iamVjdDogR2FtZU9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hpbGRPYmplY3RzLnB1c2goZ2FtZU9iamVjdCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZSkge1xyXG4gICAgICAgICAgICBnYW1lT2JqZWN0Lm9uRXZlbnQobmV3IEF0dGFjaGVkVG9HYW1lRXZlbnQodGhpcy5nYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIGEgY2hpbGQgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gZ2FtZU9iamVjdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlQ2hpbGQoZ2FtZU9iamVjdDogR2FtZU9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGlsZE9iamVjdHMuaW5kZXhPZihnYW1lT2JqZWN0KTtcclxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRPYmplY3RzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUpIHtcclxuICAgICAgICAgICAgICAgIGdhbWVPYmplY3Qub25FdmVudChuZXcgRGV0YWNoZWRGcm9tR2FtZUV2ZW50KHRoaXMuZ2FtZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBjb29yZGluYXRlcyBvZiB0aGUgZ2FtZSBvYmplY3QuXHJcbiAgICAgKiBUaGUgY29vcmRpbmF0ZXMgY2FuIGJlIHVzZWQgZm9yIGNvbGxpc2lvbiBkZXRlY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDb29yZGluYXRlcygpOiBHYW1lT2JqZWN0Q29vcmRpbmF0ZXMge1xyXG4gICAgICAgIHJldHVybiBuZXcgR2FtZU9iamVjdENvb3JkaW5hdGVzKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU9iamVjdENvb3JkaW5hdGVzIHtcclxuICAgIHB1YmxpYyB4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHk6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXIgPSAwO1xyXG59XHJcbiIsImltcG9ydCBHYW1lT2JqZWN0IGZyb20gXCIuL0dhbWVPYmplY3RcIjtcclxuaW1wb3J0IEdhbWVPYmplY3RDb29yZGluYXRlcyBmcm9tIFwiLi9HYW1lT2JqZWN0Q29vcmRpbmF0ZXNcIjtcclxuaW1wb3J0IFBsYWNlbWVudCBmcm9tIFwiLi9QbGFjZW1lbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlR2FtZU9iamVjdCBleHRlbmRzIEdhbWVPYmplY3Qge1xyXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBpbWFnZTogSFRNTEltYWdlRWxlbWVudCxcclxuICAgICAgICBwdWJsaWMgcGxhY2VtZW50OiBQbGFjZW1lbnQgPSBuZXcgUGxhY2VtZW50KCksXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMud2lkdGggfHwgdGhpcy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZW1lbnQueCxcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VtZW50LnksXHJcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQsXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5wbGFjZW1lbnQueCwgdGhpcy5wbGFjZW1lbnQueSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnJlbmRlcihjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29vcmRpbmF0ZXMoKTogR2FtZU9iamVjdENvb3JkaW5hdGVzIHtcclxuICAgICAgICBjb25zdCBjb29yZHMgPSBzdXBlci5nZXRDb29yZGluYXRlcygpO1xyXG4gICAgICAgIGNvb3Jkcy54ID0gdGhpcy5wbGFjZW1lbnQueDtcclxuICAgICAgICBjb29yZHMueSA9IHRoaXMucGxhY2VtZW50Lnk7XHJcbiAgICAgICAgY29vcmRzLndpZHRoID0gdGhpcy53aWR0aDtcclxuICAgICAgICBjb29yZHMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIGNvb3JkcztcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VzZURvd25FdmVudCB7XHJcblxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYWNlbWVudCB7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyB5OiBudW1iZXIgPSAwO1xyXG59XHJcbiIsImltcG9ydCBHYW1lT2JqZWN0IGZyb20gXCIuL0dhbWVPYmplY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXJ5T2JqZWN0c0J5VGFnRXZlbnQge1xyXG4gICAgcHVibGljIG9iamVjdHM6IEdhbWVPYmplY3RbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWc6IHN0cmluZykgeyB9XHJcbn1cclxuIiwiaW1wb3J0IEdhbWVPYmplY3QgZnJvbSBcIi4vR2FtZU9iamVjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgU2NlbmUgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBnZXROZXh0U2NlbmUoKTogU2NlbmU7XHJcblxyXG4gICAgcHVibGljIHJlbmRlcihjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmdhbWUud2lkdGgsIHRoaXMuZ2FtZS5oZWlnaHQpO1xyXG4gICAgICAgIHN1cGVyLnJlbmRlcihjb250ZXh0KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgUGxhY2VtZW50IGZyb20gXCIuL1BsYWNlbWVudFwiO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBzcGVlZFxyXG4gKiBpbiBwaXhlbHMgcGVyIHNlY29uZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BlZWQge1xyXG4gICAgcHVibGljIHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBsYWNlbWVudDogUGxhY2VtZW50LFxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGVsYXBzZWRUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkWCA9IChlbGFwc2VkVGltZSAqIHRoaXMueCkgLyAxMDAwO1xyXG4gICAgICAgIGNvbnN0IGRZID0gKGVsYXBzZWRUaW1lICogdGhpcy55KSAvIDEwMDA7XHJcbiAgICAgICAgdGhpcy5wbGFjZW1lbnQueCArPSBkWDtcclxuICAgICAgICB0aGlzLnBsYWNlbWVudC55ICs9IGRZO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBBY2NlbGVyYXRpb24gZnJvbSBcIi4vQWNjZWxlcmF0aW9uXCI7XHJcbmltcG9ydCBTcGVlZCBmcm9tIFwiLi9TcGVlZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVtcG9yYXJ5QWNjZWxlcmF0aW9uIHtcclxuICAgIHByaXZhdGUgZHVyYXRpb246IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGR1cmF0aW9uTGVmdDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgYWNjZWxlcmF0aW9uOiBBY2NlbGVyYXRpb24gPSBuZXcgQWNjZWxlcmF0aW9uKHRoaXMuc3BlZWQpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc3BlZWQ6IFNwZWVkKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShlbGFwc2VkVGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZHVyYXRpb25MZWZ0IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGltZVRvVXBkYXRlV2l0aCA9IGVsYXBzZWRUaW1lO1xyXG4gICAgICAgIGNvbnN0IGxlZnQgPSBNYXRoLm1heCgwLCB0aGlzLmR1cmF0aW9uTGVmdCAtIGVsYXBzZWRUaW1lKTtcclxuICAgICAgICBpZiAobGVmdCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aW1lVG9VcGRhdGVXaXRoID0gdGhpcy5kdXJhdGlvbkxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uLnVwZGF0ZSh0aW1lVG9VcGRhdGVXaXRoKTtcclxuICAgICAgICB0aGlzLmR1cmF0aW9uTGVmdCA9IGxlZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHB1c2goeDogbnVtYmVyLCB5OiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbi54ID0geDtcclxuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbi55ID0geTtcclxuICAgICAgICB0aGlzLmR1cmF0aW9uTGVmdCA9IGR1cmF0aW9uO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBBY2NlbGVyYXRpb24gZnJvbSBcIi4uL2VuZ2luZS9BY2NlbGVyYXRpb25cIjtcclxuaW1wb3J0IEF0dGFjaGVkVG9HYW1lRXZlbnQgZnJvbSBcIi4uL2VuZ2luZS9BdHRhY2hlZFRvR2FtZUV2ZW50XCI7XHJcbmltcG9ydCBHYW1lT2JqZWN0IGZyb20gXCIuLi9lbmdpbmUvR2FtZU9iamVjdFwiO1xyXG5pbXBvcnQgR2FtZU9iamVjdENvb3JkaW5hdGVzIGZyb20gXCIuLi9lbmdpbmUvR2FtZU9iamVjdENvb3JkaW5hdGVzXCI7XHJcbmltcG9ydCBNb3VzZURvd25FdmVudCBmcm9tIFwiLi4vZW5naW5lL01vdXNlRG93bkV2ZW50XCI7XHJcbmltcG9ydCBQbGFjZW1lbnQgZnJvbSBcIi4uL2VuZ2luZS9QbGFjZW1lbnRcIjtcclxuaW1wb3J0IFNwZWVkIGZyb20gXCIuLi9lbmdpbmUvU3BlZWRcIjtcclxuaW1wb3J0IFRlbXBvcmFyeUFjY2VsZXJhdGlvbiBmcm9tIFwiLi4vZW5naW5lL1RlbXBvcmFyeUFjY2VsZXJhdGlvblwiO1xyXG5pbXBvcnQgSUJvdW5jeU9wdGlvbnMgZnJvbSBcIi4vSUJvdW5jeU9wdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvdW5jeSBleHRlbmRzIEdhbWVPYmplY3Qge1xyXG4gICAgcHVibGljIHN0YXRpYyB3aWR0aCA9IDMyO1xyXG4gICAgcHVibGljIHN0YXRpYyBoZWlnaHQgPSAzMjtcclxuICAgIHByaXZhdGUgY3ljbGVUaW1lTGVmdCA9IDA7XHJcbiAgICBwcml2YXRlIGltYWdlSW5kZXggPSAwO1xyXG4gICAgcHJpdmF0ZSBwbGFjZW1lbnQgPSBuZXcgUGxhY2VtZW50KCk7XHJcbiAgICBwcml2YXRlIHNwZWVkID0gbmV3IFNwZWVkKHRoaXMucGxhY2VtZW50KTtcclxuICAgIHByaXZhdGUgYWNjID0gbmV3IEFjY2VsZXJhdGlvbih0aGlzLnNwZWVkKTtcclxuICAgIHByaXZhdGUgdGVtcEFjYyA9IG5ldyBUZW1wb3JhcnlBY2NlbGVyYXRpb24odGhpcy5zcGVlZCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvcHRpb25zOiBJQm91bmN5T3B0aW9ucyxcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hY2MueSA9IG9wdGlvbnMuYm91bmN5QWNjZWxlcmF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZWxhcHNlZFRpbWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ3ljbGVkSW1hZ2VzKGVsYXBzZWRUaW1lKTtcclxuICAgICAgICB0aGlzLmFjYy51cGRhdGUoZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgIHRoaXMudGVtcEFjYy51cGRhdGUoZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgIHRoaXMuc3BlZWQudXBkYXRlKGVsYXBzZWRUaW1lKTtcclxuICAgICAgICBzdXBlci51cGRhdGUoZWxhcHNlZFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB0aGlzLm9wdGlvbnMuYm91bmN5SW1hZ2VzW3RoaXMuaW1hZ2VJbmRleF07XHJcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMucGxhY2VtZW50LngsIHRoaXMucGxhY2VtZW50LnksIEJvdW5jeS53aWR0aCwgQm91bmN5LmhlaWdodCk7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkV2ZW50KGV2ZW50KTtcclxuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZURvd25FdmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnNwZWVkLnkgPSB0aGlzLm9wdGlvbnMuYm91bmN5Q2xpY2tTcGVlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgQXR0YWNoZWRUb0dhbWVFdmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYWNlbWVudC54ID0gZXZlbnQuZ2FtZS53aWR0aCAqIDAuMjU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb29yZGluYXRlcygpOiBHYW1lT2JqZWN0Q29vcmRpbmF0ZXMge1xyXG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IHN1cGVyLmdldENvb3JkaW5hdGVzKCk7XHJcbiAgICAgICAgY29vcmRzLnggPSB0aGlzLnBsYWNlbWVudC54O1xyXG4gICAgICAgIGNvb3Jkcy55ID0gdGhpcy5wbGFjZW1lbnQueTtcclxuICAgICAgICBjb29yZHMud2lkdGggPSBCb3VuY3kud2lkdGg7XHJcbiAgICAgICAgY29vcmRzLmhlaWdodCA9IEJvdW5jeS5oZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIGNvb3JkcztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUN5Y2xlZEltYWdlcyhlbGFwc2VkVGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jeWNsZVRpbWVMZWZ0IC09IGVsYXBzZWRUaW1lO1xyXG4gICAgICAgIGlmICh0aGlzLmN5Y2xlVGltZUxlZnQgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3ljbGVUaW1lTGVmdCArPSB0aGlzLm9wdGlvbnMuYm91bmN5SW1hZ2VDeWNsZVRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VJbmRleCsrO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5ib3VuY3lJbWFnZXNbdGhpcy5pbWFnZUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgSW1hZ2VHYW1lT2JqZWN0IGZyb20gXCIuLi9lbmdpbmUvSW1hZ2VHYW1lT2JqZWN0XCI7XHJcbmltcG9ydCBNb3VzZURvd25FdmVudCBmcm9tIFwiLi4vZW5naW5lL01vdXNlRG93bkV2ZW50XCI7XHJcbmltcG9ydCBTY2VuZSBmcm9tIFwiLi4vZW5naW5lL1NjZW5lXCI7XHJcbmltcG9ydCBCb3VuY3kgZnJvbSBcIi4vQm91bmN5XCI7XHJcbmltcG9ydCBCb3VuY3lTY2VuZSBmcm9tIFwiLi9Cb3VuY3lTY2VuZVwiO1xyXG5pbXBvcnQgSUJvdW5jeU9wdGlvbnMgZnJvbSBcIi4vSUJvdW5jeU9wdGlvbnNcIjtcclxuaW1wb3J0IEludHJvU2NlbmUgZnJvbSBcIi4vSW50cm9TY2VuZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm91bmN5RGVhZFNjZW5lIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgcHJpdmF0ZSBpc092ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaXNEZWxheVBhc3NlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBkZWxheSA9IDUwMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIG9wdGlvbnM6IElCb3VuY3lPcHRpb25zLFxyXG4gICAgICAgIHByaXZhdGUgc2NvcmU6IG51bWJlcixcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYmFja2dyb3VuZEltYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3IEltYWdlR2FtZU9iamVjdChvcHRpb25zLmJhY2tncm91bmRJbWFnZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGVsYXBzZWRUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgIHRoaXMuZGVsYXkgLT0gZWxhcHNlZFRpbWU7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVsYXkgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEZWxheVBhc3NlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROZXh0U2NlbmUoKTogU2NlbmUge1xyXG4gICAgICAgIGlmICh0aGlzLmlzT3ZlciAmJiB0aGlzLmlzRGVsYXlQYXNzZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRyb1NjZW5lKHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xyXG4gICAgICAgIGNvbnRleHQuc2hhZG93Qmx1ciA9IDQ7XHJcbiAgICAgICAgY29udGV4dC5zaGFkb3dDb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMub3B0aW9ucy5pbnRyb1RleHRGaWxsU3R5bGU7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSBcImNlbnRlclwiO1xyXG4gICAgICAgIGNvbnRleHQudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBcIjQ4cHggY3Vyc2l2ZVwiO1xyXG4gICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBcIjJweCBibHVlXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmJvdW5jeURlYWRUZXh0VGl0bGUucmVwbGFjZShcIntzY29yZX1cIiwgdGhpcy5zY29yZS50b1N0cmluZygpKSxcclxuICAgICAgICAgICAgdGhpcy5nYW1lLndpZHRoIC8gMixcclxuICAgICAgICAgICAgdGhpcy5nYW1lLmhlaWdodCAqIDAuMyxcclxuICAgICAgICAgICAgdGhpcy5nYW1lLndpZHRoICogMC42KTtcclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBcIjI0cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5ib3VuY3lEZWFkVGV4dE1lc3NhZ2UsXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS53aWR0aCAvIDIsXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5oZWlnaHQgKiAwLjcsXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS53aWR0aCAqIDAuNik7XHJcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRXZlbnQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE1vdXNlRG93bkV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNPdmVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IENvbGxpc2lvbkRldGVjdG9yIGZyb20gXCIuLi9lbmdpbmUvQ29sbGlzaW9uRGV0ZWN0b3JcIjtcclxuaW1wb3J0IEltYWdlR2FtZU9iamVjdCBmcm9tIFwiLi4vZW5naW5lL0ltYWdlR2FtZU9iamVjdFwiO1xyXG5pbXBvcnQgUXVlcnlPYmplY3RzQnlUYWdFdmVudCBmcm9tIFwiLi4vZW5naW5lL1F1ZXJ5T2JqZWN0c0J5VGFnRXZlbnRcIjtcclxuaW1wb3J0IFNjZW5lIGZyb20gXCIuLi9lbmdpbmUvU2NlbmVcIjtcclxuaW1wb3J0IEJvdW5jeSBmcm9tIFwiLi9Cb3VuY3lcIjtcclxuaW1wb3J0IEJvdW5jeURlYWRTY2VuZSBmcm9tIFwiLi9Cb3VuY3lEZWFkU2NlbmVcIjtcclxuaW1wb3J0IElCb3VuY3lPcHRpb25zIGZyb20gXCIuL0lCb3VuY3lPcHRpb25zXCI7XHJcbmltcG9ydCBJbnRyb1NjZW5lIGZyb20gXCIuL0ludHJvU2NlbmVcIjtcclxuaW1wb3J0IFBhaXJPZlBpcGVzIGZyb20gXCIuL1BhaXJPZlBpcGVzXCI7XHJcbmltcG9ydCBQaXBlQ29udHJvbGxlciBmcm9tIFwiLi9QaXBlQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgUGlwZVBhc3NlZEV2ZW50IGZyb20gXCIuL1BpcGVQYXNzZWRFdmVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm91bmN5U2NlbmUgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICBwcml2YXRlIGlzQm91bmN5RGVhZCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzY29yZSA9IDA7XHJcbiAgICBwcml2YXRlIGJvdW5jeTogQm91bmN5O1xyXG4gICAgcHJpdmF0ZSBjb2xsaXNpb25EZXRlY3RvciA9IG5ldyBDb2xsaXNpb25EZXRlY3RvcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgb3B0aW9uczogSUJvdW5jeU9wdGlvbnMsXHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGlmIChvcHRpb25zLmJhY2tncm91bmRJbWFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ldyBJbWFnZUdhbWVPYmplY3Qob3B0aW9ucy5iYWNrZ3JvdW5kSW1hZ2UpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ib3VuY3kgPSBuZXcgQm91bmN5KG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5ib3VuY3kpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3IFBpcGVDb250cm9sbGVyKG9wdGlvbnMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGVsYXBzZWRUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5UGlwZXMgPSBuZXcgUXVlcnlPYmplY3RzQnlUYWdFdmVudChQYWlyT2ZQaXBlcy5waXBlVGFnKTtcclxuICAgICAgICB0aGlzLmdhbWUucHVibGlzaEV2ZW50KHF1ZXJ5UGlwZXMpO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbGxpc2lvbkRldGVjdG9yLmNvbGxpZGVzV2l0aEFueSh0aGlzLmJvdW5jeSwgcXVlcnlQaXBlcy5vYmplY3RzKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzQm91bmN5RGVhZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGJvdW5jeVkgPSB0aGlzLmJvdW5jeS5nZXRDb29yZGluYXRlcygpLnk7XHJcbiAgICAgICAgaWYgKGJvdW5jeVkgPCAtMzAgfHwgYm91bmN5WSA+IHRoaXMuZ2FtZS5oZWlnaHQgKyAzMCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzQm91bmN5RGVhZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIucmVuZGVyKGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyU2NvcmUoY29udGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5leHRTY2VuZSgpOiBTY2VuZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNCb3VuY3lEZWFkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQm91bmN5RGVhZFNjZW5lKHRoaXMub3B0aW9ucywgdGhpcy5zY29yZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkV2ZW50KGV2ZW50KTtcclxuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBQaXBlUGFzc2VkRXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5zY29yZSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlclNjb3JlKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xyXG4gICAgICAgIGNvbnRleHQudGV4dEFsaWduID0gXCJsZWZ0XCI7XHJcbiAgICAgICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xyXG4gICAgICAgIGNvbnRleHQuZm9udCA9IFwiYm9sZCAxNnB4IHNhbnMtc2VyaWZcIjtcclxuICAgICAgICBjb250ZXh0LnNoYWRvd0NvbG9yID0gXCJibGFja1wiO1xyXG4gICAgICAgIGNvbnRleHQuc2hhZG93T2Zmc2V0WCA9IDA7XHJcbiAgICAgICAgY29udGV4dC5zaGFkb3dPZmZzZXRZID0gMDtcclxuICAgICAgICBjb250ZXh0LnNoYWRvd0JsdXIgPSAxO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlLCAxMCwgMTApO1xyXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBQYWlyT2ZQaXBlcyBmcm9tIFwiLi9QYWlyT2ZQaXBlc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW50ZXJmYWNlIElCb3VuY3lPcHRpb25zIHtcclxuICAgIGJhY2tncm91bmRJbWFnZT86IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBib3VuY3lBY2NlbGVyYXRpb246IG51bWJlcjtcclxuICAgIGJvdW5jeUNsaWNrU3BlZWQ6IG51bWJlcjtcclxuICAgIGJvdW5jeURlYWRUZXh0TWVzc2FnZTogc3RyaW5nO1xyXG4gICAgYm91bmN5RGVhZFRleHRUaXRsZTogc3RyaW5nO1xyXG4gICAgYm91bmN5SW1hZ2VDeWNsZVRpbWU6IG51bWJlcjtcclxuICAgIGJvdW5jeUltYWdlczogSFRNTEltYWdlRWxlbWVudFtdO1xyXG4gICAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICAgIGludHJvVGV4dEZpbGxTdHlsZTogc3RyaW5nO1xyXG4gICAgaW50cm9UZXh0TWVzc2FnZTogc3RyaW5nO1xyXG4gICAgaW50cm9UZXh0VGl0bGU6IHN0cmluZztcclxuICAgIHRvcFBpcGVJbWFnZTogSFRNTEltYWdlRWxlbWVudDtcclxuICAgIGJvdHRvbVBpcGVJbWFnZTogSFRNTEltYWdlRWxlbWVudDtcclxuICAgIHBpcGVPcHRpb25zOiBJUGlwZU9wdGlvbnM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBpcGVPcHRpb25zIHtcclxuICAgIGFkZFBpcGVGcmVxdWVuY3k6IG51bWJlcjtcclxuICAgIHBpcGVTcGVlZDogbnVtYmVyO1xyXG4gICAgZ2FwU2l6ZTogbnVtYmVyO1xyXG4gICAgc3BlZWQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5RGVmYXVsdHMob3B0aW9uczogYW55KTogSUJvdW5jeU9wdGlvbnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IG9wdGlvbnMuYmFja2dyb3VuZEltYWdlLFxyXG4gICAgICAgIGJvdHRvbVBpcGVJbWFnZTogb3B0aW9ucy5ib3R0b21QaXBlSW1hZ2UsXHJcbiAgICAgICAgYm91bmN5QWNjZWxlcmF0aW9uOiBvcHRpb25zLmJvdW5jeUFjY2VsZXJhdGlvbiB8fCAzMDAsXHJcbiAgICAgICAgYm91bmN5Q2xpY2tTcGVlZDogb3B0aW9ucy5ib3VuY3lDbGlja1NwZWVkIHx8IC0yNTAsXHJcbiAgICAgICAgYm91bmN5RGVhZFRleHRNZXNzYWdlOiBcIkNsaWNrIHRvIGdvIGJhY2sgdG8gdGhlIG1haW4gc2NyZWVuXCIsXHJcbiAgICAgICAgYm91bmN5RGVhZFRleHRUaXRsZTogXCJZb3UgZGllZC4gU2NvcmU6IHtzY29yZX1cIixcclxuICAgICAgICBib3VuY3lJbWFnZUN5Y2xlVGltZTogb3B0aW9ucy5ib3VuY3lJbWFnZUN5Y2xlVGltZSB8fCAyMDAsXHJcbiAgICAgICAgYm91bmN5SW1hZ2VzOiBvcHRpb25zLmJvdW5jeUltYWdlcyxcclxuICAgICAgICBjb250YWluZXI6IG9wdGlvbnMuY29udGFpbmVyLFxyXG4gICAgICAgIGludHJvVGV4dEZpbGxTdHlsZTogb3B0aW9ucy5pbnRyb1RleHRGaWxsU3R5bGUgfHwgXCJ3aGl0ZVwiLFxyXG4gICAgICAgIGludHJvVGV4dE1lc3NhZ2U6IG9wdGlvbnMuaW50cm9UZXh0TWVzc2FnZSB8fCBcIkNsaWNrIHRvIHBsYXlcIixcclxuICAgICAgICBpbnRyb1RleHRUaXRsZTogb3B0aW9ucy5pbnRyb1RleHRUaXRsZSB8fCBcIkJvdW5jeSBhbnl0aGluZ1wiLFxyXG4gICAgICAgIHBpcGVPcHRpb25zOiBvcHRpb25zLnBpcGVTcGVlZCB8fCB7XHJcbiAgICAgICAgICAgIGFkZFBpcGVGcmVxdWVuY3k6IDIwMDAsXHJcbiAgICAgICAgICAgIGdhcFNpemU6IDE1MCxcclxuICAgICAgICAgICAgcGlwZVNwZWVkOiAyMDAsXHJcbiAgICAgICAgICAgIHNwZWVkOiAyMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvcFBpcGVJbWFnZTogb3B0aW9ucy50b3BQaXBlSW1hZ2UsXHJcbiAgICB9O1xyXG59XHJcbiIsImltcG9ydCBJbWFnZUdhbWVPYmplY3QgZnJvbSBcIi4uL2VuZ2luZS9JbWFnZUdhbWVPYmplY3RcIjtcclxuaW1wb3J0IE1vdXNlRG93bkV2ZW50IGZyb20gXCIuLi9lbmdpbmUvTW91c2VEb3duRXZlbnRcIjtcclxuaW1wb3J0IFNjZW5lIGZyb20gXCIuLi9lbmdpbmUvU2NlbmVcIjtcclxuaW1wb3J0IEJvdW5jeSBmcm9tIFwiLi9Cb3VuY3lcIjtcclxuaW1wb3J0IEJvdW5jeVNjZW5lIGZyb20gXCIuL0JvdW5jeVNjZW5lXCI7XHJcbmltcG9ydCBJQm91bmN5T3B0aW9ucyBmcm9tIFwiLi9JQm91bmN5T3B0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50cm9TY2VuZSBleHRlbmRzIFNjZW5lIHtcclxuICAgIHByaXZhdGUgaXNPdmVyOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvcHRpb25zOiBJQm91bmN5T3B0aW9ucyxcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYmFja2dyb3VuZEltYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3IEltYWdlR2FtZU9iamVjdChvcHRpb25zLmJhY2tncm91bmRJbWFnZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TmV4dFNjZW5lKCk6IFNjZW5lIHtcclxuICAgICAgICBpZiAodGhpcy5pc092ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCb3VuY3lTY2VuZSh0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlbmRlcihjb250ZXh0KTtcclxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcclxuICAgICAgICBjb250ZXh0LnNoYWRvd0JsdXIgPSA0O1xyXG4gICAgICAgIGNvbnRleHQuc2hhZG93Q29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLm9wdGlvbnMuaW50cm9UZXh0RmlsbFN0eWxlO1xyXG4gICAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJjZW50ZXJcIjtcclxuICAgICAgICBjb250ZXh0LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgY29udGV4dC5mb250ID0gXCI0OHB4IGN1cnNpdmVcIjtcclxuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gXCIycHggYmx1ZVwiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbnRyb1RleHRUaXRsZSxcclxuICAgICAgICAgICAgdGhpcy5nYW1lLndpZHRoIC8gMixcclxuICAgICAgICAgICAgdGhpcy5nYW1lLmhlaWdodCAqIDAuMyxcclxuICAgICAgICAgICAgdGhpcy5nYW1lLndpZHRoICogMC42KTtcclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBcIjI0cHggc2Fucy1zZXJpZlwiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5pbnRyb1RleHRNZXNzYWdlLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWUud2lkdGggLyAyLFxyXG4gICAgICAgICAgICB0aGlzLmdhbWUuaGVpZ2h0ICogMC43LFxyXG4gICAgICAgICAgICB0aGlzLmdhbWUud2lkdGggKiAwLjYpO1xyXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkV2ZW50KGV2ZW50KTtcclxuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZURvd25FdmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzT3ZlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBBdHRhY2hlZFRvR2FtZUV2ZW50IGZyb20gXCIuLi9lbmdpbmUvQXR0YWNoZWRUb0dhbWVFdmVudFwiO1xyXG5pbXBvcnQgR2FtZU9iamVjdCBmcm9tIFwiLi4vZW5naW5lL0dhbWVPYmplY3RcIjtcclxuaW1wb3J0IEltYWdlR2FtZU9iamVjdCBmcm9tIFwiLi4vZW5naW5lL0ltYWdlR2FtZU9iamVjdFwiO1xyXG5pbXBvcnQgUGxhY2VtZW50IGZyb20gXCIuLi9lbmdpbmUvUGxhY2VtZW50XCI7XHJcbmltcG9ydCBTcGVlZCBmcm9tIFwiLi4vZW5naW5lL1NwZWVkXCI7XHJcbmltcG9ydCBJQm91bmN5T3B0aW9ucyBmcm9tIFwiLi9JQm91bmN5T3B0aW9uc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFpck9mUGlwZXMgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcGlwZVRhZyA9IFwicGlwZVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGlwZVdpZHRoOiBudW1iZXIgPSA4MDtcclxuICAgIHByaXZhdGUgcGxhY2VtZW50ID0gbmV3IFBsYWNlbWVudCgpO1xyXG4gICAgcHJpdmF0ZSB0b3BQaXBlOiBJbWFnZUdhbWVPYmplY3Q7XHJcbiAgICBwcml2YXRlIGJvdHRvbVBpcGU6IEltYWdlR2FtZU9iamVjdDtcclxuICAgIHByaXZhdGUgc3BlZWQgPSBuZXcgU3BlZWQodGhpcy5wbGFjZW1lbnQpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgb3B0aW9uczogSUJvdW5jeU9wdGlvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBnYXBQb3NpdGlvbjogbnVtYmVyLFxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnRvcFBpcGUgPSBuZXcgSW1hZ2VHYW1lT2JqZWN0KG9wdGlvbnMudG9wUGlwZUltYWdlKTtcclxuICAgICAgICB0aGlzLmJvdHRvbVBpcGUgPSBuZXcgSW1hZ2VHYW1lT2JqZWN0KG9wdGlvbnMuYm90dG9tUGlwZUltYWdlKTtcclxuICAgICAgICB0aGlzLnRvcFBpcGUud2lkdGggPSBQYWlyT2ZQaXBlcy5waXBlV2lkdGg7XHJcbiAgICAgICAgdGhpcy5ib3R0b21QaXBlLndpZHRoID0gUGFpck9mUGlwZXMucGlwZVdpZHRoO1xyXG4gICAgICAgIHRoaXMudG9wUGlwZS50YWdzLnB1c2goUGFpck9mUGlwZXMucGlwZVRhZyk7XHJcbiAgICAgICAgdGhpcy5ib3R0b21QaXBlLnRhZ3MucHVzaChQYWlyT2ZQaXBlcy5waXBlVGFnKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMudG9wUGlwZSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJvdHRvbVBpcGUpO1xyXG4gICAgICAgIHRoaXMuc3BlZWQueCA9IC10aGlzLm9wdGlvbnMucGlwZU9wdGlvbnMuc3BlZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShlbGFwc2VkVGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zcGVlZC54ID0gLXRoaXMub3B0aW9ucy5waXBlT3B0aW9ucy5waXBlU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5zcGVlZC51cGRhdGUoZWxhcHNlZFRpbWUpO1xyXG4gICAgICAgIHRoaXMudG9wUGlwZS5wbGFjZW1lbnQueCA9IHRoaXMucGxhY2VtZW50Lng7XHJcbiAgICAgICAgdGhpcy5ib3R0b21QaXBlLnBsYWNlbWVudC54ID0gdGhpcy5wbGFjZW1lbnQueDtcclxuICAgICAgICBzdXBlci51cGRhdGUoZWxhcHNlZFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc091dHNpZGVPZlNjcmVlbigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGFjZW1lbnQueCA8IC1QYWlyT2ZQaXBlcy5waXBlV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRXZlbnQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEF0dGFjaGVkVG9HYW1lRXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGFjZW1lbnQueCA9IHRoaXMuZ2FtZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy50b3BQaXBlLnBsYWNlbWVudC55ID0gLXRoaXMuZ2FtZS5oZWlnaHQgKyB0aGlzLmdhcFBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLmJvdHRvbVBpcGUucGxhY2VtZW50LnkgPSB0aGlzLmdhcFBvc2l0aW9uICsgdGhpcy5vcHRpb25zLnBpcGVPcHRpb25zLmdhcFNpemU7XHJcbiAgICAgICAgICAgIHRoaXMudG9wUGlwZS5oZWlnaHQgPSB0aGlzLmdhbWUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmJvdHRvbVBpcGUuaGVpZ2h0ID0gdGhpcy5nYW1lLmhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEdhbWVPYmplY3QgZnJvbSBcIi4uL2VuZ2luZS9HYW1lT2JqZWN0XCI7XHJcbmltcG9ydCBJQm91bmN5T3B0aW9ucyBmcm9tIFwiLi9JQm91bmN5T3B0aW9uc1wiO1xyXG5pbXBvcnQgUGFpck9mUGlwZXMgZnJvbSBcIi4vUGFpck9mUGlwZXNcIjtcclxuaW1wb3J0IFBpcGVQYXNzZWRFdmVudCBmcm9tIFwiLi9QaXBlUGFzc2VkRXZlbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBpcGVDb250cm9sbGVyIGV4dGVuZHMgR2FtZU9iamVjdCB7XHJcbiAgICBwcml2YXRlIHBpcGVzOiBQYWlyT2ZQaXBlc1tdID0gW107XHJcbiAgICBwcml2YXRlIHRpbWVMZWZ0VG9BZGRQaXBlOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvcHRpb25zOiBJQm91bmN5T3B0aW9ucyxcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy50aW1lTGVmdFRvQWRkUGlwZSA9IG9wdGlvbnMucGlwZU9wdGlvbnMuYWRkUGlwZUZyZXF1ZW5jeTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGVsYXBzZWRUaW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdGltZUxlZnQgPSB0aGlzLnRpbWVMZWZ0VG9BZGRQaXBlIC0gZWxhcHNlZFRpbWU7XHJcbiAgICAgICAgaWYgKHRpbWVMZWZ0IDwgMCkge1xyXG4gICAgICAgICAgICB0aW1lTGVmdCArPSB0aGlzLm9wdGlvbnMucGlwZU9wdGlvbnMuYWRkUGlwZUZyZXF1ZW5jeTtcclxuICAgICAgICAgICAgY29uc3QgbWluR2FwUG9zaXRpb24gPSAxMDtcclxuICAgICAgICAgICAgY29uc3QgcmFuZG9tT2Zmc2V0ID0gTWF0aC5yYW5kb20oKSAqXHJcbiAgICAgICAgICAgICAgICAodGhpcy5nYW1lLmhlaWdodCAtIDIgKiBtaW5HYXBQb3NpdGlvbiAtIHRoaXMub3B0aW9ucy5waXBlT3B0aW9ucy5nYXBTaXplKTtcclxuICAgICAgICAgICAgY29uc3QgZ2FwUG9zaXRpb24gPSBtaW5HYXBQb3NpdGlvbiArIHJhbmRvbU9mZnNldDtcclxuICAgICAgICAgICAgY29uc3QgcGlwZSA9IG5ldyBQYWlyT2ZQaXBlcyh0aGlzLm9wdGlvbnMsIGdhcFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChwaXBlKTtcclxuICAgICAgICAgICAgdGhpcy5waXBlcy5wdXNoKHBpcGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aGlsZSAodGhpcy5waXBlcy5sZW5ndGggPiAwICYmIHRoaXMucGlwZXNbMF0uaXNPdXRzaWRlT2ZTY3JlZW4oKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMucGlwZXNbMF0pO1xyXG4gICAgICAgICAgICB0aGlzLnBpcGVzLnNwbGljZSgwLCAxKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLnB1Ymxpc2hFdmVudChuZXcgUGlwZVBhc3NlZEV2ZW50KCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVMZWZ0VG9BZGRQaXBlID0gdGltZUxlZnQ7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGVsYXBzZWRUaW1lKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQaXBlUGFzc2VkRXZlbnQge1xyXG5cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9