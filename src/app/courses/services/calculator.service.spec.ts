import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {

  let service: CalculatorService;
  let logger: any;

  beforeEach(() => {
    // createSpyObj -> Cria um objeto fake com os métodos passados como argument
    // que já está sendo espionado pelo jasmine.
    logger = jasmine.createSpyObj('LoggerService', ['log']);

    // caso o método retorne algum valor, pode ser útilizado o método do jasmine .and.returnValue()
    // logger.log().and.returnValue(2);
    service = new CalculatorService(logger);
  });

  it('should sum two numbers', () => {


    const result = service.add(2, 2);
    expect(result).toBe(4);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    const result = service.subtract(2, 2);
    expect(result).toBe(0);
  });
});
