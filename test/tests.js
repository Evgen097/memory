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

        var emojis = $('.emojis').children().length;
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

});





