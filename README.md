# Emoticonize for Angular.js #

I found I needed a filter that would either show emoticons or not in my angular
app. This filter does that.

## Example ##

The example below takes some text, passes it through ngSanitize's linky filter
to turn all links into `<a />` tags and then passes it through emoticonize using
a variable named showEmoticons which should be a bool. If true it'll show the
emoticons, if false it won't.

```html
<span ng-bind-html="message.body | linky | emoticonize:showEmoticons"></span>
```

### Notes ###

I didn't implement all the features in the original implementation. I didn't
care about animations. It seems to be fast and works well.

## Originally By ##

_[Alfa Jango](http://os.alfajango.com/css-emoticons/)_
