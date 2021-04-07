describe('Home Page', () => {

  beforeEach(() => {
    // Carrega o arquivo da pasta fixtures
    cy.fixture('courses.json').as('coursesJSON')

    // Iniciar o servidor do cypress
    cy.server();

    // Cria o mock da resposta para x rota do servidor
    cy.route('/api/courses', '@coursesJSON').as('courses');

    // Acessa o endereço
    cy.visit('/');

    // Aguarda a resposta do servidor
    cy.wait('@courses');
  });

  it('Should display a list of courses', () => {
    cy.contains('All Courses');
    cy.get('mat-card').should('have.length', 9);
  });

  it('Should display the advanced courses', () => {
    cy.get('.mat-tab-label').should('have.length', 2)
    .last().click();

    cy.get('.mat-tab-body-active .mat-card-title')
    .its('length').should('be.gt', 1);

    cy.get('.mat-tab-body-active .mat-card-title')
    .first().should('contain',
      'Angular Security Course - Web Security Fundamentals')
  });
});
