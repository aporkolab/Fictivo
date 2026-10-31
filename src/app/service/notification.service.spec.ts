import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { ToastService } from './toast.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let toast: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
    toast = TestBed.inject(ToastService);
  });

  it('delegates every notification kind to the toast service', () => {
    const success = vi.spyOn(toast, 'success').mockImplementation(() => undefined);
    const error = vi.spyOn(toast, 'error').mockImplementation(() => undefined);
    const info = vi.spyOn(toast, 'info').mockImplementation(() => undefined);
    const warning = vi.spyOn(toast, 'warning').mockImplementation(() => undefined);

    service.showSuccess('s', 'S');
    service.showError('e', 'E');
    service.showInfo('i', 'I');
    service.showWarning('w', 'W');

    expect(success).toHaveBeenCalledWith('s', 'S');
    expect(error).toHaveBeenCalledWith('e', 'E');
    expect(info).toHaveBeenCalledWith('i', 'I');
    expect(warning).toHaveBeenCalledWith('w', 'W');
  });
});
