const users = [
  {
    user: 'superadmin',
    pass: 'pass',
    role: 'superadmin',
    token: 'superadmin',
    name: 'หลาวแดง อินคำ',
    avatar: '/profile.jpg', // รูปภาพของ superadmin
  },
  {
    user: 'admin',
    pass: 'pass',
    role: 'admin',
    token: 'admin',
    name: 'เขมินท์ แสนแซ่',
    avatar: '/profile.jpg', // รูปภาพของ admin
  },
  {
    user: 'picker',
    pass: 'pass',
    role: 'picker',
    token: 'picker',
    name: 'นัฐพงษ์ เม้นกะสิการ',
    avatar: '/background.jpg', // รูปภาพของ picker
  },
  {
    user: 'shipper',
    pass: 'pass',
    role: 'shipper',
    token: 'shipper',
    name: 'พงศธร ศิริพรหมพิทักษ์',
    avatar: '/background.jpg', // รูปภาพของ shipper
  }
];

export function verifyUser(user, pass) {
  const userFound = users.find((u) => {
    return u.user === user && u.pass === pass;
  });

  return userFound
    ? {
        role: userFound.role,
        token: userFound.token,
        name: userFound.name,
        avatar: userFound.avatar // เพิ่ม avatar ในผลลัพธ์
      }
    : null;
}
