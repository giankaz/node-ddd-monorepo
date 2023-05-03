import { LeadRepositoryInterface, RandomLeadFactory } from '../../../../domain';
import { LeadInMemoryRepository } from '../../../../infra';
import { UpdateLeadUseCase } from '../update-lead.use-case';

describe('Update Lead UseCase Test', () => {
  let useCase: UpdateLeadUseCase.UseCase;
  let repository: LeadRepositoryInterface.Repository;

  beforeEach(() => {
    repository = new LeadInMemoryRepository();
    useCase = new UpdateLeadUseCase.UseCase(repository);
  });
  it('should execute the update use-case', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');

    const lead = RandomLeadFactory.createOne();
    const lead2 = RandomLeadFactory.createOne();

    await repository.insertMany([lead, lead2]);

    await useCase.execute({
      ...lead2.toJSON(),
      id: lead.id,
    });

    const foundLead = await repository.findById(lead.id);

    const jsonLead = foundLead.toJSON();

    const notAllowedFields: Partial<keyof typeof jsonLead>[] = [
      'id',
      'created_at',
      'updated_at',
      'status',
    ];

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(jsonLead.id).toStrictEqual(lead.id);
    for (const key in jsonLead) {
      if (!notAllowedFields.includes(key as keyof typeof jsonLead)) {
        expect(jsonLead[key]).toStrictEqual(lead2.toJSON()[key]);
      }
    }
  });
});
