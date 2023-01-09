import { fetchAPI } from '../redux/actions';
import mockData from './helpers/mockData';
import { renderWithRedux } from './helpers/renderWith';

describe('Testa as funções ', () => {
  test('testa as funçoes da API', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    const { store } = renderWithRedux();
    await store.dispatch(fetchAPI());
    expect(store.getState().wallet.currencies).toStrictEqual([
      'USD', 'CAD', 'EUR',
      'GBP', 'ARS', 'BTC',
      'LTC', 'JPY', 'CHF',
      'AUD', 'CNY', 'ILS',
      'ETH', 'XRP', 'DOGE',
    ]);
  });
});
