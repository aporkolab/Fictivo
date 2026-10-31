import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  const toasts = () => Array.from(document.querySelectorAll<HTMLElement>('.app-toast'));

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  afterEach(() => {
    service.clear();
    document.querySelector('.app-toast-container')?.remove();
    vi.useRealTimers();
  });

  it('renders title and message as text, never as HTML', () => {
    service.error('<img src=x onerror=alert(1)>', 'Oops');

    const [toast] = toasts();
    expect(toast.classList).toContain('app-toast-error');
    expect(toast.getAttribute('role')).toBe('alert');
    expect(toast.querySelector('strong')?.textContent).toBe('Oops');
    expect(toast.querySelector('img')).toBeNull();
    expect(toast.textContent).toContain('<img src=x onerror=alert(1)>');
  });

  it('suppresses duplicates unless asked otherwise', () => {
    service.info('same', 'title');
    service.info('same', 'title');
    expect(toasts().length).toBe(1);

    service.info('same', 'title', { preventDuplicates: false });
    expect(toasts().length).toBe(2);
  });

  it('dismisses on the close button and after the timeout', () => {
    service.success('first', '', { timeOut: 1000 });
    service.warning('second', '', { timeOut: 0 });
    expect(toasts().length).toBe(2);

    vi.advanceTimersByTime(1000);
    expect(toasts().map(t => t.textContent)).toEqual([withCloseGlyph('second')]);

    toasts()[0].querySelector('button')!.click();
    expect(toasts().length).toBe(0);
  });

  function withCloseGlyph(message: string): string {
    // text of a toast without title: message followed by the close button glyph
    return `${message}×`;
  }
});
