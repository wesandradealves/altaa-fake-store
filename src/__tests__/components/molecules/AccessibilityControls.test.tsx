import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AccessibilityControls from '@/components/molecules/AccessibilityControls';
import { AccessibilityProvider } from '@/context/accessibility';
import content from '@/config/content.json';

const renderControls = () => {
  return render(
    <AccessibilityProvider>
      <AccessibilityControls />
    </AccessibilityProvider>
  );
};

describe('AccessibilityControls', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-contrast');
    document.documentElement.style.removeProperty('--font-scale');
  });

  it('alterna alto contraste e persiste preferencia', async () => {
    renderControls();

    const contrastButton = screen.getByRole('button', {
      name: content.app.accessibility.highContrast,
    });

    expect(contrastButton).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(contrastButton);

    await waitFor(() => {
      expect(contrastButton).toHaveAttribute('aria-pressed', 'true');
      expect(document.documentElement.dataset.contrast).toBe('high');
    });

    expect(localStorage.getItem('a11y:contrast')).toBe('1');
  });

  it('ajusta tamanho da fonte e permite reset', async () => {
    renderControls();

    const increaseButton = screen.getByRole('button', {
      name: content.app.accessibility.increaseFont,
    });
    const decreaseButton = screen.getByRole('button', {
      name: content.app.accessibility.decreaseFont,
    });
    const resetButton = screen.getByRole('button', {
      name: content.app.accessibility.resetFont,
    });

    fireEvent.click(increaseButton);

    await waitFor(() => {
      expect(document.documentElement.style.getPropertyValue('--font-scale')).toBe('1.1');
    });

    fireEvent.click(decreaseButton);

    await waitFor(() => {
      expect(document.documentElement.style.getPropertyValue('--font-scale')).toBe('1');
    });

    fireEvent.click(decreaseButton);

    await waitFor(() => {
      expect(document.documentElement.style.getPropertyValue('--font-scale')).toBe('0.9');
    });

    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(document.documentElement.style.getPropertyValue('--font-scale')).toBe('1');
    });

    expect(localStorage.getItem('a11y:font-scale')).toBe('1');
  });
});
