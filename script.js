window.onload = function() {

    class Emojis{
        constructor(container){
            this.emojisContainer = document.querySelector(container);
            this.symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐙', '🐵', '🦄', '🐞', '🦀', '🐟', '🐊', '🐓', '🦃'];
            this.emojis = [];
            this.openedEmojis = [];
            this.openedEmojisIndex = [];
            this.matchedEmojisIndex = [];
        }

        init(){
            this.emojisContainer.addEventListener( 'click', this.clickOnEmoji.bind(this));
            this.createEmojis();
            this.appendEmojisToDom()
        }


        clickOnEmoji(event){

            var emojiClass = event.target.parentElement.parentElement.classList[0];
            var valid = /emoji_/.test( emojiClass )
            if (!valid) return;
            var index = Number( emojiClass.replace( /emoji_/, '') );

            var emoji = this.emojis.filter( emoji => index === emoji.index)[0];

            this.handleClick(emoji);
        }

        handleClick(emoji){

            switch ( this.openedEmojisIndex.length ) {
                case 0:
                    console.log('case 0')
                    if( this.matchedEmojisIndex.indexOf(emoji.index) >= 0  ) return;
                    emoji.clickEvent();
                    if ( this.openedEmojisIndex.indexOf(emoji.index) < 0 ) this.openedEmojisIndex.push(emoji.index);
                    break;

                case 1:
                    console.log('case 1')
                    if( this.matchedEmojisIndex.indexOf(emoji.index) >= 0  ) return;
                    if( this.openedEmojisIndex.indexOf(emoji.index) >= 0  ) {
                        emoji.clickEvent();
                        this.openedEmojisIndex = [];
                        return
                    };
                    emoji.clickEvent();

                    var previosEmoji = this.emojis[ this.openedEmojisIndex[0] ];
                    var match = this.compareEmojiBySymbol(previosEmoji, emoji);
                    if(match){
                        console.log('match')
                        previosEmoji.addColor('green');
                        emoji.addColor('green');
                        this.matchedEmojisIndex.push(previosEmoji.index)
                        this.matchedEmojisIndex.push(emoji.index)
                        this.openedEmojisIndex = [];

                    }else {
                        console.log('not match')
                        previosEmoji.addColor('red');
                        emoji.addColor('red');
                        this.openedEmojisIndex.push(emoji.index)
                    }
                    break;
                case 2:
                    console.log('case 2')
                    if( this.matchedEmojisIndex.indexOf(emoji.index) >= 0  ) return;
                    if( this.openedEmojisIndex.indexOf(emoji.index) >= 0  ) return;

                    emoji.clickEvent();

                    this.emojis[ this.openedEmojisIndex[0] ].clickEvent().addColor('white');
                    this.emojis[ this.openedEmojisIndex[1] ].clickEvent().addColor('white');

                    this.openedEmojisIndex = [];
                    this.openedEmojisIndex.push(emoji.index);
                    break;
                default:
                    console.log('hello default')
            }

        }

        compareEmojiBySymbol(elem_1, elem_2){
            return  elem_1.emoji.dataset.symbol == elem_2.emoji.dataset.symbol ;

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




