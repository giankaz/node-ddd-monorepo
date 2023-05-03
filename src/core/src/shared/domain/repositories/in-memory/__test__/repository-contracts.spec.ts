import {
  CommonEntityModel,
  Entity,
  SearchParams,
  SearchParamsWithoutPagination,
  SearchResult,
  SortDirection,
} from '../../../../domain';

class MockModel extends CommonEntityModel {
  constructor(props: MockModel) {
    super(props);
  }
}

class MockEntity extends Entity<MockModel> {}

type Fields = 'name' | 'created_at';

describe('Search Unit Tests', () => {
  describe('SearchParams Unit Tests', () => {
    //TODO refactor to test.each

    test('search prop', () => {
      const params = new SearchParams();
      expect(params.search).toBeFalsy();
      params.search = 'teste';
      expect(params.search).toBeDefined();
      params.search = '';
      expect(params.search).toBe('');

      //TODO refactor to test.each
      const arrange = [
        { search: null, expected: false },
        { search: undefined, expected: false },
        { search: '', expected: false },
        { search: 0, expected: false },
        { search: -1, expected: '-1' },
        { search: 5.5, expected: '5.5' },
        { search: true, expected: 'true' },
        { search: false, expected: false },
        { search: 'field', expected: 'field' },
      ];

      arrange.forEach((i) => {
        expect(
          new SearchParams({
            search: i.search ? String(i.search) : '',
          }).search,
        ).toBe(i.expected);
      });
    });

    test('defaultSearchOrExpressions prop', () => {
      const params = new SearchParams();
      expect(params.defaultSearchOrExpressions).toBeFalsy();
      params.defaultSearchOrExpressions = [
        {
          test: 'test',
        },
      ];
      expect(params.defaultSearchOrExpressions).toBeDefined();

      expect(JSON.stringify(params.defaultSearchOrExpressions)).toBe(
        '[{"test":"test"}]',
      ); // eslint-disable-line
    });

    test('defaultSearch prop', () => {
      const params = new SearchParams();
      expect(params.defaultSearch).toBeFalsy();
      params.defaultSearch = {
        test: 'test',
      };
      expect(params.defaultSearch).toBeDefined();

      expect(JSON.stringify(params.defaultSearch)).toBe('{"test":"test"}'); // eslint-disable-line
    });
    test('page prop', () => {
      const params = new SearchParams();
      expect(params.page).toBe(1);
      //@ts-expect-error page is private
      params.page = '50';
      expect(params.page).toBe(50);
      //@ts-expect-error page is private
      params.page = 'teste';
      expect(params.page).toBe(1);
      //@ts-expect-error page is private
      params.page = '';
      expect(params.page).toBe(1);
      //@ts-expect-error page is private
      params.page = -2;
      expect(params.page).toBe(1);

      const arrange = [
        { page: null, expected: 1 },
        { page: undefined, expected: 1 },
        { page: '', expected: 1 },
        { page: 'fake', expected: 1 },
        { page: 0, expected: 1 },
        { page: -1, expected: -1 },
        { page: 5.5, expected: 5.5 },
        { page: true, expected: 1 },
        { page: false, expected: 1 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 },
      ];

      arrange.forEach((i) => {
        expect(new SearchParams({ page: Number(i.page) }).page).toBe(
          i.expected,
        );
      });
    });

    test('sort prop', () => {
      const params = new SearchParams();
      expect(params.sort).toBeFalsy();
      //@ts-expect-error sort is private
      params.sort = 'teste';
      expect(params.sort).toBeDefined();
      //@ts-expect-error sort is private
      params.sort = '';
      expect(params.sort).toBe(null);

      //TODO refactor to test.each
      const arrange = [
        { sort: null, expected: 'null' },
        { sort: undefined, expected: 'undefined' },
        { sort: '', expected: null },
        { sort: 0, expected: '0' },
        { sort: -1, expected: '-1' },
        { sort: 5.5, expected: '5.5' },
        { sort: true, expected: 'true' },
        { sort: false, expected: 'false' },
        { sort: 'field', expected: 'field' },
      ];

      arrange.forEach((i) => {
        expect(new SearchParams({ sort: String(i.sort) }).sort).toBe(
          i.expected,
        );
      });
    });

    test('sort_dir prop', () => {
      let params = new SearchParams();
      expect(params.sort_dir).toBeFalsy();
      //@ts-expect-error sort is private
      params.sort = 'HOLDER';
      //@ts-expect-error sort_dir is private
      params.sort_dir = 'TESTE';
      expect(params.sort_dir).toBe('asc');
      //@ts-expect-error sort_dir is private
      params.sort_dir = 'DESC';
      expect(params.sort_dir).toBe('DESC'.toLowerCase());
      //@ts-expect-error sort is private
      params.sort = null;
      //@ts-expect-error sort_dir is private
      params.sort_dir = 'expect null';
      expect(params.sort_dir).toBe(null);

      params = new SearchParams({ sort_dir: null });
      expect(params.sort_dir).toBeNull();

      //TODO refactor to test.each
      const arrange = [
        { sort_dir: null, expected: null },
        { sort_dir: undefined, expected: null },
        { sort_dir: '', expected: null },
        { sort_dir: 0, expected: null },
        { sort_dir: 'fake', expected: 'fake' },

        { sort_dir: 'asc', expected: 'asc' },
        { sort_dir: 'ASC', expected: 'ASC' },
        { sort_dir: 'desc', expected: 'desc' },
        { sort_dir: 'DESC', expected: 'DESC' },
      ];

      arrange.forEach((i) => {
        expect(
          new SearchParams({
            sort: 'field',
            sort_dir: i.sort_dir as SortDirection,
          }).sort_dir,
        ).toBe(i.expected);
      });
    });

    test('filter prop', () => {
      const params = new SearchParams();
      expect(params.filter).toBeFalsy();
      //@ts-expect-error filter is private
      params.filter = 'teste';
      expect(params.filter).toBeDefined();
      //@ts-expect-error filter is private
      params.filter = '';
      expect(params.filter).toBe('');
    });
  });

  describe('SearchResult Unit Tests', () => {
    test('constructor props', () => {
      let result = new SearchResult<MockModel, MockEntity, Fields>({
        items: [{} as MockEntity],
        total: 4,
        current_page: 1,
        per_page: 2,
        sort: null,
        sort_dir: null,
        filter: null,
      });

      expect(result.toJSON()).toStrictEqual({
        items: [{}],
        total: 4,
        current_page: 1,
        per_page: 2,
        last_page: 2,
        sort: null,
        sort_dir: null,
        filter: null,
      });

      result = new SearchResult({
        items: [{} as MockEntity],
        total: 4,
        current_page: 1,
        per_page: 2,
        sort: 'name',
        sort_dir: 'asc',
        filter: [],
      });

      expect(result.toJSON()).toStrictEqual({
        items: [{}],
        total: 4,
        current_page: 1,
        per_page: 2,
        last_page: 2,
        sort: 'name',
        sort_dir: 'asc',
        filter: [],
      });
    });

    it('should set last_page = 1 when per_page field is greater than total field', () => {
      const result = new SearchResult({
        items: [],
        total: 4,
        current_page: 1,
        per_page: 15,
        sort: 'name',
        sort_dir: 'asc',
        filter: [],
      });

      expect(result.last_page).toBe(1);
    });

    test('last_page prop when total is not a multiple of per_page', () => {
      const result = new SearchResult({
        items: [],
        total: 101,
        current_page: 1,
        per_page: 20,
        sort: 'name',
        sort_dir: 'asc',
        filter: [],
      });

      expect(result.last_page).toBe(6);
    });
  });
});

