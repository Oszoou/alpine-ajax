import { test, html } from './utils'

test('makes GET requests for naked form',
  html`<form x-target id="replace"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('GET', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace').should('have.text', 'Replaced')
    })
  }
)

test('[x-target] can be an empty string',
  html`<form x-target="" id="replace"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('GET', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace').should('have.text', 'Replaced')
    })
  }
)

test('makes GET requests for form',
  html`<form x-target id="replace" method="get"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('GET', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace').should('have.text', 'Replaced')
    })
  }
)

test('makes POST requests for form',
  html`<form x-target id="replace" method="post"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('POST', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace').should('have.text', 'Replaced')
    })
  }
)

test('makes POST requests without an enctype',
  html`<form x-target id="replace" method="post"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('POST', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').its('request.headers.content-type').should('contain', 'application/x-www-form-urlencoded')
  }
)

test('makes POST requests with an enctype',
  html`<form x-target id="replace" method="post" enctype="multipart/form-data"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('POST', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').its('request.headers.content-type').should('contain', 'multipart/form-data')
  },
)

test('respects [formenctype]',
  html`<form x-target id="replace" method="post"><button formenctype="multipart/form-data"></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('POST', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').its('request.headers.content-type').should('contain', 'multipart/form-data')
  },
)

test('makes PUT requests for form',
  html`<form x-target id="replace" method="put"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('PUT', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace').should('have.text', 'Replaced')
    })
  }
)

test('makes PATCH requests for form',
  html`<form x-target id="replace" method="patch"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('PATCH', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace').should('have.text', 'Replaced')
    })
  }
)

test('makes DELETE requests for form',
  html`<form x-target id="replace" method="delete"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('DELETE', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace').should('have.text', 'Replaced')
    })
  }
)

test('respects [formmethod]',
  html`<form x-target id="replace" method="post"><button formmethod="post"></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('POST', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace').should('have.text', 'Replaced')
    })
  }
)

test('request URL is determined by action attribute',
  html`<form x-target id="replace" action="other.html"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('GET', '/tests/other.html', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace').should('have.text', 'Replaced')
    })
  }
)

test('respects [formaction]',
  html`<form x-target id="replace"><button formaction="other.html"></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('GET', '/tests/other.html', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace').should('have.text', 'Replaced')
    })
  }
)

test('GET request data is added to the URL',
  html`<form x-target id="replace" action="other.html"><button name="NAME" value="VALUE"></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('GET', '/tests/other.html?NAME=VALUE', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace').should('have.text', 'Replaced')
    })
  }
)

test('[x-target] changes the updated target',
  html`<div id="replace"></div><form x-target="replace" method="post" action="/tests"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('POST', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace').should('have.text', 'Replaced')
      get('form').should('exist')
    })
  }
)

test('[x-target] can select multiple targets',
  html`<div id="replace_1"></div><div id="replace_2"></div><form x-target="replace_1 replace_2" method="post" action="/tests"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('POST', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace_1">Replaced #1</div><div id="replace_2">Replaced #2</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace_1').should('have.text', 'Replaced #1')
      get('#replace_2').should('have.text', 'Replaced #2')
      get('form').should('exist')
    })
  }
)

test('[x-target] can be `_none`',
  html`<form x-target="_none" id="replace"
    @ajax:success="document.getElementById('button').textContent = 'Success'"
    @ajax:missing="document.getElementById('button').textContent = 'Missing'"
    @ajax:merge="document.getElementById('button').textContent = 'Merge'"
  ><button id="button"></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('GET', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#button').should('exist')
      get('#button').should('have.text', 'Success')
    })
  }
)

test('[x-target] handles extra whitespace',
  html`<div id="replace_1"></div><div id="replace_2"></div><form x-target="   replace_1    replace_2   " method="post" action="/tests"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('POST', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace_1">Replaced #1</div><div id="replace_2">Replaced #2</div>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('not.exist')
      get('#replace_1').should('have.text', 'Replaced #1')
      get('#replace_2').should('have.text', 'Replaced #2')
      get('form').should('exist')
    })
  }
)

test('[x-headers] sets request headers',
  html`<form x-target x-headers="{ 'x-test': 'test' }" id="replace" method="post"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('POST', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div>'
    }).as('response')
    get('button').click()
    wait('@response').its('request.headers').should('have.property', 'x-test', 'test')
  }
)

test('[formnoajax] can cancel AJAX requests',
  html`<h1 id="title">Replace me</h1><form x-target="title" method="post" action="/tests"><button formnoajax></button></form>`,
  ({ intercept, get, wait }) => {
    cy.on('fail', (error, runnable) => {
      if (error.message.indexOf('Timed out retrying') !== 0) throw error
    })
    intercept('POST', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1>'
    }).as('response')
    get('button').click()
    wait('@response', {
      requestTimeout: 500,
    }).then(() => {
      get('#title').should('have.text', 'Replace me')
    })
  }
)

test('performs a normal submit when a 500 status code is returned',
  html`<form x-target id="replace" method="post"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('POST', '/tests', {
      statusCode: 500,
      body: '<h1 id="title">ERROR</h1>'
    }).as('response')
    get('button').click()
    wait('@response').then(() => {
      get('#title').should('have.text', 'ERROR')
    })
  }
)

test('submitter is disabled while submitting',
  html`<form x-target id="replace" method="post"><button></button></form>`,
  ({ intercept, get, wait }) => {
    intercept('POST', (req) => {
      req.continue((res) => {
        get('button').should('have.attr', 'aria-disabled')
      })
    }).as('response')
    get('button').click()
  }
)

test('submitter is reset when request is aborted',
  html`<form x-target id="replace" method="post" @ajax:before="event.preventDefault()"><button></button></form>`,
  ({ intercept, get, wait }) => {
    get('button').click()
    wait(300)
    get('button').should('not.have.attr', 'aria-disabled')
  }
)
