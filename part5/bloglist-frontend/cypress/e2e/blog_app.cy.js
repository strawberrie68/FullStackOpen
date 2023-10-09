describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', function () {
    // ...
  })

  it('user can login', function () {
    // ...
  })

  describe('when logged in', function () {
    // ...
  })
})

describe('Login', function () {
  beforeEach(function () {
    cy.visit('')
  })

  it('succeeds with correct credentials', function () {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })

  it('fails with wrong credentials', function () {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('wrong username or password')
  })
})

describe('When logged in', function () {
  beforeEach(function () {
    cy.login({ username: 'mluukkai', password: 'salainen' })
  })

  it('A blog can be created', function () {
    cy.contains('new blog').click()
    cy.get('#title').type('new title')
    cy.get('#author').type('this is an author')
    cy.get('#url').type('www.newURL.com')
    cy.get('#create-button').click()
  })
})

describe('check blog features', function () {
  beforeEach(function () {
    cy.login({ username: 'mluukkai', password: 'salainen' })
    cy.createBlog({
      title: 'first book title',
      author: 'author-1',
      url: 'www.first.com',
    })
    cy.createBlog({
      title: 'second book title',
      author: 'author-2',
      url: 'www.second.com',
    })
    cy.createBlog({
      title: 'third book title',
      author: 'author-3',
      url: 'www.third.com',
    })
  })

  it('user can like the blog', function () {
    cy.contains('second book title').parent().contains('view').click()
    cy.contains('second book title').parent().contains('like').click()
    cy.contains('second book title').parent().contains('like').click()
    cy.contains('second book title').parent().should('contain', 'likes: 1')
  })

  it('user who created blog can delete the blog only', function () {
    cy.contains('new blog').click()
    cy.get('#title').type('the one that user created')
    cy.get('#author').type('this the author ')
    cy.get('#url').type('www.theoneineedtodelete.com')
    cy.get('#create-button').click()

    cy.contains('remove').click()
  })
})

describe('delete blog', function () {
  it('user who didn"t created blog can not delete the blog', function () {
    const user = {
      name: 'Sammy Theodore',
      username: 'sammyjammy',
      password: '123456',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
    cy.login({ username: 'sammyjammy', password: '123456' })
    cy.contains('second book title').parent().contains('view').click()
    cy.contains('second book title')
      .parent()
      .contains('remove')
      .should('not.exist')
  })
})

describe('sort blog feature', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Sammy Theodore',
      username: 'sammyjammy',
      password: '123456',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
    cy.login({ username: 'sammyjammy', password: '123456' })

    cy.contains('new blog').click()
    cy.get('#title').type('the blog with the most likes')
    cy.get('#author').type('this the author ')
    cy.get('#url').type('www.mostlikes.com')
    cy.get('#create-button').click()

    cy.contains('new blog').click()
    cy.get('#title').type('the blog with the 2nd amount of likes')
    cy.get('#author').type('this the author 2nd')
    cy.get('#url').type('www.2ndlikes.com')
    cy.get('#create-button').click()
  })

  it('blogs are ordered by likes', function () {
    cy.contains('the blog with the most likes')
      .parent()
      .contains('view')
      .click()
    cy.contains('the blog with the most likes')
      .parent()
      .contains('like')
      .click()
    cy.contains('the blog with the most likes')
      .parent()
      .contains('like')
      .click()
    cy.contains('the blog with the most likes')
      .parent()
      .contains('like')
      .click()

    cy.get('.blog').eq(0).should('contain', 'the blog with the most likes')
    cy.get('.blog')
      .eq(1)
      .should('contain', 'the blog with the 2nd amount of likes')
  })
})
