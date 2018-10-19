$(document).ready(function(){

    function deleteClass(selector, oldClass){
        $(selector).each(function(i,elem) {
            elem.classList.remove(oldClass)
        });
    };


    QUnit.module( "Тестировани Emojis", {
        beforeEach: function() {
            // deleteClass('.card', 'is-flipped');
        }, afterEach: function(  ) {
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


    QUnit.test( "при клике на emoji добавляется класс is-flipped", function( assert ) {
        assert.expect( 12);
        var done = assert.async( 12 );

        $('.card__face--front').each(function(i,elem) {

            setTimeout( (elem, i) =>{
                elem.click();
                var parent = elem.parentElement;
                assert.equal(parent.classList.contains('is-flipped'), true, parent.classList);

                setTimeout( (elem, i) =>{
                    elem.click();
                    done();
                }, 500, elem, i  )

            }, i*500, elem, i )
        });
    });


    QUnit.test( "при повторном клике на emoji удаляется класс is-flipped", function( assert ) {

        $('.card__face--front').each(function(i,elem) {
            elem.click();
            elem.click();
            var parent = elem.parentElement;
            assert.equal(parent.classList.contains('is-flipped'), false, parent.classList);
        });

    });

    // QUnit.skip( "при повторном клике на emoji удаляется класс is-flipped", function( assert ) {
    //     assert.expect( 12);
    //     var done = assert.async( 12 );
    //
    //     $('.card__face--front').each(function(i,elem) {
    //         setTimeout( (elem, i) =>{
    //             elem.click();
    //             setTimeout( (elem, i) =>{
    //                 elem.click();
    //                 var parent = elem.parentElement;
    //                 assert.equal(parent.classList.contains('is-flipped'), false, parent.classList);
    //                 done();
    //             }, 500, elem, i  )
    //         }, i*500, elem, i )
    //     });
    // });


    // QUnit.test( "проверка поля Name на НЕправльные значения", function( assert ) {
    //     notValidNames.forEach( name =>{
    //         var input = document.getElementById("profile-name")
    //         input.value= name;
    //         $('#profile button').trigger( "click" );
    //         var hasErrorClass = document.getElementById("profile-name").classList.contains(params.inputErrorClass);
    //         assert.equal(hasErrorClass, true, input.value);
    //         input.classList.remove(params.inputErrorClass);
    //     })
    // });



});
