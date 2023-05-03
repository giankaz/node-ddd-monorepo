import { FilterQuery } from 'mongoose';
import {
  ParseSearchParams,
  ParseSearchParamsInterface,
  SearchParams,
} from '../../../domain';
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
  parse(searchParams: ParseSearchParams): MongooseSearchParamsReturn {
    return {
      find: Find.parse(searchParams),
      sort: Sort.parse(searchParams),
      skip: Skip.parse(searchParams.params),
      limit: searchParams.params.per_page,
    };
  }
}

class Skip {
  static parse(params: SearchParams): number {
    return (Math.max(1, params.page) - 1) * params.per_page;
  }
}

class Sort {
  static parse(searchParams: ParseSearchParams): SortReturn {
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
  static parse(searchParams: ParseSearchParams): FindReturn {
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
