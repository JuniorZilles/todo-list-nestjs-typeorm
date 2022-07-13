import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { cpfRegex } from '../utils/default.regex';
import validateCPF from './cpf.validation.fn';

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
