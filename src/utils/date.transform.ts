import * as moment from 'moment';

export const toDate = (date: string): Date => moment(date, 'DD/MM/YYYY').toDate();

export const toMomentDate = (date: string): moment.Moment => moment(date, 'DD/MM/YYYY');

export const toDifYears = (date: moment.Moment) => moment().diff(date, 'years', false);

export const toStringDate = (date: Date): string => moment(date).format('DD/MM/YYYY');

export const isAfterNow = (date: moment.Moment) => moment().isBefore(date);
