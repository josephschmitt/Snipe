# Snipe

Snipe is a Safari and Chrome extension that makes it easy to find the browser tab you're looking for without leaving your keyboard; kind of like [Spotlight](http://www.apple.com/macosx/what-is-macosx/spotlight.html) or [Quicksilver](http://quicksilver.en.softonic.com/mac) for your browser tabs.

## Dependencies

Please note that this repository depends on the following two submodules to compile properly from souce:

 - [Snipe-core](https://github.com/josephschmitt/Snipe-core) (Core UI shared between the Safari and Chrome extensions)
 - [String_score](https://github.com/joshaven/string_score) (Used for the fuzzy search scoring system)

After cloning this repository, make sure to [init the submodules](http://book.git-scm.com/5_submodules.html), otherwise you'll get a bunch of errors and who knows what other horrors.

# TODO

 - Search for (and display) results for tabs in all windows, not just current one
 - Add a way to close a tab from the UI (close all matching tabs?)
 - Highlight matched words/phrases in custom UI in Safari and Chrome
 - Firefox version (looking into this. we'll see...)
 - Search page content as an asynchronous Web Worker process as well as title and URL (unlikely to happen anytime soon)