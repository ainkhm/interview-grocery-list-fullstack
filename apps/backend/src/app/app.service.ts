
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  private readonly routes = [
    {
      Endpoint: "/v1/auth/login",
      Method: "POST",
      Description: "Handle login with email and password",
    },
    {
      Endpoint: "/v1/auth/logout",
      Method: "POST",
      Description: "Handle logout",
    },
    {
      Endpoint: "/v1/profile",
      Method: "GET",
      Description: "Shows the logged in user's profile",
    },
    {
      Endpoint: "/v1/users",
      Method: "GET",
      Description: "Finds all the users",
    },
    {
      Endpoint: "/v1/users/:id",
      Method: "GET",
      Description: "Finds the user with that id",
    },
    {
      Endpoint: "/v1/users",
      Method: "POST",
      Description: "Creates user",
    },
    {
      Endpoint: "/v1/users/:id",
      Method: "PUT",
      Description: "Updates the user with that id",
    },
    {
      Endpoint: "/v1/users/:id",
      Method: "DELETE",
      Description: "Removes the user with that id",
    },
    {
      Endpoint: "/v1/grocery",
      Method: "GET",
      Description: "Shows all the grocery",
    },
    {
      Endpoint: "/v1/grocery/:id",
      Method: "GET",
      Description: "Shows the product with that id",
    },
    {
      Endpoint: "/v1/grocery",
      Method: "POST",
      Description: "Creates a product for the shop of the logged in user",
    },
    {
      Endpoint: "/v1/grocery/:id",
      Method: "PUT",
      Description: "Updates the product with that id",
    },
    {
      Endpoint: "/v1/grocery/:id",
      Method: "DELETE",
      Description: "Removes the product with that id",
    },
  ];

  getHello(): { Endpoint: string; Method: string; Description: string }[] {
    return this.routes;
  }
}
