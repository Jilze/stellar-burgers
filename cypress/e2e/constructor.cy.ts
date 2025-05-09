const setupConstructorAliases = () => {
  cy.get('[data-cy=bun-ingredients]').as('bunIngredients');
  cy.get('[data-cy=mains-ingredients]').as('mainsIngredients');
  cy.get('[data-cy=sauces-ingredients]').as('saucesIngredients');
  cy.get('[data-cy=constructor-ingredients]').as('constructorIngredients');
};

const visitAppWithIngredients = () => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  cy.viewport(1300, 800);
  cy.visit('http://localhost:4000/');
};

describe('ingredient addition test in the constructor', () => {
  beforeEach(() => {
    visitAppWithIngredients();
    setupConstructorAliases();
  });

  it('add bun', () => {
    cy.get('@bunIngredients').contains('Добавить').click();

    cy.get('[data-cy=constructor-bun-1]')
      .should('contain', 'Ингредиент 1')
      .and('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .should('contain', 'Ингредиент 1')
      .and('exist');
  });

  it('add ingredient', () => {
    cy.get('@mainsIngredients').contains('Добавить').click();
    cy.get('@saucesIngredients').contains('Добавить').click();

    cy.get('@constructorIngredients').should('contain', 'Ингредиент 2');
    cy.get('@constructorIngredients').should('contain', 'Ингредиент 4');
  });
});

describe('modal window functionality test', () => {
  beforeEach(() => {
    visitAppWithIngredients();
  });

  it('open modal', () => {
    cy.contains('Ингредиент 1').click();

    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').should('contain', 'Ингредиент 1');
  });

  it('close modal by clicking on the cross', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');

    cy.get('[data-cy=close-modal-button]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('close modal by clicking on overlay', () => {
    cy.contains('Ингредиент 1').click();
    cy.contains('Детали ингредиента').should('exist');

    cy.get('[data-cy=overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('order creation test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );
    cy.setCookie('accessToken', 'testAccessToken');

    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
    setupConstructorAliases();
  });

  it('add ingredients and create order', () => {
    cy.get('@bunIngredients').contains('Добавить').click();
    cy.get('@mainsIngredients').contains('Добавить').click();
    cy.get('@saucesIngredients').contains('Добавить').click();

    cy.get('[data-cy=order-button]').click();

    cy.get('[data-cy=order-number]').as('orderNumber');
    cy.get('@orderNumber').should('contain', '123');

    cy.get('[data-cy=close-modal-button]').click();
    cy.get('@orderNumber').should('not.exist');

    ['Ингредиент 1', 'Ингредиент 2', 'Ингредиент 4'].forEach((name) => {
      cy.get('@constructorIngredients').should('not.contain', name);
    });
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
