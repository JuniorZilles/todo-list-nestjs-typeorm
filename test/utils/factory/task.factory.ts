import { Chance } from 'chance';

const createOneTask = () => {
  const chance = new Chance();
  return {
    description: chance.sentence(),
    date: chance.date({ string: true }),
    user: '1'
  };
};

export default createOneTask;
