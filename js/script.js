var arrBar = [];

var butt_show = 0;

var arrMobile = [];

var u = 0;
$('div.bar li').each(function () {
    u++;
    var ttt = $(this);
    var qp = ttt[0].innerText;
    arrBar.push([qp, u]);
});

$(function () {
    $('div.burger').click(function () {
        $('div.mobile-tab').toggleClass('action');
    })
});

var idActive = 0;
visualActionButNum = function() {
    $('div.bar li').click(function () {
        if ($(this).hasClass('active')) {
            idActive = $(this)[0].firstChild.id;
        } else {
            idActive = 0;
        }
    });
};

actionButReverse = function () {
    $('div.bar li').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $('div.bar li').removeClass('active');
            $(this).toggleClass('active');
        }
    });
    visualActionButNum();
};

visualActionBut = function() {
    actionButReverse();
    $('div.bar li').each(function () {
        if ($(this)[0].firstChild.id == idActive) {
            $(this).toggleClass('active');
        }
    })
};

deleteDiv = function() {
    $('div.bar li').each(function () {
        $(this).remove();
    });

    $('div.mobile-tab li').each(function () {
        $(this).remove();
    })
};

buttonReturn = function() {
    $('div.mobile-tab li').click(function () {

        var arQe = arrBar.pop();
        arrMobile.unshift(arQe);

        var wt = $(this)[0].firstChild.id;
        idActive = $(this)[0].firstChild.id;

        arrMobile.forEach(function (element, index, object) {
            if(element[1] == wt){
                var uue = element;
                arrBar.push(uue);
                object.splice(index, 1);
            }
        });

        deleteDiv();
        sortMobile();
        visual();
    })
};

visual = function() {
    arrBar.forEach(function (element) {
        $('div.bar ul:first').append('<li><a href="#" id="' + element[1] + '">' + element[0] + '</a></li>');
    });

    arrMobile.forEach(function (element) {
        $('div.mobile-tab ul:first').append('<li><a href="#" id="' + element[1] + '">' + element[0] + '</a></li>');
    });

    visualActionBut();
    buttonReturn();
};

sortBar = function() {
    for (k = 0; k < arrBar.length; k++) {
        for (i = 0; i < arrBar.length; i++) {
            if (arrBar[k][1] < arrBar[i][1]) {
                var z = arrBar[k];
                arrBar[k] = arrBar[i];
                arrBar[i] = z;
            }
        }
    }
};

sortMobile = function() {
    for (k = 0; k < arrMobile.length; k++) {
        for (i = 0; i < arrMobile.length; i++) {
            if (arrMobile[k][1] < arrMobile[i][1]) {
                var z = arrMobile[k];
                arrMobile[k] = arrMobile[i];
                arrMobile[i] = z;
            }
        }
    }
};

burgerAction = function () {
    if ((arrBar.length <= 7) && (arrBar.length >= 1)) {
        if (butt_show == 0) {
            $('div.burger').toggleClass('burger-active');
            butt_show = 1;
        }

    } else {
        if (butt_show == 1) {
            $('div.burger').toggleClass('burger-active');
            butt_show = 0;
        }
    }
};

redesigne = function() {

    var widthWindow = $(window).width();

    var widthListPr = 0;
    $('div.bar li').each(function(){widthListPr = widthListPr + $(this).innerWidth()});

    while (((widthListPr + 190) > widthWindow) && (($('div.bar li').length) > 1)) {
        if ($('div.bar li:last').hasClass('active')) {
            var arW = arrBar.pop();
            var arE = arrBar.pop();
            arrMobile.unshift(arE);
            arrBar.push(arW);
        }else {
            var arQ = arrBar.pop();
            arrMobile.unshift(arQ);
        }
        deleteDiv();
        sortMobile();
        visual();

        widthListPr = 0;
        $('div.bar li').each(function(){widthListPr = widthListPr + $(this).innerWidth()});
    };

    while (((widthListPr + 190) < widthWindow) && ($('div.bar li').length) < 8) {
        if ($('div.bar li:last').hasClass('active')) {
            var arW = arrBar.pop();
            var arT = arrMobile.shift();
            arrBar.push(arT);
            arrBar.push(arW);
        }else {
            var arT = arrMobile.shift();
            arrBar.push(arT);
        }
        deleteDiv();
        sortBar();
        visual();

        widthListPr = 0;
        $('div.bar li').each(function(){widthListPr = widthListPr + $(this).innerWidth()});
    }
};

visual();
redesigne();
burgerAction();

$(window).resize(function () {
    redesigne();
    burgerAction();
});
