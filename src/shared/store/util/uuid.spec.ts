import { uuidv4 } from './uuid';

xdescribe('uuid', () => {
  it('should generate uuid', () => {
    const uuid = uuidv4();
    expect(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}/.test(uuid)).toBeTruthy();
  });
});
