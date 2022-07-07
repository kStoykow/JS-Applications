import { daysRenderView, renderMonthsView, renderYearsView, hideDaysView, hideMonthsView, hideYearsView } from "./renderers.js";

const monthsId = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export const targetsHandlerMap = {
    'CAPTION': (e) => {
        const section = e.parentElement.parentElement;
        if (section.className == 'monthCalendar') {
            hideMonthsView();
            renderYearsView();
        } else if (section.className == 'daysCalendar') {
            const currentMonth = section.id.split('-')[1];
            hideDaysView();
            renderMonthsView(currentMonth);
        }
    },
    'TD': (e) => {
        const target = e.firstElementChild.textContent;
        const section = e.parentElement.parentElement.parentElement.parentElement;

        if (section.className == 'yearsCalendar') {
            hideYearsView();
            renderMonthsView(target);

        } else if (section.className == 'monthCalendar') {
            const year = section.id.split('-')[1];
            const month = monthsId.indexOf(target) + 1;
            hideMonthsView();
            daysRenderView(`month-${year}-${month}`);
        }
    },
    'DIV': (e) => {
        const target = e.textContent;
        const section = e.parentElement.parentElement.parentElement.parentElement.parentElement;

        if (section.className == 'yearsCalendar') {
            hideYearsView();
            renderMonthsView(target);

        } else if (section.className == 'monthCalendar') {
            const year = section.id.split('-')[1];
            const month = monthsId.indexOf(target) + 1;
            hideMonthsView();
            daysRenderView(`month-${year}-${month}`);
        }
    }
}