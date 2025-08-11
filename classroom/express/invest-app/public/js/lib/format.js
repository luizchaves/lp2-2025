export function formatCurrency(value) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatter.format(value);
}

export function formatDate(value, pattern) {
  const date = new Date(value).toLocaleDateString('pt-br');

  if (pattern === 'ymd') {
    return date.split('/').reverse().join('-');
  } else {
    return date;
  }
}
