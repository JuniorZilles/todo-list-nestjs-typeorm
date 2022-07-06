import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { isValidDate, isAfterNow, toMomentDate } from '../utils/date.transform';

@ValidatorConstraint({ name: 'FutureDateValidator', async: false })
export default class DateIsFutureValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (!isValidDate(text)) {
      return false;
    }
    const date = toMomentDate(text);
    if (!date.isValid) {
      return false;
    }
    const after = isAfterNow(date);
    if (!after) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'The informed date is invalid, it should be after the curret date-time';
  }
}
