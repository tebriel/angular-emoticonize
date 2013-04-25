(function() {
  var emoticonize, filters;

  emoticonize = function() {
    var emoticon, escapeCharacters, exclude, excludeArray, index, preMatch, specialEmoticons, specialRegex, threeChar, threeCharacterEmoticons, twoChar, twoCharacterEmoticons, _i, _j, _k, _len, _len1, _len2;

    escapeCharacters = [")", "(", "*", "[", "]", "{", "}", "|", "^", "<", ">", "\\", "?", "+", "=", "."];
    threeCharacterEmoticons = [":{)", ":-)", ":o)", ":c)", ":^)", ":-D", ":-(", ":-9", ";-)", ":-P", ":-p", ":-Þ", ":-b", ":-O", ":-/", ":-X", ":-#", ":'(", "B-)", "8-)", ";*(", ":-*", ":-\\", "?-)", ": )", ": ]", "= ]", "= )", "8 )", ": }", ": D", "8 D", "X D", "x D", "= D", ": (", ": [", ": {", "= (", "; )", "; ]", "; D", ": P", ": p", "= P", "= p", ": b", ": Þ", ": O", "8 O", ": /", "= /", ": S", ": #", ": X", "B )", ": |", ": \\", "= \\", ": *", ": &gt;", ": &lt;"];
    twoCharacterEmoticons = [":)", ":]", "=]", "=)", "8)", ":}", ":D", ":(", ":[", ":{", "=(", ";)", ";]", ";D", ":P", ":p", "=P", "=p", ":b", ":Þ", ":O", ":/", "=/", ":S", ":#", ":X", "B)", ":|", ":\\", "=\\", ":*", ":&gt;", ":&lt;"];
    specialEmoticons = {
      "&gt;:)": {
        cssClass: "red-emoticon small-emoticon spaced-emoticon"
      },
      "&gt;;)": {
        cssClass: "red-emoticon small-emoticon spaced-emoticon"
      },
      "&gt;:(": {
        cssClass: "red-emoticon small-emoticon spaced-emoticon"
      },
      "&gt;: )": {
        cssClass: "red-emoticon small-emoticon"
      },
      "&gt;; )": {
        cssClass: "red-emoticon small-emoticon"
      },
      "&gt;: (": {
        cssClass: "red-emoticon small-emoticon"
      },
      ";(": {
        cssClass: "red-emoticon spaced-emoticon"
      },
      "&lt;3": {
        cssClass: "pink-emoticon counter-rotated"
      },
      "O_O": {
        cssClass: "no-rotate"
      },
      "o_o": {
        cssClass: "no-rotate"
      },
      "0_o": {
        cssClass: "no-rotate"
      },
      "O_o": {
        cssClass: "no-rotate"
      },
      "T_T": {
        cssClass: "no-rotate"
      },
      "^_^": {
        cssClass: "no-rotate"
      },
      "O:)": {
        cssClass: "small-emoticon spaced-emoticon"
      },
      "O: )": {
        cssClass: "small-emoticon"
      },
      "8D": {
        cssClass: "small-emoticon spaced-emoticon"
      },
      "XD": {
        cssClass: "small-emoticon spaced-emoticon"
      },
      "xD": {
        cssClass: "small-emoticon spaced-emoticon"
      },
      "=D": {
        cssClass: "small-emoticon spaced-emoticon"
      },
      "8O": {
        cssClass: "small-emoticon spaced-emoticon"
      },
      "[+=..]": {
        cssClass: "no-rotate nintendo-controller"
      },
      "OwO": {
        cssClass: "no-rotate"
      },
      "O-O": {
        cssClass: "no-rotate"
      },
      "O=)": {
        cssClass: "small-emoticon"
      }
    };
    specialRegex = new RegExp('(\\' + escapeCharacters.join('|\\') + ')', 'g');
    preMatch = '(^|[\\s\\0])';
    for (index = _i = 0, _len = threeCharacterEmoticons.length; _i < _len; index = ++_i) {
      threeChar = threeCharacterEmoticons[index];
      threeChar = threeChar.replace(specialRegex, '\\$1');
      threeCharacterEmoticons[index] = new RegExp(preMatch + '(' + threeChar + ')', 'g');
    }
    for (index = _j = 0, _len1 = twoCharacterEmoticons.length; _j < _len1; index = ++_j) {
      twoChar = twoCharacterEmoticons[index];
      twoChar = twoChar.replace(specialRegex, '\\$1');
      twoCharacterEmoticons[index] = new RegExp(preMatch + '(' + twoChar + ')', 'g');
    }
    for (_k = 0, _len2 = specialEmoticons.length; _k < _len2; _k++) {
      emoticon = specialEmoticons[_k];
      emoticon.regexp = emoticon.replace(specialRegex, '\\$1');
      emoticon.regexp = new RegExp(preMatch + '(' + emoticon.regexp + ')', 'g');
    }
    exclude = 'span.css-emoticon';
    exclude += ",pre,code,.no-emoticons";
    excludeArray = exclude.split(',');
    return function(text, showEmoticons) {
      var cssClass, specialCssClass, _l, _len3, _len4, _len5, _m, _n;

      if (!showEmoticons) {
        return text;
      }
      cssClass = 'css-emoticon';
      for (_l = 0, _len3 = specialEmoticons.length; _l < _len3; _l++) {
        emoticon = specialEmoticons[_l];
        specialCssClass = cssClass + " " + emoticon.cssClass;
        text = text.replace(emoticon.regexp, "$1<span class='" + specialCssClass + "'>$2</span>");
      }
      for (_m = 0, _len4 = threeCharacterEmoticons.length; _m < _len4; _m++) {
        threeChar = threeCharacterEmoticons[_m];
        text = text.replace(threeChar, "$1<span class='" + cssClass + "'>$2</span>");
      }
      for (_n = 0, _len5 = twoCharacterEmoticons.length; _n < _len5; _n++) {
        twoChar = twoCharacterEmoticons[_n];
        text = text.replace(twoChar, "$1<span class='" + cssClass + " spaced-emoticon'>$2</span>");
      }
      return text;
    };
  };

  filters = angular.module('emoticonizeFilter', []);

  filters.filter('emoticonize', [emoticonize]);

}).call(this);
