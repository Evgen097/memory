$(document).ready(function(){

    function deleteClass(selector, oldClass){
            $(selector).each(function(i,elem) {
                elem.classList.remove(oldClass)
            });
    };

    QUnit.module( "Модуль проверки кликов", {
        beforeEach: function() {
            deleteClass('.card', 'is-flipped');
        }, afterEach: function(  ) {
            deleteClass('.card', 'is-flipped');
        }
    });


    QUnit.test( "div с классом emojis существует", function( assert ) {
        var emojis = document.querySelector('.emojis');
        assert.ok( emojis );
    });


    QUnit.test( "созданы 12 emojis", function( assert ) {

        var emojis = $('[class^="emoji_"]').children().length;
        console.log(emojis)
        var front = document.querySelectorAll('.card__face--front').length;
        var back = document.querySelectorAll('.card__face--back').length;
        assert.equal(emojis, 12, 'emojis has 12 childrens');
        assert.equal(front, 12, front);
        assert.equal(back, 12, back);

    });


    QUnit.test( "на emoji отсутствует класс is-flipped", function( assert ) {

        $('.card__face--front').each(function(i,elem) {
            var parent = elem.parentElement;
            assert.equal(parent.classList.contains('is-flipped'), false, parent.classList);
        });
    });

    QUnit.test( "при повторном клике на emoji удаляется класс is-flipped", function( assert ) {

        $('.card__face--front').each(function(i,elem) {
            elem.click();
            elem.click();
            var parent = elem.parentElement;
            assert.equal(parent.classList.contains('is-flipped'), false, parent.classList);
        });
        deleteClass('.card', 'is-flipped');
    });


    QUnit.test( "при клике на emoji добавляется класс is-flipped", function( assert ) {
        assert.expect( 12);

        $('.card__face--front').each(function(i,elem) {
                elem.click();
                var parent = elem.parentElement;
                assert.equal(parent.classList.contains('is-flipped'), true, parent.classList);

                elem.click();
        });
    });



    QUnit.module( "Модуль добавления цветов",);
    QUnit.test( "проверка на добавление зеленого и красного цветов при клике на разные карточки", function( assert ) {

        deleteClass('.card', 'is-flipped');
        EMOJIS.startNewGame();

        assert.expect( 12 );
        var done = assert.async( 12 );
        var emojisArr = [];
        var greenObj = {
            first: 'rgb(76, 255, 77)',
            second: 'rgb(76, 255, 77)'
        }
        var redObj = {
            first: 'rgb(255, 71, 77)',
            second: 'rgb(255, 71, 77)'
        };


        $('.card__face--front').each(function(i,elem) {
            setTimeout( (elem, i) =>{
                elem.click();
                var parent = elem.parentElement;
                emojisArr.push(parent);

                if(emojisArr.length === 1){
                    console.log('белый');
                    var elemColor = emojisArr[0].childNodes[1].style.backgroundColor;
                    assert.equal(elemColor, '', 'color should not exist yet ' + elemColor);
                    done();
                    return;
                }

                var cardsColors = {
                    first: emojisArr[0].childNodes[1].style.backgroundColor,
                    second: emojisArr[1].childNodes[1].style.backgroundColor
                }


                if ( emojisArr.length == 2 || i === 11 ) {
                    if (emojisArr[0].childNodes[1].innerText === emojisArr[1].childNodes[1].innerText) {
                        console.log('зеленый');
                        assert.deepEqual(cardsColors,  greenObj, 'should be green cardsColors: ' + JSON.stringify(cardsColors));
                    }else {
                        console.log('красный');
                        assert.deepEqual(cardsColors,  redObj, 'should be red cardsColors: ' + JSON.stringify(cardsColors));
                    }
                    emojisArr = [];
                    if(i===11) deleteClass('.card', 'is-flipped');
                    done();
                    return
                }
            }, i*500, elem, i )
        });
    });



    QUnit.module( "Модуль проверки логики игры",);
    QUnit.test( "проверка на появлении всплывающего окна, после окончания игры", function( assert ) {
        assert.expect( 2 );
        var done = assert.async( 1 );

        EMOJIS.startNewGame();
        EMOJIS.setGameTime(1);

        $('.card__face--front')[0].click();

        setTimeout( () =>{
            var endgame = $('#endgame');
            assert.equal(endgame.css('display'), 'block', 'endgame display should be block', endgame);

            var losegame = $('#losegame');
            assert.equal(losegame.css('display'), 'block', 'losegame display should be block', losegame);
            setTimeout( () =>{
                deleteClass('.card', 'is-flipped');
                EMOJIS.startNewGame();
                done();
            }, 1000 )
        }, 2200 )
    });


    QUnit.test( "проверка отсчета времени после начала игры", function( assert ) {
        assert.expect( 4 );
        var done = assert.async( 1 );

        var time = $('#sec')[0];
        var count = 60;
        EMOJIS.startNewGame();

        assert.equal(+time.innerText, count, 'time is: ', time);

        $('.card__face--front')[0].click();
        var timerId = setInterval( () =>{
            count -= 1;
            assert.equal(+time.innerText, count, 'time is: ', time);
        }, 1000 );

        setTimeout( () =>{
            clearInterval(timerId);
            EMOJIS.startNewGame();
            done();
        }, 3000 )
    });


    QUnit.test( "игра должна быть выиграна", function( assert ) {
        this.symbols = ['🐶','🐶','🐱', '🐱', '🐭', '🐭', '🐹', '🐹', '🐰', '🐰', '🦀', '🦀'];

        assert.expect( 4 );
        var done = assert.async( 1 );
        var endgame = $('#endgame');
        var wingame = $('#wingame');

        EMOJIS.startNewGame();

        assert.equal(endgame.css('display'), 'none', 'endgame display should be none', endgame);
        assert.equal(wingame.css('display'), 'none', 'wingame display should be none', wingame);

        $('.card__face--back').each( (index, elem) =>{
            elem.innerText = this.symbols[index]
        } )
        $('.card__face--front').each( (index, elem) =>{
            elem.innerText = this.symbols[index]
        } );
        $('[class^="emoji_"]').each( (index, elem) =>{
            elem.dataset.symbol = this.symbols[index]
        } );

        EMOJIS.emojis.forEach( (item, index) => {
            item.symbol = this.symbols[index]
        } )

        $('.card__face--front').each((i,elem) => {
            setTimeout( elem => {
                elem.click();
            }, i*200,elem)
        });

        setTimeout( () =>{

            assert.equal(endgame.css('display'), 'block', 'endgame display should be block', endgame);
            assert.equal(wingame.css('display'), 'block', 'wingame display should be block', wingame);

            EMOJIS.startNewGame();
            done();
        }, 3000 )
    });



});