describe('SearchParamsWithoutPagination Unit Tests', () => {
  test('sort prop', () => {
    const params = new SearchParamsWithoutPagination();
    expect(params.sort).toBeFalsy();
    //@ts-expect-error sort is private
    params.sort = 'teste';
    expect(params.sort).toBeDefined();
    //@ts-expect-error sort is private
    params.sort = '';
    expect(params.sort).toBe(null);

    const arrange = [
      { sort: null, expected: 'null' },
      { sort: undefined, expected: 'undefined' },
      { sort: '', expected: null },
      { sort: 'fake', expected: 'fake' },
      { sort: 0, expected: '0' },
      { sort: -1, expected: '-1' },
      { sort: 5.5, expected: '5.5' },
      { sort: true, expected: 'true' },
      { sort: false, expected: 'false' },
      { sort: 1, expected: '1' },
      { sort: 2, expected: '2' },
    ];

    arrange.forEach((i) => {
      expect(
        new SearchParamsWithoutPagination({ sort: String(i.sort) }).sort,
      ).toBe(i.expected);
    });
  });

  test('sort_dir prop', () => {
    const params = new SearchParamsWithoutPagination();
    expect(params.sort_dir).toBeFalsy();
    //@ts-expect-error sort is private
    params.sort = 'HOLDER';
    //@ts-expect-error sort_dir is private
    params.sort_dir = 'TESTE';
    expect(params.sort_dir).toBe('asc');
    //@ts-expect-error sort_dir is private
    params.sort_dir = 'DESC';
    expect(params.sort_dir).toBe('DESC'.toLowerCase());
    //@ts-expect-error sort is private
    params.sort = null;
    //@ts-expect-error sort_dir is private
    params.sort_dir = 'expect null';
    expect(params.sort_dir).toBe(null);

    const arrange = [
      { sort_dir: null, expected: null },
      { sort_dir: undefined, expected: null },
      { sort_dir: '', expected: null },
      { sort_dir: 'fake', expected: 'fake' },
      { sort_dir: 0, expected: null },
      { sort_dir: -1, expected: -1 },
      { sort_dir: 5.5, expected: 5.5 },
      { sort_dir: true, expected: true },
      { sort_dir: false, expected: null },
      { sort_dir: 1, expected: 1 },
      { sort_dir: 2, expected: 2 },
    ];

    arrange.forEach((i) => {
      expect(
        new SearchParamsWithoutPagination({
          sort_dir: i.sort_dir as SortDirection,
        }).sort_dir,
      ).toBe(i.expected);
    });
  });

  test('filter prop', () => {
    const params = new SearchParamsWithoutPagination();
    expect(params.filter).toBeFalsy();
    //@ts-expect-error filter is private
    params.filter = 'teste';
    expect(params.filter).toBeDefined();
    //@ts-expect-error filter is private
    params.filter = '';
    expect(params.filter).toBe('');
  });

  test('search prop', () => {
    let params = new SearchParamsWithoutPagination();
    expect(params.search).toBeFalsy();
    params.search = 'teste';
    expect(params.search).toBeDefined();
    params.search = '';
    expect(params.search).toBe('');

    params = new SearchParamsWithoutPagination({});
    expect(params.search).toBeNull();

    //TODO refactor to test.each
    const arrange = [
      { search: null, expected: 'null' },
      { search: undefined, expected: 'undefined' },
      { search: '', expected: false },
      { search: 0, expected: '0' },
      { search: 'fake', expected: 'fake' },

      { search: 'asc', expected: 'asc' },
      { search: 'ASC', expected: 'ASC' },
      { search: 'desc', expected: 'desc' },
      { search: 'DESC', expected: 'DESC' },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ search: String(i.search) }).search).toBe(
        i.expected,
      );
    });
  });
});
