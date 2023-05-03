import { LeadRepositoryInterface, RandomLeadFactory } from '../../../../domain';
import { FindByIdLeadUseCase } from '../find-by-id-lead.use-case';
import { LeadInMemoryRepository } from '../../../../infra';

describe('Find By Id Lead UseCase Test', () => {
  let useCase: FindByIdLeadUseCase.UseCase;
  let repository: LeadRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new LeadInMemoryRepository();
    useCase = new FindByIdLeadUseCase.UseCase(repository);
  });
  it('should execute the findById use-case', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');

    const lead = RandomLeadFactory.createOne();

    await repository.insert(lead);

    const foundLead = await useCase.execute({
      id: lead.id,
    });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(foundLead).toStrictEqual(lead.toJSON());
  });
});
