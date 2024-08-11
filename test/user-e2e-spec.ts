import request from 'supertest';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';

import { UserStore } from '../src/modules/user/stores/user.store';
import { AppModule } from '../src/app.module';

describe('Users', () => {
    let app: INestApplication;
    const user = {
        uuid: '29A2V1dNR12w1IAaR2j739nQmW3_iSQw',
        name: 'John',
        surname: 'Doe',
        birthDate: '2000-03-01T00:00:00.000Z',
        createdAt: '2024-08-10T16:30:41.283Z',
        updatedAt: '2024-08-10T16:59:32.396Z',
    };
    const userStore = {
        findAll: () => {
            return [{ toJSON: jest.fn().mockReturnValue(user) }];
        },
        findOneByUuid: () => {
            return { toJSON: jest.fn().mockReturnValue(user) };
        },
        search: () => {
            return [{ toJSON: jest.fn().mockReturnValue(user) }];
        },
        createUser: () => {
            return { toJSON: jest.fn().mockReturnValue(user) };
        },
        update: () => {
            return { toJSON: jest.fn().mockReturnValue(user) };
        },
        delete: () => {
            return true;
        },
        handleBlock: () => {
            return true;
        },
    };

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(UserStore)
            .useValue(userStore)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET user`, () => {
        return request(app.getHttpServer())
            .get('/users/29A2V1dNR12w1IAaR2j739nQmW3_iSQw')
            .expect(200)
            .expect({
                message: 'The User is retrieved successfully',
                data: user,
            });
    });

    it(`/GET users`, () => {
        return request(app.getHttpServer())
            .get('/users')
            .expect(200)
            .expect({
                message: 'The User is retrieved successfully',
                data: [user],
            });
    });

    it(`/POST Search users by given age range and username`, () => {
        return request(app.getHttpServer())
            .post('/users/search?username=johndoe')
            .send({
                minAge: 19,
                maxAge: 30,
            })
            .expect(201)
            .expect({
                message: 'The User is retrieved successfully',
                data: [user],
            });
    });

    it(`/POST Search users by given age range`, () => {
        return request(app.getHttpServer())
            .post('/users/search')
            .send({
                minAge: 19,
                maxAge: 30,
            })
            .expect(201)
            .expect({
                message: 'The User is retrieved successfully',
                data: [user],
            });
    });

    it(`/POST Search users by given username`, () => {
        return request(app.getHttpServer())
            .post('/users/search?username=johndoe')
            .expect(201)
            .expect({
                message: 'The User is retrieved successfully',
                data: [user],
            });
    });

    it(`/POST Search users by only min age`, () => {
        return request(app.getHttpServer())
            .post('/users/search')
            .expect(201)
            .send({
                minAge: 19,
            })
            .expect({
                message: 'The User is retrieved successfully',
                data: [user],
            });
    });

    it(`/POST Search users by only max age`, () => {
        return request(app.getHttpServer())
            .post('/users/search')
            .expect(201)
            .send({
                maxAge: 30,
            })
            .expect({
                message: 'The User is retrieved successfully',
                data: [user],
            });
    });

    it(`/POST Create a user`, () => {
        return request(app.getHttpServer())
            .post('/users')
            .expect(201)
            .send({
                name: 'John',
                surname: 'Doe',
                username: 'johndoe',
                birthDate: '2020-03-01',
            })
            .expect({
                message: 'The User is created successfully',
                data: user,
            });
    });

    it(`/PATCH Update a user`, () => {
        return request(app.getHttpServer())
            .patch('/users/29A2V1dNR12w1IAaR2j739nQmW3_iSQw')
            .expect(200)
            .send({
                name: 'John',
                surname: 'Doe',
                username: 'johndoe',
                birthDate: '2020-03-01',
            })
            .expect({
                message: 'The User is updated successfully',
                data: user,
            });
    });

    it(`/DELETE Delete a user`, () => {
        return request(app.getHttpServer())
            .delete('/users/29A2V1dNR12w1IAaR2j739nQmW3_iSQw')
            .expect(200)
            .expect({
                message: 'The User is deleted successfully',
            });
    });

    it(`/POST Block a user`, () => {
        return request(app.getHttpServer())
            .post('/users/block')
            .send({
                uuid: '29A2V1dNR12w1IAaR2j739nQmW3_iSQw',
            })
            .expect(201)
            .expect({
                message: 'The User is blocked successfully',
            });
    });

    it(`/POST Unblock a user`, () => {
        return request(app.getHttpServer())
            .post('/users/unblock')
            .send({
                uuid: '29A2V1dNR12w1IAaR2j739nQmW3_iSQw',
            })
            .expect(201)
            .expect({
                message: 'The User is unblocked successfully',
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
