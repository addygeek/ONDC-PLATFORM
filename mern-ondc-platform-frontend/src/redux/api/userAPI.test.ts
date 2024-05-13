import { rest } from "msw";
import { setupServer } from "msw/node";
import { userAPI } from "./userAPI";
import { expect } from "@jest/globals";
import { userAPI } from "./userAPI";

// Create a mock server
const server = setupServer();

// Start the server before running the tests
beforeAll(() => server.listen());

// Reset the server and any request handlers after each test
afterEach(() => server.resetHandlers());

// Clean up the server after all tests are done
afterAll(() => server.close());
it("should handle login mutation", async () => {
    // Define the expected request and response
    const user = { username: "testuser", password: "testpassword" };
    const response = { message: "Login successful" };

    // Mock the server response
    server.use(
        rest.post(`${import.meta.env.VITE_SERVER}/api/v1/user/new`, (req, res, ctx) => {
            // Verify the request payload
            expect(req.body).toEqual(user);

            // Return the mocked response
            return res(ctx.json(response));
        })
    );

    // Call the login mutation
    const result = await userAPI.endpoints.login(user).unwrap();

    // Verify the result
    expect(result).toEqual(response);
});
describe("userAPI", () => {
  it("should handle login mutation", async () => {
    // Define the expected request and response
    const user = { username: "testuser", password: "testpassword" };
    const response = { message: "Login successful" };

    // Mock the server response
    server.use(
      rest.post(`${import.meta.env.VITE_SERVER}/api/v1/user/new`, (req, res, ctx) => {
        // Verify the request payload
        expect(req.body).toEqual(user);

        // Return the mocked response
        return res(ctx.json(response));
      })
    );

    // Call the login mutation
    const result = await userAPI.endpoints.login(user).unwrap();

    // Verify the result
    expect(result).toEqual(response);
  });

  it("should handle deleteUser mutation", async () => {
    // Define the expected request and response
    const userId = "123";
    const adminUserId = "456";
    const response = { message: "User deleted successfully" };

    // Mock the server response
    server.use(
      rest.delete(`${import.meta.env.VITE_SERVER}/api/v1/user/${userId}?id=${adminUserId}`, (req, res, ctx) => {
        // Return the mocked response
        return res(ctx.json(response));
      })
    );

    // Call the deleteUser mutation
    const result = await userAPI.endpoints.deleteUser({ userId, adminUserId }).unwrap();

    // Verify the result
    expect(result).toEqual(response);
  });

  it("should handle allUsers query", async () => {
    // Define the expected request and response
    const id = "123";
    const response = { users: [{ id: "1", name: "User 1" }, { id: "2", name: "User 2" }] };

    // Mock the server response
    server.use(
      rest.get(`${import.meta.env.VITE_SERVER}/api/v1/user/all?id=${id}`, (req, res, ctx) => {
        // Return the mocked response
        return res(ctx.json(response));
      })
    );

    // Call the allUsers query
    const result = await userAPI.endpoints.allUsers(id).unwrap();

    // Verify the result
    expect(result).toEqual(response);
  });
});