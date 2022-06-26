import { Chance } from 'chance';

export const createOneUser = () => {
  const chance = new Chance();
  return {
    name: chance.name(),
    cpf: chance.cpf(),
    birthday: chance.birthday(),
    email: chance.email(),
    password: chance.hash(),
    address: chance.street(),
    city: chance.city(),
    state: chance.state(),
    country: chance.country(),
    zipCode: chance.zip({ plusfour: true })
  };
};
