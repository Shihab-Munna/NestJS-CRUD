import { User } from 'src/modules/auth/user.entity';
import Faker from 'faker';
import { define } from 'typeorm-seeding';

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const user = new User();
  user.username = `${firstName} ${lastName}`;
  user.password = faker.random.word();
  return user;
});
