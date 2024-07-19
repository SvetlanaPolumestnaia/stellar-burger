/// <reference types="cypress" />

describe('Проверка перехвата запроса к эндпоинту', () => {
    it('Должен возвращать моковые данные при запросе к /api/ingredients', () => {
      cy.intercept('GET', '/api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');
  
      cy.visit('http://localhost:4000/');
  
      cy.wait('@getIngredients').its('response.statusCode').should('eq', 200);
    });
  });
  
describe('Проверка добавления ингредиента из списка в конструктор', () => {
it('должен добавить ингредиент из списка в конструктор', () => {
    cy.visit('http://localhost:4000/');
    const ingredientsToAdd = [
    'Флюоресцентная булка R2-D3',
    'Биокотлета из марсианской Магнолии',
    'Соус Spicy-X',
    'Хрустящие минеральные кольца'
    ];
    cy.wrap(ingredientsToAdd).each((ingredientName) => {
    cy.get(`[data-test="${ingredientName}"]`).contains(`Добавить`).click({ force: true });
    });
});
});

describe('Проверка модального окна ингредиента', () => {
    it('должно открыться при клике на ингредиент и закрыться при клике на крестик и оверлей', () => {
      cy.visit('http://localhost:4000/');
      cy.contains('Флюоресцентная булка R2-D3').click();
      cy.get('#modals > div:first-child').as('modal');
      cy.get('@modal').should('exist');
      cy.get('[data-test="close-button"]').click();
      cy.get('@modal').should('not.exist');
      cy.contains('Биокотлета из марсианской Магнолии').click();
      cy.get('@modal').should('exist');
      cy.get('#modals > div:nth-child(2)').click({ force: true });
      cy.get('@modal').should('not.exist');
    });
  });

describe('Процесс создания заказа', () => {
    beforeEach(() => {
      // Устанавливаем accessToken и refreshToken перед каждым тестом
      localStorage.setItem('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjA2ODU5OTdlZGUwMDAxZDA2ZWQyZiIsImlhdCI6MTcyMTM3MDI0MiwiZXhwIjoxNzIxMzcxNDQyfQ.L5A-GrMRTCrFWcm6sa774KJNg9a8cs2ZPPVqSuayBds');
      document.cookie = 'refreshToken=5548a9af7794036f9f96bb39aa3346002a4a9461b5890f20c5542d82810e946e2db94b5e866ba6a6';
    });
  
    afterEach(() => {
      // Очищаем accessToken и refreshToken после каждого теста
      localStorage.removeItem('accessToken');
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    });
  
    it('Собирается бургер', () => {
      cy.visit('http://localhost:4000/');
  
      const ingredientsToAdd = [
        'Флюоресцентная булка R2-D3',
        'Филе Люминесцентного тетраодонтимформа',
      ];
  
      cy.wrap(ingredientsToAdd).each((ingredientName) => {
        cy.get(`[data-test="${ingredientName}"]`).contains('Добавить').click();
      });
  
      cy.contains('Оформить заказ').click();
  
      cy.get('input[name="email"]').type('sv.bakhanova@yandex.com');
      cy.get('input[name="password"]').type('123');
  
      cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
        fixture: 'user.json'
      }).as('loginRequest');
  
      cy.contains('Войти').click();
      cy.wait('@loginRequest').then(() => {
        cy.log('Login request intercepted and completed');
  
        cy.contains('Оформить заказ').click();
  
        cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', (req) => {
          req.reply({ fixture: 'order.json' });
        }).as('orderRequest');
  
        cy.wait('@orderRequest').then(() => {
          cy.log('Order request intercepted and completed');
          cy.get('#modals > div:first-child').should('exist');
          cy.get('#modals > div:first-child h2').contains(46424).should('exist');
        });
      });
  
      cy.get('[data-test="close-button"]').click();
  
      cy.get('#modals > div:first-child').should('not.exist');
  
      cy.contains('[data-test="bun-top"]', 'Выберите булки');
      cy.contains('[data-test="ingredient"]', 'Выберите начинку');
      cy.contains('[data-test="bun-bottom"]', 'Выберите булки');
    });
  });
  