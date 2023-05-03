import { LeadRepositoryInterface, RandomLeadFactory } from '../../../../domain';
import { ActivateLeadUseCase } from '../activate-lead.use-case';
import { LeadInMemoryRepository } from '../../../../infra';
import { CommonStatus } from '../../../../../shared';

describe('Activate Lead UseCase Test', () => {
  let useCase: ActivateLeadUseCase.UseCase;
  let repository: LeadRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new LeadInMemoryRepository();
    useCase = new ActivateLeadUseCase.UseCase(repository);
  });
  it('should execute the activate use-case', async () => {
    const spyActivate = jest.spyOn(repository, 'activate');

    const lead = RandomLeadFactory.createOne({
      status: CommonStatus.INACTIVE,
    });

    await repository.insert(lead);

    const foundLead = await repository.findById(lead.id);

    await useCase.execute({
      id: foundLead.id,
    });

    const foundActivatedLead = await repository.findById(lead.id);

    const jsonLead = foundActivatedLead.toJSON();

    expect(spyActivate).toHaveBeenCalledTimes(1);
    expect(jsonLead.id).toStrictEqual(foundLead.id);
    expect(jsonLead.status).toStrictEqual(CommonStatus.ACTIVE);
  });
});
