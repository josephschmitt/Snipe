# Snipe

[Snipe](http://reusablebits.com/post/3468613560/say-hello-to-snipe) is a Safari and Chrome extension that allows you to quickly sift through the sea of open tabs you accumulate throughout the day. Simply invoke the keyboard shortcut and up pops a Quicksilver-like input field allowing you to search through your open tabs and select one, without ever leaving your keyboard. It's like having [Spotlight](http://www.apple.com/macosx/what-is-macosx/spotlight.html) or [Quicksilver](http://quicksilver.en.softonic.com/mac) for your browser tabs.

## Dependencies

Please note that this repository depends on the following two submodules to compile properly from souce:

 - [Snipe-core](https://github.com/josephschmitt/Snipe-core) (Core UI shared between the Safari and Chrome extensions)
 - [String_score](https://github.com/joshaven/string_score) (Used for the fuzzy search scoring system)

After cloning this repository, make sure to [init the submodules](http://chrisjean.com/2009/04/20/git-submodules-adding-using-removing-and-updating/), otherwise you'll get a bunch of errors and who knows what other horrors.

# TODO

 - Add a way to close a tab from the UI (close all matching tabs?)
 - Support favicons not placed in the root directory of a server
 - Highlight matched words/phrases in custom UI in Safari and Chrome
 - Firefox version (looking into this. we'll see...)
 - Search page content as an asynchronous Web Worker process as well as title and URL (unlikely to happen anytime soon)