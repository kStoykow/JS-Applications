export function renderYearsView() {
    yearsView.style.display = 'block';
}

export function renderMonthsView(year) {
    const yearMonths = Array.from(monthsView).find(e => e.id == `year-${year}`);

    yearMonths.style.display = 'block';
}

export function daysRenderView(date) {
    const dates = Array.from(daysView).find(e => e.id == date);

    dates.style.display = 'block';
}

export function hideYearsView() {
    yearsView.style.display = 'none';
}

export function hideMonthsView() {
    Array.from(monthsView).forEach(e => e.style.display = 'none');
}

export function hideDaysView() {
    Array.from(daysView).forEach(e => e.style.display = 'none');
}

const yearsView = document.querySelector('#years');
const monthsView = document.querySelectorAll('.monthCalendar');
const daysView = document.querySelectorAll('.daysCalendar');