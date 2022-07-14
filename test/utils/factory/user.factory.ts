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

export const USER = {
  name: 'Lola Newman',
  cpf: '464.550.212-31',
  birthday: '14/11/1994',
  email: 'lez@cimidas.ki',
  password: 'fa093908d2e6c37351b627c33f35cfadd9fc266e',
  address: 'Luuto Boulevard',
  city: 'Zaghopi',
  state: 'MI',
  country: 'FM',
  zipCode: '49552-6292'
};
