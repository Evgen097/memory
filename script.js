window.onload = function() {

    class Emojis{
        constructor(container){
            this.emojisContainer = document.querySelector(container);
            this.symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐙', '🐵', '🦄', '🐞', '🦀', '🐟', '🐊', '🐓', '🦃'];
        }

        init(){
            this.emojisContainer.addEventListener( 'click', this.clickOnEmoji);
            this.createEmojis();
        }


        clickOnEmoji(event){
            let parent = event.target.parentElement;
            if(parent.classList.contains('card') ){
                parent.classList.toggle('is-flipped')
            }
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
            let mixedSymbols = this.mixedArr(this.symbols).splice(0, 6)
            let emojiSimbols = this.mixedArr(mixedSymbols.concat(mixedSymbols))
            for (var i=0; i < 12; i++){
                this.createEmojiElement(i, emojiSimbols[i])
            }
        }

        createEmojiElement(index, simbol){
            var emoji = document.createElement('div');
            emoji.className = "emoji_" + index;

            var card = document.createElement('div')
            card.className = "card card_" + index;

            var card_face_front = document.createElement('div');
            card_face_front.className = "card__face card__face--front";


            var card_face_back = document.createElement('div');
            card_face_back.className = "card__face card__face--back";
            card_face_back.textContent =  simbol;

            card.appendChild(card_face_front);
            card.appendChild(card_face_back);

            emoji.appendChild(card);

            this.emojisContainer.appendChild(emoji)
        }
    }




    var emojis = new  Emojis('.emojis');
    emojis.init();



};



// https://github.com/Evgen097/memory.git// …or create a new repository on the command line

// echo "# memory" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git remote add origin https://github.com/Evgen097/memory.git
//     git push -u origin master

// …or push an existing repository from the command line
// git remote add origin https://github.com/Evgen097/memory.git
//     git push -u origin master

// …or import code from another repository
// You can initialize this repository with code from a Subversion, Mercurial, or TFS project.
//
//














