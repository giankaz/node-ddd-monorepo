import { LeadRepositoryInterface, RandomLeadFactory } from '../../../../domain';
import { DeleteLeadUseCase } from '../delete-lead.use-case';
import { LeadInMemoryRepository } from '../../../../infra';

describe('Delete Lead UseCase Test', () => {
  let useCase: DeleteLeadUseCase.UseCase;
  let repository: LeadRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new LeadInMemoryRepository();
    useCase = new DeleteLeadUseCase.UseCase(repository);
  });
  it('should execute the delete use-case', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');

    const lead = RandomLeadFactory.createOne();

    await repository.insert(lead);

    const foundLead = await repository.findById(lead.id);

    await useCase.execute({
      id: foundLead.id,
    });

    expect(async () => {
      await repository.findById(lead.id);
    }).rejects.toThrow();
    expect(spyDelete).toHaveBeenCalledTimes(1);
  });
});
