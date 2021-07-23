import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";

it("responds with details about the current user", async () => {
  const cookie = await signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set('Cookie', cookie)
    .send()
    .expect(200);

    console.log(response.body);
});
