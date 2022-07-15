import * as moment from 'moment';

const fromChanceDate = (date: string): string => moment(date, 'M/DD/YYYY').format('DD/MM/YYYY');

export default fromChanceDate;
