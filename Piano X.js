// ==UserScript==
// @name         Piano X || Virtual Piano Autoplayer || PianoRhythm, VirtualPiano, Multiplayer Piano +MORE
// @namespace    https://nonumbershere.github.io/virtualpianotools
// @version      0.0.3
// @description  Advanced Virtual Piano Autoplay, supporting many sites. Such as: PianoRhythm, Virtual Piano, Online Pianist, Multiplayer Piano
// @author       Lapide
// @license      MIT
// @match        *://www.pianorhythm.me/*
// @match        *://virtualpiano.net/
// @match        *://onlinepianist.com/virtual-piano/
// @match        *://multiplayerpiano.com/*
// @icon         https://github.com/nonumbershere/Piano-X-Virtual-Piano-Autoplayer/blob/main/icon/px_main.jpeg?raw=true
// @grant        none
// ==/UserScript==
(function () {
    var r = '1!2@34$5%6^78*9(0qQwWeErtTyYuiIoOpPasSdDfgGhHjJklLzZxcCvVbBnm'.split('');
    function Increase(sheets, transition = 1) {
        if (!transition) return;
        transition = parseInt(transition);
        var results = '';
        for (var bb = 0; bb < sheets.length; ++bb) {
            if (!r.includes(sheets[bb])) {
                // sheets = sheets.replace(sheets[bb], '');
            }
        }

        sheets = sheets.split('');
        for (var jj = 0; jj < sheets.length; ++jj) {
            if (r.includes(sheets[jj])) {
                if (r.indexOf(sheets[jj]) != r.length - 1) {
                    results += r[r.indexOf(sheets[jj]) + transition];
                } else {
                    results += r[r.length - 1];
                }
            } else {
                results += sheets[jj];
            }
        }
        return results.replaceAll(undefined, '');
    }
    function align(text, alignment) {
        var spaces = ' '.repeat(alignment);
        var txt = text.includes('\n') ? text.split('\n') : text = spaces + text;
        return txt.includes('\n') ? txt.join(spaces + '\n') : txt;
    }
    alert('- HOW TO USE -\n;       Change Sheets\n-, =  Play sheets, will play a note everytime you press it\n\'       Resets sheets to the original\n[       Set Hotkeys');

    function invert(jj) {
        var final = '';
        for (var i = jj.length; i > 0; --i) {
            final += jj[i - 1];
        }
        return final;
    }
    String.prototype.replaceEnd = function replaceEnd(jj, hh) {
        var h = invert(this);
        var m = invert(jj);
        var n = invert(hh);

        return invert(h.replace(m, n));
    }
    var mStr = '!@#$%^&*()'.split('');
    var mSt = '1234567890'.split('');

    var usedHotkeys = '-=+_\'";:[}]{,<.>\\|'.split('');
    var avaliableHotkeys = '`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>? '.split('\n');

    window.config = {
        release: 1,
        caps: true,
        type: 'down',
        utype: 'up',
        loop: false,
        times: 1,
        times_time: 10,
        shift: true,
        curlbracket_time: 100,
        hotkeys: {
            start: ['-', '=', '+', "_"],
            reset: ['\'', '"'],
            set: [';', ':'],
            transpose: ['.', '>'],
            change: ['[', '{'],
            view: ['\\', '|'],
            times: [',', '<']
        }
    }
    var Codes = {
        SPLIT: /{[^}]*}|\D|\d|\S+/gm
    }

    function onlyLetters(str) {
        return /^[a-zA-Z]+$/.test(str);
    }
    window.sheets = beaut('[req] [req]');
    var current = 0;
    function WAIT(key, time) {
        setTimeout(() => {
            if (isNaN(parseInt(key)) && !mStr.includes(key)) {
                document.dispatchEvent(new KeyboardEvent("key" + config.type, {
                    key: (config.caps ? key.toUpperCase() : key),
                    keyCode: (config.caps ? key.toUpperCase() : key).charCodeAt(0),
                    code: "Key" + (config.caps ? key.toUpperCase() : key),
                    which: (config.caps ? key.toUpperCase() : key).charCodeAt(0),
                    shiftKey: (config.shift && key.toUpperCase() == key ? true : false),
                    ctrlKey: false,
                    metaKey: false
                }));
                setTimeout(() => {
                    document.dispatchEvent(new KeyboardEvent("key" + config.utype, {
                        key: (config.caps ? key.toUpperCase() : key),
                        keyCode: (config.caps ? key.toUpperCase() : key).charCodeAt(0),
                        code: "Key" + (config.caps ? key.toUpperCase() : key),
                        which: (config.caps ? key.toUpperCase() : key).charCodeAt(0),
                        shiftKey: (config.shift && key.toUpperCase() == key ? true : false),
                        ctrlKey: false,
                        metaKey: false
                    }));
                }, config.release);
                console.log("Pressed key: " + key);
            } else if (!isNaN(parseInt(key))) {
                document.dispatchEvent(new KeyboardEvent("key" + config.type, {
                    key: key,
                    keyCode: key.charCodeAt(0),
                    code: "Digit" + key,
                    which: key.charCodeAt(0),
                    shiftKey: false,
                    ctrlKey: false,
                    metaKey: false
                }));
                setTimeout(() => {
                    document.dispatchEvent(new KeyboardEvent("key" + config.utype, {
                        key: key,
                        keyCode: key.charCodeAt(0),
                        code: "Digit" + key,
                        which: key.charCodeAt(0),
                        shiftKey: false,
                        ctrlKey: false,
                        metaKey: false
                    }));
                }, config.release);
                console.log("Pressed digit: " + key);
            } else if (mStr.includes(key)) {
                var n = 0;
                var fin = false;
                mStr.find((r) => {
                    if (r == key) {
                        fin = true;
                        return n - 1;
                    } else {
                        if (!fin) {
                            ++n
                        }
                    }
                });
                var k = mSt[n];
                document.dispatchEvent(new KeyboardEvent("key" + config.utype, {
                    key: key,
                    keyCode: k.charCodeAt(0),
                    code: "Digit" + k,
                    which: k.charCodeAt(0),
                    shiftKey: true,
                    ctrlKey: false,
                    metaKey: false
                }));
                setTimeout(() => {
                    document.dispatchEvent(new KeyboardEvent("key" + config.type, {
                        key: key,
                        keyCode: k.charCodeAt(0),
                        code: "Digit" + k,
                        which: k.charCodeAt(0),
                        shiftKey: true,
                        ctrlKey: false,
                        metaKey: false
                    }));
                }, config.release);
                console.log("Pressed key: " + key);
            }
        }, time);
    }
    function press(key) {
        for (var i = 0; i < config.times; ++i) {
            WAIT(key, i * config.times_time);
        }
    }

    function apply(t) {
        return RegExp('\\s+(?=\\' + t.charAt(0) + '^[\\\\' + t.charAt(1) + ']*\\])', 'g');
    }

    function fin(r, t) {
        return t.replaceAll(r.charAt(0), " " + r.charAt(0)).replaceAll(r.charAt(1), r.charAt(1) + ' ');
    }

    function beaut(s) {
        var j = (s.replaceAll('-', '').replaceAll('|', '').replace(/\s+(?=[^{\]]*\})/g, "").replace(/\s+(?=[^[\]]*\])/g, "")).match(Codes.SPLIT).filter((t) => {
            return t != ' ' || ''
        }).join(' ').replace(/\s+(?=[^{\]]*\})/g, "").replace(/\s+(?=[^[\]]*\])/g, "").replaceAll('\n', ' ').replaceAll('\r', ' ').replaceAll('  ', '').replaceAll('  ', ' ');;
        j = j.replaceAll('  ', ' ').replaceAll('   ', '');
        if (j.endsWith(' '))
            j = j.replaceEnd(' ', '');
        if (j.startsWith(' '))
            j = j.replace(' ', '');
        return j.replaceAll('\n', ' ');
    }
    function waitPlay(key, timer) {
        setTimeout(() => {
            play(key);
        }, timer * 250)
    }

    function wPlay(key, timer) {
        var j = timer;
        setTimeout(() => {
            Conv(key);
        }, j * config.curlbracket_time)
    }

    function Conv(h) {
        if (h.startsWith('[') && h.endsWith(']')) {
            var j = h.replace('[', '').replace(']', '').split('');
            for (var i = 0; i < j.length; ++i) {
                press(j[i]);
            }
        } else if (h.startsWith('{') && h.endsWith('}')) {
            playKey(h);
        } else if (h.length > 1) {
            for (var i = 0; i < h.length; ++i) {
                press(h[i]);
            }
        } else {
            press(h);
        }
    }

    function playKey(h, current) {
        if (h.startsWith('[') && h.endsWith(']')) {
            var j = h.replace('[', '').replace(']', '').match(Codes.SPLIT);
            for (var i = 0; i < j.length; ++i) {
                Conv(j[i]);
            }
        } else if (h.startsWith('{') && h.endsWith('}')) {
            var j = beaut(h.replace('{', '').replace('}', '')).split(' ');
            for (var i = 0; i < j.length; ++i) {
                wPlay(j[i], i);
            }
        } else {
            Conv(h);
        }
    }

    function cont() {
        var d = sheets.split(' ');
        if (current != d.length) {
            playKey(d[current], current);
            current += 1;
            if (config.loop && current == d.length) {
                current = 0;
            }
        } else {
            if (config.loop) {
                current = 0;
            }
        }
    }
    function req(text, final) {
        var spaces = ' '.repeat(11 - text.length);
        return text + spaces + final
    }
    function changeHotkeys() {
        var prm = prompt("~ Type an option to change ~\n\n" + `start      Starts the sheets
reset      Resets sheets
set        Set sheets
change     Change hotkeys
times      Set how many times the key will repeat
view       View sheets
transpose  Changes sheets transpose`);

        if (prm && config.hotkeys[prm]) {
            var bn = prompt("~ Set a hotkey (CAPITAL LETTERS WILL CONTINUE WHEN ITS CAPSLOCK/SHIFT) ~", config.hotkeys[prm][0]);
            if (usedHotkeys.includes(bn)) {
                var conf = confirm("This key is already used, do you wan't to replace it?");
                if (conf) {
                    for (var i in config.hotkeys) {
                        for (var b = 0; b < config.hotkeys[i].length; ++b) {
                            if (config.hotkeys[i][b] == bn) {
                                delete config.hotkeys[i][b];
                            }
                        }
                    }
                    config.hotkeys[prm] = [bn];
                    alert("Replaced key!");
                }
            } else {
                usedHotkeys.push(bn);
                config.hotkeys[prm] = [bn];
                alert("Added hotkey!");
            }
        }
    }

    function set() {
        var i = prompt('Enter Sheets', '[req] y [qo] d');
        if (i && i != '') {
            alert('Changed Sheets');
            current = 0;
            sheets = beaut(i)
        }
    }
    set();
    document.body.addEventListener('keypress', function (e) {
        if (config.hotkeys.start.includes(e.key)) {
            cont()
        }
        if (config.hotkeys.reset.includes(e.key)) {
            current = 0;
            alert("Restted!");
        }
        if (config.hotkeys.set.includes(e.key)) {
            set();
        }
        if (config.hotkeys.change.includes(e.key)) {
            changeHotkeys();
        }
        if (config.hotkeys.view.includes(e.key)) {
            alert(sheets);
        }
        if (config.hotkeys.transpose.includes(e.key)) {
            var i = prompt('~ Sheet Transpose Increaser By Lapide ~\n\nTranspose Sheets', '-2');
            if (i && i != '' && !isNaN(parseInt(i))) {
                alert('Increase transpose to: ' + i);
                sheets = beaut(Increase(sheets, parseInt(i)));
            }
        }
        if (config.hotkeys.times.includes(e.key)) {
            var i = prompt('(THIS WILL SPAM NOTES) Enter How Many Notes Will Repeat', '10');
            if (i && i != '' && !isNaN(parseInt(i))) {
                alert('Changed Repeater');
                config.times = parseInt(i);
            }
        }
    });
})();
