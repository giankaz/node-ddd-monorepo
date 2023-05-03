import { LeadRepositoryInterface, RandomLeadFactory } from '../../../../domain';
import { LeadInMemoryRepository } from '../../../../infra';
import { CreateLeadUseCase } from '../create-lead.use-case';

describe('Create Lead UseCase Test', () => {
  let useCase: CreateLeadUseCase.UseCase;
  let repository: LeadRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new LeadInMemoryRepository();
    useCase = new CreateLeadUseCase.UseCase(repository);
  });
  it('should execute the create use-case', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');

    const lead = RandomLeadFactory.createOne();

    const output = await useCase.execute(lead.props);

    const foundLead = await repository.findById(lead.id);

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(lead.toJSON()).toStrictEqual(foundLead.toJSON());
    expect(lead.toJSON()).toStrictEqual(output);
  });
});
