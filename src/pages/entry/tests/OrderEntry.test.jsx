import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('handles error for scoops and toppings route', async () => {
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
            return res(ctx.status(500))
        }),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert')
        expect(alerts).toHaveLength(2);
    });

});