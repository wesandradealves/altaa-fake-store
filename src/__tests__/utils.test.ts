import { decodeCategorySlug, encodeCategorySlug, pxToRem, range } from '@/utils';

describe('utils', () => {
  it('converte px para rem com base padrao', () => {
    expect(pxToRem(32)).toBe('2rem');
  });

  it('converte px para rem com base customizada', () => {
    expect(pxToRem(30, 10)).toBe('3rem');
  });

  it('codifica e decodifica slug de categoria', () => {
    const encoded = encodeCategorySlug("men's clothing");
    expect(encoded).toBe("men's%20clothing");

    const decoded = decodeCategorySlug(encoded);
    expect(decoded).toBe("men's clothing");
  });

  it('retorna valor original quando decode falha', () => {
    const invalid = '%E0%A4%A';
    expect(decodeCategorySlug(invalid)).toBe(invalid);
  });

  it('gera range a partir do tamanho informado', () => {
    expect(range(3)).toEqual([0, 1, 2]);
  });

  it('retorna array vazio quando tamanho invalido', () => {
    expect(range(0)).toEqual([]);
    expect(range(-2)).toEqual([]);
  });
});
