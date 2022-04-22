// ==UserScript==
// name          Piano X || Virtual Piano Autoplayer || PianoRhythm, Virtual Piano, Multiplayer Piano + MORE
// @name         Piano X || BETA 0.0.2
// @namespace    http://tampermonkey.net/
// @version      0.0.2b
// @description  Advanced Virtual Piano Autoplay, supporting many sites. Such as: PianoRhythm, Virtual Piano, Recursive Arts Virtual Piano, Online Pianist, Multiplayer Piano
// @author       Lapide
// @license      MIT
// @match        *://www.pianorhythm.me/*
// @match        *://recursivearts.com/virtual-piano/*
// @match        *://virtualpiano.net/
// @match        *://onlinepianist.com/virtual-piano/
// @match        *://multiplayerpiano.com/*
// @icon         https://github.com/nonumbershere/Piano-X-Virtual-Piano-Autoplayer/blob/main/icon/px_main.jpeg?raw=true
// @grant        none
// ==/UserScript==
(function () {
    // Beta 0.0.2
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

    var usedHotkeys = '-=+_\'";:[}]{'.split('');
    var avaliableHotkeys = '`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>? '.split('\n');

    var config = {
        release: 1,
        caps: true,
        loop: false,
        shift: true,
        curlbracket_time: 250,
        hotkeys: {
            start: ['-', '=', '+', "_"],
            reset: ['\'', '"'],
            set: [';', ':'],
            change: ['[', '{', '}', ']']
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

    function press(key) {
        if (isNaN(parseInt(key)) && !mStr.includes(key)) {
            document.dispatchEvent(new KeyboardEvent("keydown", {
                key: (config.caps ? key.toUpperCase() : key),
                keyCode: (config.caps ? key.toUpperCase() : key).charCodeAt(0),
                code: "Key" + (config.caps ? key.toUpperCase() : key),
                which: (config.caps ? key.toUpperCase() : key).charCodeAt(0),
                shiftKey: (config.shift && key.toUpperCase() == key ? true : false),
                ctrlKey: false,
                metaKey: false
            }));
            setTimeout(() => {
                document.dispatchEvent(new KeyboardEvent("keyup", {
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
            document.dispatchEvent(new KeyboardEvent("keydown", {
                key: key,
                keyCode: key.charCodeAt(0),
                code: "Digit" + key,
                which: key.charCodeAt(0),
                shiftKey: false,
                ctrlKey: false,
                metaKey: false
            }));
            setTimeout(() => {
                document.dispatchEvent(new KeyboardEvent("keyup", {
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
            document.dispatchEvent(new KeyboardEvent("keydown", {
                key: key,
                keyCode: k.charCodeAt(0),
                code: "Digit" + k,
                which: k.charCodeAt(0),
                shiftKey: true,
                ctrlKey: false,
                metaKey: false
            }));
            setTimeout(() => {
                document.dispatchEvent(new KeyboardEvent("keyup", {
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
    }

    function apply(t) {
        return RegExp('\\s+(?=\\' + t.charAt(0) + '^[\\\\' + t.charAt(1) + ']*\\])', 'g');
    }

    function fin(r, t) {
        return t.replaceAll(r.charAt(0), " " + r.charAt(0)).replaceAll(r.charAt(1), r.charAt(1) + ' ');
    }

    function beaut(s) {
        var j = (s.replace(/\s+(?=[^{\]]*\})/g, "").replace(/\s+(?=[^[\]]*\])/g, "")).match(Codes.SPLIT).filter((t) => {
            return t != ' ' || ''
        }).join(' ').replace(/\s+(?=[^{\]]*\})/g, "").replace(/\s+(?=[^[\]]*\])/g, "");
        j = j.replaceAll('  ', ' ').replaceAll('   ', '');
        if (j.endsWith(' '))
            j = j.replaceEnd(' ', '');
        if (j.startsWith(' '))
            j = j.replace(' ', '');
        return j.replaceAll('\n', ' ').replaceAll('\r', ' ').replaceAll('   ', '').replaceAll('  ', ' ');
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

    function changeHotkeys() {
        var prm = prompt("~ Type an option to change ~\n\nstart        Starts the sheets\nreset       Resets the sheets\nset          Sets the sheets\nchange   Changes hotkeys", "set");

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
        if (i && i != '')
            alert('Changed Sheets');
        current = 0;
        sheets = beaut(i)
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
    });
})();