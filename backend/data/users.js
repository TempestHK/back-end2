import bcrypt from 'bcryptjs';

const user = [
  {
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    role_name: 'admin',
    phone: '9999999999',
    customer_company_id: 1,
    is_active: true,
    user_type: 1,
    city_id: 101,
    profile: {}, // or fill with a mock object if needed
    profile_id: 1,
    district_id: 10,
    agency_id: 1001,
  },
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@email.com',
    password: bcrypt.hashSync('123456', 10),
    role_name: 'financiar',
    phone: '8888888888',
    customer_company_id: 1,
    is_active: true,
    user_type: 2,
    city_id: 102,
    profile: {},
    profile_id: 2,
    district_id: 20,
    agency_id: 1002,
  },
  {
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane@email.com',
    password: bcrypt.hashSync('123456', 10),
    role_name: 'user',
    phone: '7777777777',
    customer_company_id: 1,
    is_active: true,
    user_type: 3,
    city_id: 103,
    profile: {},
    profile_id: 3,
    district_id: 30,
    agency_id: 1003,
  },
];

export default user;
