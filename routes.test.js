process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb")

let item = { name: "cell phone", price:1000 }


beforeEach(function() {
    items.push(item);
});

/** GET /items - returns `[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]` */
describe("GET /items", function() {
    test("Gets a list of items", async function() {
        const resp = await request(app).get(`/items`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([{name: 'cell phone', price: 1000}]);
    });
});


/** GET /items/[name] - return data about one item: `{item: item}` */
describe("GET /items/:name", function () {
    test("Gets a single item", async function () {
        const response = await request(app).get(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(item);
    });

    test("Responds with 404 if item not found", async function () {
        const response = await request(app).get(`/items/0`);
        expect(response.statusCode).toBe(404);
    });
});

/** POST /items - create item from data; return `{“added”: {“name”: “popsicle”, “price”: 1.45}}` */
describe("POST /items", function() {
    test("Added a new item to list", async function() {
        const resp = await request(app).post(`/items`).send({name: 'popsicle', price: 1.45});
        expect(resp.statusCode).toBe(200);
        expect(items.length).toBe(2);
        expect(resp.body).toEqual({added: {name: 'popsicle', price: 1.45}});
    });
});


/** PATCH /items/[name] - update item; return `{“updated”: {“name”: “new popsicle”, “price”: 2.45}}` */
describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
        const resp = await request(app)
        .patch(`/items/${item.name}`)
        .send({name: "tablet", price: 1500});
        expect(resp.statusCode).toBe(200);
        expect(items.length).toBe(1);
        expect(resp.body).toEqual({updated: {name: "tablet", price: 1500}});
    });

    test("Responds with 404 if item not found", async function() {
        const resp = await request(app).patch(`/items/bad`);
        expect(resp.statusCode).toBe(404);
    });
});



/** DELETE /items/[name] - delete item,
 *  return `{message: "Deleted"}` */
describe("DELETE /items/:name", function() {
    test("Deletes a single item from list", async function() {
        const resp = await request(app).delete(`/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(items.length).toBe(0);
        expect(resp.body).toEqual({ message: "Deleted" });
    });
});

afterEach(function() {
    items.length = 0;
})