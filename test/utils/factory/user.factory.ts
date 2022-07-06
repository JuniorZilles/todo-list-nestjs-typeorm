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

export const createManyUser = (amount = 10) => {
  const users = [];
  for (let i = 0; i < amount; i += 1) {
    const user = { ...createOneUser(), id: `${i + 1}` };
    delete user.password;
    users.push(user);
  }
  return users;
};
