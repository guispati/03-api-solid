import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and--authenticate-user';

describe('Nearby Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });
    
    it('should be able to list nearby gyms', async () => {
        const { token } = await createAndAuthenticateUser(app);

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Gym',
                description: 'Some description',
                phone: '14999999999',
                latitude: -23.0371147,
                longitude: -49.168384,
            });

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'TypeScript Gym',
                description: 'Some description',
                phone: '14999999999',
                latitude: -22.978633,
                longitude: -49.8524933,
            });

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -23.0371147,
                longitude: -49.168384,
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym'
            })
        ]);
    });
});