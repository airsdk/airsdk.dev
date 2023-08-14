# WebKit features not supported in AIR

AIR does not support the following features available in WebKit or Safari 4:

- Cross-domain messaging via window.postMessage (AIR provides its own
  cross-domain communication APIs)

- CSS variables

- Web Open Font Format (WOFF) and SVG fonts.

- HTML video and audio tags

- Media device queries

- Offline application cache

- Printing (AIR provides its own PrintJob API)

- Spelling and grammar checkers

- SVG

- WAI-ARIA

- WebSockets (AIR provides its own socket APIs)

- Web workers

- WebKit SQL API (AIR provides its own API)

- WebKit geolocation API (AIR provides its own geolocation API on supported
  devices)

- WebKit multi-file upload API

- WebKit touch events (AIR provides its own touch events)

- Wireless Markup Language (WML)

The following lists contain specific JavaScript APIs, HTML elements, and CSS
properties and values that AIR does not support:

#### Unsupported JavaScript Window object members:

- applicationCache()

- console

- openDatabase()

- postMessage()

- document.print()

#### Unsupported HTML tags:

- audio

- video

#### Unsupported HTML attributes:

- aria-\*

- draggable

- formnovalidate

- list

- novalidate

- onbeforeload

- onhashchange

- onorientationchange

- onpagehide

- onpageshow

- onpopstate

- ontouchstart

- ontouchmove

- ontouchend

- ontouchcancel

- onwebkitbeginfullscreen

- onwebkitendfullscreen

- pattern

- required

- sandbox

#### Unsupported JavaScript events:

- beforeload

- hashchange

- orientationchange

- pagehide

- pageshow

- popstate

- touchstart

- touchmove

- touchend

- touchcancel

- webkitbeginfullscreen

- webkitendfullscreen

#### Unsupported CSS properties:

- background-clip

- background-origin (use -webkit-background-origin)

- background-repeat-x

- background-repeat-y

- background-size (use -webkit-background-size)

- border-bottom-left-radius

- border-bottom-right-radius

- border-radius

- border-top-left-radius

- border-top-right-radius

- text-rendering

- -webkit-animation-play-state

- -webkit-background-clip

- -webkit-color-correction

- -webkit-font-smoothing

#### Unsupported CSS values:

- appearance property values:

  - media-volume-slider-container

  - media-volume-slider

  - media-volume-sliderthumb

  - outer-spin-button

- border-box (background-clip and background-origin)

- contain (background-size)

- content-box (background-clip and background-origin)

- cover (background-size)

- list property values:

  - afar

  - amharic

  - amharic-abegede

  - cjk-earthly-branch

  - cjk-heavenly-stem

  - ethiopic

  - ethiopic-abegede

  - ethiopic-abegede-am-et

  - ethiopic-abegede-gez

  - ethiopic-abegede-ti-er

  - ethiopic-abegede-ti-et

  - ethiopic-halehame-aa-er

  - ethiopic-halehame-aa-et

  - ethiopic-halehame-am-et

  - ethiopic-halehame-gez

  - ethiopic-halehame-om-et

  - ethiopic-halehame-sid-et

  - ethiopic-halehame-so-et

  - ethiopic-halehame-ti-er

  - ethiopic-halehame-ti-et

  - ethiopic-halehame-tig

  - hangul

  - hangul-consonant

  - lower-norwegian

  - oromo

  - sidama

  - somali

  - tigre

  - tigrinya-er

  - tigrinya-er-abegede

  - tigrinya-et

  - tigrinya-et-abegede

  - upper-greek

  - upper-norwegian

- -wap-marquee (display property)
