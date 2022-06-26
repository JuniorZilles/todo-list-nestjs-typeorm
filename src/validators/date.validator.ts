import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { toDifYears, toMomentDate } from 'src/utils/date.transform';
import { dateRegex } from 'src/utils/default.regex';

@ValidatorConstraint({ name: 'DateValidator', async: false })
export default class DateIsOlderAgeValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (!dateRegex.test(text)) {
      return false;
    }
    const date = toMomentDate(text);
    if (!date.isValid) {
      return false;
    }
    const age = toDifYears(date);
    if (age < 18) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'The informed date is invalid, it should have the format of dd/mm/yyyy and be greater than 18 years from now';
  }
}
