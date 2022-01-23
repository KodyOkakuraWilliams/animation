class Hero {
    constructor(game,x,y,spritesheet) {
        Object.assign(this,{game,x,y,spritesheet});
        this.spritesheet = ASSET_MANAGER.getAsset("./defender.png");
        //this.animation = new Animator(this.spritesheet,86,908,96,104,10,0.1,2,false,true);
        this.velocity = { x: 0, y: 0 };
        this.speed = 50;
        this.switch = 0

        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = Idle, 1 = Walking, 2 = Attacking, 3 = Blocking
        this.attack = 0;
        this.block = 0;



        this.animations = [];
        this.loadAnimation(spritesheet);
    };
    update() {
        const MAX_WALK = 50;
        const ACC = 5;
        const TICK = this.game.clockTick;
        if (this.attack === 0 && this.block === 0) {
            if (this.game.right && !this.game.left) {
                if (Math.abs(this.velocity.x) < MAX_WALK) {
                    this.velocity.x += ACC; 
                }
            } 
            else if (!this.game.right && this.game.left) {
                if (Math.abs(this.velocity.x) < MAX_WALK) {
                    this.velocity.x -= ACC; 
                }
            } 
            else {
                if (this.velocity.x > 0) {
                    this.velocity.x -= ACC; 
                } else if (this.velocity.x < 0) {
                    this.velocity.x += ACC; 
                } else {
                    this.velocity.x = 0;
                    this.state = 0;
                }
            }  
        }
        if (this.velocity.x === 0 && (this.game.attack || this.attack > 0)){
            this.state = 2;
            this.attack += 1;
            if (this.attack > 60) {
                this.state = 0;
                this.attack = 0;
            }
        } 
        else if (this.game.down) {
            this.state = 3;

        }

        if (Math.abs(this.velocity.x) > MAX_WALK) this.velocity.x =  MAX_WALK;
        if (Math.abs(this.velocity.x) > MAX_WALK) this.velocity.x =  MAX_WALK;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        
        if (this.velocity.x > 0) {
            this.state = 1;
            this.facing = 0;
        } else if (this.velocity.x < 0) {
            this.state = 1;
            this.facing = 1;
        } else if (this.attack > 0) {
            this.state =2;
        } else if (this.block > 0) {
            this.state =3;
        }
        
        this.y = 700

        
    };
    loadAnimation(spritesheet) {

        for (var i = 0; i < 4; i++) { // four states
            this.animations.push([]);
        }
        // Idle Animation
        this.animations[0] = new Animator(this.spritesheet,88,1200,80,104,10,0.1,0,false,true);

        // Walk Animaiton
        this.animations[1] = new Animator(this.spritesheet,88,907,96,104,10,0.1,1.5,true,true);

        // Attack Animation
        this.animations[2] = new Animator(this.spritesheet,88,315,128,120,10,0.1,0.5,false,true);
        
        // Block Animation
        this.animations[3] = new Animator(this.spritesheet,631,575,88,104,1,0.15,18,false,true);
        
    }



    draw(ctx) {

        if (this.facing === 0) {
            if(this.state === 2) {
                this.animations[this.state].drawFrameReverse(this.game.clockTick, ctx, this.x-16, this.y-16, 0.8);
            } else {
                this.animations[this.state].drawFrameReverse(this.game.clockTick, ctx, this.x, this.y, 0.8);
            }
            
        } else {
            if(this.state === 2) {
                this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x-32, this.y-16, 0.8);
            } else {
                this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.8);
            }
        }

/*
        this.idleAnimation.drawFrameReverse(this.game.clockTick,ctx,0,0,1);
        if (this.switch === 1) {
            this.walkAnimation.drawFrame(this.game.clockTick,ctx,this.x,702,0.8);
        } else {
            this.walkAnimation.drawFrameReverse(this.game.clockTick,ctx,this.x,702,0.8);
        }
        this.attackAnimation.drawFrameReverse(this.game.clockTick,ctx,0,128,1);

        this.defendAnimations.drawFrameReverse(this.game.clockTick,ctx,0,128*3,1);
*/
        
    };
};