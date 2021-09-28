import { CustomValidationPipe } from './custom-validation-pipe.service';

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(new CustomValidationPipe()).toBeDefined();
  });
});
