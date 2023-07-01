import { FilterQuery } from 'mongoose';
import {
  ParseSearchParams,
  ParseSearchParamsInterface,
  SearchParams,
} from '../..';
import {
  MongooseParseFilter,
  MongooseParseFilterOperators,
} from './mongoose-parse-filter';

type FindField = { [key: string]: unknown }[];

type FindReturn = { $or: FindField };

type SortReturn = { [key: string]: 'asc' | 'desc' };

interface MongooseSearchParamsReturn {
  find: FilterQuery<unknown>;
  sort: SortReturn;
  limit: number;
  skip: number;
}

export class MongooseParseSearchParams
  implements ParseSearchParamsInterface<MongooseSearchParamsReturn>
{
  parse<Fields extends string>(
    searchParams: ParseSearchParams<Fields>,
  ): MongooseSearchParamsReturn {
    return {
      find: Find.parse<Fields>(searchParams),
      sort: Sort.parse<Fields>(searchParams),
      skip: Skip.parse<Fields>(searchParams.params),
      limit: searchParams.params.per_page,
    };
  }
}

class Skip {
  static parse<Fields extends string>(params: SearchParams<Fields>): number {
    return (Math.max(1, params.page) - 1) * params.per_page;
  }
}

class Sort {
  static parse<Fields extends string>(
    searchParams: ParseSearchParams<Fields>,
  ): SortReturn {
    if (
      !searchParams.params.sort ||
      !searchParams.sortableFields.includes(searchParams.params.sort)
    )
      return {};

    const sortDir = searchParams.params.sort_dir ?? 'desc';
    return { [searchParams.params.sort]: sortDir };
  }
}

class Find {
  static parse<Fields extends string>(
    searchParams: ParseSearchParams<Fields>,
  ): FindReturn {
    const { filterableFields, params, searchableFields, defaultSearch } =
      searchParams;
    const filters = params?.filter
      ? params.filter.filter((f) => filterableFields.includes(f.column))
      : [];
    let find: FindField = [];
    const mongooseFilter = new MongooseParseFilter();
    const filter = mongooseFilter.parseArray(filters);

    const filterParams = { ...defaultSearch, ...filter };

    find.push(filterParams);

    if (!params.search) return { $or: find };

    find = [];
    searchableFields.forEach((field) => {
      find.push({
        ...filterParams,
        ...MongooseParseFilterOperators.parseContains({
          column: field,
          value: params.search,
        }),
      });
    });

    return { $or: find };
  }
}
