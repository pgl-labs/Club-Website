(function() {

  window.launchApp = function() {

    /// ---------------------------
    //  INIT
    /// ---------------------------
    this.blocksContainer = document.getElementById('blocks-container');
    this.illustrationsContainer = document.getElementById('illustrations-container');
    this.blockTime = 5000;
    this.transactionsPerSecond = 2000;
    this.blockHeight = 7.81;
    this.blockNumber = 0;
    this.maxBlocks = 6;
    this.blocks = [];
    this.currentBlockValidation = true;
    this.colors = ['blue', 'green', 'yellow', 'orange', 'red'];
    this.wrongBlocks = ['big-1', 'big-2', 'small-1', 'small-2'];
    this.wheel = document.getElementById('wheel');
    this.wheelShadow = document.getElementById('wheel-shadow');
    this.bulb = document.getElementById('bulb');
    this.bulbLight = document.getElementById('bulb-light');
    this.bulb1 = document.getElementById('bulb-1');
    this.bulb2 = document.getElementById('bulb-2');
    this.bulb3 = document.getElementById('bulb-3');
    this.bar = document.getElementById('bar');
    this.satelliteArm1 = document.getElementById('satellite-arm-1');
    this.satelliteArm2 = document.getElementById('satellite-arm-2');
    this.satelliteHead = document.getElementById('satellite-head');
    this.wave1 = document.getElementById('wave-1');
    this.wave2 = document.getElementById('wave-2');
    this.wave3 = document.getElementById('wave-3');

    this.initApp = function() {            
      this.createBlock();
      this.launchParticles();
    }         

    /// ---------------------------
    //  BLOCK UTILS
    /// ---------------------------
    this.createBlock = function() {
      var color = this.colors[Math.floor(Math.random()*this.colors.length)];
      var randomValidation = Math.floor(Math.random() * Math.floor(5));
      this.currentBlockValidation = (randomValidation === 1 ? false : true);


      var block = document.createElement("div");
      if (!this.currentBlockValidation) {
        var form = this.wrongBlocks[Math.floor(Math.random()*this.wrongBlocks.length)];
        block.className = 'block is-' + color + ' is-' + form;
      } else {
        block.className = 'block is-' + color;
      }

      var blockPlane = document.createElement("div");
      blockPlane.className = 'block-plane';

      var blockCircles1 = document.createElement("div");
      blockCircles1.className = 'circles circles-1';           
      var blockCircles2 = document.createElement("div");
      blockCircles2.className = 'circles circles-2';

      var blockFaceLeft = document.createElement("div");
      blockFaceLeft.className = 'block-face face-left';
      var blockFaceRight = document.createElement("div");
      blockFaceRight.className = 'block-face face-right';

      var blockData = document.createElement("div");
      blockData.className = 'block-data';
      var blockDataBlock = document.createElement("p");
      var blockNumber = document.createTextNode('Block: ' + (this.blockNumber + 1).toString());
      var blockDataTransactions = document.createElement("p");
      var transactionsNumber = Math.floor(Math.random() * ((this.blockTime / 1000) * this.transactionsPerSecond) + 0).toString();
      var blockTransactions = document.createTextNode('Transactions: ' + transactionsNumber);

      blockPlane.appendChild(blockCircles1);
      blockPlane.appendChild(blockCircles2);
      blockDataBlock.appendChild(blockNumber);
      blockDataTransactions.appendChild(blockTransactions);
      blockData.appendChild(blockDataBlock);
      blockData.appendChild(blockDataTransactions);
      block.appendChild(blockPlane);
      block.appendChild(blockFaceLeft);
      block.appendChild(blockFaceRight);
      block.appendChild(blockData);

      this.blocks.push(block);
      this.blocksContainer.appendChild(block, blockData)

      this.showBlock(block, blockData);
      this.validateBlock();

      var self = this;
      setTimeout(function() {
        if (self.currentBlockValidation) {                        
          self.blockNumber++;
        }
        self.createBlock();
      }, self.blockTime);

      if (this.blockNumber >= this.maxBlocks && self.currentBlockValidation) {
        this.deleteLastBlock();
      }
    }

    this.deleteLastBlock = function() {
      this.blocksContainer.removeChild(this.blocks[0]);
      this.blocks.splice(0, 1);
    }
    this.deleteCreatedBlock = function() {
      var lastBlockPosition = this.blocks.length;
      this.blocksContainer.removeChild(this.blocks[this.blockNumber]);
      this.blocks.splice(this.blockNumber, 1);
    }

    this.validateBlock = function() {
      this.validationAnimation();
    }

    /// ---------------------------
    //  SOUND UTILS
    /// ---------------------------

    /// ---------------------------
    //  UTILS
    /// ---------------------------        
    this.launchParticles = function() {
      var particlesOptions = {
        "particles": {
          "number": {
            "value": 25,
            "density": {
              "enable": false,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            }
          },
          "opacity": {
            "value": 0.6,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 3,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "bounce",
            "attract": {
              "enable": false
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": false
            },
            "onclick": {
              "enable": false
            },
            "resize": true
          }
        },
        "retina_detect": true
      };

      particlesJS('item-particles', particlesOptions);
    }

    /// ---------------------------
    //  ANIMATIONS
    /// ---------------------------
    this.showBlock = function(block, blockData) {
      var self = this;
      var baseTimeline = new TimelineMax({
        onComplete: function() {
          if (self.currentBlockValidation) {                        
            self.addBlockToPile();
          } else {
            self.throwBlock(block);
          }
        }
      });
      baseTimeline.clear();

      baseTimeline
        .to(block, 0.5, {css: {top: "0%"}, ease: Power2.easeOut})
        .to(blockData, 0.5, {css: {opacity: "1", left: "100%"}, ease: Power2.easeOut}, 0.4)
        .to(blockData, 0.5, {css: {opacity: "0", left: "90%"}, ease: Power2.easeOut}, 3);
    }

    this.addBlockToPile = function() {
      var blockLength = this.blocks.length;
      for (i = 0; i < blockLength; i++) {
        new TimelineMax().to(this.blocks[i], 0.5, {css: {top: "40%", marginTop: (blockLength - i) * (this.blockHeight / 2) + "vw"}, ease: Power2.easeOut});
      }
    }

    this.throwBlock = function(block) {
      var self = this;

      new TimelineMax({
        onComplete: function() {
          self.deleteCreatedBlock();
          self.resetAnimationValues();
        }
      }).to(block, 0.5, {left: "-35vw", ease: Power2.easeOut});
    }

    this.validationAnimation = function() {
      var self = this;
      var bulbColor = (this.currentBlockValidation ? "#9ed027" : "#eb413b")

      var baseTimeline = new TimelineMax({
        onComplete: function() {
          self.resetAnimationValues();
        }
      });
      baseTimeline.clear();

      baseTimeline
        .to(this.wheel, 2, {rotation: "360deg", ease: Power2.easeOut}, 0.9)
        .to(this.wheelShadow, 2, {rotation: "360deg", ease: Power2.easeOut}, 0.9)
        .to(this.bar, 2, {width: "100%", ease: Power2.easeOut}, 0.9)
        .to(this.bulb1, 0.1, {fill: "#eb413b", ease: Power2.easeOut}, 0.9)
        .to(this.bulb2, 0.1, {fill: "#f9eb2f", ease: Power2.easeOut}, 1.16)
        .to(this.bulb3, 0.1, {fill: "#9ed027", ease: Power2.easeOut}, 1.72)
        .to(this.bulb, 0.1, {fill: bulbColor, ease: Power2.easeOut}, 2.38)
        .to(this.bulbLight, 0.1, {css: {boxShadow: "0px -10px 30px " + bulbColor}, ease: Power2.easeOut}, 2.38)
        .to(this.satelliteArm1, 0.5, {rotation: "90deg", ease: Power2.easeOut}, 0.4)
        .to(this.satelliteArm2, 0.5, {rotation: "-130deg", ease: Power2.easeOut}, 0.4)
        .to(this.satelliteHead, 0.5, {rotation: "20deg", ease: Power2.easeOut}, 0.4)
        .to(this.wave1, 0.8, {left: "-6vw", opacity: "0.4", scale: "2.3", ease: "linear"}, 0.9)
        .to(this.wave2, 0.8, {left: "-6vw", opacity: "0.4", scale: "2.3", ease: "linear"}, 1.1)
        .to(this.wave3, 0.8, {left: "-6vw", opacity: "0.4", scale: "2.3", ease: "linear"}, 1.3)
        .to(this.bar, 0.5, {width: "0%", ease: Power2.easeOut}, 3)
        .to(this.bulb1, 0.2, {fill: "#c7cdd1", ease: Power2.easeOut}, 3)
        .to(this.bulb2, 0.2, {fill: "#c7cdd1", ease: Power2.easeOut}, 3)
        .to(this.bulb3, 0.2, {fill: "#c7cdd1", ease: Power2.easeOut}, 3)
        .to(this.bulb, 0.2, {fill: "#c7cdd1", ease: Power2.easeOut}, 3)
        .to(this.bulbLight, 0.1, {css: {boxShadow: "0px 0px 0px transparent"}, ease: Power2.easeOut}, 3)
        .to(this.satelliteArm1, 0.5, {rotation: "0deg", ease: Power2.easeOut}, 3)
        .to(this.satelliteArm2, 0.5, {rotation: "0deg", ease: Power2.easeOut}, 3)
        .to(this.satelliteHead, 0.5, {rotation: "0deg", ease: Power2.easeOut}, 3)
        .to(this.wave1, 0.2, {left: "-6.5vw", opacity: "0", scale: "2.8", ease: "linear"}, 1.7)
        .to(this.wave2, 0.2, {left: "-6.5vw", opacity: "0", scale: "2.8", ease: "linear"}, 1.9)
        .to(this.wave3, 0.2, {left: "-6.5vw", opacity: "0", scale: "2.8", ease: "linear"}, 2.1)

      setTimeout(function() {
        self.illustrationsContainer.classList.add('is-animated');

        setTimeout(function() {
          self.illustrationsContainer.classList.remove('is-animated');
        }, 2100);
      }, 900);
    }
    this.resetAnimationValues = function() {
      TweenLite.set(this.wheel, {clearProps: "rotation"});
      TweenLite.set(this.wheelShadow, {clearProps: "rotation"});
      TweenLite.set(this.wave1, {left: "-3.5vw", opacity: "0", scale: "1"});
      TweenLite.set(this.wave2, {left: "-3.5vw", opacity: "0", scale: "1"});
      TweenLite.set(this.wave3, {left: "-3.5vw", opacity: "0", scale: "1"});
    }


    /// ---------------------------
    //  START
    /// ---------------------------
    this.initApp(); 
  };

  document.addEventListener("DOMContentLoaded", function() {
    this.app = new launchApp();
  });

})();