class Sprite{
    constructor({position, imageSrc, scale=1,maxFrame = 1,offset = {x:0,y:0}}){
        this.position = position;
        this.height = 150;
        this.width =50; 
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.maxFrame = maxFrame;
        this.currentFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
        this.offset = offset;
    }

    draw(){
        con.drawImage(this.image,
            this.currentFrame * (this.image.width / this.maxFrame),
            0,
            this.image.width / this.maxFrame,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width/ this.maxFrame) * this.scale, this.image.height * this.scale);
    }
    
    animationFrames(){
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold === 0){
            if(this.currentFrame < this.maxFrame - 1){
                this.currentFrame++;
            }
            else{
                this.currentFrame = 0;
            }
        }
    }
    
    update(){
        this.draw(); 
        this.animationFrames();   
    }
}

class Warrior extends Sprite {
    constructor({position,velocity,color, imageSrc, scale=1,maxFrame = 1, offset = {x:0,y:0} , sprites, attackBox = {offset:{}, width:undefined, height:undefined}, damage}){
        super({
            position,
            imageSrc,
            scale,
            maxFrame,
            offset,
        });

        this.currentFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 20;
        this.velocity = velocity;
        this.height = 150;
        this.width =50;
        this.color = color;
        this.lastkeyPressed;
        this.health = 100;
        this.isPunch;
        this.damage =damage;
        this.sprites = sprites;
        this.death =false;

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc;
            sprites[sprite].maxFrame = sprites[sprite].maxFrame;
        }


        this.attackBox = {
            position:{
               x: 0,
               y: 0
            }, 
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
    }

    
    update(){
        this.draw();
        if(!this.death){
            this.animationFrames();
        }
        

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y; 

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y; 

        this.velocity.y += gravity ;

        if(this.position.y + this.height + this.velocity.y >= canvas.height-70){
            this.velocity.y = 0;
            this.position.y = 500;
        }  else this.velocity.y += gravity;   
    }

    punch(){
        this.isPunch = true;
    }

    hittaken(){
        this.health -=20;
        if(this.health <= 0){
            this.swithSprites('death');
        }
    }
    

    swithSprites(action){
        if(this.image === this.sprites.death.image ){
            this.death = true;
            return;
        } 
        if(this.image == this.sprites.attack1.image && this.currentFrame < this.sprites.attack1.maxFrame -1) return;
            switch(action){
                case 'idle':
                    if(this.image !== this.sprites.idle.image){
                        this.image = this.sprites.idle.image;
                        this.maxFrame = this.sprites.idle.maxFrame;
                        this.currentFrame = 0; 
                    }
                            
                break;
                case 'run':
                    if(this.image !== this.sprites.run.image){
                        this.image = this.sprites.run.image;
                        this.maxFrame = this.sprites.run.maxFrame;
                        this.currentFrame = 0;
                    }
                        
                break;
                
                case 'jump':
                    if(this.image !== this.sprites.jump.image){
                        this.image = this.sprites.jump.image;
                        this.maxFrame = this.sprites.jump.maxFrame;
                        this.currentFrame = 0;
                    }
                break;

                case 'attack1':
                    if(this.image !== this.sprites.attack1.image){
                        this.image = this.sprites.attack1.image;
                        this.maxFrame = this.sprites.attack1.maxFrame;
                        this.currentFrame = 0;
                    }
                break;

                case 'death':
                    if(this.image !== this.sprites.death.image){
                        this.image = this.sprites.death.image;
                        this.maxFrame = this.sprites.death.maxFrame;
                        this.currentFrame = 0;
                    }
                break;
            }
        }
}