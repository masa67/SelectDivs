
var stagesHelper = (function () {
    return {
        addClass: function (el, cl) {
            var i, classArr = el.className.split(' ');

            for (i = 0; i < classArr.length; i += 1) {
                if (classArr[i] === cl) {
                    return;
                }
            }

            el.className = el.className.length ? el.className + ' ' + cl : cl;
        },

        hasClass: function (el, cl) {
            return (' ' + el.className + ' ').indexOf(' ' + cl + ' ') > -1;
        },

        removeClass: function (el, cl) {
            var i, j, classArr = el.className.split(' ');

            for (i = 0, j = 0; i < classArr.length; i += 1) {
                if (classArr[i] !== cl) {
                    classArr[j] = classArr[i];
                    j += 1;
                }
            }
            classArr.length = j;

            el.className = classArr.join(' ');
        }
    };
}());
