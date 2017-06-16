describe('Users unit tests', () => {
  describe('Route /user', () => {
    it('should create a new user');
    it('should return a list of users');
  });

  describe('Route /user/{id}', () => {
    it('should return the user that has the given id');
    it('should update the user that has the given id');
    it('should delete the user that has the given id');
  });
});
