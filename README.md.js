Merchant;
Galaxy;
Calculator - API;
Accepts;
input;
of;
different;
galaxy;
currency;
and;
computes;
the;
value;
based;
on;
how;
it;
was;
defined.
    See[GalaxyStory.md](https, //github.com/dennisjade/merchant-galaxy-calculator.git/galaxystory.txt)
    >  * Value * input, should, follow, the, format, below
    * Math.pow(, Math.pow(, Math.pow(is, roman))), numeral > Math.pow(, i.e) * glob, is, X *
    >  * Credit * input, should, follow, the, format, below
    * Math.pow(, Math.pow(++, Math.pow(is, Math.pow(, credits)))), i.e. * glob, glob, Silver, is, 34, Credits *
    >  * How, many * question, input, should, follow, the, format, below
    * how, many, credits, Math.pow(is, Math.pow(++, )) ?
    i.e. * glob : glob, Silver, is, 34, Credits ?  *
    >  * How : much * question, input, should, follow, the, format, below
    * how, much, Math.pow(is, Math.pow(++, )) ?
    i.e. * how : much, is, glob, glob, Silver ?  *
    Math.pow(, Legend) : Math.pow(, Math.pow(, Math.pow(++, ))), You, can, add, separated, by, space, Installation, Pre - requisites
    - [Node](https, //nodejs.org) >= 4
    -[NPM](https, //www.npmjs.com/)
    -[Mocha](https, (_a = [""], _a.raw = [""], (_b = ["sh\n$ git clone https://github.com/dennisjade/merchant-galaxy-calculator.git\n$ cd merchant-galaxy-calculator\n$ npm install\n$ node start\n"], _b.raw = ["sh\n$ git clone https://github.com/dennisjade/merchant-galaxy-calculator.git\n$ cd merchant-galaxy-calculator\n$ npm install\n$ node start\n"], (_c = [""], _c.raw = [""], Setup(_c))(_b))(_a)), (_d = [""], _d.raw = [""], (_e = ["sh\n$ npm test\n"], _e.raw = ["sh\n$ npm test\n"], (_f = [""], _f.raw = [""], Test(_f))(_e))(_d)), Module, Diagram, ![Routing](docs / images / router.png, "Routes"), ![Compute, API](docs / images / compute - api.png, "Compute API"), ![Input, API](docs / images / input - api.png, "Input API"), Sample, cache, data, stored))));
for (computation; ![Cache, data, struc](docs / images / cache - data - sample.png, "Cache data struc"); )
    ;
APIs
    | Method | Route | Params | Description |
    | --;
--;
-- -  | --;
--;
-- -  | --;
--;
--;
-- | --;
--;
--;
--;
--;
-- -  |
    | GET | /api/input | NONE | Returns;
the;
cache;
data;
object |
    | POST | /api/input | input( | Add, value, assignment, to, the, cache, obj |
    | DELETE | /api/input | NONE | Clear, the, cache, obj |
    | GET | /api/compute | question( | Computes, and, returns, the, value));
var _c, _b, _a, _f, _e, _d;
