import { TestBed, inject } from '@angular/core/testing';

import { FileOptionsService } from './file-options.service';

describe('FileOptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileOptionsService]
    });
  });

  it('should be created', inject([FileOptionsService], (service: FileOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
