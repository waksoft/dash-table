export default class DashTable {
    static getCell(row: number, column: number) {
        return cy.get(`#table tbody tr td.column-${column}`).eq(row);
    }

    static getCellById(row: number, column: string) {
        return cy.get(`#table tbody tr td[data-dash-column="${column}"]`).eq(row);
    }

    static getFilter(column: number) {
        return cy.get(`#table tbody tr th.dash-filter.column-${column}`);
    }

    static getFilterById(column: string) {
        return cy.get(`#table tbody tr th.dash-filter[data-dash-column="${column}"]`);
    }

    static getHeader(row: number, column: number) {
        return cy.get(`#table tbody tr th.dash-header.column-${column}`).eq(row);
    }

    static getHeaderById(row: number, column: string) {
        return cy.get(`#table tbody tr th.dash-header[data-dash-column="${column}"]`).eq(row);
    }

    static focusCell(row: number, column: number) {
        // somehow we need to scrollIntoView AFTER click, or it doesn't
        // work right. Why?
        return this.getCell(row, column).click().scrollIntoView();
    }

    static focusCellById(row: number, column: string) {
        return this.getCellById(row, column).click().scrollIntoView();
    }

    static clearColumnById(row: number, column: string) {
        return cy.get(`#table tbody tr th.dash-header[data-dash-column="${column}"] .column-header--clear`).eq(row).click();
    }

    static deleteColumnById(row: number, column: string) {
        return cy.get(`#table tbody tr th.dash-header[data-dash-column="${column}"] .column-header--delete`).eq(row).click();
    }

    static hideColumnById(row: number, column: string) {
        return cy.get(`#table tbody tr th.dash-header[data-dash-column="${column}"] .column-header--hide`).eq(row).click();
    }

    static getDelete(row: number) {
        return cy.get(`#table tbody tr td.dash-delete-cell`).eq(row);
    }

    static getSelect(row: number) {
        return cy.get(`#table tbody tr td.dash-select-cell`).eq(row);
    }

    static getActiveCell() {
        return cy.get(`#table tbody td.focused`);
    }

    static getSelectedCells() {
        return cy.get(`#table tbody td.cell--selected`);
    }

    static scrollToTop() {
        cy.get(`.cell.cell-1-1.dash-fixed-content`).invoke(`outerHeight`).then(height => {
            cy.scrollTo(0, -height);
        })
    }

    static scrollToBottom() {
        cy.get(`.cell.cell-1-1.dash-fixed-content`).invoke(`outerHeight`).then(height => {
            cy.scrollTo(0, height);
        })
    }

    static getCellInLastRowOfColumn(column: number) {
        const cellInLastRow = cy.get(`td.dash-cell.column-${column}`).last().then(elem => {
            const lastRow = elem ? elem.attr(`data-dash-row`) : undefined;
            return lastRow ? cy.get(`td.dash-cell.column-${column}[data-dash-row="${lastRow}"`) : undefined;
        });
        return cellInLastRow;
    }

    static getCellFromDataDash(row: number, column: number) {
        return cy.get(`td.column-${column}[data-dash-row="${row}"]`);
    }

    static toggleScroll(toggled: boolean) {
        cy.get('.row-1').then($el => {
            $el[0].style.overflow = toggled ? '' : 'unset';
        });
    }
}
