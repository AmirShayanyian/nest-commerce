import * as bcrypt from 'bcrypt';
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(password, salt);
  return hashedPassword;
}
