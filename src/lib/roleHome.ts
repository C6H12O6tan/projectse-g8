export type Role = 'admin' | 'officer' | 'teacher' | 'external' | null;

export function roleHome(role: Role) {
  switch (role) {
    case 'admin':   return '/admin';
    case 'officer': return '/officer';
    case 'teacher': return '/teacher';
    case 'external':
    default:        return '/'; // โหมดบุคคลภายนอกใช้หน้าแรกเว็บ
  }
}
