window.onload = function() {



var emojis = document.querySelector('.emojis');
emojis.addEventListener( 'click', function(event) {
    // console.log(event.target.textContent)
    // console.log(event.target.parentElement.classList.contains('card')  )

    var parent = event.target.parentElement;
    if(parent.classList.contains('card') ){
        parent.classList.toggle('is-flipped')
    }

});


var emojiSimbols = ['🐶', '🐰', '🐯', '🐮', '🐙', '🐞', '🐶', '🐰', '🐯', '🐮', '🐙', '🐞'];

function mixedArr(arr) {
    arr = arr.slice();
    result = [];
    while (arr.length){
        result.push( arr.splice(Math.floor(Math.random() * arr.length), 1)[0]  ) ;
    }
    if (Math.floor(Math.random() * 10) > 7){
        return result;
    }else {
        return mixedArr(result);
    }

}

function createEmoji(parentClass, num, emojiSimbols) {

    var parentDiv = document.querySelector(parentClass);
    var mixedEmojiSimbols = mixedArr(emojiSimbols);

    for (var i=0; i < num; i++){

        var emoji = document.createElement('div');
        emoji.className = "emoji_" + i;

        var card = document.createElement('div')
        card.className = "card card_" + i;

        var card_face_front = document.createElement('div');
        card_face_front.className = "card__face card__face--front";
        // card_face_front.textContent = mixedEmojiSimbols[i];

        var card_face_back = document.createElement('div');
        card_face_back.className = "card__face card__face--back";
        card_face_back.textContent =  mixedEmojiSimbols[i];

        card.appendChild(card_face_front);
        card.appendChild(card_face_back);

        emoji.appendChild(card);

        parentDiv.appendChild(emoji)
    }

}

createEmoji('.emojis', 12, emojiSimbols);







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














