# ## Filter the text and replace with emoticons ##
# 
# Based on the emoticonize jquery library
#
# Re-Written to Coffee-Script for Angular.js by:
# [tebriel](http://github.com/tebriel)
#
# Originally By: [Alfa Jango](http://os.alfajango.com/css-emoticons/)
emoticonize = ->
    escapeCharacters = [ ")", "(", "*", "[", "]", "{", "}", "|", "^", "<", ">", "\\", "?", "+", "=", "." ]
    
    threeCharacterEmoticons = [ ":{)", ":-)", ":o)", ":c)", ":^)", ":-D", ":-(", ":-9", ";-)", ":-P", ":-p", ":-Þ", ":-b", ":-O", ":-/", ":-X", ":-#", ":'(", "B-)", "8-)", ";*(", ":-*", ":-\\", "?-)", ": )", ": ]", "= ]", "= )", "8 )", ": }", ": D", "8 D", "X D", "x D", "= D", ": (", ": [", ": {", "= (", "; )", "; ]", "; D", ": P", ": p", "= P", "= p", ": b", ": Þ", ": O", "8 O", ": /", "= /", ": S", ": #", ": X", "B )", ": |", ": \\", "= \\", ": *", ": &gt;", ": &lt;" ]
    
    twoCharacterEmoticons = [ ":)", ":]", "=]", "=)", "8)", ":}", ":D", ":(", ":[", ":{", "=(", ";)", ";]", ";D", ":P", ":p", "=P", "=p", ":b", ":Þ", ":O", ":/", "=/", ":S", ":#", ":X", "B)", ":|", ":\\", "=\\", ":*", ":&gt;", ":&lt;" ]
    
    specialEmoticons = 
        "&gt;:)": { cssClass: "red-emoticon small-emoticon spaced-emoticon" }
        "&gt;;)": { cssClass: "red-emoticon small-emoticon spaced-emoticon"}
        "&gt;:(": { cssClass: "red-emoticon small-emoticon spaced-emoticon" }
        "&gt;: )": { cssClass: "red-emoticon small-emoticon" }
        "&gt;; )": { cssClass: "red-emoticon small-emoticon"}
        "&gt;: (": { cssClass: "red-emoticon small-emoticon" }
        ";(":     { cssClass: "red-emoticon spaced-emoticon" }
        "&lt;3":  { cssClass: "pink-emoticon counter-rotated" }
        "O_O":    { cssClass: "no-rotate" }
        "o_o":    { cssClass: "no-rotate" }
        "0_o":    { cssClass: "no-rotate" }
        "O_o":    { cssClass: "no-rotate" }
        "T_T":    { cssClass: "no-rotate" }
        "^_^":    { cssClass: "no-rotate" }
        "O:)":    { cssClass: "small-emoticon spaced-emoticon" }
        "O: )":   { cssClass: "small-emoticon" }
        "8D":     { cssClass: "small-emoticon spaced-emoticon" }
        "XD":     { cssClass: "small-emoticon spaced-emoticon" }
        "xD":     { cssClass: "small-emoticon spaced-emoticon" }
        "=D":     { cssClass: "small-emoticon spaced-emoticon" }
        "8O":     { cssClass: "small-emoticon spaced-emoticon" }
        "[+=..]":  { cssClass: "no-rotate nintendo-controller" }
        "OwO":  { cssClass: "no-rotate" }
        "O-O":  { cssClass: "no-rotate" }
        "O=)":    { cssClass: "small-emoticon" } 
    
    specialRegex = new RegExp( '(\\' + escapeCharacters.join('|\\') + ')', 'g' )
    preMatch = '(^|[\\s\\0])'
    
    for threeChar, index in threeCharacterEmoticons
        threeChar = threeChar.replace(specialRegex,'\\$1')
        threeCharacterEmoticons[index] = new RegExp( preMatch+'(' + threeChar + ')', 'g' )
    
    for twoChar, index in twoCharacterEmoticons
        twoChar = twoChar.replace(specialRegex,'\\$1');
        twoCharacterEmoticons[index] = new RegExp( preMatch+'(' + twoChar + ')', 'g' );
    
    for emoticon in specialEmoticons
        emoticon.regexp = emoticon.replace(specialRegex,'\\$1');
        emoticon.regexp = new RegExp( preMatch+'(' + emoticon.regexp + ')', 'g' );
    
    exclude = 'span.css-emoticon'
    exclude += ",pre,code,.no-emoticons"

    excludeArray = exclude.split ','

    return (text, showEmoticons) ->
        return text unless showEmoticons
        cssClass = 'css-emoticon'
        
        for emoticon in specialEmoticons
            specialCssClass = cssClass + " " + emoticon.cssClass;
            text = text.replace(emoticon.regexp, "$1<span class='" + specialCssClass + "'>$2</span>")

        for threeChar in threeCharacterEmoticons
            text = text.replace(threeChar, "$1<span class='" + cssClass + "'>$2</span>")

        for twoChar in twoCharacterEmoticons
            text = text.replace(twoChar, "$1<span class='" + cssClass + " spaced-emoticon'>$2</span>")
        return text

filters = angular.module 'emoticonizeFilter', []
filters.filter 'emoticonize', [emoticonize]
