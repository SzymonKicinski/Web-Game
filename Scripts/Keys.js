// Obs³uga klawiatury.
var keysDown = {};
addEventListener("keydown", function(e) {keysDown[e.keyCode] = true;});
addEventListener("keyup", function(e) {delete keysDown[e.keyCode];});

var keysUpdate = function() {
    // TODO: Pozbyc sie stalych.
    if (32 in keysDown) {
        if (!bullet.visible) {
            bullet.visible = true;
            bullet.x = hero.x + 30;
            bullet.y = 450;
        }
    }
    if (37 in keysDown)
        if (hero.x > 0)
            hero.x -= hero.speed;
    if (39 in keysDown)
        if (hero.x < 675)
            hero.x += hero.speed;
};
