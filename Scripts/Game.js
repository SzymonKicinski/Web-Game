// TODO: Zmienić nazwy a i b.
var hittest = function(a, b) {
  if ((a.x < (b.x + b.w)) && 
     ((a.x + a.w) > b.x)  && 
      (a.y < (b.y + b.h)) && 
     ((a.y + a.h) > b.y))
        return true;
  else
        return false;
}
var areVisibleEnemies = function() {
    for (var i = 0; i < enemies.length; i++)
        if (enemies[i].visible) 
            return true;
    return false;
}
var initEnemies = function() {
    var k = 0;
    for (var j = 0; j < 4; j++)
        for (var i = 0; i < 8; i++)
            // TODO: Pozbyć się stałych w definicji obiektów. 
            enemies[k++] = {visible : true, image : enemyImage, 
                            x : i * 75, y : (j + 1) * 50, w : 75, h : 50 };
}
var initEnemyBullet = function(k) {
    var check = false;
    while (!check) {
        var enemy = Math.floor(Math.random() * enemies.length); 
        if (enemies[enemy].visible) {
            // TODO: Pozbyc się stałych w definicji pociskow. 
            enemiesBullet[k] = {visible : true, image : bulletImage, 
                                x : enemies[enemy].x + 30, 
                                y : enemies[enemy].y + 25, 
                                w : 16, h : 16 };
            check = true;
        }
    }
}
var initEnemiesBullet = function() {
    var k = 0;  
    while (k < enemy_bullets)
        initEnemyBullet(k++);
}
// TODO: Podzielić na mniejsze części.
var drawEnemies = function() {
    // Render enemies.
    for (var i = 0; i < enemies.length; i++)
        if (enemies[i].visible)
            context.drawImage(enemies[i].image, enemies[i].x, enemies[i].y);
    // Move enemies.
    var dropdown = false;
    for (var i = 0; i < enemies.length; i++){
        if (enemies[i].visible){   
            // TODO: Pozbyc sie stalych.
            enemies[i].x += enemy_speed;
            if (enemies[i].x > (750 - 75))
                dropdown = true;
            if (enemies[i].x < 0)
                dropdown = true;
            if (hittest(enemies[i], bullet)) {
                enemies[i].visible = false;
                bullet.visible = false;
                bullet.x = hero.x + 30;
                bullet.y = 450;
                score += 10;
            }
       }
    }
    if (dropdown){
       enemy_speed = -enemy_speed;
        for (var i = 0; i < enemies.length; i++)
            enemies[i].y += 10;
    }
};
var drawBullet = function() {
    if (bullet.visible) {
        context.drawImage(bullet.image, bullet.x, bullet.y);
        bullet.y -= bullet.speed;
        if (bullet.y < 0)
            bullet.visible = false;
    }
}
var drawEnemyBullets = function() {
    for (var i = 0; i < enemiesBullet.length; i++) {
        context.drawImage(enemiesBullet[i].image, 
                          enemiesBullet[i].x, 
                          enemiesBullet[i].y); 
        enemiesBullet[i].y += bullet_speed;
        // TODO: Pozbyc sie stalej.
        if (enemiesBullet[i].y > 500)
            initEnemyBullet(i);
        if (hittest(enemiesBullet[i], hero)) {
            initEnemyBullet(i);
            life--;
        }
        if (life === 0)
            gameOver = 1;
    }
}
var drawScore = function() {
    // TODO: Dobrać wielkość i typ czcionki w zależności od gustu.
    context.fillStyle = "rgb(250, 250, 250)";
    context.font = "24px Helvetica";
    context.textAlign = "left";
    context.textBaseline = "top";
    // TODO: Sparametryzowac w zaleznosci od rozmiarow tła.
    context.fillText("Score: " + score, 5, 5);
    context.fillText("Life: " + life, 650, 5); 
}
// TODO: Funkcja render jest za dluga. Rozbic na mniejsze funkcje.
var render = function () {
    // TODO: Usunac stale.
    // Rozmiar bitmapy: 750x12288, rozmiar canvas: 750x500.
    // TODO: Zabepieczyc skrola.
    context.drawImage(bgScroll, 0, 12288 - 500 - scroll_speed, 
                                750, 12288 - scroll_speed, 
                                0, 0, 
                                750, 12288);
    scroll_speed++;
    //context.drawImage(bgImage, 0, 0);
    if (gameOver === 0) {
        context.drawImage(hero.image, hero.x, hero.y);
        drawBullet();
        drawScore();
        if (areVisibleEnemies()) {   
            drawEnemies();  
            drawEnemyBullets(); 
        }
        else {
            // TODO: Dodac funkcje wyswietlajaca stosowny komunikat.
            context.fillStyle = "rgb(0, 0, 0)";
            context.font = "48px Helvetica";    
            context.fillText("Winner", 290, 200);   
        }
    }
    else {
        // TODO: Zamknac to w nowej funkcji.
        context.fillStyle = "rgb(0, 0, 0)";
        context.font = "48px Helvetica";    
        context.fillText("Game over", 260, 200);
    }
};
var main = function () {     // Komentarz: Funkcja typu CALLBACK.
    keysUpdate();
    render();
    requestAnimationFrame(main);
};
