import { LeadRepositoryInterface, RandomLeadFactory } from '../../../../domain';
import { InactivateLeadUseCase } from '../inactivate-lead.use-case';
import { LeadInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Inactivate Lead UseCase Test', () => {
  let useCase: InactivateLeadUseCase.UseCase;
  let repository: LeadRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new LeadInMemoryRepository();
    useCase = new InactivateLeadUseCase.UseCase(repository);
  });
  it('should execute the inactivate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'inactivate');

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
    expect(jsonLead.status).toStrictEqual(CommonStatus.INACTIVE);
  });
});
