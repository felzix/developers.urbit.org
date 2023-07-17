+++
title = "Irregular forms"
weight = 20
+++

While Hoon has a large amount of sugar syntax, some forms that may look irregular are
actually regular wing syntax or another language feature, such as `,`.

When in doubt, you can use the [`!,` zapcom](/reference/hoon/rune/zap#-zapcom) rune to
determine the AST to which Hoon parses an expression.

```
> !,(*hoon c.b.a)
[%wing p=~[%c %b %a]]
```

## Quick Lookup of Irregular Forms

| Form | Regular Form |
| ---- | ------------ |
| `_foo` | [`$_`](/reference/hoon/rune/buc#_-buccab), normalizes to an example |
| `foo=bar` | [`$=`](/reference/hoon/rune/buc#-buctis), wraps a face around a value |
| `?(%foo %bar %baz)` | [`$?`](/reference/hoon/rune/buc#-bucwut), forms a type union |
| `(fun a b c)` | [`%:`](/reference/hoon/rune/cen#-cencol), calls a gate with n arguments |
| `~(arm core arg)` | [`%~`](/reference/hoon/rune/cen#-censig), pulls an arm in a door |
| `foo(x 1, y 2, z 3)` | [`%=`](/reference/hoon/rune/cen#-centis), resolve a wing with changes |
| `[a b c]` | [`:*`](/reference/hoon/rune/col#-coltar) or [`$:`](/reference/hoon/rune/buc#-buccol), constructs _n_-tuple in normal mode or its structure in structure mode |
| `~[a b c]` | [`:~`](/reference/hoon/rune/col#-colsig), constructs null-terminated list |
| `+(42)` | [`.+`](/reference/hoon/rune/dot#-dotlus), increments with Nock 4 |
| `=(a b)` | [`.=`](/reference/hoon/rune/dot#-dottis), tests for equality wiht Nock 5 |
| `` `foo` bar`` | [`^-`](/reference/hoon/rune/ket#--kethep), typecasts by explicit type label |
| `foo=bar` | [`^=`](/reference/hoon/rune/ket#-kettis), binds name to value |
| `*foo` | [`^*`](/reference/hoon/rune/ket#-kettar), bunts (produces default mold value) |
| `,foo` | [`^:`](/reference/hoon/rune/ket#-ketcol), produces “factory” gate for type |
| `:(fun a b c d)` | [`;:`](/reference/hoon/rune/mic#-miccol), calls binary function as _n_-ary function |
| `foo:bar` | [`=<`](/reference/hoon/rune/tis#-tisgal), composes two expressions, inverted |
| `\|(foo bar baz)` | [`?\|`](/reference/hoon/rune/wut#-wutbar), logical OR (loobean) |
| `&(foo bar baz)` | [`?&`](/reference/hoon/rune/wut#-wutpam), logical AND (loobean) |
| `!foo` | [`?!`](/reference/hoon/rune/wut#-wutzap), logical NOT (loobean) |

<br>

<br>

##### Reading guide

Headings contain runes, phonetics and tokens. Description contains a link to the
docs and a short description of the rune. Both regular and irregular forms are given.

Want to `Ctrl-f` to find out the meaning of something weird you saw? Search for `\symbol`. ie `\?` or `\=`. It'll show you to the irregular forms that uses that symbol.

## `.` dot (nock)

Anything Nock can do, Hoon can do also.

### `.+` dotlus

[docs](/reference/hoon/rune/dot#-dotlus) \\+

`[%dtls p=atom]`: increment an atom with Nock 4.

Regular: `.+(p)`

Irregular: `+(p)`

### `.=` dottis

[docs](/reference/hoon/rune/dot#-dottis) \\=

`[%dtts p=hoon q=hoon]`: test for equality with Nock 5.

Regular: `.=(p q)`

Irregular: `=(p q)`

## `;` mic (make)

Miscellaneous useful macros.

### `;:` miccol

[docs](/reference/hoon/rune/mic#-miccol) \\:

`[%mccl p=hoon q=(list hoon)]`: call a binary function as an n-ary function.

Regular: `;:(p q)`

Irregular: `:(p q)`

## `:` col (cells)

The cell runes.

### `:-` colhep

[docs](/reference/hoon/rune/col#--colhep) \\[\\]\\^\\/\\+\\\`\\~

`[%clhp p=hoon q=hoon]`: construct a cell (2-tuple).

Regular: `:-(p q)`

Irregular:

```
  [a b]   ==>   :-(a b)
[a b c]   ==>   [a [b c]]
  a^b^c   ==>   [a b c]
    a/b   ==>   [%a b]
    a+b   ==>   [%a b]
     `a   ==>   [~ a]
 ~[a b]   ==>   [a b ~]
  [a b]~  ==>   [[a b] ~]
```

## `=` tis (flow)

Flow hoons change the subject. All non-flow hoons (except cores) pass the subject down unchanged.

### `=<` tisgal

[docs](/reference/hoon/rune/tis#-tisgal) \\:

`[%tsgl p=hoon q=hoon]`: compose two hoons, inverted.

Regular: `=<(p q)`

Irregular: `p:q`

## `|` bar (core)

[docs](/reference/hoon/rune/bar) \\$

Core hoons are flow hoon.

Technically not irregular syntax, but worth mentioning.

- `|= bartis`
- `|. bardot`
- `|- barhep`
- `|* bartar`

The above runes produce a core with a single arm, named `$` ("buc"). We can recompute this arm with changes, useful for recursion among other things. Commonly used with the irregular syntax for `%=`, `:make`, like so: `$()`.

## `%` cen (call)

The invocation family of runes.

### `%=` centis

[docs](/reference/hoon/rune/cen#-centis) \\(\\)

`[%cnts p=wing q=(list (pair wing hoon))]`: take a wing with changes.

Regular: `%=(p a 1)`

Irregular: `p(a 1)`

### `%~` censig

[docs](/reference/hoon/rune/cen#-censig) \\~

`[%cnsg p=wing q=hoon r=hoon]`: call with multi-armed door.

Regular: `%~(p q r)`

Irregular: `~(p q r)`

### `%-` cenhep

[docs](/reference/hoon/rune/cen#-cenhep) \\(\\)

`[%cnhp p=hoon q=hoon]`: call a gate (function).

Regular: `%-(p q)`

Irregular: `(p q)`

Note: `(p)` becomes `$:p` (`=<($ p)`), which behaves as you would expect (func call w/o args).

## `$` buc (mold)

A mold is a gate (function) that helps us build simple and rigorous data structures.

### `$?` bucwut

[docs](/reference/hoon/rune/buc#-bucwut) \\?

`[%bcwt p=(list model)]`: mold which normalizes a general union.

Regular: `$?(p)`

Irregular: `?(p)`

### `$_` buccab

[docs](/reference/hoon/rune/buc#_-buccab) \\\_

`[%bccb p=value]`: mold which normalizes to an example.

Regular: `$_(p)`

Irregular: `_p`

### `$=` buctis

[docs](/reference/hoon/rune/buc#-buctis)  \\=

`[%bcts p=skin q=spec]`: wraps a face around a structure.

Regular: `$=(p q)`

Irregular:
```hoon
 p=q   ==>   $=(p q)
  =q   ==>   q=q
=p=q   ==>   p-q=q
```

## `?` wut (test)

Hoon has the usual branches and logical tests.

### `?!` wutzap

[docs](/reference/hoon/rune/wut#-wutzap) \\!

`[%wtzp p=hoon]`: logical not.

Regular: `?!(p)`

Irregular: `!(p)`

### `?&` wutpam

[docs](/reference/hoon/rune/wut#-wutpam) \\&

`[%wtpm p=(list hoon)]`: logical and.

Regular: `?&(p)`

Irregular: `&(p)`

### `?|` wutbar

[docs](/reference/hoon/rune/wut#-wutbar) \\|

`[%wtbr p=(list hoon)]`: logical or.

Regular: `?|(p)`

Irregular: `|(p)`

## `^` ket (cast)

Lets us adjust types without violating type constraints.

### `^:` ketcol

[docs](/reference/hoon/rune/ket#-ketcol) \\,

`[%ktcl p=spec]`: mold gate for type `p`.

Regular: `^:(p)`

Irregular: `,p`

### `^-` kethep

[docs](/reference/hoon/rune/ket#--kethep) \\\`

`[%kthp p=model q=value]`: typecast by mold.

Regular: `^-(p q)`

Irregular: `` `p`q ``

### `^*` kettar

[docs](/reference/hoon/rune/ket#-kettar) \\\*

`[%kttr p=spec]`: produce bunt value of mold.

Regular: `^*(p)`

Irregular: `*p`

### `^=` kettis

[docs](/reference/hoon/rune/ket#-kettis) \\=

`[%ktts p=toga q=value]`: name a value.

Regular: `^=(p q)`

Irregular: `p=q`

## Miscellaneous

### Trivial molds

\\\*\\@\\^\\?\\~

- `*` noun.
- `@` atom.
- `^` cell.
- `?` loobean.
- `~` null.

### Values

\\~\\&\\|\\%

- `~` null.
- `&` loobean true.
- `|` loobean false.
- `%a` constant `a`, where `a` can be an ((ir)regularly defined) atom or a symbol.

See [%sand](/reference/hoon/rune/constants#warm) for other irregular definitions of atoms.

### List addressing

\\&\\|

- `&n` nth element of a list.
- `|n` tail of list after nth element (i.e. n is the head).

### Limbs

[docs](/reference/hoon/limbs/limb) \\+\\.\\^\\-

`[%limb p=(each @ud [p=@ud q=@tas])]`: attribute of subject.

- `+15` is slot 15
- `.` is the whole subject (slot 1)
- `^a` is the `a` "of a higher scope", i.e. "resolve variable a, ignoring the first one found".
- `^^p` even higher, etc.
- 'Lark' syntax for slots / tree addressing:

```
+1
+2 -
+3 +
+4 -<
+5 ->
+6 +<
+7 +>
+8 -<-
...
```

### Wings

[docs](/reference/hoon/limbs/wing) \\.

`[%wing p=(list limb)]`; a limb search path.

`a.b` finds limb `a` within limb `b` ("var" `a` within "var" `b`).

### Printing stuff

\\\<\\\>

- `>a b c<` produces a [tank](/reference/hoon/stdlib/2q/#tank) of the output of the contents (wrapped in cell if more than 1 item), formatted in pretty-print.

  ```hoon
  > >1 2 3<
  [%rose p=[p=" " q="[" r="]"] q=~[[%leaf p="1"] [%leaf p="2"] [%leaf p="3"]]]
  ```

- `<a b c>` produces a [tape](/reference/hoon/stdlib/2q/#tape) of the tank above (ie `<1 2 3>` is same as `~(ram re >1 2 3<)`).

  ```hoon
  > <1 2 3>
  "[1 2 3]"

  > <`(list @)`~[1 2 3]>
  "~[1 2 3]"
  ```

### `,` com

`,` can serve in several capacities in Hoon programs:

1. As sugar for the `^:` ketcol or `$;` bucmic runes, toggling structure and value mode.
    (Toggling out of structure mode is uncommon.)

    ```
    > !,(*hoon ,[@t @t])
    [ %ktcl
      p=[%bccl p=[i=[%base p=[%atom p=~.t]] t=[i=[%base p=[%atom p=~.t]] t=~]]]
    ]
    
    > !,(*hoon |=(a=,[@t @t] b))
    [ %brts
        p
      [ %bcts
        p=term=%a
          q
        [ %bcmc
          p=[%cltr p=[i=[%base p=[%atom p=~.t]] t=[i=[%base p=[%atom p=~.t]] t=~]]]
        ]
      ]
      q=[%cnts p=~[[%.y p=2] %a] q=~]
    ]
    
    > !,(*hoon ,,[@t @t])
    [ %ktcl
        p
      [ %bcmc
        p=[%cltr p=[i=[%base p=[%atom p=~.t]] t=[i=[%base p=[%atom p=~.t]] t=~]]]
      ]
    ]
    ```
    
    (`$;` bucmic, or manual value mode, allows the use of value mode syntax to
    construct a mold.  Concretely, it lets you build a mold out of `hoon` instead
    of out of `spec`.  It is not commonly used.)
    
    From value mode to structure mode:

    ```hoon
    [%ktcl p=spec]
    ```

    From structure mode to value mode:

    ```hoon
    [%bcmc p=hoon]
    ```

2. As wing syntax for stripping a face.

    For instance, a line similar to the following is present in many Gall agents
    receiving HTTP requests via Eyre:

    ```
    =/  ,request-line:server  (parse-request-line:server url.request.inbound-request)
    ```
    
    This `,` lets you avoid using an outer face when handling the result.
    
    ```
    > =/  ,@ud  1
      -
    1
    > !,(*hoon =/(,@ud 1 -))
    [ %tsfs
      p=[%spec spec=[%bcmc p=[%base p=[%atom p=~.ud]]] skin=[%base base=%noun]]
      q=[%sand p=%ud q=1]
      r=[%cnts p=~[[%.y p=2]] q=~]
    ]
    ```

3. As a separator, e.g. between pairs in an inline `%=` centis expression, `$(i +(i), j (dec j))`.

## Commentary

In our in-house examples throughout our documentation, we use irregular forms instead of regular for the sake of verbosity. But remember with irregular forms: everything is just runes! Like magic. In general, irregular forms (usually) read better, but of course regular forms provide more information about what you're doing by showing you the full rune. Of course, it's up to you, the Hoon programmer, as to whether or not you want to use these.
