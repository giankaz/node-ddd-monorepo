import { LeadRepositoryInterface, RandomLeadFactory } from '../../../../domain';
import { SoftDeleteLeadUseCase } from '../soft-delete-lead.use-case';
import { LeadInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Soft Delete Lead UseCase Test', () => {
  let useCase: SoftDeleteLeadUseCase.UseCase;
  let repository: LeadRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new LeadInMemoryRepository();
    useCase = new SoftDeleteLeadUseCase.UseCase(repository);
  });
  it('should execute the soft delete use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'softDelete');

    const lead = RandomLeadFactory.createOne();

    await repository.insert(lead);

    const foundLead = await repository.findById(lead.id);

    await useCase.execute({
      id: foundLead.id,
    });

    const foundActivatedLead = await repository.findById(lead.id);

    const jsonLead = foundActivatedLead.toJSON();

    expect(spyActivate).toHaveBeenCalledTimes(1);
    expect(jsonLead.id).toStrictEqual(foundLead.id);
    expect(jsonLead.status).toStrictEqual(CommonStatus.DELETED);
  });
});
