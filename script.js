window.onload = function() {

    class Emojis{
        constructor(container){
            this.emojisContainer = document.querySelector(container);
            this.symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐙', '🐵', '🦄', '🐞', '🦀', '🐟', '🐊', '🐓', '🦃'];
            this.emojis = [];
            this.openedIndex = [];
            this.greenIndex = [];
            this.redIndex = [];
            this.timer = new Timer();
            this.endgame = document.querySelector('#endgame');
            this.wingame = document.querySelector('#wingame');
            this.losegame = document.querySelector('#losegame');
        }

        init(){
            this.emojisContainer.addEventListener( 'click', this.clickOnEmoji.bind(this));
            this.createEmojis();
            this.appendEmojisToDom();
        }

        winGame(){
            this.endgame.style.display = 'block';
            this.wingame.style.display = 'block';
            this.timer.timerStop()
        }

        startNewGame(){
            this.emojis = [];
            this.openedIndex = [];
            this.greenIndex = [];
            this.redIndex = [];
            this.removeCards();
            this.createEmojis();
            this.appendEmojisToDom();
            this.endgame.style.display = 'none';
            this.wingame.style.display = 'none';
            this.losegame.style.display = 'none';
            this.timer.setTime()
        }


        removeCards(){
            for(var i=0; i<=11; i++){
                var card = document.querySelector('.emoji_'+i);
                if(card){
                    card.parentNode.removeChild(card);
                }
            }
        }

        clickOnEmoji(event){
            var emojiClass = event.target.parentElement.parentElement.classList[0];
            var card = /emoji_/.test( emojiClass )
            if (card){
                var index = Number( emojiClass.replace( /emoji_/, '') );
                var emoji = this.emojis.filter( emoji => index === emoji.index)[0];
                this.handleClickEmoji(emoji);
                this.handleClickTimer()
                return;
            }
            if (event.target.id === 'playagain'){
                this.startNewGame()
            }
        }

        handleClickEmoji(currentEmoji){

            if( this.greenIndex.indexOf(currentEmoji.index) >= 0  ) return;
            if( this.redIndex.indexOf(currentEmoji.index) >= 0  ) return;

            switch ( this.openedIndex.length ) {
                case 0:
                    if ( this.openedIndex.indexOf(currentEmoji.index) < 0 ) {
                        this.openedIndex.push(currentEmoji.index);
                        currentEmoji.clickEvent();
                    };
                    this.removeRedColor()
                    break;

                case 1:

                    var previosEmoji = this.emojis[ this.openedIndex[0] ];

                    if(previosEmoji.index === currentEmoji.index){
                        this.openedIndex = [];
                    }else if (previosEmoji.symbol ===  currentEmoji.symbol){
                        this.addToColorArr(previosEmoji.index, currentEmoji.index, 'green')
                    }else {
                        this.addToColorArr(previosEmoji.index, currentEmoji.index, 'red')
                    }
                    this.openedIndex = [];
                    currentEmoji.clickEvent();
                    if(this.greenIndex.length === 12) this.winGame();
                    break;
                default:
                    console.log('hello default')
            }

        }

        addToColorArr(elem_1, elem_2, color){
            switch ( color ) {
                case 'green':
                    this.greenIndex.push(elem_1, elem_2);
                    this.greenIndex.forEach( index => this.emojis[index].addColor(color))
                    break;
                case 'red':
                    this.redIndex.push(elem_1, elem_2);
                    this.redIndex.forEach( index => this.emojis[index].addColor('red'))
                    break;
                default:
                    console.log('hello default color arr')
            }
        }

        removeRedColor(){
            this.redIndex.forEach( index => {
                this.emojis[index].clickEvent().addColor('white')
            });
            this.redIndex = [];
        }

        mixedArr(arr) {
            arr = arr.slice();
            let result = [];
            while (arr.length){
                result.push( arr.splice(Math.floor(Math.random() * arr.length), 1)[0]  ) ;
            }
            if (Math.floor(Math.random() * 10) > 7){
                return result;
            }else {
                return this.mixedArr(result);
            }
        }

        createEmojis() {
            let emojiSimbols = this.genereteEmojiSet();
            for (var i=0; i < 12; i++){
                var newEmoji = new Emoji(this.emojisContainer, i, emojiSimbols[i]);
                this.emojis.push(newEmoji);
            }
        }

        genereteEmojiSet(){
            let mixedSymbols = this.mixedArr(this.symbols).splice(0, 6)
            let twelveSimbols = this.mixedArr(mixedSymbols.concat(mixedSymbols));
            return twelveSimbols;
        }

        appendEmojisToDom(){
            this.emojis.forEach( emoji => emoji.appendToParent())
        }

        handleClickTimer(){
            if(!this.timer.isRunning && this.endgame.style.display !== 'block') {
                this.timer.startNewTimer()
            };
        }

    }


    var emojis = new  Emojis('.emojis');
    emojis.init();



};



// https://github.com/Evgen097/memory.git// …or create a new repository on the command line

// echo "# memory" >> README.md
// git init
// git add README.md
// git commit -m "game mechanics added"
// git remote add origin https://github.com/Evgen097/memory.git
//     git push -u origin master

// …or push an existing repository from the command line
// git remote add origin https://github.com/Evgen097/memory.git
//     git push -u origin master

// …or import code from another repository
// You can initialize this repository with code from a Subversion, Mercurial, or TFS project.
//
//









// let parent = event.target.parentElement;
// if(parent.classList.contains('card') ){
//     parent.classList.toggle('is-flipped')
// }




