import { Environment } from "vitest"; 'vitest';

export default <Environment> {
    name: 'prisma',
    async setup() {
        console.log('oi');

        return {
            async teardown() {},
        }
    },
}