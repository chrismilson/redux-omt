# Redux O.M.T (Off the Main Thread)

Inspired by Surma's blog post [React + Redux + Comlink =
Off-main-thread](https://dassur.ma/things/react-redux-comlink/).

This project wraps comlink and immerJS for moving redux off the main thread.
Comlink on its own is great for getting into workers, but "by moving Redux to a
worker every state change will cause the creation of a new copy due to
structured cloning." Which is something we don't want. Surma notes that the
solution is 'patching' - instead of sending the entire state, we can just send
the changes.

[ImmerJS](https://immerjs.github.io/immer) is a library that gives us this
functionality almost for free - we just wrap the store (in the worker) so that
we can monitor the changes to the state in the reducer and not just get the new
object. 