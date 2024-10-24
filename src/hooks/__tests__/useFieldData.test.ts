import { renderHook, act } from '@testing-library/react-hooks';
import { useFieldData } from '../useFieldData';

// フェッチのモック
global.fetch = jest.fn();

describe('useFieldData', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches data on mount', async () => {
    const mockData = [{ id: '1', date: '2023-05-01', time: '10:00', field: 'Field A', available: true }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result, waitForNextUpdate } = renderHook(() => useFieldData(new Date(), undefined));

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData);
  });

  it('updates data when fetchData is called', async () => {
    const mockData1 = [{ id: '1', date: '2023-05-01', time: '10:00', field: 'Field A', available: true }];
    const mockData2 = [{ id: '2', date: '2023-05-01', time: '11:00', field: 'Field B', available: false }];

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData1,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData2,
      });

    const { result, waitForNextUpdate } = renderHook(() => useFieldData(new Date(), undefined));

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData1);

    act(() => {
      result.current.fetchData();
    });

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData2);
  });
});
