
class Emoji {
    constructor(parent, index, symbol){
        this.parent = parent;
        this.emoji = this.createElement(index, symbol);
        this.index = index;
        this.symbol = symbol;
    }


    createElement(index, symbol){
        var elem = document.createElement('div');
        elem.className = "emoji_" + index;
        elem.dataset.symbol = symbol;

        var card = document.createElement('div')
        card.className = "card card_" + index;

        var card_face_front = document.createElement('div');
        card_face_front.className = "card__face card__face--front";
        card_face_front.textContent =  '';

        var card_face_back = document.createElement('div');
        card_face_back.className = "card__face card__face--back";
        card_face_back.textContent =  symbol;

        card.appendChild(card_face_front);
        card.appendChild(card_face_back);

        elem.appendChild(card);

        return elem;
    }

    appendToParent(){
        this.parent.appendChild(this.emoji);
    }

    clickEvent(){
        // console.log(this)
        this.emoji.childNodes[0].classList.toggle('is-flipped');
        return this;
    }
    addColor(color){
        switch ( color ) {
            case 'green':
                this.emoji.childNodes[0].childNodes[1].style.backgroundColor  = '#4cff4d';
                break;
            case 'red':
                this.emoji.childNodes[0].childNodes[1].style.backgroundColor  = '#ff474d';
                break;
            case 'white':
                this.emoji.childNodes[0].childNodes[1].style.backgroundColor  = '#fff';
                break;
            default:
                console.log('color didnt match');
        }
    }






}
























