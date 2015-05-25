
/*global document, stagesHelper */
var styledSelect = (function () {
    'use strict';

    var mainEl;

    function renderHtml(cfg) {
        var el, html = '', i;

        if (cfg.label) {
            html = '<div class="styled-select-label">' + cfg.label + '</div>';
        }

        html += '<div class="styled-select-value-list">' +
                    '<div class="styled-select-value-wrapper">' +
                        '<div class="styled-select-value">' + cfg.emptyValue + '</div>' +
                        '<span class="fa fa-caret-down"></span>' +
                    '</div>' +
                    '<div class="styled-select-list">';

        for (i = 0; i < cfg.options.length; i += 1) {
            el = cfg.options[i];
            html +=     '<div class="styled-select-list-item' + (cfg.options[i].enabled ? '"' : ' disabled"') +
                            ' data-value="' + el.value + '"' +
                            ' display-value="' + el.displayValue + '">' +
                            el.html +
                        '</div>';
        }
        html +=     '</div>' +
                '<div>';

        mainEl.innerHTML = html;
    }

    function create(cfg) {
        var  els, i;

        mainEl = document.getElementById(cfg.id);
        if (!mainEl) {
            return;
        }

        renderHtml(cfg);

        els = mainEl.getElementsByClassName('styled-select-value');

        (function () {
            var selectListField, valueField;

            function clickItem(e) {
                e.stopPropagation(); // prevent 'blur', see body click below
                valueField.children[0].setAttribute('data-value', this.attributes['data-value'].value);
                valueField.children[0].innerHTML = this.attributes['display-value'].value;
                selectListField.style.display = 'none';
            }

            valueField = els[0].parentElement;
            selectListField = valueField.parentElement.getElementsByClassName('styled-select-list')[0];

            valueField.addEventListener('click', function (e) {
                e.stopPropagation(); // prevent 'blur', see body click below
                selectListField.style.display =
                    (selectListField.style.display !== 'block' &&
                     !stagesHelper.hasClass(valueField, 'disabled')) ? 'block' : 'none';
            }, false);

            document.getElementsByTagName('body')[0].addEventListener('click', function () {
                selectListField.style.display = 'none';
            }, false);

            els = mainEl.getElementsByClassName('styled-select-list-item');
            for (i = 0; i < els.length; i += 1) {
                if (!stagesHelper.hasClass(els[i], 'disabled')) {
                    els[i].addEventListener('click', clickItem, false);
                }
            }
        }());
    }

    function setEnabled(id, en) {
        var els;

        mainEl = document.getElementById(id);
        if (!mainEl) {
            return;
        }

        els = mainEl.getElementsByClassName('styled-select-value-wrapper');
        if (!els) {
            return;
        }

        if (en) {
            stagesHelper.removeClass(els[0], 'disabled');
        } else {
            stagesHelper.addClass(els[0], 'disabled');
        }
    }

    return {
        create: create,
        setEnabled: setEnabled
    };
}());
