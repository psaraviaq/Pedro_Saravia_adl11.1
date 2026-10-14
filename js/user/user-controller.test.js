const UserController = require("./user-controller");
const User = require("./user");

const userController = new UserController();

test("add user not in the list to userController", () => {
  let user = new User(1234, "Santiago", "santiago@generation.org");
  userController.add(user);
  expect(userController.getUsers()).toContain(user);
});

test("remove user to userController", () => {
  let user = new User(1234, "Santiago", "santiago@generation.org");
  userController.add(user);
  userController.remove(user);
  expect(userController.users).not.toContain(user);
});

test("remove user not in the list without changing the list", () => {
  const controller = new UserController();
  const existingUser = new User(1234, "Santiago", "santiago@generation.org");
  const missingUser = new User(5678, "Ana", "ana@generation.org");
  controller.add(existingUser);
  controller.remove(missingUser);
  expect(controller.getUsers()).toEqual([existingUser]);
});

test("findByEmail returns the user with the matching email", () => {
  const controller = new UserController();
  const user = new User(1234, "Santiago", "santiago@generation.org");
  controller.add(user);
  expect(controller.findByEmail("santiago@generation.org")).toEqual(user);
});

test("findByEmail returns undefined when the email is not found", () => {
  const controller = new UserController();
  expect(controller.findByEmail("missing@generation.org")).toBeUndefined();
});

test("findById returns the user with the matching id", () => {
  const controller = new UserController();
  const user = new User(1234, "Santiago", "santiago@generation.org");
  controller.add(user);
  expect(controller.findById(1234)).toEqual(user);
});

test("findById returns undefined when the id is not found", () => {
  const controller = new UserController();
  expect(controller.findById(5678)).toBeUndefined();
});
