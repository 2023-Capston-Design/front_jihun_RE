import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(15)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: sample([
    "강지훈",
    "이정현",
    "윤준호",
  ]),
  email: sample([
    "lasksla@gmail.com",
    "LEE@gmail.com",
    "hoplin@gmail.com",
  ]),
  groupId: sample([
    "B889005",
    "B889065",
    "B889064",
  ]),
  memberRole: sample([
    "Instructor",
    "student",
  ]),
  approvedReason: sample([
    "approved as Instructor",
    "new member",
  ]),
  approved: sample([
    "approve",
    "pending",
  ])
}));

export default users;
