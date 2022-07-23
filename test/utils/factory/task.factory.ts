import { Chance } from 'chance';
import fromChanceDate from '../date-transform';

export const createOneTask = (userId = '1') => {
  const chance = new Chance();
  return {
    description: chance.sentence(),
    date: chance.date(),
    userId
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

export const createOnePostTask = (userId = '1') => {
  const chance = new Chance();
  return {
    description: chance.sentence(),
    date: fromChanceDate(chance.date({ string: true }) as string),
    userId
  };
};
