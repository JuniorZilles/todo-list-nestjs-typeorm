import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { cpfRegex } from 'src/utils/default.regex';

@ValidatorConstraint({ name: 'CpfValidator', async: false })
export default class CpfValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (!cpfRegex.test(text)) {
      return false;
    }
    return validateCPF(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'The CPF is invalid, it should have the format of xxx.xxx.xxx-xx.';
  }
}
