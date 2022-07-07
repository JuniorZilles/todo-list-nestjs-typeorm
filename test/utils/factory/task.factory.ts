import { Chance } from 'chance';

export const createOneTask = (userId = '1') => {
  const chance = new Chance();
  return {
    description: chance.sentence(),
    date: chance.date({ string: true }),
    user: userId
  };
};

export const createManyTask = (amount = 10) => {
  const tasks = [];
  for (let i = 0; i < amount; i += 1) {
    const task = { ...createOneTask(`${i + 1}`), id: `${i + 1}` };
    tasks.push(task);
  }
  return tasks;
};
