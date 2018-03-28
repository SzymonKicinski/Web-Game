// Utworzenie p��tna - canvas.
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 500;
document.body.appendChild(canvas);

// T�o gry.
var bgImage = new Image();
bgImage.src = "images/sky.png";

// Bohater.
var heroImage = new Image();
heroImage.src = "images/hero.png";
// TODO : pozby� si� sta�ych.
var hero = { image : heroImage, x : 0, y : 450, 
                                w : 75, h : 50, 
                                speed : 3 };

// Pocisk.
var bulletImage = new Image();
bulletImage.src = "images/bullet.png";
// TODO : pozby� si� sta�ych.
var bullet = { visible : false, image : bulletImage, 
               x : 0, y : 0, 
               w : 16, h : 16, 
               speed : 3 };

// Wr�g / wrogowie.
var enemyImage = new Image();
enemyImage.src = "images/enemy.png";
var enemies = [];
               
// Pociski wrog�w.
var enemiesBullet = [];

// T�o gry ze scrollem.
var bgScroll = new Image();
bgScroll.src = "images/map.png";
